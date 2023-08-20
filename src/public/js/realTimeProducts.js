// usamos el socket para conectarnos al servidor y actualizar el listado de productos en tiempo real, para eso usamos el evento 'sendProducts' que nos envia el servidor y el metodo updateList que actualiza el listado de productos en tiempo real en el html de la pagina y agregamos tanto un evento al formulario para agregar productos como un evento al formulario para agregar mensajes y los actualizamos en tiempo real en el html de la pagina y tambien un evento para eliminar productos y otro para actualizar productos y los actualizamos en tiempo real en el html de la pagina

const socket = io();

socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
});

socket.on("sendProducts", (data) => {
    updateList(data);
    });
    

const updateList = (data) => {
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element.title;
    list.appendChild(li);
  });
}; // I use this to update the list of products in real time

const form = document.getElementById("addProduct");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const status = document.getElementById("status").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const thumbnails = document.getElementById("thumbnails").value;
  socket.emit("newProduct", {
    title,
    description,
    stock,
    price,
    category,
    code,
    status,
    thumbnails,
  });
  form.reset();
  updateList(data);
});


const formDel = document.getElementById("delProduct");
formDel.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    socket.emit("deleteProduct", id);
    formDel.reset();
    updateList(data);
    });

