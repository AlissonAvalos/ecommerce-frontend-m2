$(document).ready(function () {
  // Catálogo de productos con nombre, descripción, precio e imagen
  // usar const porque esta no se puede modificar y así evitamos cambios por error
  const productos = {
    1: {
      nombre: "Regalos Personalizados",
      descripcion:
        "Regalos únicos y personalizados para cada ocasión especial.",
      precio: 30000,
      imagen: "assets/img/novios.jpg",
    },
    2: {
      nombre: "Copas Personalizadas",
      descripcion:
        "Hermosas copas personalizadas para brindar en ese momento especial.",
      precio: 25000,
      imagen: "assets/img/copas.jpg",
    },
    3: {
      nombre: "Regalo para Padrino",
      descripcion:
        "Regalo personalizado para padrino en madera y vidrio, ideal para recordar momentos especiales.",
      precio: 30000,
      imagen: "assets/img/bautizoo.jpg",
    },
    4: {
      nombre: "Regalo para Madrina",
      descripcion:
        "Hermoso collar de plata, con grabado personalizado, incluye caja de madera grabada.",
      precio: 30000,
      imagen: "assets/img/madrina.jpg",
    },
    5: {
      nombre: "Pareja de graduados",
      descripcion: "Hermosa pareja de graduados 100% crochet.",
      precio: 30000,
      imagen: "assets/img/pareja.jpg",
    },
    6: {
      nombre: "Recuerdo de graduación",
      descripcion:
        "Recuerdo de graduación, hermoso arreglo floral con oso graduado de peluche.",
      precio: 30000,
      imagen: "assets/img/osolicenciado.jpg",
    },
    7: {
      nombre: "Regalo para bebé",
      descripcion:
        "Hermoso set de regalo para bebé, incluye body, pantalón, gorro, babero y peluche de apego personalizados.",
      precio: 30000,
      imagen: "assets/img/babys.jpg",
    },
    8: {
      nombre: "Regalo para babyshower",
      descripcion:
        "Hermoso arreglo personalizado incluye adornos, globo y artículos de bebé.",
      precio: 30000,
      imagen: "assets/img/babysw.jpg",
    },
  };

  // Mostrar detalle de producto según el id en la URL se usa la url para que se muestre dinamicamente y solo sea una pagina de productos 
  const id = new URLSearchParams(window.location.search).get("id");
  if (productos[id]) {
    const p = productos[id];
    $("#detalle-nombre").text(p.nombre);
    $("#detalle-descripcion").text(p.descripcion);
    $("#detalle-precio").text("$" + p.precio);
    $("#detalle-img").attr("src", p.imagen).attr("alt", p.nombre);

    // asignar el id dinámicamente al botón comprar para usarlo después 
    $("#btn-comprar").attr("data-id", id);
  }

  // Función para actualizar el carrito
  // usar localStorage para que se guarde en la memoria y se pueda ver en otra página
  function actualizarCarro() {
    let carro = JSON.parse(localStorage.getItem("carro")) || [];
    if ($("#listaCarro").length) {//verifica que la lista carro exita en el DOM antes de intentar actualizarla
      $("#listaCarro").empty();//limpia la lista antes de agregar los elementos actualizados
      let total = 0;

      carro.forEach((p, i) => {
        $("#listaCarro").append(
          `<li class='list-group-item d-flex justify-content-between align-items-center'>
            <div>
              <strong>${p.nombre}</strong><br>
              <small>${p.descripcion}</small>
            </div>
            $${p.precio}
            <button class='btn btn-sm btn-danger eliminar' data-index='${i}'>X</button>
          </li>`
        );
        total += p.precio;
      });

      $("#totalCarro").text("Total: $" + total);
    }
  }

  // Botón Comprar
  $(".comprar").on("click", function () {
    const id = $(this).data("id"); // se usa this para obtener el id del producto que se está comprando si no se usa el carro guardaria siempre el mismo producto o un null
    const producto = productos[id];
    //Validar que el producto existe
    if (!producto) {
      alert("Producto no válido. No se pudo agregar al carrito.");
      return;
    }
    //agrega los productos a un localStorage  y los muestra en el carro si no se usa el localStorage no se guardan los productos y te da un array vacio
    let carro = JSON.parse(localStorage.getItem("carro")) || [];
    carro.push(producto);
    localStorage.setItem("carro", JSON.stringify(carro));

    alert(producto.nombre + " agregado al carro");
    // Actualiza el contador en el navbar
    actualizarCarroCount();
  });

  // Eliminar producto en el carro
  $(document).on("click", ".eliminar", function () {
    let carro = JSON.parse(localStorage.getItem("carro")) || [];
    const index = $(this).data("index");
    carro.splice(index, 1);
    localStorage.setItem("carro", JSON.stringify(carro));
    actualizarCarro();
    actualizarCarroCount();
  });

  function actualizarCarroCount(){
    let carro = JSON.parse(localStorage.getItem("carro")) ||[];
    //filtrar el null para evitar errores
    carro = carro.filter(p=> !! p);//elimina los null en el caso de que se encuentren
    $("#carroCount").text(carro.length); //actualiza el numero en el carro de navbar
  }
  $(function (){
    //cualquier pagina que tenga el navbar saldra  el carro actualizado con el numero de productos en el
    actualizarCarroCount();
  })
  // Muestra el contenido del carro 
  actualizarCarro();
  actualizarCarroCount();
});
