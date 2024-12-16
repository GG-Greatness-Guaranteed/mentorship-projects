// DATE BUTTON
document.getElementById("dateTimeAdd").addEventListener("click", function() {
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "open";
    let datePicker = document.getElementById("dateTimeAdd"); // uzima dugme
    datePicker.parentNode.replaceChild(dateInput, datePicker); // replacuje ga
});

// ADD BUTTON
document.getElementById("addButton").addEventListener("click", function() {

    task = document.getElementById("enteredText").value; // uzima se uneseni tekst

    if (task.length < 3) { // ako je unos kraci od 3 karaktera - greska
        alert("Input needs to be at least 3 characters long");
        return;
    }

    var selectedDateInput = document.getElementById("open");
    // ako nije unesen date - greska
    if (!selectedDateInput || !selectedDateInput.value) {
        alert("You need to pick a date first");
        return;
    }
    let selectedDate = selectedDateInput.value;

    document.getElementById("enteredText").value = ""; // brisanje iz textboxa

    // pravljenje novog div-a i postavljanje imena
    let newTask = document.createElement("div")
    newTask.classList.add("task"); // podesavanje tipa klase
    let taskName = document.createElement("h1");
    taskName.textContent = task;

    // pravljenje ljubicastog buttona
    let dateButton = document.createElement("button");
    dateButton.classList.add("taskDate");

    // formatiranje datuma
    let date = new Date(selectedDate);
    let monthName = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate();
    let monthElement = document.createElement("h2");
    monthElement.textContent = monthName;
    let dayElement = document.createElement("h1");
    dayElement.textContent = day;

    // dodavanje meseca i dana na ljubicasti button
    dateButton.appendChild(monthElement);
    dateButton.appendChild(dayElement);

    // dodavanje svega toga u novi task
    newTask.appendChild(taskName);
    newTask.appendChild(dateButton);

    // dodavanje novog taska u blok sa taskovima
    document.querySelector(".tasks").appendChild(newTask);

    // pravi ponovo button datePicker
    let datePicker = document.createElement("button");
    datePicker.type = "submit";
    datePicker.id = "dateTimeAdd";
    datePicker.innerHTML = "<h1> DateTime Picker </h1>";

    // uzima otvoreni kalendar i replacuje ga sa datePicker buttonom
    let openedPicker = document.getElementById("open");
    openedPicker.parentNode.replaceChild(datePicker, openedPicker);

    // ako ponovo kliknemo na dugme, mora opet da se otvori calendar
    datePicker.addEventListener("click", function() {
        let dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "open";
        datePicker.parentNode.replaceChild(dateInput, datePicker);
    });

    // u konzoli se ispisuje da je task uspesno dodat
    console.log("Dodat task: ", task);
});

// BRISANJE TASKA - query se koristi za klase (uzima prvi element te klase)
document.querySelector(".tasks").addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        let taskDiv = event.target.parentElement; 
        taskDiv.remove(); 
}});

// DOUBLE KLIK NA TEKST TASKA
document.querySelector('.tasks').addEventListener('dblclick', function(event) {

    if (event.target.matches('h1')) {
      let title = event.target; // uzima h1 element
      let currentText = title.textContent; // uzima trenutni tekst
  
      // kreiranje i postavljanje input polja
      let input = document.createElement('input');
      input.type = 'text';
      input.id = 'nameChange';
      input.value = currentText;
      title.replaceWith(input);  // replacing
      input.focus(); // fokusira se

      // kada se klikne negde drugde (blur) pravi se novi element
      input.addEventListener('blur', function() {
        let newTitle = document.createElement('h1');
        newTitle.classList.add('taskName');
        newTitle.textContent = input.value; 
        input.replaceWith(newTitle);  // replacuje se nazad
      });
    }
  });
