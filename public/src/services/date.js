export default {
  fromNow (context, date) {
    const moment = context.$moment
    return moment(date, 'YYYY/M/D').fromNow()
  }
}
