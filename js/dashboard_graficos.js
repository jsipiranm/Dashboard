
let pointsChart;
let radarChart;
let barsChart;

function crear_graficos_dashboard(){
    let xyValues = [
        { x: 50, y: 7 },
        { x: 60, y: 8 },
        { x: 70, y: 8 },
        { x: 80, y: 9 },
        { x: 90, y: 9 },
        { x: 100, y: 9 },
        { x: 110, y: 10 },
        { x: 120, y: 11 },
        { x: 130, y: 14 },
        { x: 140, y: 14 },
        { x: 150, y: 15 },
      ];
    

      if (pointsChart) {
        pointsChart.destroy();
    }

      pointsChart=new Chart("myChart2", {
        type: "scatter",
        data: {
          datasets: [
            {
              pointRadius: 4,
              pointBackgroundColor: "rgba(0,0,255,1)",
              data: xyValues,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Chart.js Radar Chart",
            },
            legend: {
              display: false, //This will do the task
            },
          },
        },
      });
    
      // --------------------------------
    
      let marksCanvas = document.getElementById("myChart1");
    
      let marksData = {
        labels: [
          "Entorno económico",
          "Infraestructura",
          "Salud",
          "Educación",
          "Laboral",
          "Institucional",
        ],
        datasets: [
          {
            label: "Cumplimiento",
            backgroundColor: "rgba(200,0,0,0.2)",
            data: [50.85, 49.86,48.47, 49.57, 52.52, 50.65],
          },
        ],
      };
    
      if (radarChart) {
        radarChart.destroy();
    }


      radarChart = new Chart(marksCanvas, {
        type: "radar",
        data: marksData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Grado de avance",
            },
            legend: {
              display: false, //This will do the task
            },
          },
        },
      });
    
      // ----------------------------------------------------------------
    

fetch('../data/gerencias.json')
.then(response => response.json())
.then(data=>{
  console.log(data);
})



      let xValues = [
        "Gerencia 1",
        "Gerencia 2",
        "Gerencia 3",
        "Gerencia 4",
        "Gerencia 5",
      ];
      let yValues = [55, 49, 44, 24, 15];
      let barColors = [
        "rgba(221,12,75,0.8)",
        "rgba(200,0,0,0.2)",
        "rgba(76,178,76,0.8)",
        "rgba(76,178,178,0.8)",
        "rgba(178,178,76,0.8)",
      ];
    
      if (barsChart) {
        barsChart.destroy();
    }

     barsChart= new Chart("myChart3", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Top 5 en ejecución presupuestal",
            },
            legend: {
              display: false, //This will do the task
            },
          },
        },
      });
}


crear_graficos_dashboard();