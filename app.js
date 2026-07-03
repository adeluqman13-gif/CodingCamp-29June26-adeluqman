console.log("JS Connected!");
// ============
// ===================
// TO-DO LIST LIFE DASHBOARD
// ===============================

// Ambil elemen HTML
const greetingText = document.getElementById("greeting-text");
const currentDate = document.getElementById("current-date");
const currentTime = document.getElementById("current-time");

// ===============================
// DATE & TIME
// ===============================

function updateDateTime() {

    const now = new Date();

    // Greeting
    const hour = now.getHours();

    if(hour < 12){
        greetingText.textContent = "☀️ Good Morning";
    }
    else if(hour < 18){
        greetingText.textContent = "🌤️ Good Afternoon";
    }
    else{
        greetingText.textContent = "🌙 Good Evening";
    }

    // Date
    const dateOptions = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    };

    currentDate.textContent =
        now.toLocaleDateString("en-US", dateOptions);

    // Time
    const timeOptions = {
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
    };

    currentTime.textContent =
        now.toLocaleTimeString("en-US", timeOptions);

}

// Jalankan pertama kali
updateDateTime();

// Update setiap detik
setInterval(updateDateTime,1000);

// ===============================
// FOCUS TIMER
// ===============================

const timerDisplay = document.getElementById("timer-display");
const timerStatus = document.getElementById("timer-status");

const startBtn = document.getElementById("timer-start");
const stopBtn = document.getElementById("timer-stop");
const resetBtn = document.getElementById("timer-reset");

// 25 menit
let timerSeconds = 25 * 60;

let timerInterval = null;

function updateTimerDisplay(){

    const minutes = Math.floor(timerSeconds / 60);

    const seconds = timerSeconds % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}
// ===============================
// TODO LIST
// ===============================

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoError = document.getElementById("todo-error");
const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function renderTasks() {

    todoList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = task.completed
            ? "task-item completed"
            : "task-item";

        li.innerHTML = `
            <span class="task-text">${task.text}</span>

            <div class="task-actions">

                <button class="btn-icon edit-btn" data-index="${index}">
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn-icon complete-btn" data-index="${index}">
                    <i class="fas fa-check"></i>
                </button>

                <button class="btn-icon delete-btn" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>

            </div>
        `;

        todoList.appendChild(li);

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressText.textContent = `${completed} / ${total} Tasks Completed`;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;

}
todoForm.addEventListener("submit", function(e){

    e.preventDefault();

    const text = todoInput.value.trim();

    if(text === ""){

        todoError.textContent = "Task cannot be empty.";

        return;

    }

    todoError.textContent = "";
    if(tasks.some(task => task.text.toLowerCase() === text.toLowerCase())){

    todoError.textContent = "Task already exists.";

    return;

    }

    tasks.push({

        text:text,

        completed:false

    });

    todoInput.value = "";
    todoInput.focus();

    renderTasks();

});
todoList.addEventListener("click",function(e){

    const button = e.target.closest("button");

    if(!button) return;

    const index = button.dataset.index;

    if(button.classList.contains("delete-btn")){

        tasks.splice(index,1);

    }

    if(button.classList.contains("complete-btn")){

        tasks[index].completed = !tasks[index].completed;

    }

    if(button.classList.contains("edit-btn")){

        const newTask = prompt("Edit your task:",tasks[index].text);

        if(newTask !== null && newTask.trim() !== ""){

            tasks[index].text = newTask.trim();

        }

    }

    renderTasks();

});
// ===============================
// QUICK LINKS
// ===============================

const linksForm = document.getElementById("links-form");
const linkName = document.getElementById("link-name");
const linkUrl = document.getElementById("link-url");
const linksList = document.getElementById("links-list");
const linksError = document.getElementById("links-error");

let links = JSON.parse(localStorage.getItem("quickLinks")) || [];
function renderLinks(){

    linksList.innerHTML = "";

    links.forEach((link,index)=>{

        const card = document.createElement("div");

        card.className = "link-item";

        card.innerHTML = `
            <a href="${link.url}" target="_blank" class="link-anchor">
                <i class="fas fa-external-link-alt"></i>
                <span>${link.name}</span>
            </a>

            <button class="delete-link" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;

        linksList.appendChild(card);

    });

    localStorage.setItem("quickLinks",JSON.stringify(links));

}
linksForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name = linkName.value.trim();
    const url = linkUrl.value.trim();

    if(name === "" || url === ""){

        linksError.textContent = "Please complete all fields.";

        return;

    }

    linksError.textContent = "";

    links.push({
        name,
        url
    });

    linkName.value = "";
    linkUrl.value = "";

    renderLinks();

});
linksList.addEventListener("click",(e)=>{

    const button = e.target.closest(".delete-link");

    if(!button) return;

    const index = button.dataset.index;

    links.splice(index,1);

    renderLinks();

});
function startTimer(){

    if(timerInterval) return;

    timerStatus.textContent = "🎯 Focusing...";
    timerDisplay.classList.add("timer-running");

    startBtn.disabled = true;

    stopBtn.disabled = false;

    timerInterval = setInterval(()=>{

        timerSeconds--;

        updateTimerDisplay();

        if(timerSeconds <= 0){

            clearInterval(timerInterval);

            timerInterval = null;

            timerStatus.textContent = "🎉 Great Job! Focus Session Completed!";

            timerStatus.classList.add("timer-finished");

            startBtn.disabled = false;

            stopBtn.disabled = true;

            timerDisplay.classList.remove("timer-running");

        }

    },1000);

}

function stopTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

    timerStatus.textContent = "⏸ Timer Paused";

    startBtn.disabled = false;

    stopBtn.disabled = true;
    timerDisplay.classList.remove("timer-running");

}

function resetTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 25 * 60;

    updateTimerDisplay();

    timerStatus.textContent = "Ready to focus";

    startBtn.disabled = false;

    stopBtn.disabled = true;
    timerDisplay.classList.remove("timer-running");

}

startBtn.addEventListener("click",startTimer);

stopBtn.addEventListener("click",stopTimer);

resetBtn.addEventListener("click",resetTimer);

updateTimerDisplay();

renderTasks();

renderLinks();

// ===============================
// DARK MODE
// ===============================

const themeToggle = document.getElementById("theme-toggle");

const body = document.body;

if(localStorage.getItem("theme") === "dark"){

    body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

    }else{

        localStorage.setItem("theme","light");

        themeToggle.innerHTML =
            '<i class="fas fa-moon"></i>';

    }

});