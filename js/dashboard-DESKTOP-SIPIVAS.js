if (sessionStorage.getItem("usuario_bsc") == null) {
  location.href = "../index.html";
}

// console.log(sessionStorage.getItem('usuario_bsc'));

document.querySelector(".header_user_name").innerHTML =
  sessionStorage.getItem("usuario_bsc");

let urls = [
  { url: "../data/pilares.json", nombre: "Pilar Estratégico" },
  { url: "../data/gerencias.json", nombre: "Gerencia" },
  { url: "../data/proyectos.json", nombre: "Proyecto" },
  { url: "../data/hitos.json", nombre: "Hito" },
];

function get_variable_css(variable_css) {
  let r = document.querySelector(":root");
  let rs = getComputedStyle(r);
  return rs.getPropertyValue(variable_css);
}

function NumerosAleatorios(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generarLetra() {
  var letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  var numero = (Math.random() * 15).toFixed(0);
  return letras[numero];
}

function colorHEX() {
  var coolor = "";
  for (var i = 0; i < 6; i++) {
    coolor = coolor + generarLetra();
  }
  return "#" + coolor;
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function get_setting_view() {
  return localStorage.getItem("tipo_vista");
}

function compara(a, b) {
  let comparison = 0;
  if (a.avance > b.avance) {
    comparison = -1;
  } else if (a.avance < b.avance) {
    comparison = 1;
  }
  return comparison;
}

function crear_card(el) {
  let color_asignado = get_variable_css(
    el.avance <= 25
      ? "--color-25"
      : el.avance <= 50
      ? "--color-50"
      : el.avance <= 75
      ? "--color-75"
      : "--color-100"
  );

  let level = localStorage.getItem("level_result")
    ? localStorage.getItem("level_result")
    : "pilares";

  console.log(level);

  let div_card = document.createElement("div");
  div_card.className = "card";
  div_card.setAttribute("data-id", level + "_" + el.id); //! cambiar por un switch para que  el id cambie segun el tipo
  div_card.style.borderLeftColor = color_asignado;
  div_card.addEventListener("click", function (e) {
    let id_nivel = this.getAttribute("data-id").split("_")[1];
    let nivel = this.getAttribute("data-id").split("_")[0];

    switch (nivel) {
      case "pilares":
        localStorage.setItem("id_pilar", id_nivel);
        localStorage.setItem("level_result", "gerencias");
        break;
      case "gerencias":
        localStorage.setItem("id_gerencia", id_nivel);
        localStorage.setItem("level_result", "proyectos");
        break;
      case "proyectos":
        localStorage.setItem("id_proyecto", id_nivel);
        localStorage.setItem("level_result", "hitos");
        break;
      case "hitos":
        localStorage.setItem("id_hito", id_nivel);
        localStorage.setItem("level_result", "hito");
        break;
      case "hito":
        localStorage.setItem("id_hito", id_nivel);
        localStorage.setItem("level_result", "hito");
        break;
    }

    obtener_resultados(get_setting_view());
  });

  let div_card_header = document.createElement("div");
  div_card_header.className = "card-header";

  let h5 = document.createElement("h5");
  h5.innerHTML = el.nombre;
  let span = document.createElement("span");
  span.innerHTML = el.avance + "%";

  div_card_header.appendChild(h5);
  div_card_header.appendChild(span);

  let div_card_body = document.createElement("div");
  div_card_body.className = "card-body";

  let div_progress = document.createElement("div");
  div_progress.className = "progress";

  let div_progress_bar = document.createElement("div");
  div_progress_bar.className = "progress-bar";
  div_progress_bar.style.width = el.avance + "%";
  div_progress_bar.style.background = color_asignado;

  div_progress.appendChild(div_progress_bar);
  div_card_body.appendChild(div_progress);

  div_card.appendChild(div_card_header);
  div_card.appendChild(div_card_body);

  return div_card;
}

function mostrar_grid(data) {
  document.querySelector(".contenedor_table").innerHTML = "";
  let contenedor = document.querySelector(".contenedor_grid");
  contenedor.innerHTML = "";

  data.forEach((el) => {
    contenedor.appendChild(crear_card(el));
  });
}

function crear_row(el) {
  let color_asignado = get_variable_css(
    el.avance <= 25
      ? "--color-25"
      : el.avance <= 50
      ? "--color-50"
      : el.avance <= 75
      ? "--color-75"
      : "--color-100"
  );

  let tr = document.createElement("tr");

  let td_gerencia = document.createElement("td");
  td_gerencia.innerHTML = el.nombre;

  let td_avance = document.createElement("td");
  td_avance.className = "avance";

  let div_progress = document.createElement("div");
  div_progress.className = "progress";

  let div_progress_bar = document.createElement("div");
  div_progress_bar.className = "progress-bar";
  div_progress_bar.style.width = el.avance + "%";
  div_progress_bar.style.backgroundColor = color_asignado;

  td_avance.appendChild(div_progress);
  div_progress.appendChild(div_progress_bar);

  let td_porcentaje = document.createElement("td");
  td_porcentaje.className = "td_centrado";

  let i_circle = document.createElement("i");
  i_circle.className = "fas fa-circle";
  i_circle.style.color = color_asignado;

  let span_porc = document.createElement("span");
  span_porc.innerHTML = el.avance + "%";
  // td_porcentaje.innerHTML = el.avance + "%";

  td_porcentaje.appendChild(i_circle);

  td_porcentaje.appendChild(span_porc);

  //<i class="fas fa-circle"></i>

  let td_acciones = document.createElement("td");

  let btn_accion = document.createElement("button");
  btn_accion.innerHTML = "Ver detalle";
  btn_accion.classList.add("btn");
  btn_accion.addEventListener("click", function (e) {
    switch (tipo_data) {
      case "o":
        location.href = "../pages/gerencias.html?id_o=" + el.id;
        break;
      case "g":
        location.href =
          "../pages/proyectos.html?id_o=" + id_o + "&id_g=" + el.id;
        break;
      case "p":
        location.href =
          "../pages/hitos.html?id_o=" +
          id_o +
          "&id_g=" +
          id_g +
          "&id_p=" +
          el.id;
        break;
      case "h":
        location.href =
          "../pages/hito.html?id_o=" +
          id_o +
          "&id_g=" +
          id_g +
          "&id_p=" +
          id_p +
          "&id_h=" +
          el.id;
        break;
    }
  });

  td_acciones.appendChild(btn_accion);

  tr.appendChild(td_gerencia);
  tr.appendChild(td_avance);
  tr.appendChild(td_porcentaje);
  tr.appendChild(td_acciones);

  return tr;
}

function mostrar_table(data, base_nombre) {
  document.querySelector(".contenedor_grid").innerHTML = "";
  let contenedor = document.querySelector(".contenedor_table");
  contenedor.innerHTML = "";
  contenedor.style.visibility = "visible";

  let d_resp = document.createElement("div");
  d_resp.className = "table-responsive";

  contenedor.appendChild(d_resp);

  let table = document.createElement("table");
  d_resp.appendChild(table);

  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  let tr_head = document.createElement("tr");

  let th_gerencia = document.createElement("th");
  th_gerencia.innerHTML = base_nombre;

  let th_avance = document.createElement("th");
  th_avance.innerHTML = "Avance";
  th_avance.className = "avance";

  let th_porcentaje = document.createElement("th");
  th_porcentaje.innerHTML = "Porcentaje";
  th_porcentaje.classList.add("porcentaje");
  th_porcentaje.classList.add("td_centrado");

  let th_acciones = document.createElement("th");
  th_acciones.innerHTML = "Acciones";
  th_acciones.classList.add("td_centrado");

  tr_head.appendChild(th_gerencia);
  tr_head.appendChild(th_avance);
  tr_head.appendChild(th_porcentaje);
  tr_head.appendChild(th_acciones);

  thead.appendChild(tr_head);

  data.forEach((el) => {
    tbody.appendChild(crear_row(el));
  });
}

function activa_grid(id_padre, url_current) {
  document.querySelector("#toggle_show").checked = false;

  fetch(url_current)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let data_filtered = data;
      if (id_padre !== 0) {
        data_filtered = data.filter((el) => el.id_padre == id_padre);
      }

      mostrar_grid(data_filtered.sort(compara));
    })
    .catch((error) => console.log(error));

  localStorage.setItem("tipo_vista", "grid");
}

