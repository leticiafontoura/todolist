const form = document.querySelector("[data-js='form']");
const toDoFormInput = document.querySelector("[data-js='to-do']");
const dateFormInput = document.querySelector("[data-js='date']");
const timeFormInput = document.querySelector("[data-js='time']");
const table = document.querySelector("table");
const body = document.querySelector("body");

function renderItems() {

    const todoItems = JSON.parse(localStorage.getItem("items"));

    const oldTbody = document.querySelector("tbody");
    const oldThead = document.querySelector("thead");

    if (oldTbody) {
        oldTbody.remove();
    }

    if (oldThead) {
        oldThead.remove();
    }

    const tbody = document.createElement("tbody");
    const thead = document.createElement("thead");
    table.appendChild(thead);
    table.appendChild(tbody);
    for (let i = 0; i < todoItems.length; i++) {
        const formatDate = new Date(todoItems[i].date);
        thead.innerHTML = `<th>When</th><th>What</th><th>Action</th>`

    tbody.insertAdjacentHTML("beforeend", `
    <tr class="list-row" data-js="list-row">
       
        <td label="When" class="date-time-cell" data-js="date-time-cell">
        <input class="date-input" data-js="date-input" type="date" readonly value="${formatDate.getFullYear()}-${formatDate.getMonth() + 1 < 10 ? "0" + (formatDate.getMonth() + 1).toString() : formatDate.getMonth() + 1}-${formatDate.getDate() + 1 < 10 ? "0" + (formatDate.getDate() + 1).toString() : formatDate.getDate() + 1}">
        </br>
        <input class="time-input" data-js="time-input" type="time" readonly value="${todoItems[i].time}"></td>
        <td label="What" class="todo-cell" data-js="todo-cell"><div class="todo-item" data-js="todo-item" readonly>${todoItems[i].item}</div></td>
        <td label="Action" class="btns" data-js="btns">
            <button class="done-btn" data-js="done-btn" value="done"><i class="fas fa-check"></i></button>
            <button class="del-btn" data-js="del-btn" value="delete"><i class="fas fa-trash"></i></button>
            <button class="save-btn" data-js="save-btn" value="save"><i class="fas fa-save"></i></button>
        </td>
    </tr>
    `)

        Array.from(document.querySelectorAll("[data-js='save-btn']"))[i].style.display = "none";

    }

    const doneBtns = Array.from(document.querySelectorAll("[data-js='done-btn']"));
    const delBtns = Array.from(document.querySelectorAll("[data-js='del-btn']"));
    const saveBtns = Array.from(document.querySelectorAll("[data-js='save-btn']"));
    const listRow = Array.from(document.querySelectorAll("[data-js='list-row']"));
    const toDoItem = Array.from(document.querySelectorAll("[data-js='todo-item']"));
    const tableDateInput = Array.from(document.querySelectorAll("[data-js='date-input']"));
    const tableTimeInput = Array.from(document.querySelectorAll("[data-js='time-input']"));
    const btnsCell = Array.from(document.querySelectorAll("[data-js='btns']"));



    for (let i = 0; i < doneBtns.length; i++) {
        doneBtns[i].onclick = () => {
            doneBtns[i].classList.toggle("done");
            listRow[i].classList.toggle("strikethrough");
            
            if (listRow[i].classList.contains("strikethrough")) {
                todoItems[i] = {
                    date: tableDateInput[i].value,
                    time: tableTimeInput[i].value,
                    item: toDoItem[i].textContent,
                    done: true
                };
            } else {
                todoItems[i] = {
                    date: tableDateInput[i].value,
                    time: tableTimeInput[i].value,
                    item: toDoItem[i].textContent,
                    done: false
                };
            }

            localStorage.setItem("items", JSON.stringify(todoItems));
            
        }

    
        //EDIT DIRECTLY BY CLICKING ON THE FIELDS YOU WISH TO EDIT
        toDoItem[i].onclick = () => {
            toDoItem[i].removeAttribute("readonly");
            saveBtns[i].style.display = "inline-block";
            toDoItem[i].setAttribute("contenteditable", "true")
            doneBtns[i].remove();
            console.log("clicou")
            delBtns[i].remove();
            toDoItem[i].focus();
            if (saveBtns[i].style.display === "none") {
                saveBtns[i].style.display = "inline-block"
            }
            if (listRow[i].classList.contains("strikethrough")) {
                listRow[i].classList.remove("strikethrough")
            }
        }

        tableDateInput[i].onclick = () => {
            toDoItem[i].removeAttribute("readonly");
            tableDateInput[i].removeAttribute("readonly");
            tableTimeInput[i].removeAttribute("readonly");
            saveBtns[i].style.display = "inline-block";
            doneBtns[i].remove();
            delBtns[i].remove();
            if (saveBtns[i].style.display === "none") {
                saveBtns[i].style.display = "inline-block"
            }
            if (listRow[i].classList.contains("strikethrough")) {
                listRow[i].classList.remove("strikethrough")
            }
        }

        tableTimeInput[i].onclick = () => {
            toDoItem[i].removeAttribute("readonly");
            tableDateInput[i].removeAttribute("readonly");
            tableTimeInput[i].removeAttribute("readonly");
            saveBtns[i].style.display = "inline-block";
            doneBtns[i].remove();
            delBtns[i].remove();
            if (saveBtns[i].style.display === "none") {
                saveBtns[i].style.display = "inline-block"
            }
            if (listRow[i].classList.contains("strikethrough")) {
                listRow[i].classList.remove("strikethrough")
            }
        }

        saveBtns[i].onclick = () => {
            toDoItem[i].readOnly = true;
            todoItems[i] = {
                date: tableDateInput[i].value,
                time: tableTimeInput[i].value,
                item: toDoItem[i].textContent, 
                done:  todoItems[i].done
            };
            if (todoItems[i].done === true) {
                listRow[i].classList.add("strikethrough")
            }
            toDoItem[i].setAttribute("readonly", "");
            tableDateInput[i].setAttribute("readonly", "");
            tableTimeInput[i].setAttribute("readonly", "");
            localStorage.setItem("items", JSON.stringify(todoItems));
            console.log("oi")
            btnsCell[i].appendChild(doneBtns[i]);
            btnsCell[i].appendChild(delBtns[i]);
            if (saveBtns[i].style.display === "inline-block") {
                saveBtns[i].style.display = "none"
            }
        }

            // function saveItems () {
            //     toDoItem[i].readOnly = true;
            //     todoItems[i] = {
            //         date: tableDateInput[i].value,
            //         time: tableTimeInput[i].value,
            //         item: toDoItem[i].textContent, 
            //         done:  todoItems[i].done
            //     };
            //     if (todoItems[i].done === true) {
            //         listRow[i].classList.add("strikethrough")
            //     }
            //     toDoItem[i].setAttribute("readonly", "");
            //     tableDateInput[i].setAttribute("readonly", "");
            //     tableTimeInput[i].setAttribute("readonly", "");
            //     localStorage.setItem("items", JSON.stringify(todoItems));
            //     btnsCell[i].appendChild(doneBtns[i]);
            //     btnsCell[i].appendChild(delBtns[i]);
                
            //     if (saveBtns[i].style.display === "inline-block") {
            //         saveBtns[i].style.display = "none"
            //     }
                
            // }

        window.addEventListener("click", () => {
            toDoItem[i].readOnly = true;
            todoItems[i] = {
                date: tableDateInput[i].value,
                time: tableTimeInput[i].value,
                item: toDoItem[i].textContent, 
                done:  todoItems[i].done
            };
            if (todoItems[i].done === true) {
                listRow[i].classList.add("strikethrough")
            }
            toDoItem[i].setAttribute("readonly", "");
            tableDateInput[i].setAttribute("readonly", "");
            tableTimeInput[i].setAttribute("readonly", "");
            localStorage.setItem("items", JSON.stringify(todoItems));
            // btnsCell[i].appendChild(doneBtns[i]);
            // btnsCell[i].appendChild(delBtns[i]);
            
            // if (saveBtns[i].style.display === "inline-block") {
            //     saveBtns[i].style.display = "none"
            // }
        })
    }

    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener("click", () => {
            listRow[i].remove();
            todoItems.splice(i, 1);
            localStorage.setItem("items", JSON.stringify(todoItems));
        })
    }
    
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].done === true) {
            doneBtns[i].classList.toggle("done");
            listRow[i].classList.toggle("strikethrough");
        }
    }
}


const initialDataObj = JSON.parse(localStorage.getItem("items")) ?? [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (initialDataObj.length === 0) {
        initialDataObj.push({
            date: dateFormInput.value,
            time: timeFormInput.value,
            item: toDoFormInput.value,
            done: false
        });

        localStorage.setItem("items", JSON.stringify(initialDataObj));
        return renderItems();
    }

    const currentDataObj = JSON.parse(localStorage.getItem("items"));
    currentDataObj.push({
        date: dateFormInput.value,
        time: timeFormInput.value,
        item: toDoFormInput.value,
        done: false
    });
    localStorage.setItem("items", JSON.stringify(currentDataObj));

    toDoFormInput.value = "";
    dateFormInput.value = "";
    timeFormInput.value = "";
    toDoFormInput.focus();

    renderItems();

})

renderItems();