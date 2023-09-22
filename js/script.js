{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
        document.querySelector(".js-form").reset();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return {
                    ...task,
                    done: !task.done,
                }
            };
            return task;
        });
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const focusNewTask = () => {
        const newTaskButton = document.querySelector(".js-newTaskButton");
        const newTask = document.querySelector(".js-newTask");

        newTaskButton.addEventListener("click", () => {
            newTask.focus();
        });
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                   <button class="list__button list__button--toggleDone js-done"> 
                      ${task.done ? "&#10004" : ""} 
                   </button>
                   <span class="list__content ${task.done ? "list__content--done" : ""}">
                      ${task.content}
                   </span>
                <button class="list__button list__button--remove js-remove"> 
                   &#128465 
                   </button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const allTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindButtonsEvents = () => {
        const toggleAllDoneButton = document.querySelector(".js-allDone");

        if (toggleAllDoneButton) {
            toggleAllDoneButton.addEventListener("click", allTasksDone);
        };

    };

    const renderButtons = () => {
        const containerWithButtons = document.querySelector(".js-buttons");
        const areAllTasksDone = tasks.every((task) => task.done);

        let htmlButtons = "";
        if (tasks.length === 0) {
            htmlButtons = "";
        }
        else {
            htmlButtons = ` 
            <button class="js-allDone"
            ${areAllTasksDone ? "disabled" : ""}> Ukończ wszystkie
            </button>
            `;
        };

        containerWithButtons.innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();
        focusNewTask();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();

}