        function setRandomColor(element) {
            var randomColor = getRandomColor();
            // document.querySelector('.tshirt').style.backgroundColor = randomColor;
            document.querySelector('.tshirt').style.color = randomColor;
                document.getElementById("hex").innerHTML = randomColor;
                document.getElementById("hex").style.color = randomColor;
              }
        

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // function colorCode() {
        //     document.getElementById("hex").innerHTML = randomColor(this);
        //   }



function addColor() {
        // id ile hex kodunu alma
        var newColor = document.getElementById("hex");

        // Check if the input is not empty
        if (newColor !== "") {
            // Yeni SATIR (-1 son satırın altına ekler)
            var table = document.getElementById("taskTable");
            var newRow = table.insertRow(-1);

            // Insert cells for task, use button, and delete button
            var taskCell = newRow.insertCell(0);
            var actionCell = newRow.insertCell(1);

            // Set task cell content
            taskCell.innerHTML = newColor.textContent;

            //  Kullan butonu - KAYITLI hexi kullanma
            var useBtn = document.createElement("span");
            useBtn.innerHTML = "Use";
            useBtn.className = "use-btn";
            useBtn.onclick = function() {
                var useHex = taskCell.innerHTML;
                document.querySelector('.tshirt').style.color = useHex;
                document.getElementById("hex").innerHTML = useHex;
                document.getElementById("hex").style.color = useHex;
            };

            // Create delete button
            var deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = " <i></i> ";
            deleteBtn.className = "delete-btn fa-solid fa-trash";
            deleteBtn.onclick = function() {
                deleteRow(newRow);
            };

            // Append use and delete buttons to action cell
            actionCell.appendChild(useBtn);
            actionCell.appendChild(deleteBtn);


        } else {
            alert("Please enter a task");
        }
    }

    function deleteRow(row) {
        var table = document.getElementById("taskTable");
        table.deleteRow(row.rowIndex);
    }

    function deleteAllTasks() {
        var table = document.getElementById("taskTable");
        while (table.rows.length > 1) {
            table.deleteRow(1);  // ilk satır kalana kadar siler
        }
    }