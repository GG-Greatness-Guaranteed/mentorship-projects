const tasks = []; // id: number, name: string, date: string
const MAX_TASK_NAME_LENGTH = 40;

document.getElementById('addButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');

    const taskName = taskInput.value.trim();
    const selectedDate = dateInput ? dateInput.value : null;

    if (!selectedDate) {
        alert('Molimo izaberite datum!');
        return;
    }
    if (taskName.length < 3) {
        alert('Naziv taska mora imati barem 3 karaktera!');
        return;
    }
    if (taskName.length > MAX_TASK_NAME_LENGTH) {
        alert(`Naziv taska ne smije imati više od ${MAX_TASK_NAME_LENGTH} karaktera!`);
        return;
    }

    const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const task = { id: taskId, name: taskName, date: selectedDate };
    tasks.push(task);

    renderTasks();

    taskInput.value = '';
    if (dateInput) dateInput.value = '';
});

document.getElementById('datePicker').addEventListener('click', function () {
    const datePickerButton = document.getElementById('datePicker');
    const buttonParent = datePickerButton.parentElement;

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateInput';

    dateInput.style.height = `${datePickerButton.offsetHeight}px`;
    dateInput.style.width = `${datePickerButton.offsetWidth}px`;
    dateInput.style.fontSize = window.getComputedStyle(datePickerButton).fontSize;

    buttonParent.replaceChild(dateInput, datePickerButton);
});

document.getElementById('taskList').addEventListener('dblclick', editTitle);

document.getElementById('taskList').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('deleteIcon')) {
        const taskId = parseInt(target.closest('li').dataset.id, 10);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }
});


function editTitle(event) {
    const target = event.target;

    if (target.tagName === 'P') {
        const taskId = parseInt(target.closest('li').dataset.id, 10);
        const task = tasks.find(task => task.id === taskId);
        const currentText = task ? task.name : target.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.maxLength = MAX_TASK_NAME_LENGTH; // Ograničenje znakova

        target.textContent = '';
        target.appendChild(input);
        input.focus();

        input.addEventListener('blur', function () {
            const newText = input.value.trim();

            if (newText.length > 0) {
                if (task) task.name = newText;
                target.textContent = newText;
            } else {
                target.textContent = currentText;
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
}
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const newTaskItem = document.createElement('li');
        newTaskItem.classList.add('item');
        newTaskItem.dataset.id = task.id;

        const taskText = document.createElement('p');
        taskText.textContent = task.name;

        const taskDate = document.createElement('span');
        taskDate.classList.add('taskDate');

        const dateText = document.createElement('span');
        const date = new Date(task.date);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        dateText.innerHTML = `${months[date.getMonth()]}<br>${date.getDate()}`;
        taskDate.appendChild(dateText);

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'resources/trash.png';
        deleteIcon.alt = 'Delete Icon';
        deleteIcon.classList.add('deleteIcon');
        taskDate.appendChild(deleteIcon);

        newTaskItem.appendChild(taskText);
        newTaskItem.appendChild(taskDate);
        taskList.appendChild(newTaskItem);
    });
}
