

// ---------- VARIABLES --------------
let txtBuscar = document.getElementById('txtBuscar');
let btnBuscar = document.getElementById('btnBuscar');
let sesion = document.getElementById('sesion');
let navprecioMayor = document.getElementById('navprecioMayor');
let navprecioMenor = document.getElementById('navprecioMenor');
let navlistaprecios = document.getElementById('navlistaprecios');
let contPopUp = document.getElementById('contPopUp');
let divContSesion = document.getElementById('divContSesion');
let carrito = document.getElementById('carrito');

let carritoProductos = []
//const carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];

// ------------- CODIGO LOAD ----------

//PREGUNTAR AL PROFE COMO SABER SI LS CARRITO TIENE DATOS
// if (localStorage.length > 0) {
//     storageaCarrito()
// }

// OPERADOR LOGICO AND, PARA USAR FUNCION StorageaCarrito si tengo algo en carrito
JSON.parse(localStorage.getItem("carrito")) && storageaCarrito();

// ------------- FUNCIONES ------------

function cargarStock() {
    let id = prompt('Ingrese el ID del producto');
    while (id == null || id.trim() == '') {
        id = prompt('ERROR: campo vacio. Ingrese el tipo de bebida');
    }
    let tipo = prompt('Ingrese el tipo de bebida');
    while (tipo == null || tipo.trim() == '') {
        tipo = prompt('ERROR: campo vacio. Ingrese el tipo de bebida');
    }
    let marca = prompt('Ingrese la marca');
    while (marca == null || marca.trim() == '') {
        marca = prompt('ERROR: campo vacio. Ingrese la marca');
    }
    let cantidad = parseInt(prompt('Ingrese la cantidad de stock'));
    while (isNaN(cantidad) || cantidad == null || cantidad.trim == 0) {
        cantidad = prompt('ERROR: Ingrese la cantidad correcta');
    }
    let precioMayorista = parseFloat(prompt('Ingrese precio mayorista'));
    while (isNaN(precioMayorista) || precioMayorista == null || precioMayorista.trim == 0) {
        precioMayorista = prompt('ERROR: Ingrese la cantidad correcta');
    }
    let detalle = prompt('Ingrese detalle de la misma');
    while (detalle == null || detalle.trim() == '') {
        detalle = prompt('ERROR: campo vacio. Ingrese detalle del producto');
    }

    let bebida = new Producto(id, tipo, marca, cantidad, precioMayorista, detalle);
    listaProductos.push(bebida);
    console.log(listaProductos);
    return bebida;
}

function mostrarProductos(array) {
    document.querySelector('.cardCont').innerHTML = '';
    for (const producto of array) {
        //DESESTUCTURACION DE OBJETOS
        const {id, tipo, marca, stock, precioMayorista, descripcion, imagen, } = Producto;
        let cardCont = document.createElement('div');
        cardCont.innerHTML = `<img src = ${producto.imagen} class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${producto.tipo}</h5>
            <h5 class="card-title">${producto.marca}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <h3 class="card-title">$${producto.precioPublico()}</h3>
            <a class="btn btn-primary" id="btnAgregar${producto.id}">COMPRAR</a>
        </div>
    </div>`;
        cardCont.className = 'card col-lg-4 col-md-6 col-xs-12';
        document.querySelector('.cardCont').append(cardCont);

        let btnAgregar = document.getElementById(`btnAgregar${producto.id}`)
        // Boton agregar al carrito
        btnAgregar.addEventListener('click', () => {
        if (producto.seleccionado) {alert('su producto ya esta en el carrito')}
        else {agregarAlCarrito(producto.id); 
            producto.seleccionado = true};
    })
    };
}

function agregarAlCarrito(id) {
    let productoAgregar = listaProductos.find(elemento => elemento.id == id);
    carritoProductos.push(productoAgregar);
    localStorage.setItem("carrito", JSON.stringify(carritoProductos));
    return carritoProductos;
}

