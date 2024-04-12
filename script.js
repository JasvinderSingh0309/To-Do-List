let enterToDo = document.querySelector(".enter-to-do>input");
let addBtn = document.querySelector(".enter-to-do>button");
let ul = document.querySelector(".displayToDos");
let clearallbtn = document.querySelector(".clearAll");
let clearCbtn = document.querySelector(".clearC");
let filterSelect = document.querySelector(".filter");
let featureBtn = document.querySelector(".moreFeature");

let allToDo = [];

function disable() {
  if(ul.innerHTML === "") {
    clearallbtn.disabled = true;
    clearCbtn.disabled = true;
    filterSelect.disabled = true;
    featureBtn.style.opacity = 0.2;
    clearCbtn.style.opacity=1;
  }else{
    clearallbtn.disabled = false;    
    filterSelect.disabled = false;
    featureBtn.style.opacity = 1;
  
    let flag = false;
    for(let i=0;i<allToDo.length;i++) {
      if(allToDo[i].children[1].children[1].innerHTML === "completed") {
        flag = true;
        break;
      }
    }
    if(flag) {
      clearCbtn.disabled = false;
      clearCbtn.style.opacity=1;
    }else{
      clearCbtn.style.opacity=0.2;
    }
  }
}
disable();

function doneToDo(ele, checked, todo, delbtn, editbtn) {
  if(ele.classList.contains("bx-circle")) {
    ele.classList.remove("bx-circle");
    ele.classList.add("bxs-check-circle");
    checked.style.opacity = 0.3;
    checked.style.pointerEvents = "none";
    todo.style.textDecoration = "line-through";
    delbtn.textContent = "completed";
    editbtn.style.display = "none";
    disable();
  }
}

function deleteToDo(e) {
  let lis = document.querySelectorAll(".displayToDos>li");
  for(let i=0;i<lis.length;i++) {
    if(e.target.parentNode.parentNode === lis[i]) {
      ul.removeChild(document.querySelector(`li:nth-child(${i+1})`));
      allToDo.splice(i,1);
      break;
    }
  }
  disable();
}

function addToDo() {
  let uncheck = document.createElement("i");
  uncheck.classList.add("bx","bx-circle");
  let toDo = document.createElement("span");
  toDo.textContent = enterToDo.value;

  let contain = document.createElement("div");
  contain.append(uncheck,toDo);

  let editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit");
  let delBtn = document.createElement("button");
  delBtn.textContent = "delete";

  let containbtn = document.createElement("div");
  containbtn.append(editBtn,delBtn);

  let li = document.createElement("li"); 
  li.classList.add("to-do");

  li.append(contain, containbtn);
  ul.append(li);

  enterToDo.value = "";

  // add events to newly added elements
  uncheck.addEventListener("click", () => {doneToDo(uncheck, li,toDo,delBtn,editBtn)});
  delBtn.addEventListener("click", deleteToDo);

  function resetToDo({input, fun}) {
    if(input !== "") {
      toDo.innerHTML = input;
      editBtn.textContent = "edit";
      editBtn.removeEventListener("click",fun);
      editBtn.addEventListener("click", handleEdit);
    }
  }

  function handleEdit(e) {
    editBtn.removeEventListener("click",handleEdit);
  
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = toDo.textContent;
  
    toDo.textContent = "";
    toDo.appendChild(input);
  
    editBtn.textContent = "save";
    
    let addInput = e.target.parentNode.parentNode.children[0].children[1].children[0];

    function gettodo() {
      resetToDo({input:addInput.value, fun:gettodo});
    }
    editBtn.addEventListener("click",gettodo);
  }  
  editBtn.addEventListener("click",handleEdit);

  allToDo.push(li);
  disable();
}

function checkToDo() {
  if(allToDo.length) {
    let flag = false;
    for(let i=0;i<allToDo.length;i++) {
      if(allToDo[i].children[0].children[1].innerHTML.toLowerCase() === enterToDo.value.toLowerCase()) {
        alert("Already exist in the list!!");
        flag = true;
        enterToDo.value = "";
        break;
      }
    }
    if(!flag) addToDo();
  }else{
    addToDo();
  }
}

function changeWithFilter(selected) {
  let completedToDo = [];
  for(let i=0;i<allToDo.length;i++) {
    if(allToDo[i].children[1].children[1].textContent === selected) {
      completedToDo.push(allToDo[i]);
      allToDo[i].children[1].children[0].disabled = true;
      allToDo[i].children[1].children[1].disabled = true; 
      allToDo[i].children[0].style.pointerEvents = "none";
    }
  }
  ul.innerHTML = "";
  for(let i=0;i<completedToDo.length;i++) {
    ul.append(completedToDo[i]);
  }
  clearallbtn.disabled = true;
  clearCbtn.disabled = true;
  clearCbtn.style.opacity = 0.2;
  clearallbtn.style.opacity = 0.2;
  addBtn.disabled = true;
  enterToDo.disabled = true;
}

addBtn.addEventListener("click", () => {
  if(enterToDo.value) {
    checkToDo();
  }
})
enterToDo.addEventListener("keydown", (e) => {
  if(e.key === "Enter" && enterToDo.value) {
    checkToDo();
  }
})
clearallbtn.addEventListener("click", () => {
  ul.innerHTML = "";
  allToDo.length = 0;
  disable();
})
clearCbtn.addEventListener("click",() => {
  let pendingToDo = [];
  for(let i=0;i<allToDo.length;i++) {
    if(allToDo[i].children[1].children[1].innerHTML === "delete") {
      pendingToDo.push(allToDo[i]);
    }
  }
  allToDo = pendingToDo;
  ul.innerHTML = "";
  for(let i=0;i<allToDo.length;i++) {
    ul.append(allToDo[i]);
  }
  disable();
})
filterSelect.addEventListener("change",() => {
  let selected = filterSelect.value;
  if(selected === "Completed") {
    changeWithFilter("completed");
  }else if(selected === "Pending") {
    changeWithFilter("delete");
  }else{
    ul.innerHTML = "";
    for(let i=0;i<allToDo.length;i++) {
      ul.append(allToDo[i]);
      if(allToDo[i].children[1].children[1].textContent === "delete") {
        allToDo[i].children[1].children[0].disabled = false;
        allToDo[i].children[1].children[1].disabled = false; 
        allToDo[i].children[0].style.pointerEvents = "";
      }
    }
    clearallbtn.style.opacity = 1;
    addBtn.disabled = false;
    enterToDo.disabled = false;
    disable();
  }
})

