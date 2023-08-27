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