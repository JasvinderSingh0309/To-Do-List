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
  }else{
    clearallbtn.disabled = false;
    
    filterSelect.disabled = false;
    featureBtn.style.opacity = 1;
    
    let flag = false;
    for(let i=0;i<allToDo.length;i++) {
      if(allToDo[i].children[1].innerHTML === "completed") {
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
disable(); // you may need to move it bellow the window load event.

function doneToDo(ele, checked, todo, delbtn) {
  if(ele.classList.contains("bx-circle")) {
    ele.classList.remove("bx-circle");
    ele.classList.add("bxs-check-circle");
    checked.style.opacity = 0.3;
    checked.style.pointerEvents = "none";
    todo.style.textDecoration = "line-through";
    delbtn.textContent = "completed";
    disable();
  }
}

function deleteToDo(e) {
  let lis = document.querySelectorAll(".displayToDos>li");

  // let arr = [...lis];
  // for(let i=0;i<arr.length;i++) {
  //   if(e.target.parentNode === arr[i]) {
  //     arr.splice(i,1);
  //     break;
  //   }
  // }
  // ul.innerHTML = "";
  // arr.forEach( (e) => ul.append(e));

  for(let i=0;i<lis.length;i++) {
    if(e.target.parentNode === lis[i]) {
      ul.removeChild(document.querySelector(`li:nth-child(${i+1})`));
      allToDo.splice(i,1);

      // console.log(allToDo);

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

  let delBtn = document.createElement("button");
  delBtn.textContent = "delete";

  let li = document.createElement("li"); 
  li.classList.add("to-do");

  li.append(contain, delBtn);
  ul.append(li);

  enterToDo.value = "";

  // add events to newly added elements
  uncheck.addEventListener("click", () => {doneToDo(uncheck, li,toDo,delBtn)});

  delBtn.addEventListener("click", deleteToDo);
  allToDo.push(li);

  //===============================================
  // console.log(li.innerHTML);
  // console.log(li.tagName);
  // console.log(li.classList[0]);

  // console.log(allToDo);
  // let strTodo = JSON.stringify(allToDo);
  // console.log(strTodo);
  // console.log(JSON.parse(strTodo)[0] === allToDo[0]);

  let arrObj = allToDo.map(e => {
    return {
      ele:e,
    }
  });
  // console.log(arrObj);

  let string = arrObj.map(e => e.ele);

  console.log(string[0] === li);

  //===================================================
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

  // console.log(allToDo);

  clearCbtn.style.opacity=1;
  disable();
})

clearCbtn.addEventListener("click",() => {
  let pendingToDo = [];
  for(let i=0;i<allToDo.length;i++) {
    if(allToDo[i].children[1].innerHTML === "delete") {
      pendingToDo.push(allToDo[i]);
    }
  }
  allToDo = pendingToDo;

  // console.log(allToDo);

  ul.innerHTML = "";
  for(let i=0;i<allToDo.length;i++) {
    ul.append(allToDo[i]);
  }
  disable();
})

// filter option 
// use local storage
// edit task


// added console log to see the array.