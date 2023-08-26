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

// delete product
socket.on("deleteProduct", (id) => {
  const productToDelete = data.find((product) => product.id === id);
  if (productToDelete) {
    data.splice(data.indexOf(productToDelete), 1);
  }
  updateList(data);
});

const data = []; // I use this to store the products

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

// create the delete button for each product in the list of products in real time 
const deleteButtons = document.getElementsByClassName("deleteButton");
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", () => {
    socket.emit("deleteProduct", deleteButtons[i].id);
  });
}


  
