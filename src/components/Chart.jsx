import React, { useEffect } from "react";
import { css } from "@emotion/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

// Importamos el hook
import UseWeek from "../hooks/useWeek";

const Chart = ({ tareas }) => {
  // Obtenemos los dias de la semana actual
  const weekDays = UseWeek(Date.now());

  // Construimos la data del gráfico con base en el numero de tareas terminadas en X día
  let data = [
    {
      name: moment(weekDays[0]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[0]).format("l")
      ).length,
    },
    {
      name: moment(weekDays[1]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[1]).format("l")
      ).length,
    },
    {
      name: moment(weekDays[2]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[2]).format("l")
      ).length,
    },
    {
      name: moment(weekDays[3]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[3]).format("l")
      ).length,
    },
    {
      name: moment(weekDays[4]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[4]).format("l")
      ).length,
    },
    {
      name: moment(weekDays[5]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[5]).format("l")
      ).length,
    },
    {
      name: moment(weekDays[6]).format("l"),
      tareas: tareas.filter(
        (tarea) =>
          moment(tarea.inicio).format("l") === moment(weekDays[6]).format("l")
      ).length,
    },
  ];

  // Volvemos a cargar el componente si hay más tareas terminadas
  useEffect(() => {}, [tareas]);

  return (
    <BarChart
      width={750}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="tareas"
        fill="#031d44"
        css={css`
          margin-top: 3rem;
        `}
      />
    </BarChart>
  );
};

export default Chart;
