let todoItemsContainer = document.getElementById("todoItemsContainer");
const addTodoBtn = document.querySelector(".add-todo-button");
const todoUserInput = document.getElementById("todoUserInput");
const localStorageKeyName = "todos";

const list_array = JSON.parse(localStorage.getItem(localStorageKeyName)) || [];

// to change the styles of the tasks
function striker(labelElement, i) {
  list_array[i].done = !list_array[i].done;
  localStorage.setItem(localStorageKeyName, JSON.stringify(list_array));
  if (list_array[i].done) {
    labelElement.classList.add("striker");
  } else {
    labelElement.classList.remove("striker");
  }
}

function createTodoElement(parent) {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  parent.appendChild(todoElement);
  return todoElement;
}
function createInputElement(parent, i) {
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = `checkboxId_${i}`;
  inputElement.classList.add("checkbox-input");
  if (list_array[i].done) {
    inputElement.checked = true;
  }
  parent.appendChild(inputElement);
  return inputElement;
}
function createLabelContainer(parent) {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("d-flex", "flex-row", "label-container");
  parent.appendChild(labelContainer);
  return labelContainer;
}
function createLabelElement(parent, text, i) {
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", `checkboxId_${i}`);
  if (list_array[i].done) {
    labelElement.classList.add("striker");
  }
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = text;
  parent.appendChild(labelElement);
  return labelElement;
}
function createDeleteButtoncontainer(parent) {
  const deleteButtoncontainer = document.createElement("div");
  deleteButtoncontainer.classList.add("delete-icon-container");
  parent.appendChild(deleteButtoncontainer);
  return deleteButtoncontainer;
}
function createDeleteButton(parent) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-icon");
  deleteButton.textContent = "Delete";
  parent.appendChild(deleteButton);
  return deleteButton;
}

function createTodolist(text, i) {
  const todoElement = createTodoElement(todoItemsContainer);
  const inputElement = createInputElement(todoElement, i);
  const labelContainer = createLabelContainer(todoElement);
  const labelElement = createLabelElement(labelContainer, text, i);
  inputElement.onclick = function () {
    striker(labelElement, i);
  };
  const deleteButtoncontainer = createDeleteButtoncontainer(labelContainer);
  const deleteButton = createDeleteButton(deleteButtoncontainer);
  deleteButton.addEventListener("click", () => {
    todoItemsContainer.removeChild(todoElement);
    const index = list_array.findIndex((todo) => {
      return todo.id === i;
    });
    console.log(index);
    list_array.splice(index, 1);
    localStorage.setItem(localStorageKeyName, JSON.stringify(list_array));
  });
}
// loading for already saved todos
for (let i = 0; i < list_array.length; i++) {
  createTodolist(list_array[i].text, list_array[i].id);
}
addTodoBtn.addEventListener("click", () => {
  const userInput = todoUserInput.value;
  if (userInput.trim() === "") {
    alert("task cannot be empty.");
    return;
  }
  if (list_array.length === 0) {
    list_array.push({
      id: 0,
      text: userInput,
      done: false,
    });
  } else {
    list_array.push({
      id: list_array[list_array.length - 1].id + 1,
      text: userInput,
      done: false,
    });
  }
  createTodolist(userInput, list_array[list_array.length - 1].id);
  localStorage.setItem(localStorageKeyName, JSON.stringify(list_array));
  todoUserInput.value = "";
});