function mostrarProdCarrito() {
    const domCar = document.querySelector('#domCar');
    domCar.innerHTML = "";
    for (const domProd of carritoProductos) {
        let divcar = document.createElement('div');
        divcar.innerHTML +=
            `<div class="divcarrito" id="div${domProd.id}">
                <p>${domProd.tipo} ${domProd.marca}</p>
                <p>Precio: $${domProd.precioPublico()}</p>
                <p id= cantidad${domProd.id}>Cantidad: </p>
                <select name="" id="selecStock${domProd.id}" onFocus= "llenarSelect(${domProd.stock})">
                </select>
                <i class="far fa-times-circle" id="botonEliminar${domProd.id}"></i>
                </div>`
        domCar.appendChild(divcar);

        let btnEliminar = document.getElementById(`botonEliminar${domProd.id}`);
        btnEliminar.addEventListener('click', () => {
            carritoProductos = carritoProductos.filter(elem => elem.id != domProd.id);
            localStorage.setItem('carrito', JSON.stringify(carritoProductos));
            domProd.seleccionado = false;
            domCar.removeChild(divcar);
        });
    }  
}

function llenarSelect(stock) {
    let select = document.querySelector(`#selecStock${domProd.id}`);
    for (let i = 1; i <= stock; i++) {
        select.options[i] = new Option(i, 'valor:' + i);
    }
}



// esta funcion es si tengo productos en carrito
function storageaCarrito() {
    let arrayLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    // con el map recorremos objetos y podemos acceder a los valores del atributo que necesitemos.
    arrayLocalStorage.map(({ id }) => {
        let idProductoLS = `${id}`;
        let productoAgregar = listaProductos.find(elemento => elemento.id == idProductoLS);
        productoAgregar.seleccionado = true;
        carritoProductos.push(productoAgregar);
    })
}

// ----------- CODIGO POP UP MAYOR DE EDAD ----------   

function popUps() {
    contPopUp.className = 'show';
    init();
}
setTimeout(popUps, 1000);

function init() {
    document.querySelector(".popUp .menor").addEventListener("click", adios);
    document.querySelector(".popUp .mayor").addEventListener("click", hola);
}
function adios() {
    location.href = "assets/video/conductor.mp4";
}
function hola() {
    contPopUp.removeAttribute('class', 'show');
}

// ------------- EVENTOS --------------

sesion.addEventListener('click', () => {
    let divSesion = document.createElement('div');
    divSesion.innerHTML = `<div class="contS">
    <div class="contForm">
        <form action="" class="formSesion" id="formulario">
            <i class="far fa-times-circle" id="close"></i>
            <h4>Ingrese usuario y contraseña</h4>
            <input type="text" class="txtusuario" placeholder="USUARIO">
            <input type="password" class="txtclave" placeholder="CONTRASEÑA">
            <button class="btnEnviar" id="btnEnviar">Enviar</button>
        </form>
    </div>
</div>`;
    divContSesion.appendChild(divSesion);
    let btnEnviar = document.getElementById('btnEnviar');

    btnEnviar.addEventListener('click', (e) => {
        e.preventDefault();
        let usuarioIngresado = document.querySelector('.txtusuario').value;
        let claveIngresado = document.querySelector('.txtclave').value;
        let usuario = 'admin';
        let clave = 'admin123';
        if (usuarioIngresado == usuario && claveIngresado == clave) {
            divContSesion.innerHTML = '';
            location.href = "pages/sesion.html";
        }
        else {
            alert('Datos incorrectos');
            formulario.reset();
        }
    });

    document.querySelector('#close').addEventListener('click', () => {
        divContSesion.innerHTML = '';
    });
});

navlistaprecios.addEventListener('click', () => {
    mostrarProductos(listaProductos);
});

navprecioMayor.addEventListener('click', () => {
    let precioMay = listaProductos.sort((a, b) => b.precioPublico() - a.precioPublico());
    mostrarProductos(precioMay);
});

navprecioMenor.addEventListener('click', () => {
    let precioMen = listaProductos.sort((a, b) => a.precioPublico() - b.precioPublico());
    mostrarProductos(precioMen);
});

txtBuscar.addEventListener('input', () => {
    let busqueda = listaProductos.filter(el => el.tipo.includes(txtBuscar.value));
    mostrarProductos(busqueda);
});

carrito.addEventListener('click', () => {
    let contCar = document.querySelector('div.contCar');
    // aca utilizamos un operador ternario
    contCar.classList.contains('contCarNone') ? contCar.classList.remove('contCarNone') : contCar.classList.add('contCarNone');

    document.querySelector('#close').addEventListener('click', () => {
        contCar.classList.add('contCarNone');
    });

    mostrarProdCarrito();
});
