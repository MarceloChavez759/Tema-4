// 1. Mostrar productos - Array de productos
const productos = [
    { id: 1, nombre: "Mouse Óptico", precio: 50000 },
    { id: 2, nombre: "Teclado Mecánico", precio: 250000 },
    { id: 3, nombre: "Monitor 24'", precio: 850000 },
    { id: 4, nombre: "Auriculares Gamer", precio: 120000 },
    { id: 5, nombre: "Mouse Pad XL", precio: 35000 }
];

// Inicializar el carrito extrayendo de localStorage o vacío si no existe
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductosDOM = document.getElementById("lista-productos");
const listaCarritoDOM = document.getElementById("lista-carrito");
const inputFiltro = document.getElementById("inputFiltro");
const totalPrecioDOM = document.getElementById("total-precio");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fecha-comprobante").innerText = `Fecha: ${new Date().toLocaleDateString()}`;
    renderizarProductos(productos);
    renderizarCarrito();
});

// Renderizar catálogo de productos
function renderizarProductos(productosParaMostrar) {
    listaProductosDOM.innerHTML = "";
    productosParaMostrar.forEach(prod => {
        const div = document.createElement("div");
        div.className = "producto-card";
        div.innerHTML = `
            <h4>${prod.nombre}</h4>
            <p>Gs. ${prod.precio.toLocaleString()}</p>
            <button onclick="agregarCarrito(${prod.id})">Agregar</button>
        `;
        listaProductosDOM.appendChild(div);
    });
}

// 2. Funcionalidad para agregar al carrito un producto
function agregarCarrito(idProducto) {
    const productoEncontrado = productos.find(p => p.id === idProducto);
    
    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        
        // 3. Guardar todo en localStorage
        actualizarLocalStorage();
        renderizarCarrito();
    }
}

function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 4. Mostrar carrito y Total acumulado
function renderizarCarrito() {
    listaCarritoDOM.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nombre}</span>
            <span>Gs. ${item.precio.toLocaleString()}</span>
        `;
        listaCarritoDOM.appendChild(li);
        total += item.precio;
    });

    totalPrecioDOM.innerText = `Gs. ${total.toLocaleString()}`;
}

// 4. Filtrar productos por el nombre
inputFiltro.addEventListener("input", () => {
    const textoFiltro = inputFiltro.value.toLowerCase();
    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(textoFiltro)
    );
    renderizarProductos(productosFiltrados);
});

function vaciarCarrito() {
    carrito = [];
    actualizarLocalStorage();
    renderizarCarrito();
}

// 5. Generar un documento PDF (Comprobante de compra)
function generarComprobantePDF() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos para generar el comprobante.");
        return;
    }
    window.print();
}