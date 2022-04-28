

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

let carritoFiltrado = [];
const carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];


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
        // console.log(btnAgregar)
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })
    };
}

function agregarAlCarrito(id) {
    let productoAgregar = listaProductos.find(elemento => elemento.id == id);
    carritoProductos.push(productoAgregar);
    carritoFiltrado = carritoProductos.filter((ele, indice) => carritoProductos.indexOf(ele) == indice);
    console.log(carritoFiltrado);
    const local = localStorage.setItem("carrito", JSON.stringify(carritoFiltrado));
    return carritoFiltrado;
}

function llenarSelect(stock) {
    let selecStock = document.querySelector('.selecStock');
    for (let i = 1; i <= stock; i++) {
        selecStock.options[i] = new Option(i, 'valor:' + i);
    }
}

function mostrarProdCarrito(carrito) {
    const domCar = document.querySelector('#domCar');
    if (domCar == " ") {
        for (const prod of carrito) {
            let divcarrito = document.createElement('div');
            divcarrito.innerHTML +=
                `<div class="divcarrito">
                <p>${prod.tipo} ${prod.marca}</p>
                <p>Precio: $${prod.precioPublico()}</p>
                <p id= cantidad${prod.id}>Cantidad: </p>
                <select name="" class="selecStock" onFocus= "llenarSelect(${prod.stock})">
                </select>
                <i class="far fa-times-circle" id="botonEliminar${prod.id}"></i>
                </div>`

            domCar.appendChild(divcarrito);
            let btnEliminar = document.getElementById(`botonEliminar${prod.id}`);
            console.log(btnEliminar);
            btnEliminar.addEventListener('click', () => {
                console.log('boton eliminar');
                document.querySelector('#domCar').removeChild(divcarrito);
            });
        }
    } else {
        domCar.innerHTML = "";
        for (const prod of carrito) {
            let divcarrito = document.createElement('div');
            divcarrito.innerHTML +=
                `<div class="divcarrito">
                <p>${prod.tipo} ${prod.marca}</p>
                <p>Precio: $${prod.precioPublico}</p>
                <p id= cantidad${prod.id}>Cantidad: </p>
                <select name="" class="selecStock" onFocus= "llenarSelect(${prod.stock})">
                </select>
                <i class="far fa-times-circle" id="botonEliminar${prod.id}"></i>
                </div>`

            domCar.appendChild(divcarrito);
            let btnEliminar = document.getElementById(`botonEliminar${prod.id}`);
            console.log(btnEliminar);
            btnEliminar.addEventListener('click', () => {
                console.log('boton eliminar');
                document.querySelector('#domCar').removeChild(divcarrito);
            });

        }



    }
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
    console.log(carritoFiltrado);
    let contCar = document.querySelector('div.contCar');
    console.log(contCar);
    if (contCar.classList.contains('contCarNone')) {
        contCar.classList.remove('contCarNone');
    } else {
        contCar.classList.add('contCarNone');
    }

    document.querySelector('#close').addEventListener('click', () => {
        contCar.classList.add('contCarNone');
    });

    mostrarProdCarrito(carritoFiltrado);
});
