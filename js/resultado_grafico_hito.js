let hito_avance_Chart;

// function grafica_pie(hito){

// let semaforo = [
//   { rango: 0, color: "#D3D3D3" },
//   { rango: 25, color: "#FF0000" },
//   { rango: 50, color: "#FFA500" },
//   { rango: 75, color: "#FFFF00" },
//   { rango: 100, color: "#008000" },
// ];

// document.getElementById('hito_name').innerHTML=hito.nombre

// let color_fondo = [];
// let valores=[];
// let ban=0;

// valores.push(hito.avance);
// valores.push(100-hito.avance);

// semaforo.forEach(el=>{
//   if(hito.avance<el.rango && ban==0){
//     color_fondo.push(el.color);
//     ban=1;
//   }
// })

// color_fondo.push(semaforo[0].color);

//     var ctx = document.getElementById("myChart").getContext("2d");

//     if (hito_avance_Chart) {
//         hito_avance_Chart.destroy();
//     }

//     hito_avance_Chart=new Chart(ctx, {
//       type: "doughnut",
//       data: {
//         datasets: [
//           {
//             data: valores,//[85, 15],
//             backgroundColor: color_fondo,
//             label: "Dataset 1",
//           },
//         ],
//         labels: ["Avance", "Por completar"],
//       },
//       options: {
//         responsive: true,
//         legend: {
//           display: false,
//           position: "right",
//         },
//         title: {
//           display: false,
//           fontSize: 15,
//           text: hito.nombre,
//         },
//         animation: {
//           animateScale: true,
//           animateRotate: true,
//         },
//         plugins: {
//           doughnutlabel: {
//             labels: [

//               {
//                 text: "Avance",
//                 font: {
//                   size: "50",
//                 },
//                 color: "grey",
//               },
//               {
//                 text: hito.avance+"%",
//                 font: {
//                   size: "45",
//                 },
//                 color: "green",
//               },
//             ],
//           },
//         },
//       },
//     });
//   }

function grafica_pie(hito) {
  let semaforo = [
    { rango: 0, color: "#566573" },
    { rango: 25, color: "#FF0000" },
    { rango: 50, color: "#FFA500" },
    { rango: 75, color: "#FFFF00" },
    { rango: 100, color: "#008000" },
  ];

  let color_fondo = [];
  let valores = [];
  let ban = 0;

  valores.push(hito.avance);
  valores.push(100 - hito.avance);

  semaforo.forEach((el) => {
    if (hito.avance <= el.rango && ban == 0) {
      color_fondo.push(el.color);
      ban = 1;
    }
  });

  color_fondo.push(semaforo[0].color);

  var my_chart = document.getElementById("myChart");

  var data_hito = {
    labels: ["Avance", "Por completar"],
    datasets: [
      {
        data: valores,
        backgroundColor: color_fondo,
        datalabels:{
          color:'white',
          backgroundColor: '#004a80',
          padding: 6,
          borderRadius: 15,
          formatter:function(value,context){
            return context.chart.data.datasets[0].data[context.dataIndex] + "%";
          }
        }
      },
    ],
    options: {
      responsive: true,
    },
  };

  if (hito_avance_Chart) {
    hito_avance_Chart.destroy();
  }

  var hito_avance_Chart = new Chart(my_chart, {
    plugins: [ChartDataLabels],
    type: "doughnut",
    data: data_hito,
  });
}
