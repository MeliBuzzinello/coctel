

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
let btnVaciar = document.getElementById('btnVaciar');
let btnComprar = document.getElementById('btnComprar');

let carritoProductos = []

// ------------- CODIGO LOAD ----------

mostrarProductos(listaProductos);

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
            if (producto.seleccionado) { swal ( " Su producto ya esta en el carrito " ) ; }
            else {
                agregarAlCarrito(producto.id);
                producto.seleccionado = true
                document.querySelector('#carrito').textContent = carritoProductos.length;
            };
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
    for (const prod of carritoProductos) {
        let divcar = document.createElement('div');
        divcar.innerHTML +=
            `<div class="divcarrito" id="div${prod.id}">
                <p>${prod.tipo} ${prod.marca}</p>
                <p>Precio: $${prod.precioPublico()}</p> 
                <p id= cantidad${prod.id}>Cantidad: </p>
                <select name="" id="selecStock${prod.id}" onFocus="llenarSelect(${prod.stock},${prod.id})">
                </select>
                <i class="far fa-times-circle" id="botonEliminar${prod.id}"></i>
                </div>`
        domCar.appendChild(divcar);

        let btnEliminar = document.getElementById(`botonEliminar${prod.id}`);
        btnEliminar.addEventListener('click', ()=> {
            carritoProductos = carritoProductos.filter(elem => elem.id != prod.id);
            total();
            localStorage.setItem('carrito', JSON.stringify(carritoProductos));
            prod.seleccionado = false;
            domCar.removeChild(divcar);
            document.querySelector('#carrito').textContent = carritoProductos.length;
        });

        let select = document.getElementById(`selecStock${prod.id}`);
        select.addEventListener('change', () => {
            let valorSelect = select.value || 1;
            carritoProductos.map((e) => {
                if (e.id == prod.id) {
                    e.cantidad = valorSelect;
                }
            })
            localStorage.setItem('carrito', JSON.stringify(carritoProductos));
            total();
        })
    }
    btnVaciar.addEventListener('click', () => {
        vaciarCarrito()
        document.querySelector('#carrito').textContent = carritoProductos.length;
    });

    btnComprar.addEventListener('click', comprar);
    total();
}

const comprar = () => {
    if(carritoProductos.length != 0){
    vaciarCarrito()
    document.querySelector('#carrito').textContent = carritoProductos.length;
    swal(" Proximamente...");}
    else{ swal(" No hay productos seleccionados ")};
}

function vaciarCarrito() {
    for (const prod of carritoProductos) {
        prod.seleccionado = false;
    }
    domCar.innerHTML = "";
    carritoProductos = [];
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    total();
}

function llenarSelect(stock, id) {
    let select = document.getElementById(`selecStock${id}`);
    for (let i = 1; i <= stock; i++) {
        select.options[i] = new Option(i, i);
    }
}

function total() {
    let total = 0;
    for (const prod of carritoProductos) {
        let precio = parseFloat(prod.precioPublico());
        total += precio * prod.cantidad;
    }
    document.querySelector('#txtTotal').innerText = total;
}

// esta funcion es si tengo productos en carrito
function storageaCarrito() {
    let arrayLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    arrayLocalStorage.map(({ id }) => {
        let idProductoLS = `${id}`;
        let productoAgregar = listaProductos.find(elemento => elemento.id == idProductoLS);
        productoAgregar.seleccionado = true;
        carritoProductos.push(productoAgregar);
    })
    total();
    document.querySelector('#carrito').textContent = carritoProductos.length;
}

const sesionEnviar = (e) => {
    e.preventDefault();
        let usuarioIngresado = document.querySelector('.txtusuario').value;
        let claveIngresado = document.querySelector('.txtclave').value;
        let usuario = 'admin';
        let clave = 'admin123';
        if (usuarioIngresado == usuario && claveIngresado == clave) {
            divContSesion.innerHTML = '';
            swal ( " Bienvenido administrador. Proximamente podras cargar tu stock de productos " ) ;
        }
        else {
            swal ( " Datos incorrectos " ) ;
            formulario.reset();
        }
}

// ----------- CODIGO POP UP MAYOR DE EDAD ----------   

function popUps() {
    contPopUp.className = 'show';
    init();
}
//setTimeout(popUps, 1000);

function init() {
    document.querySelector(".popUp .menor").addEventListener("click", adios);
    document.querySelector(".popUp .mayor").addEventListener("click", hola);
}

function adios() {
    location.href = "assets/video/conductor.mp4";
    localStorage.setItem('sesion', 'menor');
}
function hola() {
    contPopUp.removeAttribute('class', 'show');
    localStorage.setItem('sesion', 'mayor');
}

localStorage.getItem('sesion') || setTimeout(popUps, 1000);

// ------------- CODIGO LIBRERIA ELEVATOR --------------

window.onload = function() {
    var elevator = new Elevator({
      element: document.querySelector('#parriba'),
    });
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

    btnEnviar.addEventListener('click', sesionEnviar);

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
    contCar.classList.contains('contCarNone') ? contCar.classList.remove('contCarNone') : contCar.classList.add('contCarNone');

    document.querySelector('#close').addEventListener('click', () => {
        contCar.classList.add('contCarNone');
    });

    mostrarProdCarrito();
});

