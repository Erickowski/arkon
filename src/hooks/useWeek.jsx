import moment from "moment";

const UseWeek = (date) => {
  const week = [];
  const startOfPeriod = moment(date),
    begin = moment(startOfPeriod).isoWeekday(1);
  begin.startOf("isoWeek");
  for (let i = 0; i < 7; i++) {
    week.push(begin.format());
    begin.add("d", 1);
  }
  return week;
};

export default UseWeek;
