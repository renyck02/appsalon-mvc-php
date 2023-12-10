let paso = 1;
const pasoInicial= 1;
const pasoFinal = 3;

const cita = {
    id: "",
    nombre: "",
    fecha: "",
    hora: "",
    servicios: []
} // aunque sea una constante los objectos en javascript funcionan como variables, las puedes modificar  aunque sean constantes
document.addEventListener("DOMContentLoaded", function(){
  
    iniciarApp();
    paginaSiguiente();
    paginaAnterior();
});


function iniciarApp(){
    tabs(); // cambia la seccion cuando se presionen los tabs
      mostrarSeccion(); // muestra y oculta las secciones
      botonesPaginador(); // Agrega o quita los botones del paginador
      consultarAPI(); // consulta la API del PHP

      idCliente();
      nombreCliente(); // añade el nombre del cliente al objeto de cita
      seleccionarFecha(); // añade la fecha de la cita en el objecto
      seleccionaHora(); // añade la hora de la cita en el objecto
     mostrarResumen();
}

function mostrarSeccion(){
    // ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector(".mostrar");
    const tabAnterior = document.querySelector(".actual");
    if (seccionAnterior){
         seccionAnterior.classList.remove("mostrar");
        tabAnterior.classList.remove("actual");
    }
   

    // selecciona la seccion con el paso
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add("mostrar");

    // resalta el tab actual
    const tab = document.querySelector(`[data-paso = "${paso}"]`);
    tab.classList.add("actual");  
}

function tabs(){
    const botones = document.querySelectorAll(".tabs button");
    botones.forEach( boton => {
        boton.addEventListener("click", function(e){
            paso = parseInt(e.target.dataset.paso); // se accede al paso clickeado
            mostrarSeccion();
            botonesPaginador();

            
        });
    } );
}

function botonesPaginador (){
    const paginaAnterior = document.querySelector("#anterior");
    const paginaSiguiente = document.querySelector("#siguiente");

    if(paso ===1 ){
        paginaAnterior.classList.add("ocultar");
        paginaSiguiente.classList.remove("ocultar");
    } else if (paso === 3) {
        paginaAnterior.classList.remove("ocultar");
        paginaSiguiente.classList.add("ocultar");
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove("ocultar");
        paginaSiguiente.classList.remove("ocultar");
    }

    mostrarSeccion();

}


function paginaAnterior(){
    const paginaAnterior = document.querySelector ("#anterior");
    paginaAnterior.addEventListener("click" , function (){
        if (paso <= pasoInicial) return ;

        
        paso--;
        botonesPaginador();
    });
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector ("#siguiente");
    paginaSiguiente.addEventListener("click" , function (){
        if (paso >= pasoFinal) return ;

        
        paso++;
        botonesPaginador();
    });
}

async function consultarAPI(){ // El ASYNC hace que podamos usar el await
    // el await va a detener la ejecucion de las siguientes lineas de codigo de esta funcion hasta que la promesa no se acomplete

    // el try catch es muy util pero consume mucha memoria por eso solo se usa en momentos criticos de la app

    try {
        const url =  location.origin +   "/api/servicios";
        const resultado =await fetch(url); // este proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP, tales como peticiones y respuestas
        // como no sabe cuanto tarde en traer los datos de la base de datos lo que hace es esperar hasta que traiga los datos de la base de datos, por eso es util el await
        const servicios = await resultado.json();
       
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        
        const {id, nombre, precio} = servicio; // esto hace que se puean extrar partes especificas de una objecto y asignarle variables individuales
         const nombreServicio = document.createElement("P");
         nombreServicio.classList.add("nombre-servicio");
         nombreServicio.textContent = nombre;

         const precioServicio = document.createElement("P");
         precioServicio.classList.add("precio-servicio");
         precioServicio.textContent = `$${precio}`; 

         const servicioDiv = document.createElement("DIV");
         servicioDiv.classList.add("servicio");
         servicioDiv.dataset.idServicio = id;
        // servicioDiv.onclick = seleccionarServicio(servicio); // al ponerle los parentesis es como si llamaras la funcion
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio);
        };


        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
         
        document.querySelector("#servicios").appendChild(servicioDiv);


    });
}

function seleccionarServicio (servicio) {
    const {servicios} = cita;
    const {id} = servicio;
    //identificar al elemento al que se da click
    const divServicio =  document.querySelector(`[data-id-servicio="${id}"]`);
    // comprobar si un servicio ya fue agregado
    if( servicios.some( agregado => agregado.id === id) ){ // esto va iterar y nos devolvera un valor booleano
        // eliminarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id ); // filter crea un array con elementos que cumplan cierta condicion
        divServicio.classList.remove("seleccionado");
    } else {
        // agregarlo
        // los .... toma una copia de lo que ya hay en memoria
        cita.servicios = [...servicios, servicio]; // esto hara que se ponga una copia de servicios y ponga el servicio seleccionado
        divServicio.classList.add("seleccionado");
    }


    
    
    

    console.log(cita);
    

    // divServicio.classList.toggle("seleccionado"); // esto alterna entre quitar y/o añadir una clase 
}

