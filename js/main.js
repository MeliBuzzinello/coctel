// Desafio arrays: en esta etapa, implemente dentro del boton iniciar sesion, la opcion de agregar stock al Array.
// En el input buscar, se puede buscar por tipo de bebida.
// y 3 opciones que va a ordenar los productos por precio, y por lista.


// ---------- VARIABLES --------------
let bebida = {};
let id = '';
let tipo = '';
let marca = '';
let cantidad = 0;
let precioMayorista = 0;
let detalle = '';
let ingreso = false;
let txtBuscar = document.getElementById('txtBuscar');
let btnBuscar = document.getElementById('btnBuscar');
let sesion = document.getElementById('sesion');
let navprecioMayor = document.getElementById('navprecioMayor');
let navprecioMenor = document.getElementById('navprecioMenor');
let navlistaprecios = document.getElementById('navlistaprecios');

// ------------- FUNCIONES ------------

function cargarStock() {
    id = prompt('Ingrese el ID del producto');
    while (id == null || id.trim() == '') {
        id = prompt('ERROR: campo vacio. Ingrese el tipo de bebida');
    }
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

    bebida = new Producto(id, tipo, marca, cantidad, precioMayorista, detalle);
    listaProductos.push(bebida);
    console.log(listaProductos);
    return bebida;
}

// ----------- CODIGO EJECUTABLE ----------   

window.onload = init;
function init() {
    document.querySelector(".emergente .menor").addEventListener("click", adios);
    document.querySelector(".emergente .mayor").addEventListener("click", hola);
}
function adios() {
    location.href = "assets/video/conductor.mp4";
}
function hola() {
    document.querySelector(".emergente").style.display = "none";
}

// ------------- EVENTOS --------------

btnBuscar.addEventListener('click', () => {
    let busqueda = listaProductos.filter(el => el.tipo.includes(txtBuscar.value));
    console.log(busqueda);
});

sesion.addEventListener('click', () => {
    while (confirm('Agregar stock de producto')) {
        cargarStock();
        alert(`${bebida.id}: ${bebida.tipo}
            El precio consumidor final es $ ${bebida.precioPublico()}`)
    }
});

navlistaprecios.addEventListener('click', () => {
    for (const producto of listaProductos) {
        alert(`El precio al publico del producto: ${producto.tipo} marca: ${producto.marca}, ${producto.descripcion} es $${producto.precioPublico()}`);
    };
});

navprecioMayor.addEventListener('click', () => {
    let precioMay = listaProductos.sort((a, b) => b.precioPublico() - a.precioPublico());
    console.log(precioMay);
});

navprecioMenor.addEventListener('click', () => {
    let precioMen = listaProductos.sort((a, b) => a.precioPublico() - b.precioPublico());
    console.log(precioMen);
});

