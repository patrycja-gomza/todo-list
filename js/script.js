{
    const tasks = [
        {
            content: "zrobić pranie",
            done: false,
        },
        {
            content: "wypić kawę",
            done: true,
        }
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
        document.querySelector(".js-form").reset();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
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

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="container__item">
                <button class="container__item container__item--buttonDone js-done"> ${task.done ? " &#10004 " : ""} </button>
                <button class="container__item container__item--buttonRemove js-remove"> &#128465 </button>
                <span class= ${task.done ? "container__item--done" : ""}>
                ${task.content}
                </span>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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