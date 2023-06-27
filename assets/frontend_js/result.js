const oose = parseInt(document.getElementById("oose").innerText);
const os = parseInt(document.getElementById("os").innerText);
const jp = parseInt(document.getElementById("jp").innerText);
const pqt = parseInt(document.getElementById("pqt").innerText);
const daa = parseInt(document.getElementById("daa").innerText);
const dbms = parseInt(document.getElementById("dbms").innerText);
const xValues = ["OOSE", "OS", "JP", "PQT", "DAA", "DBMS"];
const yValues = [oose, os, jp, pqt, daa, dbms];
const barColors = [
  oose >= 35 ? "lightgreen" : "tomato",
  os >= 35 ? "lightgreen" : "tomato",
  jp >= 35 ? "lightgreen" : "tomato",
  pqt >= 35 ? "lightgreen" : "tomato",
  daa >= 35 ? "lightgreen" : "tomato",
  dbms >= 35 ? "lightgreen" : "tomato",
];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        // borderColor: "black",
        data: yValues,
        label: "Semester result",
        borderWidth: 2,
      },
    ],
  },
  options: {},
});
