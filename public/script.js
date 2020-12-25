let item = document.getElementById('item');
item.classList.add('item')
item.innerHTML = 'click'

item.addEventListener('click', (event) => clickMe(event))

clickMe = (event) => {
    alert('hello world')
}