let todos = [];

const saveLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getLocalStorage = () => {
  todos = JSON.parse(localStorage.getItem('todos'));
};

const mountProgrammaticElement = (type, className, content) => `<${type} class=${className}>${content}</${type}>`;

const mountTodos = () => {
  const list = document.querySelector('#list');
  list.innerHTML = mountProgrammaticElement('p', 'main__list--separator', 'Completed Todos');
  if (todos) {
    todos.forEach((todo, index) => {
      const newTodo = `<li id=${index} class="main__item">
        <label class="main__item--label"></label>
          <input type="text" class="main__form--input"></input>
          <div class="main__item--buttons">
          <button class="deleteButton">×</button>
          <button class="toggleButton"></button>
          <button onClick="handleEditTodo(event)" class="editButton"></button>
          </div></li>`;
      list.insertAdjacentHTML('afterbegin', newTodo);
      const newTodoElement = document.getElementById(index);
      newTodoElement.children[0].textContent = todo.todoDesc;
      if (todo.completed === true) newTodoElement.classList.add('completed');
      saveLocalStorage();
    });
  }
};

const newTodo = (todoDesc) => {
  const todoToAdd = {
    todoDesc,
    completed: false,
  };
  const newTodoList = todos || [];
  newTodoList.push(todoToAdd);
  todos = newTodoList;
  mountTodos();
};

const deleteTodo = (index) => {
  todos = todos.filter((item) => item !== todos[index]);
};

const toggleCompletedTodo = (index) => {
  const updatedTodo = {
    ...todos[index],
    completed: !todos[index].completed,
  };
  todos[index] = updatedTodo;
  mountTodos();
};

const toggleAllTodos = () => {
  let completedTodos = 0;
  todos.forEach((todo) => {
    if (todo.completed === true) completedTodos += 1;
  });
  for (let i = 0; i < todos.length; i += 1) {
    const allCompleted = (completedTodos === todos.length);
    const updatedTodo = {
      ...todos[i],
      completed: !allCompleted,
    };
    todos[i] = updatedTodo;
  }
  mountTodos();
};

// Handlers

const handleAddEditListeners = (input, e, callback) => {
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      callback(e);
      event.stopImmediatePropagation();
    }
  });
};

const handleRemoveEditListeners = (input, e, callback) => {
  input.removeEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      callback(e);
      event.stopImmediatePropagation();
    }
  });
};

const handleRemoveDOMElement = (id) => {
  const toRemove = document.getElementById(id);
  const list = document.querySelector('#list');
  list.removeChild(toRemove);
};

const handleDeleteTodo = (index, input, e, handleEditTodo) => {
  handleRemoveEditListeners(input, e, handleEditTodo);
  handleRemoveDOMElement(index);
  deleteTodo(index);
  saveLocalStorage();
  mountTodos();
};

const handleEditSaveNewValue = (listItem, newDesc) => {
  todos[listItem.id] = { ...todos[listItem.id], todoDesc: newDesc };
};

const handleEditTodo = (event) => {
  const clickedListItem = event.target.parentNode.parentNode;
  const label = clickedListItem.querySelector('label');
  const input = clickedListItem.querySelector('input[type=text');
  const editing = clickedListItem.classList.contains('editing');
  if (editing) {
    label.innerText = input.value;
    handleEditSaveNewValue(clickedListItem, input.value);
  } else {
    input.value = label.innerText;
    handleEditSaveNewValue(clickedListItem, label.innerText);
  }
  clickedListItem.classList.toggle('editing');
  input.focus();
  handleAddEditListeners(input, event, handleEditTodo);
  saveLocalStorage();
};

const mountDelegatedButtonEventListeners = (list) => {
  list.addEventListener('click', (e) => {
    const input = e.target.parentNode;
    if (e.target.className === 'deleteButton') {
      handleDeleteTodo(input.parentNode.id, input, e, handleEditTodo);
    }
    if (e.target.className === 'toggleButton') {
      toggleCompletedTodo(e.target.parentNode.parentNode.id);
      handleEditTodo(e);
    }
  });
};

const mountStaticEventListeners = () => {
  const newTodoForm = document.querySelector('#newTodo');
  const list = document.querySelector('#list');
  const toggleAllButton = document.querySelector('#toggleAll');
  const toggleNewFormVisibility = document.querySelector('#toggleForm');
  mountDelegatedButtonEventListeners(list);
  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newTodo(e.target[0].value);
    newTodoForm.reset();
    newTodoForm.classList.add('hide');
  });
  toggleAllButton.addEventListener('click', () => toggleAllTodos());
  toggleNewFormVisibility.addEventListener('click', () => {
    newTodoForm.classList.toggle('hide');
    newTodoForm.children[0].focus();
  });
};

getLocalStorage();
mountStaticEventListeners();
mountTodos();
