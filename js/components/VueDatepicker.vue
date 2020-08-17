<template>
  <div :class="mobile.toLowerCase()" class="vhd-container">
    <div class="flghts-upblock">
      <div class="from-text">{{ fromText }}</div>
      <span v-if="selectStartDate" class="from-date">{{ displayDateText(selectStartDate) }}</span>
    </div>
    <div class="flghts-upblock">
      <div class="from-text">{{ toText }}</div>
      <span v-if="selectStartDate" class="from-date">{{ displayDateText(selectEndDate) }}</span>
    </div>

    <div class="fwvdp">
      <input
        v-model="value"
        :placeholder="placeholder"
        type="text"
        class="vhd-input"
        aria-label="vue-hotel-datepicker-input"
        @mousedown.prevent="toggle"
        @focus.prevent="toggle"
      />
      <div class="vhd-picker">
        <div class="vhd-calendar">
          <div class="vhd-calendar-header">
            <a class="close" @click="close">
              <div class="arrow arrow-close" style="width:24px; height:24px"></div>
            </a>
          </div>
          <div class="vhd-calendar-left">
            <div class="calendar-month">
              <a
                :class="disabledPreviousArrow(startMonthDate)"
                class="previous-arrow offset-2"
                @click="updateCalendar(-2)"
              >
                <div class="arrow arrow-back" style="width:24px; height:24px"></div>
              </a>
              <a
                :class="disabledPreviousArrow(startMonthDate)"
                class="previous-arrow offset-1"
                @click="updateCalendar(-1)"
              >
                <div class="arrow arrow-back" style="width:24px; height:24px"></div>
              </a>
              <div
                class="calendar-month-title"
              >{{ monthList[startMonthDate.getMonth()] }} {{ startMonthDate.getFullYear() }}</div>
              <a class="next-arrow offset-1" @click="updateCalendar(1)">
                <div class="arrow arrow-forward" style="width:24px; height:24px"></div>
              </a>
            </div>
            <div class="calendar-week">
              <div
                v-for="(wItem, index) in weekList"
                :key="index"
                class="calendar-week-item"
              >{{ wItem }}</div>
            </div>
            <div class="calendar-date">
              <div v-for="(week, wIndex) in startMonthAry" :key="wIndex" class="week">
                <div
                  v-for="(startDay, dIndex) in week"
                  :key="dIndex"
                  :class="dayStatus(startDay)"
                  class="day"
                  @click="dayOnClick(startDay)"
                >
                  <span v-if="startDay">{{ startDay.getDate() }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="vhd-calendar-right">
            <div class="calendar-month">
              <a class="next-arrow" @click="updateCalendar(2)">
                <div class="arrow arrow-forward" style="width:24px; height:24px"></div>
              </a>
              <div
                class="calendar-month-title"
              >{{ monthList[endMonthDate.getMonth()] }} {{ endMonthDate.getFullYear() }}</div>
            </div>
            <div class="calendar-week">
              <div
                v-for="(wItem, index) in weekList"
                :key="index"
                class="calendar-week-item"
              >{{ wItem }}</div>
            </div>
            <div class="calendar-date">
              <div v-for="(week, wIndex) in endMonthAry" :key="wIndex" class="week">
                <div
                  v-for="(endDay, dIndex) in week"
                  :key="dIndex"
                  :class="dayStatus(endDay)"
                  class="day"
                  @click="dayOnClick(endDay)"
                >
                  <span v-if="endDay">{{ endDay.getDate() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vhd-calendar-footer">
          <div v-if="selectStartDate || selectEndDate" class="reset" @click="reset">{{ resetText }}</div>
          <div
            v-if="selectStartDate && selectEndDate"
            class="confirm"
            @click="confirm"
          >{{ confirmText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VueDatepicker",
  directives: {},
  props: {
    placeholder: {
      type: String,
      default: "Select a date range",
    },
    separator: {
      type: String,
      default: "~",
    },
    format: {
      type: String,
      default: "YYYY/MM/DD",
    },
    startDate: {
      type: [String, Date],
      default: undefined,
    },
    endDate: {
      type: [String, Date],
      default: undefined,
    },
    minDate: {
      type: [String, Date],
      default: () =>
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          0,
          0,
          0
        ),
    },
    maxDate: {
      type: [String, Date, Boolean],
      default: false,
    },
    minNight: {
      type: Number,
      default: undefined,
    },
    maxNight: {
      type: Number,
      default: undefined,
    },
    selectForward: {
      type: Boolean,
      default: true,
    },
    disabledDates: {
      type: Array,
      default: () => [],
    },
    weekList: {
      type: Array,
      default: () => ["SU", "M", "TU", "W", "TH", "F", "SA"],
    },
    monthList: {
      type: Array,
      default: () => [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    fromText: {
      type: String,
      default: "Depature",
    },
    toText: {
      type: String,
      default: "Return",
    },
    resetText: {
      type: String,
      default: "Reset",
    },
    confirmText: {
      type: String,
      default: "Save",
    },
    mobile: {
      type: String,
      default: "", // mobile or desktop
    },
  },
  data() {
    return {
      value: "",
      active: false,
      startMonthDate: undefined,
      endMonthDate: undefined,
      selectStartDate: undefined,
      selectEndDate: undefined,
      selectMinDate: undefined,
      selectMaxDate: undefined,
      startMonthAry: [],
      endMonthAry: [],
      clickCount: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.minDate) {
      const minDateValue =
        typeof this.minDate === "string"
          ? this.minDate
          : this.minDate.getTime();
      this.selectMinDate = new Date(minDateValue);
    }
    if (this.maxDate) {
      const maxDateValue =
        typeof this.maxDate === "string"
          ? this.maxDate
          : this.maxDate.getTime();
      this.selectMaxDate = new Date(maxDateValue);
    }
    if (this.startDate) {
      const startDateValue =
        typeof this.startDate === "string"
          ? this.startDate
          : this.startDate.getTime();
      this.selectStartDate = new Date(startDateValue);
      if (
        this.selectMinDate &&
        this.selectMinDate.getTime() > this.selectStartDate.getTime()
      ) {
        this.selectMinDate = new Date(startDateValue);
      }
      if (!this.endDate) {
        this.selectEndDate = new Date(
          this.selectStartDate.getTime() + 24 * 60 * 60 * 1000
        );
      } else {
        const endDateValue =
          typeof this.endDate === "string"
            ? this.endDate
            : this.endDate.getTime();
        this.selectEndDate = new Date(endDateValue);
      }
      this.updateValue();
    }
    this.updateCalendar(); // after setting
  },
  mounted() {},
  methods: {
    toggle(e) {
      if (e.type === "focus") {
        this.active = true;
        return true;
      }
      this.active = !this.active;
    },
    close() {
      this.active = false;
      this.$emit("close");
    },
    reset() {
      this.selectStartDate = undefined;
      this.selectEndDate = undefined;
      this.value = "";
      this.$emit("reset");
    },
    confirm() {
      if (this.selectStartDate && !this.selectEndDate) {
        this.selectEndDate = new Date(this.selectStartDate.getTime());
        this.selectEndDate.setDate(this.selectStartDate.getDate() + 1);
        this.updateValue();
      }
      if (this.selectStartDate && this.selectEndDate) {
        const dateResult = {
          start: this.displayDateText(this.selectStartDate),
          end: this.displayDateText(this.selectEndDate),
        };
        this.$emit("confirm", dateResult);
        this.active = false;
      }
    },
    displayDateText(datetime) {
      if (datetime) {
        datetime = typeof datetime === "string" ? new Date(datetime) : datetime;
        const yyyy = datetime.getFullYear();
        const mm =
          datetime.getMonth() + 1 > 9
            ? datetime.getMonth() + 1
            : `0${datetime.getMonth() + 1}`;
        const dd =
          datetime.getDate() > 9
            ? datetime.getDate()
            : `0${datetime.getDate()}`;
        const displayStr = (this.format || "YYYY/MM/DD")
          .replace("YYYY", yyyy)
          .replace("MM", mm)
          .replace("DD", dd);
        return displayStr;
      } else {
        return undefined;
      }
    },
    generateCalendar(
      calculateYear = new Date().getFullYear(),
      calculateMonth = new Date().getMonth(),
      config = {}
    ) {
      const showPreviousMonthDate = config.showPreviousMonthDate || false;
      const showNextMonthDate = config.showNextMonthDate || false;
      const baseDateTime = new Date(calculateYear, calculateMonth, 1, 0, 0, 0);
      let countTime = new Date(calculateYear, calculateMonth, 1, 0, 0, 0);
      let tempMonthAry = [];
      let tempWeekAry = [];
      let nextMonth = false;
      let completed = false;
      while (!nextMonth || (nextMonth && !completed)) {
        let day = countTime.getDay();
        let date = countTime.getDate();
        let month = countTime.getMonth();
        // check next month
        if (month !== calculateMonth) {
          nextMonth = true;
          if (day === 6 || (date === 1 && day === 0)) {
            completed = true;
          }
        }
        // Set date
        if (!nextMonth) {
          tempWeekAry[day] = new Date(countTime.getTime()); // date obj
        } else {
          tempWeekAry[day] = showNextMonthDate
            ? new Date(countTime.getTime())
            : false;
        }
        // check previous
        if (countTime.getTime() === baseDateTime.getTime() && day !== 0) {
          // Fill previous
          let previousDay = day;
          let previousCountTime = new Date(countTime.getTime());
          previousCountTime.setDate(previousCountTime.getDate());
          if (showPreviousMonthDate) {
            while (previousDay !== 0) {
              // let previousDate = previousDateTime.getDate()
              let previousDateTime = new Date(previousCountTime.getTime());
              previousDay = previousDateTime.getDay();
              tempWeekAry[previousDay] = previousDateTime; // date obj
              previousCountTime.setDate(previousCountTime.getDate() - 1);
            }
          }
        }
        // check new week
        if (
          (countTime.getTime() === baseDateTime.getTime() &&
            tempWeekAry.length === 7) ||
          (countTime.getTime() > baseDateTime && day === 6)
        ) {
          // Next week
          tempMonthAry.push(tempWeekAry);
          tempWeekAry = [];
        }
        // calculate next day
        countTime.setDate(countTime.getDate() + 1);
      }
      return tempMonthAry;
    },
    updateCalendar(offset = 0) {
      if (!this.startMonthDate) {
        this.startMonthDate = this.selectStartDate
          ? new Date(this.selectStartDate.getTime())
          : new Date(new Date().getFullYear(), new Date().getMonth()); // now
      }
      this.startMonthDate.setMonth(this.startMonthDate.getMonth() + offset);
      this.endMonthDate = new Date(
        this.startMonthDate.getFullYear(),
        this.startMonthDate.getMonth() + 1
      );
      this.startMonthAry = [];
      this.endMonthAry = [];
      this.startMonthAry = this.generateCalendar(
        this.startMonthDate.getFullYear(),
        this.startMonthDate.getMonth()
      );
      this.endMonthAry = this.generateCalendar(
        this.endMonthDate.getFullYear(),
        this.endMonthDate.getMonth()
      );
    },
    updateValue() {
      this.value = `${this.displayDateText(this.selectStartDate)} ${
        this.separator
      } ${this.displayDateText(this.selectEndDate)}`;
    },
    disabledPreviousArrow(monthDatetime) {
      const now = new Date();
      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      if (monthDatetime && this.selectForward) {
        if (this.selectMinDate) {
          if (monthDatetime.getFullYear() < this.selectMinDate.getFullYear()) {
            return "disabled";
          }
          if (
            monthDatetime.getFullYear() === this.selectMinDate.getFullYear() &&
            monthDatetime.getMonth() <= this.selectMinDate.getMonth()
          ) {
            return "disabled";
          }
        } else {
          if (
            monthDatetime.getFullYear() === today.getFullYear() &&
            monthDatetime.getMonth() === today.getMonth()
          ) {
            return "disabled";
          }
        }
      }
    },
    dayStatus(datetime) {
      const classList = [];
      if (datetime) {
        const now = new Date();
        // const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        // check status
        if (this.selectMinDate.getTime() > datetime.getTime()) {
          classList.push("disabled");
        } else if (
          this.selectMaxDate &&
          this.selectMaxDate.getTime() < datetime.getTime()
        ) {
          classList.push("disabled");
        } else if (
          this.disabledDates.indexOf(this.displayDateText(datetime)) > -1
        ) {
          classList.push("disabled");
          classList.push("forbidden");
        } else if (
          this.selectStartDate &&
          this.selectStartDate.getTime() > datetime.getTime() &&
          !this.selectForward
        ) {
          classList.push("disabled");
        } else if (
          this.selectStartDate &&
          this.selectStartDate.getTime() === datetime.getTime()
        ) {
          classList.push("start-date");
        } else if (
          this.selectEndDate &&
          this.selectEndDate.getTime() === datetime.getTime()
        ) {
          classList.push("end-date");
        } else if (
          this.selectStartDate &&
          this.selectEndDate &&
          datetime.getTime() > this.selectStartDate.getTime() &&
          datetime.getTime() < this.selectEndDate.getTime()
        ) {
          classList.push("in-date-range");
        }
        // check min night and max night
        if (
          this.selectStartDate &&
          ((Number.isInteger(this.minNight) && this.minNight > 0) ||
            (Number.isInteger(this.maxNight) && this.maxNight > 0))
        ) {
          const night =
            Math.abs(datetime.getTime() - this.selectStartDate.getTime()) /
            (1000 * 60 * 60 * 24);
          if (night < this.minNight) {
            classList.push("disabled");
          } else if (night > this.maxNight) {
            classList.push("disabled");
          }
        }
        // check today
        if (
          now.getFullYear() === datetime.getFullYear() &&
          now.getMonth() === datetime.getMonth() &&
          now.getDate() === datetime.getDate()
        ) {
          classList.push("today");
        }
      }
      return classList;
    },
    dayOnClick(datetime) {
      if (datetime) {
        if (!this.selectStartDate) {
          this.selectStartDate = datetime;
        } else if (!this.selectEndDate) {
          if (
            this.selectStartDate &&
            datetime.getTime() < this.selectStartDate.getTime()
          ) {
            this.selectEndDate = this.selectStartDate;
            this.selectStartDate = datetime;
          } else {
            this.selectEndDate = datetime;
          }
        } else if (datetime.getTime() < this.selectStartDate.getTime()) {
          this.selectStartDate = datetime;
        } else if (datetime.getTime() > this.selectEndDate.getTime()) {
          this.selectEndDate = datetime;
        } else if (
          datetime.getTime() > this.selectStartDate.getTime() &&
          datetime.getTime() < this.selectEndDate.getTime()
        ) {
          if (this.clickCount % 2 === 0) {
            this.selectStartDate = datetime;
          } else {
            this.selectEndDate = datetime;
          }
          this.clickCount++;
        }
        // check maxNight
        if (this.selectStartDate && this.selectEndDate && this.maxNight) {
          const limitDate =
            this.selectStartDate.getTime() +
            this.maxNight * 1000 * 60 * 60 * 24;
          if (this.selectEndDate.getTime() > limitDate) {
            this.selectEndDate = new Date(limitDate);
          }
        }
        // check minNight
        if (this.selectStartDate && this.selectEndDate && this.minNight) {
          const limitDate =
            this.selectStartDate.getTime() +
            this.minNight * 1000 * 60 * 60 * 24;
          if (this.selectEndDate.getTime() < limitDate) {
            this.selectEndDate = new Date(limitDate);
          }
        }
        const dateResult = {
          start: this.displayDateText(this.selectStartDate),
          end: this.displayDateText(this.selectEndDate),
        };
        this.$emit("update", dateResult);
        if (this.selectStartDate && this.selectEndDate) {
          this.updateValue();
        }
      }
    },
  },
};
</script>
<style >
.fwvdp {
  grid-column: -1/1;
}
* {
  box-sizing: border-box;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
svg {
  fill: #7d7d7d;
}
@media (hover: hover) {
  svg:hover {
    fill: #4a4a4a;
  }
}

.vhd-container.mobile .vhd-picker {
  width: 300px;
  padding: 8px;
}
.vhd-container.mobile .vhd-calendar-header {
  height: 60px;
}

.vhd-container.mobile .vhd-calendar-left {
  width: 100%;
  margin-right: 0;
}
.vhd-container.mobile .vhd-calendar-right {
  display: none;
}
.vhd-container.mobile .vhd-calendar .calendar-month .previous-arrow.offset-2 {
  display: none;
}
.vhd-container.mobile .vhd-calendar .calendar-month .previous-arrow.offset-1 {
  display: inline-block;
}
.vhd-container.mobile .vhd-calendar .calendar-month .next-arrow.offset-1 {
  display: inline-block;
}
.vhd-container.mobile .vhd-calendar .calendar-date .week .day {
  width: calc(100% / 7);
}
.vhd-container.mobile .vhd-calendar .calendar-date .week .day.start-date {
  color: #fff;
  border-left: none;
  background-color: #08f;
  transition: all 0.2s ease;
}
.vhd-container.mobile .vhd-calendar .calendar-date .week .day.end-date {
  color: #fff;
  border-right: none;
  background-color: #08f;
  transition: all 0.2s ease;
}
.vhd-container {
  display: inline-block;
  position: relative;
}
.vhd-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.vhd-input {
  min-width: 300px;
  padding: 8px;
  border: solid 1px #eee;
  color: #505050;
  font-size: 16px;
  line-height: 32px;
  outline: none;
}
.vhd-input::placeholder {
  color: #ccc;
}
.vhd-picker {
  z-index: 100;
  position: absolute;
  left: 0;
  width: 100%;
  min-height: 420px;
  padding: 24px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.27);
  overflow: hidden;
}
.vhd-calendar-header {
  position: relative;
  width: 100%;
  height: 36px;
}

.vhd-calendar-header > a.close {
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.vhd-calendar-footer {
  position: relative;
  width: 100%;
  height: 36px;
}
.vhd-calendar-footer .reset,
.vhd-calendar-footer .confirm {
  position: absolute;
  bottom: 0;
  padding: 0 8px;
  cursor: pointer;
}

.vhd-calendar-footer .confirm {
  color: #2a2a2a;
  background: #50e3c2;
  padding: 4px 34px;
  border-radius: 21px;
  right: 0;
}
.vhd-calendar-footer .reset {
  left: 0;
  color: #7d7d7d;
}
@media (hover: hover) {
  .vhd-calendar-footer .reset:hover {
    color: #4a4a4a;
  }
}

@media (hover: hover) {
  .vhd-calendar-footer .confirm:hover {
    color: #005299;
  }
}
.vhd-calendar-left,
.vhd-calendar-right {
  display: inline-block;
  vertical-align: top;
  width: 280px;
}

.vhd-calendar .calendar-month {
  position: relative;
  height: 32px;
  margin-bottom: 8px;
}
.vhd-calendar .calendar-month .next-arrow,
.vhd-calendar .calendar-month .previous-arrow {
  position: absolute;
  top: 0;
  padding-top: 4px;
  cursor: pointer;
}
.vhd-calendar .calendar-month .next-arrow.disabled,
.vhd-calendar .calendar-month .previous-arrow.disabled {
  display: none !important;
}
.vhd-calendar .calendar-month .previous-arrow {
  left: 0;
}
.vhd-calendar .calendar-month .next-arrow {
  right: 0;
}
.vhd-calendar .calendar-month .previous-arrow.offset-1 {
  display: none;
}
.vhd-calendar .calendar-month .next-arrow.offset-1 {
  display: none;
}
.vhd-calendar .calendar-month-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #2c3135;
}
.vhd-calendar .calendar-week {
  width: 100%;
  height: 32px;
}
.vhd-calendar .calendar-week-item {
  float: left;
  display: inline-block;
  font-weight: 500;
  width: calc(100% / 7);
  height: 20px;
  text-align: left;
  font-size: 12px;
  color: #7f8fa4;
}
.vhd-calendar .calendar-date .week {
  display: block;
  width: 100%;
  height: 40px;
}
.vhd-calendar .calendar-date .week .day {
  float: left;
  margin: 1px 1px 0 0;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  color: #505050;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  text-align: left;

  line-height: 28px !important;
  padding-left: 5px;

  transition: background-color 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.vhd-calendar .calendar-date .week .day::before,
.vhd-calendar .calendar-date .week .day::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 100%;
  left: 0;
  background-color: transparent;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.vhd-calendar .calendar-date .week .day::after {
  left: auto;
  right: 0;
}
.vhd-calendar .calendar-date .week .day.disabled {
  color: #ececec;
  pointer-events: none;
}
.vhd-calendar .calendar-date .week .day.in-date-range {
  background-color: #edf2f5;
}
.vhd-calendar .calendar-date .week .day.start-date {
  position: relative;
  background-color: #4435d9;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.vhd-calendar .calendar-date .week .day.end-date {
  position: relative;
  background-color: #4435d9;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.vhd-calendar .calendar-date .week .day.today {
  border: solid 1px #08f;
}
.vhd-calendar .calendar-date .week .day.forbidden {
  color: #fed9d8;
  cursor: not-allowed;
}
</style>