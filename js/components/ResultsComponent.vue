<template>
  <div class="cube_container" :style="{height:cubeHeight + 'px'}">
    <div :class="{'detailed': showDetails}" class="cube">
      <div class="side front" ref="sidefront">
        <div class="flights-results results-airports bg-white flight-airports">
          <div class="results-dashboard-head uppercase">
            <div>Direction</div>
            <div class="green-text">Saving</div>
            <div>End PRICE</div>
          </div>
          <div v-if="originalRoute" class="results-table">
            <div class="result-item grid-flights">
              <div class="bold">
                <span class="airport-span">{{originalRoute.from}}</span>
                <span class="span-arrow-right"></span>
                <span class="airport-span">{{originalRoute.to}}</span>
              </div>
              <div class="center green-text bold">--</div>
              <div class="center bold">{{priceFormat(originalRoute.bestOffer)}}</div>
              <div class="details-btn bold uppercase">
                <a href="#" @click.prevent="showflight(originalRoute)">details</a>
              </div>
            </div>
          </div>
          <div class="bg-green white-text uppercase save-notice">Start here to SAVE {{bestSaving}}€:</div>
          <div class="results-table">
            <div v-for="flight in flightRoute" class="result-item grid-flights">
              <div class="bold">
                <span class="airport-span">{{flight.from}}</span>
                <span class="span-arrow-right"></span>
                <span class="airport-span">{{flight.to}}</span>
              </div>
              <div
                :class="{'green-text':calculateSaving(flight.bestOffer) > 0}"
                class="center bold"
              >{{priceFormat(calculateSaving(flight.bestOffer))}}</div>
              <div class="center bold">{{priceFormat(flight.bestOffer)}}</div>
              <div class="details-btn bold uppercase">
                <a href @click.prevent="showflight(flight)">details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="side right" ref="sideright">
        <div v-if="selectedWay" class="flights-results results-desktop bg-white">
          <div class="table-content">
            <div class="flights-tabs-body">
              <div class="flights-list">
                <div class="flights-item-button">
                  <a href="#" @click.prevent="showAirports()">Check all departing airports</a>
                </div>
                <div v-for="offer in selectedWay.offerList" class="flights-item">
                  <div class="head-row">
                    <div class="row-top grided-with-line">
                      <div class="grid_line">
                        <div class="grid-lefted">
                          <div>
                            <span class="purple-span">{{getDate(offer.flightTo.departureDate)}}</span>
                            {{getTimeSet(offer.flightFrom.departureTime, offer.flightFrom.arrivalTime)}}
                          </div>
                          <div>{{selectedWay.from}} - {{selectedWay.to}}</div>
                          <div>{{getAirlines(offer.flightFrom.airlines)}}</div>
                        </div>
                        <div class="grid-righted">
                          <div>{{getStopsDirectLabel(offer.flightFrom.stops)}}</div>
                          <div>{{getDurationLabel(offer.flightFrom.flightDuration)}}</div>
                        </div>
                        <div class="grid-lefted">
                          <div>
                            <span class="purple-span">{{getDate(offer.flightFrom.departureDate)}}</span>
                            {{getTimeSet(offer.flightTo.departureTime, offer.flightTo.arrivalTime)}}
                          </div>
                          <div>{{selectedWay.to}} - {{selectedWay.from}}</div>
                          <div>{{getAirlines(offer.flightTo.airlines)}}</div>
                        </div>
                        <div class="grid-righted">
                          <div>{{getStopsDirectLabel(offer.flightTo.stops)}}</div>
                          <div>{{getDurationLabel(offer.flightTo.flightDuration)}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="subtotal_cost">$1150</div>
                        <div class="coster">eBookers</div>
                      </div>
                    </div>
                    <div class="row-bottom grided-with-line">
                      <div>
                        Direktflug Frankfurt am Main nach
                        Gasselterboerveenschemond
                      </div>
                      <div>$80</div>
                    </div>
                  </div>
                  <div class="footer-row">
                    <div class="mobile-only-flights">
                      <span
                        :class="{'green-text': calculateSaving(offer.routePrice) > 0, 'red-text': calculateSaving(offer.routePrice) < 0  }"
                        class="bold uppercase"
                      >{{SaveLostText(calculateSaving(offer.routePrice) )}}</span>
                      <span
                        v-if="calculateSaving(offer.routePrice) != 0"
                        :class="{'green-text': calculateSaving(offer.routePrice) > 0, 'red-text': calculateSaving(offer.routePrice) < 0  }"
                        class="bold uppercase"
                      >{{Math.abs(calculateSaving(offer.routePrice))}} {{offer.currencySymbol}}</span>
                      <a
                        href="#"
                        class="check_airports_from_details"
                        @click.prevent="showAirports()"
                      >Check all airports</a>
                    </div>
                    <div>
                      <div class="gray-styled">Summe</div>
                      <span>{{priceFormat(offer.routePrice)}}</span>
                      <a target="_blank" :href="offer.affiliateLink">details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    flightsdata: {
      required: false,
    },
    ids: {
      required: true,
    },
    postid: {
      required: true,
    },
  },
  data() {
    return {
      bestSaving: 0,
      selectedWay: null,
      flightRoute: null,
      originalRoute: null,
      showDetails: false,
      currentDetails: null,
    };
  },
  computed: {
    cubeHeight() {
      if (this.flightRoute) {
        return 55 * this.flightRoute.length + 150;
      }
    },
  },
  methods: {
    async request(url, method = "GET", data = null) {
      try {
        const headers = {};
        let body;

        if (data) {
          headers["Content-Type"] = "Application/json";
          body = JSON.stringify(data);
        }

        const response = await fetch(url, {
          method,
          headers,
          body,
        });

        return response.json();
      } catch (e) {
        console.warn("Error", e.message);
      }
    },
    SaveLostText(price) {
      let priceParsed = parseInt(price);
      console.log(priceParsed);
      if (priceParsed > 0) {
        return "Save";
      } else if (priceParsed == 0) {
        return "No save";
      } else {
        return "Lost:";
      }
    },
    priceFormat(priceString = "0 EUR", currencySymbol = "€") {
      return parseInt(priceString) + currencySymbol;
    },
    getDate(formatted) {
      return formatted.substring(5, 10).replace("-", ".");
    },
    getTimeSet(depature, arrive) {
      return depature.substring(11, 16) + " - " + arrive.substring(11, 16);
    },
    getAirlines(airlist) {
      let uniqueItems = [...new Set(airlist)];

      return uniqueItems.join(" + ");
    },
    getDurationLabel(duration) {
      let time = duration.split(":");
      return time[0] + "h" + " " + time[1] + "m";
    },
    getStopsDirectLabel(stops) {
      if (stops < 1) {
        return "Direkt";
      } else if (stops == 1) {
        return "1 stop";
      } else {
        return stops + " stops";
      }
    },
    showflight(flight) {
      this.showDetails = true;
      this.selectedWay = flight;
    },
    showAirports() {
      this.showDetails = false;
    },
    calculateSaving(bestOffer) {
      let difference =
        parseInt(this.originalRoute.bestOffer) - parseInt(bestOffer);
      if (difference > this.bestSaving) {
        this.bestSaving = difference;
      }
      return difference;
    },
  },
  async mounted() {
    if (this.flightsdata) {
      console.log(JSON.parse(this.flightsdata));
    }
    let parsed = await this.request(
      `/wp-json/flights/v1/getflight/${this.ids}/${this.postid}`
    );
    this.flightRoute = parsed.flightRoute;
    this.originalRoute = parsed.originalRoute;
  },
};
</script>
 