let todos = [];

const saveLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getLocalStorage = () => {
  todos = JSON.parse(localStorage.getItem('todos'));
};

const mountProgrammaticElement = (type, className, content) => `<${type} class=${className}>${content}</${type}>`;

const mountEditInput = () => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList.add('main__form--input');
  editInput.setAttribute('placeholder', editInput.value);
  return editInput;
};

const mountSeparator = (list) => {
  const separator = document.querySelector('.main__list--separator');
  if (!separator) {
    list.insertAdjacentHTML('beforeend', mountProgrammaticElement('p', 'main__list--separator', 'Completed Todos'));
  }

  return separator;
};

const createMountedElements = () => {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const div = document.createElement('div');
  return [li, label, div];
};

const createMountedButtons = (buttonDiv) => {
  buttonDiv.insertAdjacentHTML('afterbegin', mountProgrammaticElement('button', 'editButton', ''));
  buttonDiv.insertAdjacentHTML('afterbegin', mountProgrammaticElement('button', 'toggleButton', ''));
  buttonDiv.insertAdjacentHTML('afterbegin', mountProgrammaticElement('button', 'deleteButton', '×'));
  buttonDiv.classList.add('main__item--buttons');
};

const mountTodos = () => {
  const list = document.querySelector('#list');
  list.innerHTML = '';
  if (todos) {
    todos.forEach((todo, index) => {
      const [newTodo, newTodoLabel, newTodoButtons] = createMountedElements();
      newTodoLabel.innerText = `${todo.todoDesc}`;
      newTodoLabel.classList.add('main__item--label');
      newTodo.id = index;
      newTodo.classList.add('main__item');
      newTodo.appendChild(mountEditInput());
      newTodo.appendChild(newTodoLabel);
      newTodo.appendChild(newTodoButtons);
      createMountedButtons(newTodoButtons);
      if (todo.completed === true) {
        newTodo.classList.add('completed');
      }
      list.insertBefore(newTodo, list.firstChild);
      mountSeparator(list);
      // checkDisplaySeparator();
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

const deleteTodo = (position) => {
  const newTodos = [
    ...todos.slice(0, position),
    ...todos.slice(position + 1, todos.length),
  ];
  todos = newTodos;
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
const handleRemoveDOMElement = (id) => {
  const toRemove = document.getElementById(id);
  const list = document.querySelector('#list');
  list.removeChild(toRemove);
};

const handleRemoveDynamicListeners = (input, e, callback) => {
  input.removeEventListener('keydown', (event) => {
    if (event.keyCode === 13) callback(e);
  });
};

const handleDeleteTodo = (index, input, e, handleEditTodo) => {
  handleRemoveDynamicListeners(input, e, handleEditTodo);
  handleRemoveDOMElement(index);
  deleteTodo(index);
  saveLocalStorage();
  mountTodos();
};

const handleAddEditListeners = (input, e, callback) => {
  input.focus();
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      callback(e);
      event.stopImmediatePropagation();
    }
  });
};

const handleEditSaveNewValue = (listItem, newDesc) => {
  todos[listItem.id] = {
    ...todos[listItem.id],
    todoDesc: newDesc,
  };
};

const handleEditTodo = (e) => {
  const clickedListItem = e.target.parentNode.parentNode;
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
  saveLocalStorage();
  handleAddEditListeners(input, e, handleEditTodo);
};

const mountDelegatedButtonEventListeners = (list) => {
  list.addEventListener('click', (e) => {
    const input = e.target.parentNode;
    if (e.target.classList.contains('main__item')) {
      toggleCompletedTodo(parseInt(e.target.id, 10));
    }
    if (e.target.classList.contains('main__item--label')) {
      toggleCompletedTodo(parseInt(input.id, 10));
    }
    if (e.target.className === 'deleteButton') {
      handleDeleteTodo(parseInt(input.parentNode.id, 10), input, e, handleEditTodo);
    }
    if (e.target.className === 'toggleButton') {
      toggleCompletedTodo(parseInt(e.target.parentNode.parentNode.id, 10));
      handleEditTodo(e);
    }
    if (e.target.className === 'editButton') {
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
    const input = e.target[0].value;
    newTodo(input);
    newTodoForm.reset();
    newTodoForm.classList.add('hide');
  });

  toggleAllButton.addEventListener('click', () => {
    toggleAllTodos();
  });

  toggleNewFormVisibility.addEventListener('click', () => {
    newTodoForm.classList.toggle('hide');
    newTodoForm.children[0].focus();
  });
};

getLocalStorage();
mountStaticEventListeners();
mountTodos();
