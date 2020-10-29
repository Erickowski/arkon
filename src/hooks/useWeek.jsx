import moment from "moment";

// Custom hook para obtener los dias de la semana
const UseWeek = (date) => {
  // Creamos un arreglo vacio
  const week = [];
  // Dependiendo de la fecha proporcionada es donde iniciara, begin marca el inicio de la semana
  const startOfPeriod = moment(date),
    begin = moment(startOfPeriod).isoWeekday(1);
  begin.startOf("isoWeek");
  // Con este bucle llenamos el array con los dias de la semana ordenados de L a D
  for (let i = 0; i < 7; i++) {
    week.push(begin.format());
    begin.add("d", 1);
  }
  return week;
};

export default UseWeek;
