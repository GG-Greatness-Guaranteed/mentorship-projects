// trazenje elemenata, globalne promjenjive
// query

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

document.getElementById('addButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const buttonParent = document.querySelector('.dugmadRed');

    const taskName = taskInput.value.trim();

    const selectedDate = dateInput ? dateInput.value : null;

    // Ako nije postavljen datum
    if (!selectedDate) {
        alert('Molimo izaberite datum!');
        return;
    }

    // Ako je unos kraći od 3 karaktera nije validan
    if (taskName.length < 3) {
        alert('Naziv taska mora imati barem 3 karaktera!');
        return;
    }

    if (taskName && selectedDate) {
        console.log(`Dodat task - ${taskName}`);

        const datePickerButton = document.createElement('button');
        datePickerButton.id = 'datePicker';
        datePickerButton.textContent = 'DateTime Picker';
        datePickerButton.style.height = `${dateInput.offsetHeight}px`;
        datePickerButton.style.width = `${dateInput.offsetWidth}px`;
        datePickerButton.style.fontSize = window.getComputedStyle(dateInput).fontSize;

        buttonParent.replaceChild(datePickerButton, dateInput);

        datePickerButton.addEventListener('click', function () {
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.id = 'dateInput';
            dateInput.style.height = `${datePickerButton.offsetHeight}px`;
            dateInput.style.width = `${datePickerButton.offsetWidth}px`;
            dateInput.style.fontSize = window.getComputedStyle(datePickerButton).fontSize;
            buttonParent.replaceChild(dateInput, datePickerButton);
        });

        taskInput.value = '';
    } else {
        alert('Please fill out both the task and date!');
    }
});