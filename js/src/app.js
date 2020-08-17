let flightsheader = document.querySelector("header.flights-to");
let flightsheader_burger = flightsheader.querySelector(".burger-container");

flightsheader_burger.addEventListener("click", function() {
  flightsheader.classList.toggle("open");
});

let flightsmain = document.querySelector("section.flights-to");

let flightsto_form = flightsmain.querySelector("#flights-to-form");

flightsto_form.addEventListener("submit", function(e) {
  e.preventDefault();
  let object = {};
  let formData = new FormData(this);
  formData.forEach(function(value, key) {
    object[key] = value;
  });
  console.log(object);
  flightsmain.classList.toggle("modal-show");
});

let okbtn = flightsmain.querySelector(".okbtn");

okbtn.addEventListener("click", function() {
  flightsmain.classList.toggle("modal-show");
});

//axios = require("axios");
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
    console.log("vue");
  },
});
