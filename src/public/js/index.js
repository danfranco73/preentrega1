const socket = io();

socket.on('connect', () => {
    console.log('Connected!');
});

socket.on('disconnect', () => {
    console.log('Disconnected!');
});

socket.on('pushProducts', (data) => {
    updateList(data);
});

const updateList = (data) => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    data.forEach(element => {
        const li = document.createElement('li');
        li.innerText = element.title;
        list.appendChild(li);
    });
}   // I use this to update the list of products in real time

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    socket.emit('newProduct', { title, price, thumbnail });
    form.reset();
}
); // I use this to add a new product to the list of products in real time

const formMessages = document.getElementById('formMessages');
formMessages.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    socket.emit('newMessage', { email, message });
    formMessages.reset();
}
); // I use this to add a new message to the list of messages in real time

socket.on('pushMessages', (data) => {
    updateMessages(data);
});

const updateMessages = (data) => {
    const messages = document.getElementById('messages');
    messages.innerHTML = '';
    data.forEach(element => {
        const li = document.createElement('li');
        li.innerText = element.email + ': ' + element.message;
        messages.appendChild(li);
    });
}   // I use this to update the list of messages in real time

const formProducts = document.getElementById('formProducts');
formProducts.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnails = document.getElementById('thumbnails').value;
    socket.emit('newProduct', { title, price, thumbnails });
    formProducts.reset();
}
); // I use this to add a new product to the list of products in real time

socket.on('pushProducts', (data) => {
    updateProducts(data);
}
);



