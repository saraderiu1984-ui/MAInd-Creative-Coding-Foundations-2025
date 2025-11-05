const addButton = document.getElementById('add-btn');
const cardButton = document.getElementById('card-view-btn');
const listButton = document.getElementById('list-view-btn');
const toggleDateBtn = document.getElementById('toggle-date-btn');

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list-container');

let showDate = true; // flag per mostrare la data (variabile)

// toggle list view
listButton.addEventListener('click', () => {
    taskList.classList.remove('card-view');
    taskList.classList.add('list-view');
});

// toggle card view
cardButton.addEventListener('click', () => {
    taskList.classList.remove('list-view');
    taskList.classList.add('card-view');
});

// toggle date mostra
toggleDateBtn.addEventListener('click', () => {
    showDate = !showDate;
    const dates = document.querySelectorAll('.date-text');
    dates.forEach(dateEl => {
        dateEl.style.display = showDate ? 'block' : 'none';
    });
});

// add new task
addButton.addEventListener('click', () => {
    const inputValue = taskInput.value;
    if (!inputValue) return; // non aggiungere se vuoto

    const listElement = document.createElement('li');
    const cardColor = document.getElementById('select-color'); 
    const textColor = document.getElementById('select-text-color');
    const deleteElement = document.createElement('button');
    const dateElement = document.createElement('div');

    listElement.style.backgroundColor = cardColor.value;
    listElement.style.color = textColor.value || "black";
    listElement.style.display = 'flex';
    listElement.style.alignItems = 'center';
    listElement.style.justifyContent = 'space-between';
    listElement.style.padding = '0.5rem';

    // contenitore testo + data
    const textContainer = document.createElement('div');
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';

    // testo
    const taskText = document.createElement('span');
    taskText.textContent = inputValue;

    // data presa nel momento in cui si aggiunge la card
    const now = new Date();
    dateElement.textContent = now.toLocaleString();
    dateElement.classList.add('date-text');

    textContainer.appendChild(taskText);
    textContainer.appendChild(dateElement);

    // delete
    deleteElement.textContent = "🛒";
    deleteElement.classList.add('delete-btn');

    listElement.appendChild(textContainer);
    listElement.appendChild(deleteElement);

    taskList.appendChild(listElement);

    // pulizia input
    taskInput.value = '';

    deleteElement.addEventListener('click', () => {
        listElement.remove();
    });

    // nascondi date se è false
    if (!showDate) dateElement.style.display = 'none';
});
