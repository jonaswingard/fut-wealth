export default {
  fromNow: function (context, date) {
    const moment = context.$moment
    return moment(date, 'jYYYY/jM/jD').fromNow()
  }
}
