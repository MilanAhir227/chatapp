import moment from "moment";

export function isToday(date) {
  return moment(date).isSame(moment(), "day");
}

export function isTomorrow(date) {
  return moment(date).isSame(moment().add(1, "day"), "day");
}
