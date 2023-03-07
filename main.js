const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById('vaciar-carrito');
const contadorCarrito = document.getElementById('contadorCarrito')

let carrito = [];
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        carritoRefresh()
    }
})
let stockProductos = [
    {id: 1, nombre: "Castrol", tipo: "aceite", cantidad: 1, desc: "Maximo rendimiento", precio: 1200, img: './img/castrol-edge.jpg'},
    {id: 2, nombre: "Pennzoil", tipo: "aceite", cantidad: 1, desc: "Maxima calidad", precio: 1100, img: './img/penzoil.jpg'},
    {id: 3, nombre: "Liqui Moly", tipo: "aceite", cantidad: 1, desc: "precio y calidad", precio: 1200, img: './img/liquimoly.jpg'},
    {id: 4, nombre: "Edge", tipo: "aceite", cantidad: 1, desc: "Excelente producto", precio: 1400, img: './img/hidraulica.jpg'},
    {id: 5, nombre: "Amortiguador", tipo: "aceite", cantidad: 1, desc: "Maximo rendimiento", precio: 1200, img: './img/amortig.jpg'},
    {id: 6, nombre: "Kit de filtros", tipo: "aceite", cantidad: 1, desc: "Maxima calidad", precio: 1100, img: './img/man.jpg'},
    {id: 7, nombre: "Disco de freno", tipo: "aceite", cantidad: 1, desc: "precio y calidad", precio: 1200, img: './img/disco.jpg'},
    {id: 8, nombre: "Bujia", tipo: "aceite", cantidad: 1, desc: "Excelente producto", precio: 1400, img: './img/bujia.jpg'},
    ]


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click',() => {
        agregarAlCarrito(producto.id)
    } )
})

const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item);
    carritoRefresh();
    console.log(carrito)
}

const eliminarDelCarrito = (prodId) => {
    const indice = carrito.findIndex((prod) => prod.id === prodId)
    console.log(indice);
    carrito.splice(indice, 1)  
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)
    carritoRefresh()
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    localStorage.setItem('carrito', JSON.stringify(carrito))
    carritoRefresh()
})



// const eliminarDelCarrito = (prodId) => {
//     const item = carrito.find((prod) => prod.id === prodId)
//     const indice = carrito.indexOf(item) 
//     carrito.splice(indice, 1);
//     carritoRefresh() 
//     console.log(carrito)
// }


const carritoRefresh = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length 
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}





//