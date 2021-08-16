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
  return sessionStorage.getItem("tipo_vista");
}

function get_setting_view_ejecppo() {
  return sessionStorage.getItem("tipo_vista_ejecppo");
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

function compara_ejecppo(a, b) {
  let comparison = 0;
  if (a.ejecucion_ppo > b.ejecucion_ppo) {
    comparison = -1;
  } else if (a.ejecucion_ppo < b.ejecucion_ppo) {
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

  let level = sessionStorage.getItem("level_result")
    ? sessionStorage.getItem("level_result")
    : "pilares";

  console.log(level);

  let div_card = document.createElement("div");
  div_card.className = "card";
  div_card.setAttribute("data-id", level + "_" + el.id); 
  div_card.style.borderLeftColor = color_asignado;
  div_card.addEventListener("click", function (e) {
    let id_nivel = this.getAttribute("data-id").split("_")[1];
    let nivel = this.getAttribute("data-id").split("_")[0];

    switch (nivel) {
      case "pilares":
        sessionStorage.setItem("id_pilar", id_nivel);
        sessionStorage.setItem("level_result", "gerencias");
        break;
      case "gerencias":
        sessionStorage.setItem("id_gerencia", id_nivel);
        sessionStorage.setItem("level_result", "proyectos");
        break;
      case "proyectos":
        sessionStorage.setItem("id_proyecto", id_nivel);
        sessionStorage.setItem("level_result", "hitos");
        break;
      case "hitos":
        sessionStorage.setItem("id_hito", id_nivel);
        sessionStorage.setItem("level_result", "hito");
        break;
      case "hito":
        sessionStorage.setItem("id_hito", id_nivel);
        sessionStorage.setItem("level_result", "hito");
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

  let level = sessionStorage.getItem("level_result")
    ? sessionStorage.getItem("level_result")
    : "pilares";

  console.log(level);

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
  btn_accion.setAttribute("data-id", level + "_" + el.id);
  btn_accion.classList.add("btn");
  btn_accion.addEventListener("click", function (e) {
    let id_nivel = this.getAttribute("data-id").split("_")[1];
    let nivel = this.getAttribute("data-id").split("_")[0];

    switch (nivel) {
      case "pilares":
        sessionStorage.setItem("id_pilar", id_nivel);
        sessionStorage.setItem("level_result", "gerencias");
        break;
      case "gerencias":
        sessionStorage.setItem("id_gerencia", id_nivel);
        sessionStorage.setItem("level_result", "proyectos");
        break;
      case "proyectos":
        sessionStorage.setItem("id_proyecto", id_nivel);
        sessionStorage.setItem("level_result", "hitos");
        break;
      case "hitos":
        sessionStorage.setItem("id_hito", id_nivel);
        sessionStorage.setItem("level_result", "hito");
        break;
      case "hito":
        sessionStorage.setItem("id_hito", id_nivel);
        sessionStorage.setItem("level_result", "hito");
        break;
    }

    obtener_resultados(get_setting_view());
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
  // contenedor.style.visibility = "visible";

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

  sessionStorage.setItem("tipo_vista", "grid");
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

  sessionStorage.setItem("tipo_vista", "table");
}

// let view_type = get_setting_view();
// console.log(get_setting_view());

if ([null, "", "grid"].includes(get_setting_view())) {
  document.querySelector("#toggle_show").checked = false;
  // activa_grid();
} else {
  document.querySelector("#toggle_show").checked = true;
  // activa_tabla();
}

if ([null, "", "grid"].includes(get_setting_view_ejecppo())) {
  document.querySelector("#toggle_show_ejecppo").checked = false;
  // activa_grid();
} else {
  document.querySelector("#toggle_show_ejecppo").checked = true;
  // activa_tabla();
}

let show_grid = document.querySelector(".fa-th");
show_grid.addEventListener("click", function () {
  // activa_grid();
  obtener_resultados("grid");
  document.querySelector("#toggle_show").checked = false;
  sessionStorage.setItem("tipo_vista", "grid");
});

let show_table = document.querySelector(".fa-align-justify");
show_table.addEventListener("click", function () {
  // activa_tabla();
  obtener_resultados("table");
  document.querySelector("#toggle_show").checked = true;
  sessionStorage.setItem("tipo_vista", "table");
});

let toggle_show = document.querySelector("#toggle_show");
toggle_show.addEventListener("change", function () {
  // obtener_resultados( get_setting_view());

  if (this.checked) {
    // activa_tabla();
    obtener_resultados("table");
    document.querySelector("#toggle_show").checked = true;
    sessionStorage.setItem("tipo_vista", "table");
  } else {
    // activa_grid();
    obtener_resultados("grid");
    document.querySelector("#toggle_show").checked = false;
    sessionStorage.setItem("tipo_vista", "grid");
  }
  // console.log("se ejecuto");
});

let chk_grid_ejecppo = document.querySelector("#chk_grid_ejecppo");
chk_grid_ejecppo.addEventListener("click", function () {
  // activa_grid();
  carga_ejecucionppo("grid");
  document.querySelector("#toggle_show_ejecppo").checked = false;
  sessionStorage.setItem("tipo_vista_ejecppo", "grid");
});

let chk_table_ejecppo = document.querySelector("#chk_table_ejecppo");
chk_table_ejecppo.addEventListener("click", function () {
  // activa_tabla();
  carga_ejecucionppo("table");
  document.querySelector("#toggle_show_ejecppo").checked = true;
  sessionStorage.setItem("tipo_vista_ejecppo", "table");
});

let toggle_show_ejecppo = document.querySelector("#toggle_show_ejecppo");
toggle_show_ejecppo.addEventListener("change", function () {
  // obtener_resultados( get_setting_view());

  if (this.checked) {
    // activa_tabla();
    carga_ejecucionppo("table");
    document.querySelector("#toggle_show_ejecppo").checked = true;
    sessionStorage.setItem("tipo_vista_ejecppo", "table");
  } else {
    // activa_grid();
    carga_ejecucionppo("grid");
    document.querySelector("#toggle_show_ejecppo").checked = false;
    sessionStorage.setItem("tipo_vista_ejecppo", "grid");
  }
  // console.log("se ejecuto");
});

function crea_elemento_retorno(ele) {
  if (ele.tipo == "button") {
    let boton = document.createElement("span");
    boton.className = "btn_sup";
    boton.setAttribute("data-id", ele.id);
    boton.setAttribute("data-level", ele.nivel);
    boton.innerHTML = ele.contenido;
    boton.addEventListener("click", function (e) {
      let level = this.getAttribute("data-level");
      let id_level = this.getAttribute("data-id");
      switch (level) {
        case "0":
          sessionStorage.removeItem("level_result");
          sessionStorage.removeItem("id_pilar");
          sessionStorage.removeItem("id_gerencia");
          sessionStorage.removeItem("id_proyecto");
          sessionStorage.removeItem("id_hito");

          break;
        case "pilares":
          sessionStorage.setItem("level_result", "gerencias");
          sessionStorage.removeItem("id_gerencia");
          sessionStorage.removeItem("id_proyecto");
          sessionStorage.removeItem("id_hito");
          break;

        case "gerencias":
          sessionStorage.setItem("level_result", "proyectos");
          sessionStorage.removeItem("id_proyecto");
          sessionStorage.removeItem("id_hito");
          break;
        case "proyectos":
          sessionStorage.setItem("level_result", "hitos");
          sessionStorage.removeItem("id_hito");
          break;
      }

      obtener_resultados(get_setting_view());
    });

    return boton;
  } else {
    let span = document.createElement("span");
    span.innerHTML = ele.contenido;
    return span;
  }
}

function carga_detalle_hito(id_hito) {
  fetch(urls[3].url)
    .then((response) => response.json())
    .then((data) => {
      let data_filtered = data.filter((el) => el.id == id_hito);
      console.log(data_filtered);
      let contenedor = document.querySelector(".contenedor_hito");
      contenedor.innerHTML = "";

      let div_principal = document.createElement("div");
      div_principal.className = "principal";

      let div_grafico = document.createElement("div");
      div_grafico.className = "seccion_grafica";

      let div_formulario1 = document.createElement("div");
      div_formulario1.className = "formulario";

      let div_formulario2 = document.createElement("div");
      div_formulario2.className = "formulario";

      div_principal.appendChild(div_grafico);
      div_principal.appendChild(div_formulario1);
      div_principal.appendChild(div_formulario2);

      let h2_name = document.createElement("h2");
      h2_name.setAttribute("id", "hito_name");
      h2_name.innerHTML = data_filtered[0].nombre;

      let div_contorno = document.createElement("div");
      div_contorno.className = "contorno";

      let canvas = document.createElement("canvas");
      canvas.setAttribute("id", "myChart");

      div_contorno.appendChild(canvas);

      div_grafico.appendChild(h2_name);
      div_grafico.appendChild(div_contorno);

      let div_control1 = document.createElement("div");
      div_control1.className = "control";

      let label1 = document.createElement("label");
      label1.setAttribute("for", "responsable");
      label1.innerHTML = "Responsable";

      let input1 = document.createElement("input");
      input1.setAttribute("type", "text");
      input1.setAttribute("id", "responsable");

      div_control1.appendChild(label1);
      div_control1.appendChild(input1);

      let div_control2 = document.createElement("div");
      div_control2.className = "control";

      let label2 = document.createElement("label");
      label2.setAttribute("for", "estado");
      label2.innerHTML = "Estado";

      let input2 = document.createElement("input");
      input2.setAttribute("type", "text");
      input2.setAttribute("id", "estado");

      div_control2.appendChild(label2);
      div_control2.appendChild(input2);

      let div_control3 = document.createElement("div");
      div_control3.className = "control";

      let label3 = document.createElement("label");
      label3.setAttribute("for", "dias_retraso");
      label3.innerHTML = "Dias de retraso";

      let input3 = document.createElement("input");
      input3.setAttribute("type", "text");
      input3.setAttribute("id", "dias_retraso");

      div_control3.appendChild(label3);
      div_control3.appendChild(input3);

      div_formulario1.appendChild(div_control1);
      div_formulario1.appendChild(div_control2);
      div_formulario1.appendChild(div_control3);

      let div_control4 = document.createElement("div");
      div_control4.className = "control";

      let label4 = document.createElement("label");
      label4.setAttribute("for", "frenaje");
      label4.innerHTML = "Factores de frenaje";

      let textarea4 = document.createElement("textarea");
      textarea4.setAttribute("cols", "30");
      textarea4.setAttribute("rows", "11");
      textarea4.setAttribute("id", "frenaje");
      textarea4.setAttribute("name", "frenaje");

      div_control4.appendChild(label4);
      div_control4.appendChild(textarea4);

      div_formulario2.appendChild(div_control4);

      contenedor.appendChild(div_principal);

      let div_sustentos = document.createElement("div");
      div_sustentos.className = "sustentos table-responsive";

      let h3_sustento = document.createElement("h3");
      h3_sustento.innerHTML = "Sustento";
      let table = document.createElement("table");
      let thead = document.createElement("thead");
      let tbody = document.createElement("tbody");

      table.appendChild(thead);
      table.appendChild(tbody);

      div_sustentos.appendChild(h3_sustento);
      div_sustentos.appendChild(table);

      let tr_head = document.createElement("tr");

      thead.appendChild(tr_head);

      let th_doc = document.createElement("th");
      th_doc.innerHTML = "Documento";

      let th_fecha = document.createElement("th");
      th_fecha.innerHTML = "Fecha";

      let th_acciones = document.createElement("th");
      th_acciones.innerHTML = "Acciones";

      tr_head.appendChild(th_doc);
      tr_head.appendChild(th_fecha);
      tr_head.appendChild(th_acciones);

      let tr_body = document.createElement("tr");
      let td_documento = document.createElement("td");
      td_documento.innerHTML = "Informe económico";
      let td_fecha = document.createElement("td");
      td_fecha.innerHTML = "12/05/2021";
      let td_acciones = document.createElement("td");
      td_acciones.className = "table_btn";

      let i = document.createElement("i");
      i.className = "fas fa-eye";

      let span = document.createElement("span");
      span.innerHTML = " Ver";

      td_acciones.appendChild(i);
      td_acciones.appendChild(span);

      tr_body.appendChild(td_documento);
      tr_body.appendChild(td_fecha);
      tr_body.appendChild(td_acciones);

      tbody.appendChild(tr_body);

      contenedor.appendChild(div_sustentos);

      let div_botones = document.createElement("div");
      div_botones.className = "botones";

      let btn_solicitar_info = document.createElement("button");
      btn_solicitar_info.setAttribute("id", "btn_solicitar_info");
      btn_solicitar_info.innerHTML = "Solicitar informe";

      btn_solicitar_info.addEventListener("click", function (e) {
        Swal.fire(
          "Notificación",
          "Se ha enviado un email al responsable del Hito, solicitando el informe del resultado a la fecha.",
          "info"
        );
      });

      div_botones.appendChild(btn_solicitar_info);

      contenedor.appendChild(div_botones);

      grafica_pie(data_filtered[0]);
    })
    .catch((error) => console.log(error));
}

function obtener_resultados(tipo_vista) {
  let nivel = sessionStorage.getItem("level_result");

  let elem = {
    id: "0",
    nivel: "0",
    contenido: "Inicio",
    tipo: "button",
  };

  switch (nivel) {
    case "gerencias":
      fetch("../data/pilares.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let pilar = data.filter(
            (el) => el.id == sessionStorage.getItem("id_pilar")
          )[0];

          document.querySelector("#titulo").innerHTML = "";
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido: " / " + pilar.nombre + " (" + pilar.avance + "%)",
            })
          );

          document.querySelector("#titulo_mobile").innerHTML = "";
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo_mobile").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido: " / " + pilar.nombre + " (" + pilar.avance + "%)",
            })
          );
        })
        .catch((error) => console.error(error));

      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(sessionStorage.getItem("id_pilar"), urls[1].url);
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(
          sessionStorage.getItem("id_pilar"),
          urls[1].url,
          urls[1].nombre
        );
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "block";
        document.querySelector(".contenedor_grid").style.display = "none";
      }
      break;
    case "proyectos":
      Promise.all([
        fetch("../data/pilares.json"),
        fetch("../data/gerencias.json"),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          // console.log(data);
          let pilar = data[0].filter(
            (el) => el.id == sessionStorage.getItem("id_pilar")
          )[0];
          let gerencia = data[1].filter(
            (el) => el.id == sessionStorage.getItem("id_gerencia")
          )[0];

          document.querySelector("#titulo").innerHTML = "";
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: pilar.id,
            nivel: "pilares",
            contenido: pilar.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido:
                " / " + gerencia.nombre + " (" + gerencia.avance + "%)",
            })
          );

          elem = {
            id: "0",
            nivel: "0",
            contenido: "Inicio",
            tipo: "button",
          };

          document.querySelector("#titulo_mobile").innerHTML = "";
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo_mobile")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: pilar.id,
            nivel: "pilares",
            contenido: pilar.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo_mobile").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido:
                " / " + gerencia.nombre + " (" + gerencia.avance + "%)",
            })
          );
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });

      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(sessionStorage.getItem("id_gerencia"), urls[2].url);
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(
          sessionStorage.getItem("id_gerencia"),
          urls[2].url,
          urls[2].nombre
        );
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "block";
        document.querySelector(".contenedor_grid").style.display = "none";
      }
      break;
    case "hitos":
      Promise.all([
        fetch("../data/pilares.json"),
        fetch("../data/gerencias.json"),
        fetch("../data/proyectos.json"),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          // console.log(data);
          let pilar = data[0].filter(
            (el) => el.id == sessionStorage.getItem("id_pilar")
          )[0];
          let gerencia = data[1].filter(
            (el) => el.id == sessionStorage.getItem("id_gerencia")
          )[0];
          let proyecto = data[2].filter(
            (el) => el.id == sessionStorage.getItem("id_proyecto")
          )[0];

          document.querySelector("#titulo").innerHTML = "";
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: pilar.id,
            nivel: "pilares",
            contenido: pilar.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: gerencia.id,
            nivel: "gerencias",
            contenido: gerencia.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido:
                " / " + proyecto.nombre + " (" + proyecto.avance + "%)",
            })
          );

          elem = {
            id: "0",
            nivel: "0",
            contenido: "Inicio",
            tipo: "button",
          };

          document.querySelector("#titulo_mobile").innerHTML = "";
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo_mobile")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: pilar.id,
            nivel: "pilares",
            contenido: pilar.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo_mobile")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: gerencia.id,
            nivel: "gerencias",
            contenido: gerencia.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo_mobile").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido:
                " / " + proyecto.nombre + " (" + proyecto.avance + "%)",
            })
          );
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });

      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(sessionStorage.getItem("id_proyecto"), urls[3].url);
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(
          sessionStorage.getItem("id_proyecto"),
          urls[3].url,
          urls[3].nombre
        );
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "block";
        document.querySelector(".contenedor_grid").style.display = "none";
      }
      break;
    case "hito":
      Promise.all([
        fetch("../data/pilares.json"),
        fetch("../data/gerencias.json"),
        fetch("../data/proyectos.json"),
        fetch("../data/hitos.json"),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          // console.log(data);
          let pilar = data[0].filter(
            (el) => el.id == sessionStorage.getItem("id_pilar")
          )[0];
          let gerencia = data[1].filter(
            (el) => el.id == sessionStorage.getItem("id_gerencia")
          )[0];
          let proyecto = data[2].filter(
            (el) => el.id == sessionStorage.getItem("id_proyecto")
          )[0];
          let hito = data[3].filter(
            (el) => el.id == sessionStorage.getItem("id_hito")
          )[0];

          document.querySelector("#titulo").innerHTML = "";
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: pilar.id,
            nivel: "pilares",
            contenido: pilar.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: gerencia.id,
            nivel: "gerencias",
            contenido: gerencia.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: proyecto.id,
            nivel: "proyectos",
            contenido: proyecto.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido: " / " + hito.nombre + " (" + hito.avance + "%)",
            })
          );

          elem = {
            id: "0",
            nivel: "0",
            contenido: "Inicio",
            tipo: "button",
          };

          document.querySelector("#titulo_mobile").innerHTML = "";
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo_mobile")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: pilar.id,
            nivel: "pilares",
            contenido: pilar.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo_mobile")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: gerencia.id,
            nivel: "gerencias",
            contenido: gerencia.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document
            .querySelector("#titulo_mobile")
            .appendChild(
              crea_elemento_retorno({ tipo: "span", contenido: " / " })
            );
          elem = {
            id: proyecto.id,
            nivel: "proyectos",
            contenido: proyecto.nombre,
            tipo: "button",
          };
          document
            .querySelector("#titulo_mobile")
            .appendChild(crea_elemento_retorno(elem));
          document.querySelector("#titulo_mobile").appendChild(
            crea_elemento_retorno({
              tipo: "span",
              contenido: " / " + hito.nombre + " (" + hito.avance + "%)",
            })
          );

          carga_detalle_hito(sessionStorage.getItem("id_hito"));
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });

      // if (["grid", "", null].includes(tipo_vista)) {
      //   activa_grid(sessionStorage.getItem("id_proyecto"), urls[3].url);
      document.querySelector(".contenedor_table").style.display = "none";
      document.querySelector(".contenedor_grid").style.display = "none";
      document.querySelector(".contenedor_hito").style.display = "block";
      // } else {
      //   activa_tabla(
      //     sessionStorage.getItem("id_proyecto"),
      //     urls[3].url,
      //     urls[3].nombre
      //   );
      //   document.querySelector(".contenedor_table").style.display = "block";
      //   document.querySelector(".contenedor_grid").style.display = "none";
      // }

      break;
    default:
      document.querySelector("#titulo").innerHTML = "Pilares Estratégicos";
      document.querySelector("#titulo_mobile").innerHTML =
        "Pilares Estratégicos";
      if (["grid", "", null].includes(tipo_vista)) {
        activa_grid(0, urls[0].url);
        document.querySelector(".contenedor_hito").style.display = "none";
        document.querySelector(".contenedor_table").style.display = "none";
        document.querySelector(".contenedor_grid").style.display = "grid";
      } else {
        activa_tabla(0, urls[0].url, urls[0].nombre);
        document.querySelector(".contenedor_hito").style.display = "none";
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


function crear_row_ejecppo(el) {
  let color_asignado = get_variable_css(
    el.ejecucion_ppo <= 25
      ? "--color-25"
      : el.ejecucion_ppo <= 50
      ? "--color-50"
      : el.ejecucion_ppo <= 75
      ? "--color-75"
      : "--color-100"
  );

  let level = sessionStorage.getItem("level_result")
    ? sessionStorage.getItem("level_result")
    : "pilares";

  console.log(level);

  let tr = document.createElement("tr");

  let td_gerencia = document.createElement("td");
  td_gerencia.innerHTML = el.nombre;

  let td_avance = document.createElement("td");
  td_avance.className = "avance";

  let div_progress = document.createElement("div");
  div_progress.className = "progress";

  let div_progress_bar = document.createElement("div");
  div_progress_bar.className = "progress-bar";
  div_progress_bar.style.width = el.ejecucion_ppo + "%";
  div_progress_bar.style.backgroundColor = color_asignado;

  td_avance.appendChild(div_progress);
  div_progress.appendChild(div_progress_bar);

  let td_porcentaje = document.createElement("td");
  td_porcentaje.className = "td_centrado";

  let i_circle = document.createElement("i");
  i_circle.className = "fas fa-circle";
  i_circle.style.color = color_asignado;

  let span_porc = document.createElement("span");
  span_porc.innerHTML = el.ejecucion_ppo + "%";
  // td_porcentaje.innerHTML = el.avance + "%";

  td_porcentaje.appendChild(i_circle);

  td_porcentaje.appendChild(span_porc);

  //<i class="fas fa-circle"></i>

  let td_acciones = document.createElement("td");

  let btn_accion = document.createElement("button");
  btn_accion.innerHTML = "Ver detalle";
  btn_accion.setAttribute("data-id", level + "_" + el.id);
  btn_accion.classList.add("btn");
  btn_accion.addEventListener("click", function (e) {
    let id_nivel = this.getAttribute("data-id").split("_")[1];
    let nivel = this.getAttribute("data-id").split("_")[0];

    // switch (nivel) {
    //   case "pilares":
    //     sessionStorage.setItem("id_pilar", id_nivel);
    //     sessionStorage.setItem("level_result", "gerencias");
    //     break;
    //   case "gerencias":
    //     sessionStorage.setItem("id_gerencia", id_nivel);
    //     sessionStorage.setItem("level_result", "proyectos");
    //     break;
    //   case "proyectos":
    //     sessionStorage.setItem("id_proyecto", id_nivel);
    //     sessionStorage.setItem("level_result", "hitos");
    //     break;
    //   case "hitos":
    //     sessionStorage.setItem("id_hito", id_nivel);
    //     sessionStorage.setItem("level_result", "hito");
    //     break;
    //   case "hito":
    //     sessionStorage.setItem("id_hito", id_nivel);
    //     sessionStorage.setItem("level_result", "hito");
    //     break;
    // }

    // obtener_resultados(get_setting_view());
  });

  td_acciones.appendChild(btn_accion);

  tr.appendChild(td_gerencia);
  tr.appendChild(td_avance);
  tr.appendChild(td_porcentaje);
  tr.appendChild(td_acciones);

  return tr;
}

function crear_card_ejecppo(el) {
  let color_asignado = get_variable_css(
    el.ejecucion_ppo <= 25
      ? "--color-25"
      : el.ejecucion_ppo <= 50
      ? "--color-50"
      : el.ejecucion_ppo <= 75
      ? "--color-75"
      : "--color-100"
  );

  let level = sessionStorage.getItem("level_result")
    ? sessionStorage.getItem("level_result")
    : "pilares";

  console.log(level);

  let div_card = document.createElement("div");
  div_card.className = "card";
  div_card.setAttribute("data-id", level + "_" + el.id); 
  div_card.style.borderLeftColor = color_asignado;
  div_card.addEventListener("click", function (e) {
    let id_nivel = this.getAttribute("data-id").split("_")[1];
    let nivel = this.getAttribute("data-id").split("_")[0];

    // switch (nivel) {
    //   case "pilares":
    //     sessionStorage.setItem("id_pilar", id_nivel);
    //     sessionStorage.setItem("level_result", "gerencias");
    //     break;
    //   case "gerencias":
    //     sessionStorage.setItem("id_gerencia", id_nivel);
    //     sessionStorage.setItem("level_result", "proyectos");
    //     break;
    //   case "proyectos":
    //     sessionStorage.setItem("id_proyecto", id_nivel);
    //     sessionStorage.setItem("level_result", "hitos");
    //     break;
    //   case "hitos":
    //     sessionStorage.setItem("id_hito", id_nivel);
    //     sessionStorage.setItem("level_result", "hito");
    //     break;
    //   case "hito":
    //     sessionStorage.setItem("id_hito", id_nivel);
    //     sessionStorage.setItem("level_result", "hito");
    //     break;
    // }

    // obtener_resultados(get_setting_view());
  });

  let div_card_header = document.createElement("div");
  div_card_header.className = "card-header";

  let h5 = document.createElement("h5");
  h5.innerHTML = el.nombre;
  let span = document.createElement("span");
  span.innerHTML = el.ejecucion_ppo + "%";

  div_card_header.appendChild(h5);
  div_card_header.appendChild(span);

  let div_card_body = document.createElement("div");
  div_card_body.className = "card-body";

  let div_progress = document.createElement("div");
  div_progress.className = "progress";

  let div_progress_bar = document.createElement("div");
  div_progress_bar.className = "progress-bar";
  div_progress_bar.style.width = el.ejecucion_ppo + "%";
  div_progress_bar.style.background = color_asignado;

  div_progress.appendChild(div_progress_bar);
  div_card_body.appendChild(div_progress);

  div_card.appendChild(div_card_header);
  div_card.appendChild(div_card_body);

  return div_card;
}

function mostrar_grid_ejecppo(data) {
  document.querySelector(".contenedor_table_ejecppo").innerHTML = "";
  let contenedor = document.querySelector(".contenedor_grid_ejecppo");
  contenedor.innerHTML = "";

  data.forEach((el) => {
    contenedor.appendChild(crear_card_ejecppo(el));
  });
}

function mostrar_table_ejecppo(data, base_nombre) {
  document.querySelector(".contenedor_grid_ejecppo").innerHTML = "";
  let contenedor = document.querySelector(".contenedor_table_ejecppo");
  contenedor.innerHTML = "";
  

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
    tbody.appendChild(crear_row_ejecppo(el));
  });
}

