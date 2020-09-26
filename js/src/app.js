import Vue from "vue";

Vue.config.devtools = true;

Vue.component(
  "form-component",
  require("../components/FormComponent.vue").default
);

var vm = new Vue({
  el: "#section_flights_to",
  data: {},
  mounted: function() {
    //console.log("mounted");
  },
});
