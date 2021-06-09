
window.onload = function () {

  const baseDeDatos = [
      {
          id: 1,
          nombre: 'Rebanada Pay de Queso y Zarzamora',
          precio: 40,
          imagen: 'img/payquesozarzamora1.jpg'
      },
      {
          id: 2,
          nombre: 'Rebanada Brownie',
          precio: 30,
          imagen: 'img/brownie1.jpg'
      },
      {
          id: 3,
          nombre: 'Una pieza de HotCake',
          precio: 30,
          imagen: 'img/hotcake1.jpg'
      },
      {
          id: 4,
          nombre: 'Helado',
          precio: 25,
          imagen: 'img/icecream1.jpg'
      },
      {
        id: 5,
        nombre: 'Rebanada de Carlota de Limón',
        precio: 20,
        imagen: 'img/carlota.jpg'
    },

    {
        id: 6,
        nombre: 'Rebanada Pay de Queso y Zarzamora',
        precio: 20,
        imagen: 'img/payquesozarzamora1.jpg'
    },

    {
        id: 7,
        nombre: 'Brownie',
        precio: 20,
        imagen: 'img/brownie1.jpg'
    },
    {
        id: 8,
        nombre: '4 piezas de HotCake',
        precio: 20,
        imagen: 'img/hotcake1.jpg'
    },
    {
        id: 9,
        nombre: '1 litro de Helado',
        precio: 20,
        imagen: 'img/icecream1.jpg'
    },
    {
        id: 10,
        nombre: 'Carlota de Limón',
        precio: 20,
        imagen: 'img/carlota.jpg'
    },

  ];

  let carrito = [];
  let total = 0;
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');

  // Funciones

  function renderizarProductos() {
      baseDeDatos.forEach((info) => {
                
        
                // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col-sm-4');
                
          
                // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
            
          
                // Titulo

          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
                // Imagen


          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
          miNodoImagen.setAttribute('src', info.imagen);
                 // Precio

                 
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('card-text');
          miNodoPrecio.textContent = info.precio + '$';
                // Boton 


          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = '+';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);


                // Insertar
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);


      });
  }

  
  function anyadirProductoAlCarrito(evento) {
      
      carrito.push(evento.target.getAttribute('marcador'))
      
      calcularTotal();
     
      renderizarCarrito();


  }

 
  function renderizarCarrito() {
      
      DOMcarrito.textContent = '';
      
      const carritoSinDuplicados = [...new Set(carrito)];
      
      carritoSinDuplicados.forEach((item) => {
          
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
             
              return itemBaseDatos.id === parseInt(item);


          });
         
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
              return itemId === item ? total += 1 : total;
          }, 0);
         
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
          
          
        //   Boton de borrar
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'mx-5');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarrito);
         


          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);


      });
  }

  
  function borrarItemCarrito(evento) {
      
      const id = evento.target.dataset.item;
   
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;


      });
    
      renderizarCarrito();
      calcularTotal();
  }

 
  function calcularTotal() {
      total = 0;
      carrito.forEach((item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);

          });

          total = total + miItem[0].precio;
      });
     
      DOMtotal.textContent = total.toFixed(2);

  }

 
  function vaciarCarrito() {
      carrito = [];
      renderizarCarrito();
      calcularTotal();
  }


  DOMbotonVaciar.addEventListener('click', vaciarCarrito);

  
  renderizarProductos();


} 
