let btn_ingresar = document.querySelector('#btn_ingresar');
btn_ingresar.addEventListener('click',function(e){
    let usuario = document.querySelector('#usuario').value;
    let pass = document.querySelector('#pass').value;
    if(usuario!=""){
        if(pass!=""){

            const coincide = (el) => el.usuario.toLowerCase()==usuario.toLowerCase() && el.password==pass;

            fetch("../data/usuarios.json")
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                if(data.some(coincide)){
                    sessionStorage.setItem('usuario_bsc',usuario);
                    location.href="/pages/dashboard.html"
                }
                else{
                    Swal.fire(
                        'Notificación',
                        'Credenciales invalidas',
                        'warning'
                      )
                }
                // sessionStorage.setItem('user',usuario);
            })
            .catch(error=>console.error(error));
            
        }
        else{
            Swal.fire(
                'Notificación',
                'Debe ingresar el Password',
                'warning'
              )
        }
    }
    else{
        Swal.fire(
            'Notificación',
            'Debe ingresar el Usuario',
            'warning'
          )
    }
})