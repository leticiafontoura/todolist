const form = document.querySelector("[data-js='form']");
const input = document.querySelector("[data-js='to-do']");
const list = document.querySelector("[data-js='body-list']");
console.log(list);

function renderItems() {
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
        })
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("enviado");
    list.insertAdjacentHTML("beforeend", `
    <tr class="list-row" data-js="list-row">
        <td class="list-item" data-js="list-item">${input.value}</td>
        <td>
            <button class="done-btn" data-js="done-btn" value="done">done</button>
            <button class="del-btn" data-js="del-btn" value="delete">delete</button>
        </td>
    </tr>
    `)
    renderItems();

})