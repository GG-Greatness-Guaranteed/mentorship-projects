document.getElementById('taskList').addEventListener('dblclick', editTitle);

document.getElementById('addButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const taskList = document.getElementById('taskList');

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

    const newTaskItem = document.createElement('div');
    newTaskItem.classList.add('item');

    const taskText = document.createElement('p');
    taskText.textContent = taskName;

    const taskDate = document.createElement('span');
    taskDate.classList.add('taskDate');

    const dateText = document.createElement('span');
    const date = new Date(selectedDate);
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

    // Resetuj inpute
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

function editTitle(event){
    
    const target = event.target;
    if(target.tagName == 'P'){
        const currentText = target.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;

        target.textContent = '';
        target.appendChild(input);
        input.focus();

        input.addEventListener('blur', function () {
            const newText = input.value.trim();
            target.textContent = newText.length > 0 ? newText : currentText;
        });

        /*input.addEventListener('dblclick', function (e) {
            e.stopPropagation();
        });*/
    }
}

document.getElementById('taskList').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('deleteIcon')) {
        const taskItem = target.closest('.item');
        if (taskItem) {
            taskItem.remove();
        }
    }
});