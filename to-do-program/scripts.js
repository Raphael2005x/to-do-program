const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');
const errorMensage = document.querySelector('.error');
const tasksContainer = document.querySelector('.tasks-container');
// const nomesCadastrados = [];



const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();
  const name = inputElement.value.trim();

  console.log(inputIsValid);

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  // if (nomesCadastrados.includes(name)) {
  //   inputElement.classList.add("error");
  //   if (errorMensage) { // Verifica se o elemento de mensagem de erro existe
  //     errorMensage.textContent = 'Nome já existe!'; // Define a mensagem de erro
  //   }
  //   return;
  // }

  const taskItemContainer = document.createElement('div');
  taskItemContainer.classList.add('task-item');

  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener('click', () => handleClick(taskContent));

  const deleteItem = document.createElement('i');
  deleteItem.classList.add('fa-regular', 'fa-trash-can');

  deleteItem.addEventListener('click', () => handleDelete(taskItemContainer, taskContent));

  taskItemContainer.appendChild(taskContent);  // Os dois é basicamente isso: // === <div class="task-item"><p>teste</p> <i></i> </div>
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);

  // nomesCadastrados.push(inputElement.value.trim())

  inputElement.value = '';
  updadeLocalStorage();
  // inputElement.textContent = ''; 

};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTasksBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTasksBeingClicked) {
      task.firstChild.classList.toggle('completed');
    }
  }
  updadeLocalStorage();
};

const handleDelete = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentFieldBeingDeleted = task.firstChild.isSameNode(taskContent);

    if (currentFieldBeingDeleted) {
      taskItemContainer.remove();
    }
  }
  updadeLocalStorage();
}

const handleInputChange = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    inputElement.classList.remove('error');
    // errorMensage.textContent = '';
  }
};

const updadeLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains('completed');

    return { description: content.innerText, isCompleted };

  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

}

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalSotrage = JSON.parse(localStorage.getItem('tasks'));

  if(!tasksFromLocalSotrage) return;

  for (const task of tasksFromLocalSotrage) {
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add('completed');
    }

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-regular', 'fa-trash-can');

    deleteItem.addEventListener('click', () => handleDelete(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);  // Os dois é basicamente isso: // === <div class="task-item"><p>teste</p> <i></i> </div>
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  }
}

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener('click', handleAddTask);
inputElement.addEventListener('input', handleInputChange);
