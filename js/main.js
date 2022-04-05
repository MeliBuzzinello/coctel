// Mi trabajo final, es una tienda e-commerce de venta de bebidas alcoholicas.
// En este desafio de simulacro, genere un algoritmo de carga de stock por parte del usuario (dueño de la tienda). 
// Al ingresar a la pagina, una ventana verifica si es mayor de edad o no. Esta funcion es para una siguiente etapa, 
//en la que se diferencie el usuario (cliente y dueño). 


// ---------- VARIABLES --------------

let bebida = '';
let tipo = '';
let marca = '';
let cantidad = 0;
let precioMayorista = 0;
let detalle = '';
let ingreso = false;


// ------------- FUNCIONES ------------

const ingresoCarga = () => {
    while (confirm('Agregar stock de producto')) {
        cargarStock();
        alert(`${bebida} 
        El precio consumidor final es $ ${precioUsuario(precioMayorista)}`)
    }
}

function cargarStock() {
    tipo = prompt('Ingrese el tipo de bebida');
    while (tipo == null || tipo.trim() == '') {
        tipo = prompt('ERROR: campo vacio. Ingrese el tipo de bebida');
    }
    marca = prompt('Ingrese la marca');
    while (marca == null || marca.trim() == '') {
        marca = prompt('ERROR: campo vacio. Ingrese la marca');
    }
    cantidad = parseInt(prompt('Ingrese la cantidad de stock'));
    while (isNaN(cantidad) || cantidad == null || cantidad.trim == 0) {
        cantidad = prompt('ERROR: Ingrese la cantidad correcta');
    }
    precioMayorista = parseFloat(prompt('Ingrese precio mayorista'));
    while (isNaN(precioMayorista) || precioMayorista == null || precioMayorista.trim == 0) {
        precioMayorista = prompt('ERROR: Ingrese la cantidad correcta');
    }
    detalle = prompt('Ingrese detalle de la misma');
    while (detalle == null || detalle.trim() == '') {
        detalle = prompt('ERROR: campo vacio. Ingrese detalle del producto');
    }

    bebida = `Tipo: ${tipo}
    marca: ${marca}
    stock ${cantidad}
    precio matorista : $ ${precioMayorista}
    detalle: ${detalle}`;

    return bebida;
}

const precioUsuario = (precioMayorista) => {
    let precio = precioMayorista + (precioMayorista * 0.6);
    return precio;
}


// ----------- CODIGO EJECUTABLE ----------   

window.onload = init;
    function init(){
        document.querySelector(".emergente .menor").addEventListener("click",adios);
        document.querySelector(".emergente .mayor").addEventListener("click",hola);
    }
    function adios(){
        location.href= "assets/video/conductor.mp4";
    }    
    function hola(){
        document.querySelector(".emergente").style.display="none";
        setTimeout(ingresoCarga, 1000);
    }
    


