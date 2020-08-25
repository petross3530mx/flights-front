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
          :class="[{'modal-show':show_airports_modal}]"
          class="flights-modal"
          @click.self="show_airports_modal=false"
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
                    <span @click="show_airports_modal = false">Save</span>
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
          :class="{'modal-show':show_date_modal}"
          class="flights-modal"
          @click.self="show_date_modal=false"
        >
          <div>
            <VueDatepicker @confirm="close_date_popup" />
            <div class="savebtn-container">
              <span @click="choose_passengers_modal=false">Save</span>
            </div>
          </div>
        </div>
        <div class="flights-from" @click="show_date_modal=true">
          <span>Depatrure</span>
          <div id="flights-depature" :class="{'grayd': !date_depature}">
            <div class="date_formatted">{{date_formatted(date_depature)}}</div>
            <div class="date_day">{{day_formatted(date_depature)}}</div>
          </div>
        </div>
        <div class="flights-to" @click="show_date_modal=true">
          <span>Return</span>
          <div id="flights-return" :class="{'grayd': !date_return}">
            <div class="date_formatted">{{date_formatted(date_return)}}</div>
            <div class="date_day">{{day_formatted(date_return)}}</div>
          </div>
        </div>
      </div>

      <div class="passengers">
        <div
          @click.self="choose_passengers_modal=false"
          :class="{'modal-show':choose_passengers_modal}"
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
              <span @click="choose_passengers_modal=false">Save</span>
            </div>
          </div>
          <span @click="show_date_modal=false"></span>
        </div>

        <div class="adult">
          <span>Passengers</span>
          <div id="passengers-adults" @click="choose_passengers_modal=true">
            <div class="passengers-title">Adults</div>
            <div class="passengers-counter">{{counter_adults}}</div>
            <div class="passengers-description">12+ years</div>
          </div>
        </div>

        <div class="child">
          <span style="visibility: hidden;">Passengers</span>
          <div id="passengers-children" @click="choose_passengers_modal=true">
            <div class="passengers-title">Children</div>
            <div class="passengers-counter">{{counter_childs}}</div>
            <div class="passengers-description">2 - 12 years</div>
          </div>
        </div>
      </div>

      <div class="email_plus_terms">
        <span>E-mail</span>
        <div class="d-flx">
          <input
            type="email"
            name="email"
            v-model="email"
            class="form-email"
            :class="{'error': !email_is_valid}"
            @input="email_check"
            @blur="handleunfocus(false)"
            @focus="handleunfocus(true)"
            required
          />
        </div>
        <div
          class="email-validator-error"
          v-if="!email_is_valid && email_unfocused"
        >{{email_valid_msg}}</div>

        <p>Deine Ergebnisse sind in unter 5 Min. da.</p>
        <input type="checkbox" id="terms" />
        <label id="termslabel" for="terms">Ich mochte tolle Angebote erhalten</label>
      </div>
      <div class="submitcontainer">
        <input id="submitbtn" type="submit" class="submit" value="Search flight" />
      </div>
    </div>
    <div class="modal-block" :class="{'modal-show':modal_show}">
      <div class="popup" :class="popup_message.class">
        <div class="congrats-title" :class="popup_message.class">{{popup_message.title}}</div>
        <p>{{popup_message.message}}</p>
        <div class="okbtn" @click="modal_ok_reload">Ok</div>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import Scroller from "../components/Scroller";
import VueDatepicker from "../components/VueDatepicker";
import DropDown from "../components/DropDown";
export default {
  props: {
    id: {
      required: true,
    },
    redirect_url: {
      required: false,
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
    defaultemail: {
      required: false,
    },
    airports: {
      required: true,
    },
  },
  data() {
    return {
      email_unfocused: false,
      email_is_valid: true,
      email_valid_msg: "Email is not valid",
      modal_show: false,
      StartDate: undefined,
      EndDate: undefined,
      testEndDate: undefined,
      airport_from: false,
      airport_to: false,
      date_depature: null,
      date_return: null,
      show_airports_modal: null,
      counter_adults: 1,
      counter_childs: 0,
      choose_passengers_modal: false,
      show_date_modal: false,
      classtype: this.classes[0].slug,
      email: this.defaultemail,
      airportsto: this.airports,
    };
  },
  components: {
    Scroller,
    VueDatepicker,
    DropDown,
  },
  methods: {
    modal_ok_reload() {
      if (this.form_is_valid) {
        if (this.redirect_url) {
          window.location = this.redirect_url;
        } else {
          location.reload();
        }
      }
      this.modal_show = false;
    },
    email_check() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.email_is_valid = true;
        return true;
      } else {
        this.email_is_valid = false;
        return false;
      }
    },
    handleunfocus(focused) {
      if (focused) {
        this.email_unfocused = false;
      } else {
        this.email_unfocused = true;
      }
    },
    airports_modal(param) {
      this.$emit("show_airports_modal", param);
      this.show_airports_modal = true;
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
      this.show_date_modal = false;
    },
    select_childs(number) {
      this.counter_childs = number;
    },
    select_adults(number) {
      this.counter_adults = number;
    },
    set_type(slug) {
      this.classtype = slug;
    },
    submitform(form) {
      if (!this.form_is_valid) {
        this.modal_show = true;
      } else {
        let data = {
          action: "pao_flights_to_post_generation",
          start: this.airport_from.iata,
          destination: this.airport_to.iata,
          startDate: this.date_depature.replace(/\//g, "-"),
          endDate: this.date_return.replace(/\//g, "-"),
          classInfo: this.classtype,
          adult: this.counter_adults || 1,
          senior: this.counter_childs || 0,
          childrenAges: "",
          email: this.email,
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
        this.modal_show = true;
        axios.post(this.actionurl, data);
      }
    },
  },
  computed: {
    form_is_valid() {
      return (
        this.email_check() &&
        this.airport_to.iata &&
        this.airport_from.iata &&
        this.date_depature &&
        this.date_return
      );
    },
    popup_message() {
      if (this.form_is_valid) {
        return {
          class: "popup-success",
          title: "Thank you for your request!",
          message:
            "We will send you a mail in the next 2-3 minutes. Please check your mailbox.",
        };
      } else {
        return {
          class: "class-popup-error",
          title: "Please, check your data",
          message: "One or more fields not entered propertly, please, check",
        };
      }
    },
  },
};
</script>