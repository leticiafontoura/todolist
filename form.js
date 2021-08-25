const form = document.querySelector("[data-js='form']");
const input = document.querySelector("[data-js='to-do']");

const divList = document.querySelector("[data-js='list']");
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
        tbody.insertAdjacentHTML("beforeend", `
    <tr class="list-row" data-js="list-row">
        <td class="list-item" data-js="list-item">${todoItems[i].item}</td>
        <td>
            <button class="done-btn" data-js="done-btn" value="done">done</button>
            <button class="del-btn" data-js="del-btn" value="delete">delete</button>
        </td>
    </tr>
    `)
    }

    const doneBtns = Array.from(document.querySelectorAll("[data-js='done-btn']"));
    const delBtns = Array.from(document.querySelectorAll("[data-js='del-btn']"));
    const listItem = Array.from(document.querySelectorAll("[data-js='list-item']"));
    const listRow = Array.from(document.querySelectorAll("[data-js='list-row']"));

    for (let i = 0; i < doneBtns.length; i++) {
        doneBtns[i].onclick = () => {
            console.log("botao" + (1 + i))
            listItem[i].classList.contains("linethrough") ? listItem[i].classList.remove("linethrough") : listItem[i].classList.add("linethrough");
            doneBtns[i].innerHTML === "done" ? doneBtns[i].innerHTML = "undo" : doneBtns[i].innerHTML = "done";
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
            id: new Date(),
            item: input.value
        });

        console.log(putItems);

        localStorage.setItem("items", JSON.stringify(putItems));
        console.log("saiu")
        return renderItems();
    }

    const arr2 = JSON.parse(localStorage.getItem("items"));
    arr2.push({
        id: new Date(),
        item: input.value
    });
    localStorage.setItem("items", JSON.stringify(arr2));
    console.log("enviado");

    renderItems();

})

renderItems();