function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskValue = taskInput.value.trim();

    if (taskValue !== "") {
        // Create a new list item
        var listItem = document.createElement("li");
        listItem.innerHTML = taskValue;

        // Create delete button 
        var deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "<i></i>";
        deleteBtn.className = "delete-btn fa-solid fa-xmark";
        deleteBtn.onclick = function () {
            listItem.remove();
        };

        // Append delete button to the list item
        listItem.appendChild(deleteBtn);

        // Append the new task to the task list
        var taskList = document.getElementById("taskList");
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";
    } else {
        alert("Please enter a task");
    }
}

function deleteAllTasks() {
    var taskList = document.getElementById("taskList");
    // Remove all child nodes (list items) from the task list
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}