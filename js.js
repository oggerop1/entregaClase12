class Producto{
    constructor(nombre, precio , stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock  = stock;
    };

    // set and get de las propiedades
    set_nombre(nombre){
        this.nombre = nombre;
    };

    set_precio(precio){
        this.precio = precio;
    };

    set_stock(stock){
        this.stock = stock;
    };

    get_nombre(){
        return this.nombre;
    };

    get_precio(){
        return this.precio;
    };

    get_stock(){
        return this.stock;
    };

    eliminarProducto(elemento){

    }
};

document.getElementById("form-productos").addEventListener("submit", function(e){
    // obtengo los valores del formulario ingresados por el usuario
    let obtenerNombreProducto   = document.getElementById("nombre").value;
    let obtenerPrecio           = document.getElementById("precio").value;
    let obtenerStock            = document.getElementById("stock").value;

    // 
    if(obtenerNombreProducto==='' || obtenerPrecio==='' || obtenerStock ==='' ){
        mostrarMensaje("ingrese los datos solicitados", "danger")
    }else if(document.getElementById("abm").value ==="Agregar"){
        // alta
        // instancia de la clase producto
        const producto = new Producto ();
        producto.set_nombre(obtenerNombreProducto);
        producto.set_precio(obtenerPrecio);
        producto.set_stock (obtenerStock);
        
        // llamo funcion para agregar en un array el producto
        agregarProductosBase(producto);
        // con e cancelo el evento que refresca la pagina automaticamente.
        e.preventDefault();
    }else{
        //editar
        
        //elementIndex = baseProductos.findIndex((obj => obj.get_nombre() === ));
        
        baseProductos[elementIndex].nombre = obtenerNombreProducto;
        baseProductos[elementIndex].precio = obtenerPrecio;
        baseProductos[elementIndex].stock  = obtenerStock;
        console.log(baseProductos);
        document.getElementById("tablaProductos").onload;
        document.getElementById("abm").value = 'Agregar';
        document.getElementById("form-productos").reset();
    }
});

let baseProductos = []; //creo array vacio
let elementIndex = 0;
function agregarProductosBase(producto){
    // con filter verifica si lo que ingresó esta en el arrary 
    let duplicado = baseProductos.filter(prod =>prod.get_nombre() === producto.get_nombre())

    //con el if controlo que no se agregue el mismo nombre del producto. 1= true
    if (duplicado.length ===1){
        mostrarMensaje("Producto ya creado con ese nombre, por favor ingrese otro Nombre!!,","danger");
        //document.getElementById("form-productos").reset();
        
    }else{
        // agrego al arrary con push
        baseProductos.push(producto); 
        mostrarMensaje("producto ingresado correctamente","success");
        agregarProductosTabla(producto);
        document.getElementById("form-productos").reset();
    }
}

function agregarProductosTabla(producto){      
    let fila = document.createElement("tr");
    fila.innerHTML = `<td class="nomProd">${producto.get_nombre()}</td>
                      <td class="stockProd">${producto.get_stock()}</td>
                      <td class ="precioProd">${producto.get_precio()}</td>
                      <td><button class="btn-danger borrar_elemento">Borrar</button></td>
                      <td><button class="btn btn-success Editar_elemento">Editar</button></td>
                      <td><button class="btn btn-success">comprar</button></td>`;

                      
    let tabla = document.getElementById("tbody");

    tabla.append(fila);
    let botones_borrar = document.querySelectorAll(".borrar_elemento");
    
    for( let boton of botones_borrar){
        boton.addEventListener("click" , borrar_producto);
    }

    let botones_editar = document.querySelectorAll(".Editar_elemento");
    for (let btn_edit of botones_editar ){
        btn_edit.addEventListener("click",editar_producto);
    }
}

function mostrarMensaje(mensaje, claseBT){
    const div = document.createElement('div');              // creo el div
    div.className= 'alert alert-' +claseBT+ ' mt-2';        // le creo la clase BT 
    div.appendChild(document.createTextNode(mensaje));      // creo el nodo
    const container = document.querySelector('.container'); // obtengo el conteiner
    const row = document.querySelector('.row');             // obtengo el row
    container.insertBefore(div, row);                       // le indico que inserte el div entre el container y el row

    // seteo el tiempo que tiene que mostrarse el mensaje
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}


function borrar_producto(e){
    let filaDelete = e.target.parentNode.parentNode;
    let tdValorNombre = filaDelete.firstElementChild.innerHTML;
    let duplicado = baseProductos.filter(prod =>prod.get_nombre() === tdValorNombre);

    //con el if controlo que no se agregue el mismo nombre del producto. 1= true
    if (duplicado.length ===1){
        // con el for busco la coincidencia para borrar con el metodo splice
        for(var i = baseProductos.length - 1; i >= 0; i--) { 
            if(baseProductos[i].get_nombre() === tdValorNombre) 
            { baseProductos.splice(i, 1); } }

        mostrarMensaje("eliminado de la base,","danger");
        document.getElementById("form-productos").reset();
        
    }
    filaDelete.remove();
}

function editar_producto(e){
    let filaEditar = e.target.parentNode.parentNode;
    let tdValorNombre = filaEditar.firstElementChild.innerHTML;

    let duplicado = baseProductos.filter(prod =>prod.get_nombre() === tdValorNombre);
    
    //obtengo los valores a traves de la clase de cada uno de los td.
    let nombre_producto = filaEditar.querySelector(".nomProd").textContent;
    let precio_producto = filaEditar.querySelector(".precioProd").textContent;
    let stock_producto = filaEditar.querySelector(".stockProd").textContent;
  
    if (duplicado.length ===1){
        document.getElementById("nombre").value = nombre_producto;
        document.getElementById("precio").value = precio_producto;
        document.getElementById("stock").value = stock_producto;
        document.getElementById("abm").value = 'Editar';
        elementIndex = baseProductos.findIndex((obj => obj.get_nombre() === tdValorNombre));
    }


}
