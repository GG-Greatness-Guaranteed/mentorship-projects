let task;

// uzima button, pravi novi input element i replacuje ga
document.getElementById("dateTimeAdd").onclick = function() {
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "open";
    let datePicker = document.getElementById("dateTimeAdd"); // uzima dugme
    datePicker.parentNode.replaceChild(dateInput, datePicker); // replacuje ga
}

document.getElementById("addButton").onclick = function() {
    // uzima se uneseni tekst i ispisuje ga na konzolu
    task = document.getElementById("enteredText").value;

    // ako je unos kraci od 3 karaktera - greska
    if (task.length < 3) {
        alert("Input needs to be at least 3 characters long");
        return; 
    }

    // ako datum nije izabran - greska
    var selectedDate = document.getElementById("open").value;
    if (!selectedDate || task.length < 3) {
        alert("You need to pick a date first");
        return; 
    }

    // uneseni tekst se briše iz textboxa
    document.getElementById("enteredText").value = "";

    // pravi ponovo button datePicker
    let datePicker = document.createElement("button");
    datePicker.type = "submit";
    datePicker.id = "dateTimeAdd";
    datePicker.innerHTML = "<h1> DateTime Picker </h1>";

    // uzima otvoreni kalendar i replacuje ga sa datePicker buttonom
    let openedPicker = document.getElementById("open");
    openedPicker.parentNode.replaceChild(datePicker, openedPicker);

    // ako ponovo kliknemo na dugme, mora opet da se otvori calendar
    // bez ovog dela koda, kalendar mozemo da otvorimo samo prvi put
    datePicker.onclick = function() {
        let dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "open";
        datePicker.parentNode.replaceChild(dateInput, datePicker);
    };

    // u konzoli se ispisuje da je task uspesno dodat
    console.log("Dodat task: ", task);
}