function activa_grid_ejecppo(url_current) {
  document.querySelector("#toggle_show_ejecppo").checked = false;

  fetch(url_current)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mostrar_grid_ejecppo(data.sort(compara_ejecppo));
    })
    .catch((error) => console.log(error));

  sessionStorage.setItem("tipo_vista_ejecppo", "grid");
}

function activa_tabla_ejecppo(url_current, base_nombre) {
  document.querySelector("#toggle_show_ejecppo").checked = true;
  fetch(url_current)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mostrar_table_ejecppo(data.sort(compara_ejecppo), base_nombre);
    })
    .catch((error) => console.log(error));

  sessionStorage.setItem("tipo_vista_ejecppo", "table");
}


function carga_ejecucionppo(tipo_vista) {
  if (["grid", "", null].includes(tipo_vista)) {
    activa_grid_ejecppo(urls[1].url);
    document.querySelector(".contenedor_table_ejecppo").style.display = "none";
    document.querySelector(".contenedor_grid_ejecppo").style.display = "grid";
  } else {
    activa_tabla_ejecppo(urls[1].url, urls[1].nombre);
    document.querySelector(".contenedor_table_ejecppo").style.display = "block";
    document.querySelector(".contenedor_grid_ejecppo").style.display = "none";
  }
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
    console.log(id_menu);
    // console.log(document.querySelector('#art_'+id_menu));
    document.querySelector("#art_" + id_menu).classList.add("active");
    // document.querySelector('#art_'+id_menu).innerHTML ="";
    switch (id_menu) {
      case "dashboard":
        crear_graficos_dashboard();
        break;

      case "resultados":
        obtener_resultados(get_setting_view());
        break;

      case "ejecucionppo":
        carga_ejecucionppo(get_setting_view_ejecppo());
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
