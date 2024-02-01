const userArray = [];
let maxNo = 0;
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
  maxNo = maxNo + 1;
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
    noCell.innerHTML = maxNo;//personelTable.rows.length - 1;
    idCell.innerHTML = newID.textContent;
    nameCell.innerHTML = nameValue;
    surnameCell.innerHTML = surnameValue;
    tcCell.innerHTML = tcValue;
    telCell.innerHTML = telValue;

    userArray.push({
      no: maxNo,//userArray.length + 1,
      id: newID.textContent,
      name: nameValue,
      surname: surnameValue,
      tc: tcValue,
      tel: telValue
    });
    console.log(userArray);


    //  Düzenle butonu
    var organizeBtn = document.createElement("span");
    organizeBtn.id = maxNo,
      organizeBtn.innerHTML = " <i></i> ";
    organizeBtn.className = "edit-btn fa-regular fa-pen-to-square";
    organizeBtn.onclick = function editUser(row) {
      console.log("row :", row);
      let element = userArray.find(el => el.no === Number(row.target.id))
      console.log("element : ", element);

      var idCell = element.id;
      var nameCell = element.name;
      var surnameCell = element.surname;
      var tcCell = element.tc;
      var telCell = element.tel;

      document.getElementById("edit-id").innerText = idCell;
      document.getElementById("edit-name").value = nameCell;
      document.getElementById("edit-surname").value = surnameCell;
      document.getElementById("edit-tc").value = tcCell;
      document.getElementById("edit-tel").value = telCell;
    };
    // Function to update the edited values


    // Create delete button
    var deleteBtn = document.createElement("span");
    deleteBtn.id = maxNo, //userArray.length - 1;
      deleteBtn.innerHTML = " <i></i> ";
    deleteBtn.className = "delete-btn fa-regular fa-trash-can";
    deleteBtn.onclick = function (e) {
      deleteRow(newRow);

      console.log("e: ", e);

      let index = userArray.findIndex(el => el.no === Number(e.target.id))

      userArray.splice(index, 1)

      console.log("userArray: ", userArray);

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

function updateEditedUser() {
  var editedId = document.getElementById("edit-id").innerText;
  var editedName = document.getElementById("edit-name").value;
  var editedSurname = document.getElementById("edit-surname").value;
  var editedTc = document.getElementById("edit-tc").value;
  var editedTel = document.getElementById("edit-tel").value;

  // Update the values in the selected row
  var table = document.getElementById("personelTable");


  const row = Array.from(table.rows).find(el => el.children[1].innerText === editedId);

  console.log("row : ", row);

  // var selectedRow = table.rows[selectedRowIndex]; // Ensure selectedRowIndex is set when clicking the edit button
  // row.children[1].innerText = editedId;
  row.children[2].innerText = editedName;
  row.children[3].innerText = editedSurname;
  row.children[4].innerText = editedTc;
  row.children[5].innerText = editedTel;

  // Clear the inputs in "background2"
  document.getElementById("edit-id").value = "";
  document.getElementById("edit-name").value = "";
  document.getElementById("edit-surname").value = "";
  document.getElementById("edit-tc").value = "";
  document.getElementById("edit-tel").value = "";
};

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