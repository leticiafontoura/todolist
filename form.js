const form = document.querySelector("[data-js='form']");
const input = document.querySelector("[data-js='to-do']");
const dateInput = document.querySelector("[data-js='date']");
const timeInput = document.querySelector("[data-js='time']");
const table = document.querySelector("table");

function renderItems() {

    const todoItems = JSON.parse(localStorage.getItem("items"));
    console.log(todoItems);

    const oldTbody = document.querySelector("tbody");

    if (oldTbody) {
        oldTbody.remove();
        console.log("body removed")
    }

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    console.log("body created");
    for (let i = 0; i < todoItems.length; i++) {
        const formatDate = new Date(todoItems[i].id);
        tbody.insertAdjacentHTML("beforeend", `
    <tr class="list-row" data-js="list-row">
       
        <td class="date-item" data-js="date-item">Due date: <input class="datecell" type="date" readonly value="${formatDate.getFullYear()}-${formatDate.getDate() + 1}-${formatDate.getMonth() + 1}"</td>
        <td class="todo-item" data-js="todo-item"><input class="inputcell" type="text" readonly value="${todoItems[i].item}"></td>
        <td class="btns">
            <button class="done-btn" data-js="done-btn" value="done">done</button>
            <button class="del-btn" data-js="del-btn" value="delete">delete</button>
            <button class="edit-btn" data-js="edit-btn" value="edit">edit</button>
            <button class="save-btn" data-js="save-btn" value="save">save</button>
        </td>
    </tr>
    `)
    }

    const doneBtns = Array.from(document.querySelectorAll("[data-js='done-btn']"));
    const delBtns = Array.from(document.querySelectorAll("[data-js='del-btn']"));
    const editBtns = Array.from(document.querySelectorAll("[data-js='edit-btn']"));
    const saveBtns = Array.from(document.querySelectorAll("[data-js='save-btn']"));
    const dateCell = Array.from(document.querySelectorAll("[data-js='date-item']"));
    const todoCell = Array.from(document.querySelectorAll("[data-js='todo-item']"));
    const listRow = Array.from(document.querySelectorAll("[data-js='list-row']"));
    const todoCellInput = Array.from(document.querySelectorAll(".inputcell"));
    const dateCellInput = Array.from(document.querySelectorAll(".datecell"));
    const btnsCell = Array.from(document.querySelectorAll(".btns"));

    for (let i = 0; i < doneBtns.length; i++) {
        doneBtns[i].onclick = () => {
            console.log("botao" + (1 + i));
            dateCell[i].classList.contains("linethrough") ? dateCell[i].classList.remove("linethrough") : dateCell[i].classList.add("linethrough");
           todoCell[i].classList.contains("linethrough") ?todoCell[i].classList.remove("linethrough") :todoCell[i].classList.add("linethrough");
            doneBtns[i].innerHTML === "done" ? doneBtns[i].innerHTML = "undo" : doneBtns[i].innerHTML = "done";
        }

        editBtns[i].onclick = () => {
            todoCellInput[i].removeAttribute("readonly");
            dateCellInput[i].removeAttribute("readonly");
            todoCellInput[i].classList.add("active");
            dateCellInput[i].classList.add("active");
            todoCellInput[i].focus();
            doneBtns[i].remove();
            delBtns[i].remove();
        }

        saveBtns[i].onclick = () => {
            todoCellInput[i].readOnly = true;
            todoItems[i] = {
                id: dateCellInput[i].value,
                item: todoCellInput[i].value, 
            }
            localStorage.setItem("items", JSON.stringify(todoItems));
            btnsCell[i].appendChild(doneBtns[i]);
            btnsCell[i].appendChild(delBtns[i]);
            renderItems();
        }
    }

    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener("click", (e) => {
            listRow[i].remove();
            todoItems.splice(i, 1);
            localStorage.setItem("items", JSON.stringify(todoItems));
            renderItems();
        })
    }
}

const putItems = JSON.parse(localStorage.getItem("items")) ?? [];
console.log(putItems);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(putItems.length);

    if (putItems.length === 0) {
        putItems.push({
            id: dateInput.value,
            item: input.value
        });

        console.log(putItems);

        localStorage.setItem("items", JSON.stringify(putItems));
        console.log("saiu")
        return renderItems();
    }

    const arr2 = JSON.parse(localStorage.getItem("items"));
    arr2.push({
        id: dateInput.value,
        item: input.value
    });
    localStorage.setItem("items", JSON.stringify(arr2));
    console.log("enviado");

    input.value = "";
    dateInput.value = "";
    timeInput.value = "";
    input.focus();

    renderItems();

})

renderItems();