const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks(){

taskList.innerHTML = "";

if(tasks.length === 0){
emptyMessage.style.display = "block";
}else{
emptyMessage.style.display = "none";
}

tasks.forEach((task,index)=>{

let li = document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML = `
<div class="task-left">
<input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
<span>${task.text}</span>
</div>
<button class="delete" data-index="${index}">✖</button>
`;

taskList.appendChild(li);

});

saveTasks();
}


addTaskBtn.addEventListener("click", ()=>{

let text = taskInput.value.trim();

if(text === "") return;

tasks.push({
text:text,
completed:false
});

taskInput.value="";

renderTasks();

});


taskList.addEventListener("click", (e)=>{

if(e.target.type === "checkbox"){

let index = e.target.dataset.index;

tasks[index].completed = e.target.checked;

renderTasks();

}

if(e.target.classList.contains("delete")){

let index = e.target.dataset.index;

tasks.splice(index,1);

renderTasks();

}

});


themeToggle.addEventListener("change", ()=>{

document.body.classList.toggle("dark");

localStorage.setItem("theme", document.body.classList.contains("dark"));

});


function loadTheme(){

let darkMode = localStorage.getItem("theme");

if(darkMode === "true"){

document.body.classList.add("dark");

themeToggle.checked = true;

}

}


loadTheme();
renderTasks();