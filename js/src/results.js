import Vue from "vue";

Vue.config.devtools = true;

Vue.component(
  "results-component",
  require("../components/ResultsComponent.vue").default
);

var vm = new Vue({
  el: "#section_flights_to",
  data: {},
  mounted: function() {
    console.log("mounted results");
  },
});
