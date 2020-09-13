<template>
  <form id="flights-to-form" @submit.prevent="submitform">
    <div class="flights-head-title">Search Flights</div>
    <div class="flights-class-selector">
      <span
        v-for="class_item in classes"
        :key="class_item.slug"
        :class="{'active':class_item.slug == classtype }"
        class="disable-select"
        @click="set_type(class_item.slug)"
      >{{class_item.title}}</span>
    </div>
    <div class="flights-to-dashboard flights-search-field disable-select">
      <div class="from-to-switch">
        <div
          :class="[{'modal-show':modals.airports}]"
          class="flights-modal"
          @click.self="modals.airports=false"
        >
          <div>
            <div
              @click="airports_modal('from')"
              class="airport-upper"
              :class="{'not-selected':!airport_from.iata}"
            >
              <span>From</span>
              <div class="iata">{{airport_iata(airport_from)}}</div>
              <div class="airport-description">{{airport_city(airport_from)}}</div>
            </div>
            <div
              @click="airports_modal('to')"
              class="airport-upper"
              :class="{'not-selected':!airport_to.iata}"
            >
              <span>To</span>
              <div class="iata">{{airport_iata(airport_to)}}</div>
              <div class="airport-description">{{airport_city(airport_to)}}</div>
            </div>
            <div class="fwvdp">
              <div class="airportpicker">
                <DropDown
                  actionname="display_airports_from"
                  inputId="from"
                  :options="airports"
                  v-on:selected="depature_selection"
                  :disabled="false"
                  placeholder="Please, start search your airport"
                />
                <p>
                  <b>Select</b>
                  Depature Airport:
                  <span
                    :class="{'not-selected':!airport_from.iata}"
                  >{{airport_iata(airport_from)}}</span>
                </p>
              </div>
              <div class="airportpicker">
                <DropDown
                  actionname="display_airports_to"
                  inputId="to"
                  :options="airportsto"
                  v-on:selected="return_selection"
                  :disabled="false"
                  placeholder="Please, start search your airport"
                />
                <p>
                  <b>Select</b>
                  Return Airport:
                  <span
                    :class="{'not-selected':!airport_to.iata}"
                  >{{airport_iata(airport_to)}}</span>
                </p>
              </div>
              <div class="trip_class" :class="{'trip-show' : airport_to.iata && airport_from.iata}">
                <p>Trip 1: {{airport_city(airport_from)}} -> {{airport_city(airport_to)}}</p>
                <p>Trip 2: {{airport_city(airport_to)}} -> {{airport_city(airport_from)}}</p>
              </div>
              <div class="savebtn-mixer">
                <div v-show="airport_from.iata && airport_to.iata">
                  <div class="savebtn-container">
                    <span @click="modals.airports = false">Save</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flights-from" @click="airports_modal('from')">
          <span>From</span>
          <div
            id="flights-from-id"
            :class="[{'grayd': !airport_from.iata},{'blued': airport_from.iata}]"
          >
            <div class="letter_id">{{airport_iata(airport_from)}}</div>
            <div class="flights-detail">{{airport_city(airport_from)}}</div>
          </div>
        </div>
        <div
          id="flights-from-to-switcher"
          @click="shullfie_airports"
          :class="[{'grayd': !airport_to.iata || !airport_from.iata}]"
        ></div>
        <div class="flights-to" @click="airports_modal('to')">
          <span>To</span>
          <div id="flights-to-id" :class="[{'grayd': !airport_to.iata},{'blued': airport_to.iata}]">
            <div class="letter_id">{{airport_iata(airport_to)}}</div>
            <div class="flights-detail">{{airport_city(airport_to)}}</div>
          </div>
        </div>
      </div>

      <div class="depature-return">
        <div
          :class="{'modal-show':modals.date}"
          class="flights-modal"
          @click.self="modals.date=false"
        >
          <div>
            <VueDatepicker @confirm="close_date_popup" />
            <div class="savebtn-container">
              <span @click="modals.passengers=false">Save</span>
            </div>
          </div>
        </div>
        <div class="flights-from" @click="modals.date=true">
          <span>Depatrure</span>
          <div id="flights-depature" :class="{'grayd': !date_depature}">
            <div class="date_formatted">{{date_formatted(date_depature)}}</div>
            <div class="date_day">{{day_formatted(date_depature)}}</div>
          </div>
        </div>
        <div class="flights-to" @click="modals.date=true">
          <span>Return</span>
          <div id="flights-return" :class="{'grayd': !date_return}">
            <div class="date_formatted">{{date_formatted(date_return)}}</div>
            <div class="date_day">{{day_formatted(date_return)}}</div>
          </div>
        </div>
      </div>

      <div class="passengers">
        <div
          @click.self="modals.passengers=false"
          :class="{'modal-show':modals.passengers}"
          class="modal-passengers"
        >
          <div>
            <p class="passengers-modal-title">Passengers</p>
            <scroller
              input_name="adult_passengers"
              scrollerTitle="Adults"
              scrollerDescription="12+ years"
              :itemListDefault="adultList"
              @selectedValue="select_adults"
            ></scroller>
            <scroller
              input_name="child_passengers"
              scrollerTitle="Child"
              scrollerDescription="2 - 12 years"
              :itemListDefault="childList"
              @selectedValue="select_childs"
            ></scroller>
            <div class="savebtn-container">
              <span @click="modals.passengers=false">Save</span>
            </div>
          </div>
          <span @click="modals.date=false"></span>
        </div>

        <div class="adult">
          <span>Passengers</span>
          <div id="passengers-adults" @click="modals.passengers=true">
            <div class="passengers-title">Adults</div>
            <div class="passengers-counter">{{counter.adults}}</div>
            <div class="passengers-description">12+ years</div>
          </div>
        </div>

        <div class="child">
          <span style="visibility: hidden;">Passengers</span>
          <div id="passengers-children" @click="modals.passengers=true">
            <div class="passengers-title">Children</div>
            <div class="passengers-counter">{{counter.childs}}</div>
            <div class="passengers-description">2 - 12 years</div>
          </div>
        </div>
      </div>

      <div class="email_plus_terms">
        <input type="checkbox" id="terms" />
        <label id="termslabel" for="terms">Ich mochte tolle Angebote erhalten</label>
      </div>
      <div class="submitcontainer">
        <input id="submitbtn" type="submit" class="submit" value="Search flight" />
      </div>
    </div>
    <div class="modal-block" :class="{'modal-show':modals.main}">
      <div class="popup" :class="popup_message.class">
        <div class="congrats-title" :class="popup_message.class">{{popup_message.title}}</div>
        <p>{{popup_message.message}}</p>
        <LoadAnimation class="hidden-by-default" :class="{'show-item':state.formsending}" />
        <div
          class="okbtn hidden-by-default"
          :class="{'show-item':!state.formsending }"
          @click="modal_ok_reload"
        >{{popup_message.okbtn}}</div>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import qs from "querystring";
