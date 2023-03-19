/* ENTREGA FINAL - SANCHEZ SANTIAGO NICOLÁS */
  let stockProductos = [];
  fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
      stockProductos = data;
      chargeProducts(stockProductos);
    })

  const contenedorProductos = document.getElementById('contenedor-productos');
  const contenedorProductos2 = document.getElementById('productos2-contenedor');
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
    
  function chargeProducts(){
    stockProductos.forEach((producto) => {
      const div = document.createElement('div')
      div.classList.add('producto')
      div.innerHTML = `
      <div class = "productoSell">
      <img class="productImage"  src=${producto.img} alt= "">
      <h3>${producto.nombre}</h3>
      <p>${producto.desc}</p>
      <p class="precioProducto">Precio:$ ${producto.precio}</p>
      <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
      </div>
      `
      contenedorProductos.appendChild(div)  
      const boton = document.getElementById(`agregar${producto.id}`)
      boton.addEventListener('click',() => {
          agregarAlCarrito(producto.id)
          Toastify({
              text: "Se agregó un producto",
              offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 60 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              style: {
                  background: "#ffd000",
                },
                duration: 2000,
            }).showToast();
      } )
  })
  }

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
      Swal.fire({
    title: 'Esta seguro que desea vaciar su carrito?',
    text: "Se perderan todos los productos cargados!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#adff2f', 
    confirmButtonText: 'Si, Vaciarlo!',
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Carrito vaciado!',
        'Su carrito se encuentra vaciado y listo para ser llenado nuevamente.',
        'success'
      )
      carrito.length = 0;
      localStorage.setItem('carrito', JSON.stringify(carrito))
      carritoRefresh()
    }
  })
  
  })
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