function nombreCliente() {
   cita.nombre = document.querySelector("#nombre").value;

   
}
function idCliente() {
    cita.id = document.querySelector("#id").value;
 
    
 }

function  seleccionarFecha() {
    inputFecha = document.querySelector("#fecha");
    inputFecha.addEventListener("input", function(e){
        const dia = new Date(e.target.value).getUTCDay();
        if ( [6,0].includes(dia) ){ // es un array method que comprueba si algo existe 
            e.target.value = "";
            mostrarAlerta("Fines de semana no permitidos", "error", ".formulario");
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionaHora(){
    const inputHora = document.querySelector("#hora");
    inputHora.addEventListener("input", function(e) {
        console.log(e.target.value);
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0]; // split devuelve un arregla teniendo en cuenta un separador
        if(hora< 10  || hora>18){
            mostrarAlerta("Hora no valida","error", ".formulario");
            e.target.value = "";
        } else {
            cita.hora = e.target.value;
            
        }
    });
}

function mostrarAlerta (mensaje,tipo, elemento , desaparece = true){
    // previene que se generen mas de una alerta
    const alertaPrevia = document.querySelector(".alerta");
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    // script para crear la alerta
    const alerta = document.createElement("DIV");
    alerta.textContent = mensaje;
    alerta.classList.add("alerta");
    alerta.classList.add(tipo);
    
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    
    // eliminar la alerta
    if(desaparece){
          setTimeout( () => {
        alerta.remove();
    },3000)
    }
  
}


function mostrarResumen(){
    const resumen = document.querySelector(".contenido-resumen");
    // limpiar el contenido de Resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

    console.log(Object.values(cita));
    if (Object.values(cita).includes("") || cita.servicios.length === 0){
        mostrarAlerta("Faltan datos de Servicios, Fecha u Hora", "error" , ".contenido-resumen" , false);
        return;
    } 
    // Formatear el div de resumen
    const {nombre,fecha,hora, servicios} = cita;

    const nombreCliente = document.createElement("P");
    nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

    //Formatear la fecha en español
    const fechaobj = new Date(fecha);
    const mes = fechaobj.getMonth();
    const dia = fechaobj.getDate() + 2;
    const year = fechaobj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes,dia));
    const opciones = {weekday: "long", year: "numeric", month: "long" , day: "numeric"}
    const fechaFormateada = fechaUTC.toLocaleDateString("es-MX" , opciones);
    console.log(fechaFormateada);

    const fechaCliente = document.createElement("P");
    fechaCliente.innerHTML = `<span>Fecha: </span> ${fecha}`;

    const horaCliente = document.createElement("P");
    horaCliente.innerHTML = `<span>Hora: </span> ${hora} Horas`;

    // Heading para Servicios en resumen
    const headingServicios = document.createElement("H3");
    headingServicios.textContent = "Resumen de Servicios";
    resumen.appendChild(headingServicios);

    // iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const {id,precio,nombre} = servicio;
        const contenedorServicio = document.createElement("DIV");
        contenedorServicio.classList.add("contenedor-servicio");

        const textoServicio = document.createElement("P");
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.innerHTML =  `<span>Precio: </span> ${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

        // Heading para Cita en resumen
        const headingCita = document.createElement("H3");
        headingCita.textContent = "Resumen de Cita";
        resumen.appendChild(headingCita);

        // boton para Crear una cita
        const botonReservar = document.createElement("BUTTON");
        botonReservar.classList.add("boton");
        botonReservar.textContent = "Reservar Cita";
        botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCliente);
    resumen.appendChild(horaCliente);
    console.log(nombreCliente);

    resumen.appendChild(botonReservar);
}

async function reservarCita(){

    const {id,nombre,fecha,hora,servicios} = cita;
    const idServicios = servicios.map( servicio => servicio.id ); // el foreach solo itera, el map las coincidencias las pondra en la variable
    console.log(idServicios);
    
    const datos = new FormData(); // es como el submit, el que contendra los datos del post
    datos.append("fecha", fecha);  // appen es la forma en la que puedes agregarle datos
    datos.append("hora", hora); 
    datos.append("usuario_id", id);
    datos.append("servicios", idServicios); 

//     console.log([...datos]);
console.log([...datos]);
try {
      const url =  location.origin +  "/api/citas";
    const respuesta = await fetch(url,{
        method: "POST",
        body: datos // es el body 
    });
    const resultado = await respuesta.json();
    if (resultado.resultado){
        Swal.fire({
            icon: "success",
            title: "Cita Creada.",
            text: "Tu cita fue creada correctamente",
            button: "Ok"
          }).then( () => {
            setTimeout( () => {
                window.location.reload();
            },300);
            
          });
    }
} catch (error){
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar la cita",
        
      });
}


  

}