function activa_tabla(id_padre, url_current, base_nombre) {
  document.querySelector("#toggle_show").checked = true;
  fetch(url_current)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      let data_filtered = data;
      if (id_padre !== 0) {
        data_filtered = data.filter((el) => el.id_padre == id_padre);
      }
      mostrar_table(data_filtered.sort(compara), base_nombre);
    })
    .catch((error) => console.log(error));

  localStorage.setItem("tipo_vista", "table");
}

let view_type = get_setting_view();
// console.log(view_type);

if ([null, "", "grid"].includes(view_type)) {
  document.querySelector("#toggle_show").checked = false;
  // activa_grid();
} else {
  document.querySelector("#toggle_show").checked = true;
  // activa_tabla();
}

let show_grid = document.querySelector(".fa-th");
show_grid.addEventListener("click", function () {
  // activa_grid();
  obtener_resultados("grid");
  document.querySelector("#toggle_show").checked = false;
  localStorage.setItem("tipo_vista", "grid");
});

let show_table = document.querySelector(".fa-align-justify");
show_table.addEventListener("click", function () {
  // activa_tabla();
  obtener_resultados("table");
  document.querySelector("#toggle_show").checked = true;
  localStorage.setItem("tipo_vista", "table");
});

let toggle_show = document.querySelector("#toggle_show");
toggle_show.addEventListener("change", function () {
  // obtener_resultados( get_setting_view());

  if (this.checked) {
    // activa_tabla();
    obtener_resultados("table");
    document.querySelector("#toggle_show").checked = true;
    localStorage.setItem("tipo_vista", "table");
  } else {
    // activa_grid();
    obtener_resultados("grid");
    document.querySelector("#toggle_show").checked = false;
    localStorage.setItem("tipo_vista", "grid");
  }
  // console.log("se ejecuto");
});






