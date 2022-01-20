let textCamp = document.getElementById("text-box");
let id = 0;
let contGlobal = 0;
let tasks = [];

onload = function reload() {
    //fazer uma verificação, para aux for nulo, não executar o for (concertar a condicional);
    let aux = JSON.parse(localStorage.getItem("tasks"));
    if (aux !== null) {
        for (let i = 0; i < aux.length; i++) {
            addItem(aux[id]);
        }
    }
    console.log(JSON.parse(localStorage.getItem("tasks")));
}

let addBtn = document.getElementById("add_btn").addEventListener("click", () => {
    addItem(textCamp.value);
});
document.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        addItem(textCamp.value);
    }
});
let delBtn = document.getElementById("delete_btn").addEventListener("click", () => {
    dellItems();
});

function addItem(inputValue) {

    if (inputValue === "") {
        alert("Type a valid task");
    } else {
        let listItem = document.createElement("li");
        listItem.setAttribute("id", id);
        listItem.setAttribute("className", id);
        listItem.appendChild(document.createTextNode(inputValue));

        let buttonToDeleteLiCompenet = document.createElement("button");
        buttonToDeleteLiCompenet.setAttribute("id", "removeLiItem");
        buttonToDeleteLiCompenet.appendChild(document.createTextNode("-"));
        buttonToDeleteLiCompenet.addEventListener("click", ()=>{
            let indexAux = parseInt(listItem.getAttribute("id"));
            dellLiItem(indexAux);
        });
        

        listItem.appendChild(buttonToDeleteLiCompenet);
        let list = document.getElementById("list");
        list.appendChild(listItem);

        textCamp.value = ""; // Limpando a caixa de input

        tasks[id] = inputValue;
        id++;
        contGlobal++;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

}

function dellLiItem(index) {
    if(index != null){
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(index, 1);
        let element = document.getElementById(index);
        element.remove();
        contGlobal--;
    }
    storage(tasks);
    updateIdList();
}

function dellItems() {
    localStorage.clear("tasks");

    for (let i = 0; i < tasks.length; i++) {
        let element = document.getElementById(i);
        element.remove();
    }
}

function updateIdList() {
    let newTasks = [];
    let cont = 0;
    for(let i = 0; i<=id; i++) {
        if(document.getElementById(i) !== null) {
            newTasks[cont] = document.getElementById(i);
            cont++;
        }
    }
    console.log('cont: ' + cont);
    for(let i=0; i<cont; i++) {
        newTasks[i].setAttribute("id", i);
    }

    console.log(newTasks);
}

function storage(tasks){
    if(tasks != null){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
