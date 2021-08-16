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

    let id_menu=this.getAttribute('data-id').split("_")[1];
    // console.log(document.querySelector('#art_'+id_menu));
    document.querySelector('#art_'+id_menu).classList.add('active');
    // console.log(this.getAttribute('data-id').split("_")[1]);

  });
});
