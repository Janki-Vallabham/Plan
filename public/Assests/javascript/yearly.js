const taskinput= document.querySelector(".task-input input");
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskbox = document.querySelector(".task-box");

let editID;
let isEditedTask = false;

//getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showtodo(btn.id);
    });
});

function showtodo(filter) {
    let li="";
    if( todos){
    todos.forEach((todo, id) => {
    //if todo status is completed ,set the isCompleted value to checked
    let isCompleted = todo.status == "completed" ? "checked" : "";
    if(filter== todo.status|| filter == "all" ){
     li += `<li class="task">
        <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
            <p class="${isCompleted}">${todo.name}</p>
        </label>
        <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
                <li onclick="editTask(${id} , '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
            </ul>
        </div>
    </li>`;
    }
        
    });
}
    taskbox.innerHTML = li||`<span>You don't have any task here</span>`;
}
showtodo("all");


function showMenu(selectedtask) {
    // console.log(selectedtask);
    //getting task menu div
    let taskMenu= selectedtask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",e =>{
        //removing show class from the task menu on the document click
        if(e.target.tagName != "I" || e.target != selectedtask) {
            taskMenu.classList.remove("show");
        }
    })
}

function deleteTask(deleteID) {
    todos.splice(deleteID,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showtodo("all");

}

clearAll.addEventListener("click", () => {
    isEditedTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showtodo()
});

function editTask(taskId ,taskname){
    editID = taskId;
    isEditedTask= true;
   taskinput.value= taskname;
    
}

function updateStatus(selectedtask){
    //getting paragraph that contains task name
   let taskname = selectedtask.parentElement.lastElementChild;
   if(selectedtask.checked){
    taskname.classList.add("checked");
    //updating the status of selected task to completed
    todos[selectedtask.id].status = "completed";
   }else{
    taskname.classList.remove("checked");
    //updating the status of selected task to pending
    todos[selectedtask.id].status="pending";

   }
   localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskinput.addEventListener("keyup",e=>{
   let usertask= taskinput.value.trim();
   if(e.key=="Enter" && usertask) {
      if(!isEditedTask) { //if isEdited not true
         if(!todos){//if todos doesnt exist pass empty array
           todos=[];
          }
          let taskinfo={ name:usertask,status:"pending"};
          todos.push(taskinfo);//adding new task to todos
       }
       else{
            isEditedTask = false;
            todos[editID].name = usertask;
       }

    taskinput.value ="";
     localStorage.setItem("todo-list",JSON.stringify(todos)) ;
     showtodo("all");
   }
});