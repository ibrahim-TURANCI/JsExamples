    // Initialize tasksArray with stored data or an empty array
    var tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

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
        
       // Remove the task from the array
    var index = tasksArray.findIndex(task => task.task === taskValue);
    if (index !== -1) {
        tasksArray.splice(index, 1);
           // Log the current state of the tasksArray
        console.log("Tasks Array:", tasksArray);
           // Save the updated array to localStorage
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    }
        };

        // Append delete button to the list item
        listItem.appendChild(deleteBtn);

        // Append the new task to the task list
        var taskList = document.getElementById("taskList");
        taskList.appendChild(listItem);


        tasksArray.push({
            key: tasksArray.length + 1,
            task: taskValue
        });
        console.log(tasksArray);

        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

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

        tasksArray = [];
        // Remove the stored data from localStorage
        localStorage.removeItem('tasksArray');
    }
}
    // Load existing tasks from localStorage on page load
    function loadTasks() {
        var taskList = document.getElementById("taskList");
        tasksArray.forEach(task => {
            var listItem = document.createElement("li");
            listItem.innerHTML = task.task;

            var deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "<i></i>";
            deleteBtn.className = "delete-btn fa-solid fa-xmark";
            deleteBtn.onclick = function () {
            listItem.remove();
                var index = tasksArray.findIndex(t => t.task === task.task);
                if (index !== -1) {
                    tasksArray.splice(index, 1);
                    console.log("Tasks Array:", tasksArray);
                    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
                }
            };

            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);
        });
    }

    // Load existing tasks on page load
    loadTasks();
