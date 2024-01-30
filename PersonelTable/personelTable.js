const generatedId = generateRandomId();
document.getElementById('generated-id').innerText = `${generatedId}`;
function generateUserId() {
  const generatedId = generateRandomId();
  document.getElementById('generated-id').innerText = `${generatedId}`;
}

function generateRandomId() {
  return Math.floor(1000000 + Math.random() * 9000000); // 7 Haneli Sayı
}



// >>>>>>>  Background 1 to Table   <<<<<<<<



function addUser() {
  // id ile input değerini alma
  var newNo = document.getElementById("generated-id");
  var newID = document.getElementById("generated-id");
  var nameInput = document.getElementById("name");
  var nameValue = nameInput.value.trim();

  var newSurname = document.getElementById("surname");
  var surnameValue = newSurname.value.trim();

  var newTc = document.getElementById("tc");
  var tcValue = newTc.value.trim();

  var newTel = document.getElementById("tel");
  var telValue = newTel.value.trim();

  // Check if the input is not empty
  if (nameValue !== "" & surnameValue !== "" & tcValue !== "") {
    // Yeni SATIR (-1 son satırın altına ekler)
    var table = document.getElementById("personelTable");
    var newRow = table.insertRow(-1);

    //Hücre ekleme
    var noCell = newRow.insertCell(0);
    var idCell = newRow.insertCell(1);
    var nameCell = newRow.insertCell(2);
    var surnameCell = newRow.insertCell(3);
    var tcCell = newRow.insertCell(4);
    var telCell = newRow.insertCell(5);
    var actionCell = newRow.insertCell(6);

    // Set task cell content
    noCell.innerHTML = personelTable.rows.length - 1;
    idCell.innerHTML = newID.textContent;
    nameCell.innerHTML = nameValue;
    surnameCell.innerHTML = surnameValue;
    tcCell.innerHTML = tcValue;
    telCell.innerHTML = telValue;


    var selectedRowIndex = -1;
    //  Düzenle butonu
    var organizeBtn = document.createElement("span");
    organizeBtn.innerHTML = " <i></i> ";
    organizeBtn.className = "fa-regular fa-pen-to-square";
    organizeBtn.onclick = function editUser(row, index) {
      selectedRowIndex = index;

      var idCell = row.cells[1].innerText;
      var nameCell = row.cells[2].innerText;
      var surnameCell = row.cells[3].innerText;
      var tcCell = row.cells[4].innerText;
      var telCell = row.cells[5].innerText;

      document.getElementById("edit-id").value = idCell;
      document.getElementById("edit-name").value = nameCell;
      document.getElementById("edit-surname").value = surnameCell;
      document.getElementById("edit-tc").value = tcCell;
      document.getElementById("edit-tel").value = telCell;
    };
    // Function to update the edited values
    function updateEditedUser() {
      var editedId = document.getElementById("edit-id").value;
      var editedName = document.getElementById("edit-name").value;
      var editedSurname = document.getElementById("edit-surname").value;
      var editedTc = document.getElementById("edit-tc").value;
      var editedTel = document.getElementById("edit-tel").value;

      // Update the values in the selected row
      var table = document.getElementById("personelTable");
      var selectedRow = table.rows[selectedRowIndex]; // Ensure selectedRowIndex is set when clicking the edit button
      selectedRow.cells[1].innerText = editedId;
      selectedRow.cells[2].innerText = editedName;
      selectedRow.cells[3].innerText = editedSurname;
      selectedRow.cells[4].innerText = editedTc;
      selectedRow.cells[5].innerText = editedTel;

      // Clear the inputs in "background2"
      document.getElementById("edit-id").value = "";
      document.getElementById("edit-name").value = "";
      document.getElementById("edit-surname").value = "";
      document.getElementById("edit-tc").value = "";
      document.getElementById("edit-tel").value = "";
    };

    // Create delete button
    var deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = " <i></i> ";
    deleteBtn.className = "delete-btn fa-solid fa-trash";
    deleteBtn.onclick = function () {
      deleteRow(newRow);
    };

    // Düzenle sil butonu hücreye ekleme
    actionCell.appendChild(organizeBtn);
    actionCell.appendChild(deleteBtn);

    // Clear the input field
    nameInput.value = "";
    newSurname.value = "";
    newTc.value = "";
    newTel.value = "";
    const generatedId = generateRandomId();
    document.getElementById('generated-id').innerText = `${generatedId}`;
    // document.getElementById('generated-id').innerText = '';
  } else {
    alert("Gerekli alanları doldurunuz");
  }
}

function deleteRow(row) {
  var table = document.getElementById("personelTable");
  table.deleteRow(row.rowIndex);
}

function deleteAllTasks() {
  var table = document.getElementById("personelTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);  // ilk satır kalana kadar siler
  }
}