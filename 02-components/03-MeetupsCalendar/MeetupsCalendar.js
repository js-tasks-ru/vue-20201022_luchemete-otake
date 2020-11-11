function getFirstDayOfMonth(year, month) {
  let firstDay = new Date(year, month, 1).getDay();

  return (firstDay === 0 ? 7 : firstDay) - 1;
}

function isSameDate(date, meetupDate) {
  return (
    meetupDate.getFullYear() === date.getFullYear() &&
    meetupDate.getMonth() === date.getMonth() &&
    meetupDate.getDate() === date.getDate()
  );
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year, month) {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
          <div>{{ localDate }}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in getCalendarDays" class="rangepicker__cell" :class="{rangepicker__cell_inactive : !day.isInMonth}">
          {{ day.date }}
          <a v-for="meetup in day.meetups" class="rangepicker__event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
  },
  computed: {
    localDate() {
      return new Date(this.year, this.month, 1).toLocaleString(
        navigator.language,
        {
          year: 'numeric',
          month: 'long',
        },
      );
    },
    getCalendarDays() {
      console.log('qwe');
      let days = daysInMonth(this.year, this.month);
      let firstDay = getFirstDayOfMonth(this.year, this.month);

      days += firstDay;
      if (days % 7) {
        days += 7 - (days % 7);
      }

      let calendarDays = [];
      let day = new Date(this.year, this.month, 1 - firstDay);
      while (days > 0) {
        calendarDays.push({
          date: day.getDate(),
          meetups: this.meetups.filter((meetup) => {
            const meetupDate = new Date(meetup.date);
            return isSameDate(day, meetupDate);
          }),
          isInMonth: day.getMonth() === this.month,
        });
        day.setDate(day.getDate() + 1);
        days -= 1;
      }
      return calendarDays;
    },
  },

  methods: {
    nextMonth() {
      this.changeMonth(this.month + 1);
    },
    prevMonth() {
      this.changeMonth(this.month - 1);
    },
    changeMonth(month){
      let newDate = new Date(this.year, month, 1);
      this.year = newDate.getFullYear();
      this.month = newDate.getMonth();
    },
  },
};
