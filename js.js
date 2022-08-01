class Producto{
    constructor(nombre, precio , stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock  = stock;
    };

    // set and get de las propiedades
    setNombre(nombre){
        this.nombre = nombre;
    };

    setPrecio(precio){
        this.precio = precio;
    };

    setStock(stock){
        this.stock = stock;
    };

    getNombre(){
        return this.nombre;
    };

    getPrecio(){
        return this.precio;
    };

    getStock(){
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
        producto.setNombre(obtenerNombreProducto);
        producto.setPrecio(obtenerPrecio);
        producto.setStock (obtenerStock);
        
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
    let duplicado = baseProductos.filter(prod =>prod.getNombre() === producto.getNombre())

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
    fila.innerHTML = `<td class="nomProd">${producto.getNombre()}</td>
                      <td class="stockProd">${producto.getStock()}</td>
                      <td class ="precioProd">${producto.getPrecio()}</td>
                      <td><button class="btn-danger borrarElemento">Borrar</button></td>
                      <td><button class="btn btn-success editarElemento">Editar</button></td>
                      <td><button class="btn btn-success">comprar</button></td>`;

                      
    let tabla = document.getElementById("tbody");

    tabla.append(fila);
    let botonesBorrar = document.querySelectorAll(".borrarElemento");
    
    for( let boton of botonesBorrar){
        boton.addEventListener("click" , borrar_producto);
    }

    let botonesEditar = document.querySelectorAll(".editarElemento");
    for (let btn_edit of botonesEditar ){
        btn_edit.addEventListener("click",editarProducto);
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
    let duplicado = baseProductos.filter(prod =>prod.getNombre() === tdValorNombre);

    //con el if controlo que no se agregue el mismo nombre del producto. 1= true
    if (duplicado.length ===1){
        // con el for busco la coincidencia para borrar con el metodo splice
        for(var i = baseProductos.length - 1; i >= 0; i--) { 
            if(baseProductos[i].getNombre() === tdValorNombre) 
            { baseProductos.splice(i, 1); } }

        mostrarMensaje("eliminado de la base,","danger");
        document.getElementById("form-productos").reset();
        
    }
    filaDelete.remove();
}

function EditarProducto(e){
    let filaEditar = e.target.parentNode.parentNode;
    let tdValorNombre = filaEditar.firstElementChild.innerHTML;

    let duplicado = baseProductos.filter(prod =>prod.getNombre() === tdValorNombre);
    
    //obtengo los valores a traves de la clase de cada uno de los td.
    let nombre_producto = filaEditar.querySelector(".nomProd").textContent;
    let precio_producto = filaEditar.querySelector(".precioProd").textContent;
    let stock_producto = filaEditar.querySelector(".stockProd").textContent;
  
    if (duplicado.length ===1){
        document.getElementById("nombre").value = nombre_producto;
        document.getElementById("precio").value = precio_producto;
        document.getElementById("stock").value = stock_producto;
        document.getElementById("abm").value = 'Editar';
        elementIndex = baseProductos.findIndex((obj => obj.getNombre() === tdValorNombre));
    }


}
