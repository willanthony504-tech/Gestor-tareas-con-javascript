// Capturamos los elementos del html usando el DOM
const mensajeError = document.getElementById("mensajeError");
const btnAgregar = document.getElementById("btnAgregar");
const actividadInput = document.getElementById("actividadInput");
const listaActividades = document.getElementById("listaActividades");
const totalActividades = document.getElementById("totalActividades")
const totalActividadesRealizadas = document.getElementById("totalActividadesRealizadas")
const totalActividadesPendientes = document.getElementById("totalActividadesPendientes")
const mensajeVacio = document.getElementById("mensajeVacio");
document.getElementById("year").textContent = new Date().getFullYear();
// Evento para agregar actividad al hacer click en el botón
btnAgregar.addEventListener("click", agregarActividad);

actividadInput.addEventListener("keypress", function(evento){
    if(event.key ==="Enter"){
        agregarActividad();
    }
});

// Función principal para agregar una actividad
function agregarActividad(){
    const textoActividad = actividadInput.value.trim();

    // Validación de espacio vacío
    if(textoActividad === ""){
        mensajeError.textContent = "Por favor escribe una actividad antes de agregarla";
        return;
    }
     //limpiamos el mensaje de error
     mensajeError.textContent = "";

     //creamos un elemento li
     const nuevaActividad = document.createElement("li");

     //creamos un span para el texto de la actividad
     const texto = document.createElement("span");
     texto.textContent = textoActividad;

     //creamos el contenedor de los botones
     const contenedorBotones = document.createElement("div");
     contenedorBotones.classList.add("botones");

     //boton para marcar como realizada
     const btnRealizada = document.createElement("button");
     btnRealizada.textContent = "Realizada";
     btnRealizada.classList.add("btn-realizada");


      //boton para marcar como eliminada
     const btnEliminar = document.createElement("button");
     btnEliminar.textContent = "Eliminar";
     btnEliminar.classList.add("btn-eliminar");

     //evento para marcar o desenmarcar como realizada
     btnRealizada.addEventListener("click", function(){
        nuevaActividad.classList.toggle("realizada");

        if (nuevaActividad.classList.contains("realizada")){
             btnRealizada.textContent = "realizada";
            
        }else{
            btnRealizada.textContent = "Pendiente";
        }
        actualizarContadores();
     });

    btnEliminar.addEventListener("click", function(){
        listaActividades.removeChild(nuevaActividad);
        actualizarContadores();
    });

    //agregamos los botones al contador
    contenedorBotones.appendChild(btnRealizada);
    contenedorBotones.appendChild(btnEliminar);

    //Agregamos el texto a los botones li
    nuevaActividad.appendChild(texto);
    nuevaActividad.appendChild(contenedorBotones);

    listaActividades.appendChild(nuevaActividad);

    //llamar una funcion
    actualizarContadores();

}
//funcion para actualizar el total, realizado y pendiente
function actualizarContadores(){
    const actividades = listaActividades.querySelectorAll("li");
    const realizadas = listaActividades.querySelectorAll(".realizada");

    const total = actividades.length;
    const totalRealizadas = realizadas.length;
    const pendientes = total - totalRealizadas;

    totalActividades.textContent = total;
    totalActividadesPendientes.textContent = pendientes;
    totalActividadesRealizadas.textContent = totalRealizadas;


    //Mostrar u ocultar mensaje cuando la lista este vacía
    if(total === 0){
        mensajeVacio.style.display = "block";
    }else{
        mensajeVacio.style.display = "none";
    }

}