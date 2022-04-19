
// Primera entrega del Proyecto Final: en esta etapa, agregamos las funciones de carrito de compra, y de mostrar los productos 
// de acurdo a lo seleccoinado por usuario (precio, busqueda). Se agrego form para inicio de sesion. 

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

const carritoProductos = [];

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
        cardCont.innerHTML = `<img src="assets/img/WhiskyChivasExtra13_1000x1200.webp" class="card-img-top" alt="...">
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
    let productoAgregar = listaProductos.find(elemento => elemento.id == id)
    carritoProductos.push(productoAgregar);
    console.log(carritoProductos);
    return carritoProductos;
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
        if(usuarioIngresado == usuario && claveIngresado == clave){
            divContSesion.innerHTML = '';
            cargarStock();
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

btnBuscar.addEventListener('click', () => {
    let busqueda = listaProductos.filter(el => el.tipo.includes(txtBuscar.value));
    mostrarProductos(busqueda);
});

carrito.addEventListener('click',()=>{
    console.log(carritoProductos);
    let divcarrito = document.createElement('div');
    divcarrito.innerHTML = `<div class="contS">
    <div class="contForm">
        <div class="contCarrito" >
            <i class="far fa-times-circle" id="close"></i>
            <h4>Productos agregados en el carrito</h4>
        </div>
    </div>
</div>`;
divContSesion.appendChild(divcarrito);

    
    document.querySelector('#close').addEventListener('click', () => {
        divContSesion.innerHTML = '';
    });
});