function obtener_resultados(tipo_vista) {
  let nivel = localStorage.getItem("level_result");

  switch (nivel) {
    case "gerencias":
      fetch("../data/pilares.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let pilar = data.filter(el=>el.id==localStorage.getItem("id_pilar"))[0];
          
          let boton = document.createElement('button');
          boton.className="btn_sup";
          boton.setAttribute('data-id','0');
          boton.setAttribute('data-level','0');
          boton.innerHTML = "Inicio";

          

        document.querySelector("#titulo").innerHTML = "<span class='btn_sup' data-id='0' data-level='0'>Inicio</span> / " +pilar.nombre  + " (" + pilar.avance+"%)" ;
        document.querySelector("#titulo_mobile").innerHTML = "<span class='btn_sup' data-id='0' data-level='0'>Inicio</span> / " +pilar.nombre  + " (" + pilar.avance+"%)" ;
        })
        .catch((error) => console.error(error));

      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(localStorage.getItem("id_pilar"), urls[1].url);
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(
          localStorage.getItem("id_pilar"),
          urls[1].url,
          urls[1].nombre
        );
        document.querySelector(".contenedor_table").style.display = "block";
        document.querySelector(".contenedor_grid").style.display = "none";
      }
      break;
    case "proyectos":
      Promise.all([
        fetch('../data/pilares.json'),
        fetch('../data/gerencias.json')
      ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        // console.log(data);
        let pilar = data[0].filter(el=>el.id==localStorage.getItem("id_pilar"))[0];
        let gerencia = data[1].filter(el=>el.id==localStorage.getItem("id_gerencia"))[0];
    
        document.querySelector("#titulo").innerHTML = "<span class='btn_sup' data-id='0' data-level='0'>Inicio</span> / <span class='btn_sup' data-id='"+pilar.id+"' data-level='pilares'>" +pilar.nombre + "</span> / " + gerencia.nombre + " (" + gerencia.avance+"%)" ;
        document.querySelector("#titulo_mobile").innerHTML = "<span class='btn_sup' data-id='0' data-level='0'>Inicio</span> / " +pilar.nombre + " / " + gerencia.nombre + " (" + gerencia.avance+"%)" ;
    
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });



      
      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(localStorage.getItem("id_gerencia"), urls[2].url);
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(
          localStorage.getItem("id_gerencia"),
          urls[2].url,
          urls[2].nombre
        );
        document.querySelector(".contenedor_table").style.display = "block";
        document.querySelector(".contenedor_grid").style.display = "none";
      }
      break;
    case "hitos":
      break;

    case "hito":
      break;
    default:
      document.querySelector("#titulo").innerHTML = "Pilares Estratégicos";
      document.querySelector("#titulo_mobile").innerHTML =
        "Pilares Estratégicos";
      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(0, urls[0].url);
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(0, urls[0].url, urls[0].nombre);
        document.querySelector(".contenedor_table").style.display = "block";
        document.querySelector(".contenedor_grid").style.display = "none";
      }
      break;
  }
}




function reset_active() {
  let list_opcion_menu = document.querySelectorAll(".opcion_menu");
  list_opcion_menu.forEach((el) => {
    el.classList.remove("active");
  });
}

function reset_contenido_active() {
  let list_cont_princ = document.querySelectorAll(".cont_princ");
  list_cont_princ.forEach((el) => {
    el.classList.remove("active");
  });
}

let list_opcion_menu = document.querySelectorAll(".opcion_menu");
list_opcion_menu.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    reset_active();
    reset_contenido_active();

    document.querySelector("#titulo_activo").innerHTML =
      this.children[0].children[1].innerHTML;

    this.classList.add("active");

    let id_menu = this.getAttribute("data-id").split("_")[1];
    // console.log(id_menu);
    // console.log(document.querySelector('#art_'+id_menu));
    document.querySelector("#art_" + id_menu).classList.add("active");
    // document.querySelector('#art_'+id_menu).innerHTML ="";
    switch (id_menu) {
      case "dashboard":
        crear_graficos_dashboard();
        break;
      case "resultados":
        // console.log(view_type);
        obtener_resultados(get_setting_view());
        break;
    }

    // console.log(this.getAttribute('data-id').split("_")[1]);
  });
});

let salir = document.querySelector(".fa-sign-out-alt");
salir.addEventListener("click", function (e) {
  Swal.fire({
    title: "Notificación",
    text: "¿Esta seguro que desea cerrar la sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Salir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem("usuario_bsc");
      location.href = "../index.html";
    }
  });
});




