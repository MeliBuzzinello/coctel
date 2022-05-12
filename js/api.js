//---------------- VARIABLES---------------
const divResultado = document.getElementById('resultado');
const btn = document.getElementsByClassName('button');
const formulario = document.getElementById('form');
const txtBuscador = document.getElementById('txtBuscador');

//----------------- EVENTOS--------------
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const txtBusca = txtBuscador.value.trim();
    if (txtBusca === "") {
        swal ( " Campo busqueda vacio " ) ;
        return
    }
    console.log('entre po aca');
    obtenerInfo(txtBusca);
})


// -----------------FUNCIONES------------
async function obtenerInfo(busqueda) {
    const url_base = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
    const respuesta = await fetch(`${url_base}?s=${busqueda}`);
    const data = await respuesta.json();
    const { drinks } = data;
    mostrarBebidas(drinks);
}

function mostrarBebidas(bebidas = []) {
    divResultado.innerHTML = ""
    bebidas.forEach(bebida => {
        console.log(bebida);
        const divContenedor = document.createElement('div');
        //divContenedor.setAttribute('id','divContenedor');
        divContenedor.className += 'col-lg-4 col-xs-12';
        //divContenedor.id = 'divContenedor';

        const titulo = document.createElement('h3');
        titulo.className = 'resultadoTitulo';
        titulo.textContent = bebida.strDrink;

        const imagen = document.createElement("img");
        imagen.src = bebida.strDrinkThumb;
        imagen.className = 'imagen';

        const ingredientes = document.createElement('p');
        const {strIngredient1, strIngredient2, strIngredient3 , strIngredient4 , strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10} = bebida;
        const arrayIngredientes = [strIngredient1, strIngredient2, strIngredient3 , strIngredient4 ,strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10];
        const ingredientesFiltrado = arrayIngredientes.filter(Boolean);
        ingredientes.textContent = `Ingredientes:${ingredientesFiltrado}`;
        ingredientes.className = 'ingredientes';

        const receta = document.createElement('p');
        receta.textContent = "Instrucciones: " + bebida.strInstructions;
        receta.className = 'receta';

        divContenedor.appendChild(titulo);
        divContenedor.appendChild(imagen);
        divContenedor.appendChild(ingredientes);
        divContenedor.appendChild(receta);

        // const divPrueba = document.createElement('div');
        // divPrueba.innerHTML = `<p>${bebida.strDrink}</p>`

        divResultado.appendChild(divContenedor);
    })

}