import LoadAnimation from "../components/LoadAnimation";
import Scroller from "../components/Scroller";
import VueDatepicker from "../components/VueDatepicker";
import DropDown from "../components/DropDown";
export default {
  props: {
    id: {
      required: true,
    },
    actionurl: {
      type: String,
    },
    adultList: {
      type: Array,
      required: true,
    },
    childList: {
      type: Array,
      required: true,
    },
    classes: {
      type: Array,
      required: true,
    },
    airports: {
      required: true,
    },
  },
  data() {
    return {
      payload: "",
      redirect_url: "",
      airport_from: false,
      airport_to: false,
      date_depature: null,
      date_return: null,
      classtype: this.classes[0].slug,
      airportsto: this.airports,

      state: {
        formsending: false,
        foundFlights: true,
      },
      modals: {
        main: false,
        date: false,
        airports: false,
        passengers: false,
      },
      counter: {
        adults: 1,
        childs: 0,
      },
    };
  },
  components: {
    Scroller,
    VueDatepicker,
    DropDown,
    LoadAnimation,
  },
  methods: {
    modal_ok_reload() {
      if (this.form_is_valid) {
        if (this.redirect_url) {
          window.location = this.redirect_url;
        } else {
          //location.reload();
        }
      }
      this.modals.main = false;
    },
    airports_modal(param) {
      this.$emit("show_airports_modal", param);
      this.modals.airports = true;
    },
    depature_selection(e) {
      this.airport_from = { city: e.name, iata: e.iata };
      if (!this.airport_to.iata) {
        this.airports_modal("to");
      }
    },
    return_selection(e) {
      this.airport_to = { city: e.name, iata: e.iata };
      if (!this.airport_from.iata) {
        this.airports_modal("from");
      }
    },
    airport_iata(airport) {
      if (airport.iata) {
        return airport.iata;
      }
      return "AIRPORT";
    },
    airport_city(airport) {
      if (airport.city) {
        return airport.city;
      }
      return "Not selected";
    },
    date_formatted(date) {
      if (date) {
        let date1 = new Date(date);
        let date2 = date1.toDateString().split(" ").slice(1);
        return date2[1] + " " + date2[0] + " " + date2[2];
      }
      return "Month";
    },
    shullfie_airports() {
      let from = this.airport_from;
      this.airport_from = this.airport_to;
      this.airport_to = from;
      this.$emit("shullfie_airports");
    },
    day_formatted(date) {
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      if (date) {
        let date1 = new Date(date);
        return days[date1.getDay()];
      }
      return "day";
    },
    close_date_popup(e) {
      this.date_depature = e.start;
      this.date_return = e.end;
      this.modals.date = false;
    },
    select_childs(number) {
      this.counter.childs = number;
    },
    select_adults(number) {
      this.counter.adults = number;
    },
    set_type(slug) {
      this.classtype = slug;
    },
    submitform(form) {
      if (!this.form_is_valid) {
        this.modals.main = true;
      } else {
        let data = {
          action: "srf_post_gen",
          start: this.airport_from.iata,
          destination: this.airport_to.iata,
          startDate: this.date_depature.replace(/\//g, "-"),
          endDate: this.date_return.replace(/\//g, "-"),
          classInfo: this.classtype,
          adult: this.counter.adults || 1,
          senior: this.counter.childs || 0,
          childrenAges: "",
          task: "postquery",
          name: "undefined",
          followupMail: "false",
        };
        data.payload =
          data.start +
          data.destination +
          data.startDate +
          data.endDate +
          data.classInfo +
          data.adult +
          data.senior;
        this.payload = data.payload;
        this.modals.main = true;
        this.state = { formsending: true, foundFlights: false };

        axios
          .post(this.actionurl, qs.stringify(data), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((response) => {
            if (response.data == "postgenerated") {
              this.state = { formsending: false, foundFlights: true };
              this.redirect_url = "/" + this.payload.toLowerCase();
            }
            if (response.data == "noflights") {
              this.state = { formsending: false, foundFlights: false };
              this.redirect_url = "";
            }
            console.log(response);
          });
      }
    },
  },
  computed: {
    form_is_valid() {
      return (
        this.airport_to.iata &&
        this.airport_from.iata &&
        this.date_depature &&
        this.date_return
      );
    },
    popup_message() {
      if (this.form_is_valid && !this.state.formsending) {
        if (!this.state.foundFlights) {
          return {
            class: "class-popup-error",
            title: "No Results",
            message:
              "Sorry, your flights are not found, please, try enter another data",
            okbtn: "Ok",
          };
        }
        return {
          class: "popup-success",
          title: "Thank you for your request!",
          message: "Press button below to view your flights",
          okbtn: "View flights",
        };
      } else {
        if (this.state.formsending) {
          return {
            class: "popup-success",
            title: "Your request is processing now",
            message: "Please, wait until processing will finish",
            okbtn: "",
          };
        }
        return {
          class: "class-popup-error",
          title: "Please, check your data",
          message: "One or more fields not entered propertly, please, check",
          okbtn: "Ok",
        };
      }
    },
  },
};
</script>