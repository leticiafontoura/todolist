const form = document.querySelector("[data-js='form']");
const input = document.querySelector("[data-js='to-do']");
const dateInput = document.querySelector("[data-js='date']");
const timeInput = document.querySelector("[data-js='time']");
const table = document.querySelector("table");

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
        const formatDate = new Date(todoItems[i].id);
        thead.innerHTML = `<th>When</th><th>What</th><th>Action</th>`
    //     tbody.insertAdjacentHTML("beforeend", `
    // <tr class="list-row" data-js="list-row">
       
    //     <td class="date-item" data-js="date-item"><input class="datecell" type="date" readonly value="${formatDate.getFullYear()}-${formatDate.getMonth() + 1 < 10 ? "0" + (formatDate.getMonth() + 1).toString() : formatDate.getMonth() + 1}-${formatDate.getDate() + 1 < 10 ? "0" + (formatDate.getDate() + 1).toString() : formatDate.getDate() + 1}"> </br><input class="inputcelltime" type="time" readonly value="${todoItems[i].time}"></td>
    //     <td class="todo-item" data-js="todo-item"><input class="inputcell" type="text" readonly value="${todoItems[i].item}"></td>
    //     <td class="btns">
    //         <button class="done-btn" data-js="done-btn" value="done"><i class="fas fa-check"></i></button>
    //         <button class="del-btn" data-js="del-btn" value="delete"><i class="fas fa-trash"></i></button>
    //         <button class="edit-btn" data-js="edit-btn" value="edit"><i class="fas fa-pencil-alt"></i></button>
    //         <button class="save-btn" data-js="save-btn" value="save"><i class="fas fa-save"></i></button>
    //     </td>
    // </tr>
    // `)
    tbody.insertAdjacentHTML("beforeend", `
    <tr class="list-row" data-js="list-row">
       
        <td class="date-item" data-js="date-item"><input class="datecell" type="date" readonly value="${formatDate.getFullYear()}-${formatDate.getMonth() + 1 < 10 ? "0" + (formatDate.getMonth() + 1).toString() : formatDate.getMonth() + 1}-${formatDate.getDate() + 1 < 10 ? "0" + (formatDate.getDate() + 1).toString() : formatDate.getDate() + 1}"> </br><input class="inputcelltime" type="time" readonly value="${todoItems[i].time}"></td>
        <td class="todo-item" data-js="todo-item"><input class="inputcell" type="text" readonly value="${todoItems[i].item}"></td>
        <td class="btns">
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
    // const editBtns = Array.from(document.querySelectorAll("[data-js='edit-btn']"));
    const saveBtns = Array.from(document.querySelectorAll("[data-js='save-btn']"));
    // const dateCell = Array.from(document.querySelectorAll("[data-js='date-item']"));
    // const todoCell = Array.from(document.querySelectorAll("[data-js='todo-item']"));
    const listRow = Array.from(document.querySelectorAll("[data-js='list-row']"));
    const todoCellInput = Array.from(document.querySelectorAll(".inputcell"));
    const dateCellInput = Array.from(document.querySelectorAll(".datecell"));
    const timeCellInput = Array.from(document.querySelectorAll(".inputcelltime"));
    const btnsCell = Array.from(document.querySelectorAll(".btns"));


    for (let i = 0; i < doneBtns.length; i++) {
        doneBtns[i].onclick = () => {
            console.log(doneBtns[i].innerHTML)
            console.log("botao" + (1 + i));
            doneBtns[i].classList.toggle("done");
            listRow[i].classList.toggle("strikethrough")
            // listRow[i].classList.contains("linethrough") ? listRow[i].classList.remove("linethrough") : listRow[i].classList.add("linethrough");
            // doneBtns[i].innerHTML === '<i class="far fa-circle" aria-hidden="true"></i>' ? doneBtns[i].innerHTML = '<i class="fas fa-circle" aria-hidden="true"></i>' : doneBtns[i].innerHTML = '<i class="far fa-circle" aria-hidden="true"></i>';
        }

        //EDIT USING BUTTON TO EDIT

        // editBtns[i].onclick = () => {
        //     todoCellInput[i].removeAttribute("readonly");
        //     dateCellInput[i].removeAttribute("readonly");
        //     timeCellInput[i].removeAttribute("readonly");
        //     saveBtns[i].style.display = "inline-block";
        //     todoCellInput[i].classList.add("active");
        //     dateCellInput[i].classList.add("active");
        //     timeCellInput[i].classList.add("active");
        //     todoCellInput[i].focus();
        //     doneBtns[i].remove();
        //     delBtns[i].remove();
        //     if (saveBtns[i].style.display === "none") {
        //         saveBtns[i].style.display = "inline-block"
        //     }
        // }
        
        //EDIT DIRECTLY BY CLICKING ON THE FIELDS YOU WISH TO EDIT
        todoCellInput[i].onclick = () => {
            todoCellInput[i].removeAttribute("readonly");
            dateCellInput[i].removeAttribute("readonly");
            timeCellInput[i].removeAttribute("readonly");
            saveBtns[i].style.display = "inline-block";
            todoCellInput[i].classList.add("active");
            dateCellInput[i].classList.add("active");
            timeCellInput[i].classList.add("active");
            doneBtns[i].remove();
            delBtns[i].remove();
            if (saveBtns[i].style.display === "none") {
                saveBtns[i].style.display = "inline-block"
            }
            if (listRow[i].classList.contains("strikethrough")) {
                listRow[i].classList.remove("strikethrough")
            }
        }

        dateCellInput[i].onclick = () => {
            todoCellInput[i].removeAttribute("readonly");
            dateCellInput[i].removeAttribute("readonly");
            timeCellInput[i].removeAttribute("readonly");
            saveBtns[i].style.display = "inline-block";
            todoCellInput[i].classList.add("active");
            dateCellInput[i].classList.add("active");
            timeCellInput[i].classList.add("active");
            doneBtns[i].remove();
            delBtns[i].remove();
            if (saveBtns[i].style.display === "none") {
                saveBtns[i].style.display = "inline-block"
            }
            if (listRow[i].classList.contains("strikethrough")) {
                listRow[i].classList.remove("strikethrough")
            }
        }

        timeCellInput[i].onclick = () => {
            todoCellInput[i].removeAttribute("readonly");
            dateCellInput[i].removeAttribute("readonly");
            timeCellInput[i].removeAttribute("readonly");
            saveBtns[i].style.display = "inline-block";
            todoCellInput[i].classList.add("active");
            dateCellInput[i].classList.add("active");
            timeCellInput[i].classList.add("active");
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
            todoCellInput[i].readOnly = true;
            todoItems[i] = {
                id: dateCellInput[i].value,
                time: timeCellInput[i].value,
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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (putItems.length === 0) {
        putItems.push({
            id: dateInput.value,
            time: timeInput.value,
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
        time: timeInput.value,
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