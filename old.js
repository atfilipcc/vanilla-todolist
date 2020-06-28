let todos = [{
  todoDesc: 'hi',
  completed: false,
}];

// const saveLocalStorage = () => {
//   localStorage.setItem('todos', JSON.stringify(todos));
// };

// const getLocalStorage = () => {
//   todos = JSON.parse(localStorage.getItem('todos'));
// };

// Create dynamic elements
const mountToggleButton = () => {
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '✓';
  toggleButton.className = 'toggleButton';
  return toggleButton;
};

const mountEditButton = () => {
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'editButton';
  return editButton;
};

const mountDeleteButton = () => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✕';
  deleteButton.className = 'deleteButton';
  return deleteButton;
};

const mountSeparator = () => {
  const separator = document.querySelector('.main__list--separator');
  if (!separator) {
    const newSeparator = document.createElement('div');
    newSeparator.textContent = 'Completed Todos';
    newSeparator.classList.add('main__list--separator');
    return newSeparator;
  }
  return separator;
};

const displaySeparator = () => {
  const separator = document.querySelector('.main__list--separator');
  if (separator) {
    const completedTodos = document.querySelector('li.completed');
    if (completedTodos === null) {
      separator.classList.add('hide');
    } else {
      separator.classList.remove('hide');
    }
  }
};

const mountEditInput = () => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList.add('main__form--input');
  editInput.setAttribute('placeholder', editInput.value);
  return editInput;
};

const createMountedElements = () => {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const div = document.createElement('div');
  return [li, label, div];
};

const createMountedButtons = (buttonDiv) => {
  buttonDiv.appendChild(mountEditButton());
  buttonDiv.appendChild(mountToggleButton());
  buttonDiv.appendChild(mountDeleteButton());
  buttonDiv.classList.add('main__item--buttons');
};

const mountTodos = () => {
  const list = document.querySelector('#list');
  list.innerHTML = '';
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
    if (todo.completed === true) newTodo.classList.add('completed');
    list.insertBefore(newTodo, list.firstChild);
    list.appendChild(mountSeparator());
    displaySeparator();
    // saveLocalStorage();
  });
};

// Todo functions
const newTodo = (todoDesc) => {
  const todoToAdd = {
    todoDesc,
    completed: false,
  };
  // const newTodoList = todos.slice();
  // newTodoList.push(todoToAdd);
  // todos = newTodoList;
  todos.push(todoToAdd);
};

const deleteTodo = (position) => {
  const newTodos = [
    ...todos.slice(0, position),
    ...todos.slice(position + 1, todos.length),
  ];
  todos = newTodos;
};

const toggleCompletedTodo = (index) => {
  const todo = todos[index];
  // const updatedTodo = {
  //   ...todos[index],
  //   completed: !todos[index].completed,
  // };
  // todos[index] = updatedTodo;
  todo.completed = !todo.completed;
};

const toggleAllTodos = () => {
  let completedTodos = 0;

  todos.forEach((todo) => {
    if (todo.completed === true) completedTodos += 1;
  });
  for (let i = 0; i < todos.length; i += 1) {
    const completed = completedTodos === todos.length;
    todos[i].completed = !completed;
  }
  mountTodos();
};

// Handlers
const handleNewTodo = (todoDesc) => {
  newTodo(todoDesc);
  mountTodos();
};

const handleRemoveEditListeners = (input, e, callback) => {
  input.removeEventListener('keydown', (event) => {
    if (event.keyCode === 13) callback(e);
  });
  // input.removeEventListener('blur', () => callback(e));
};

const handleDeleteTodo = (position, input, e, handleEditTodo) => {
  deleteTodo(position);
  handleRemoveEditListeners(input, e, handleEditTodo);
  mountTodos();
  // saveLocalStorage();
};
const handleToggleCompleted = (index) => {
  toggleCompletedTodo(index);
  mountSeparator();
  mountTodos();
};

const handleChangeEditButton = (listItem) => {
  const button = listItem.querySelector('.editButton');
  const text = button.textContent === 'Edit' ? 'Save' : 'Edit';
  button.textContent = text;
};

const handleAddEditListeners = (input, e, callback) => {
  input.focus();
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      callback(e);
      event.stopImmediatePropagation();
    }
  });
  // input.addEventListener('blur', (event) => {
  //   console.log(event.target.querySelector('.editButton'));
  //   callback(e);
  // });
};

const handleEditTodo = (e) => {
  const clickedListItem = e.target.parentNode.parentNode;
  const label = clickedListItem.querySelector('label');
  const input = clickedListItem.querySelector('input[type=text');
  const editing = clickedListItem.classList.contains('editing');
  handleChangeEditButton(clickedListItem);
  if (editing) {
    label.innerText = input.value;
  } else {
    input.value = label.innerText;
  }
  clickedListItem.classList.toggle('editing');
  handleAddEditListeners(input, e, handleEditTodo);
};

const mountButtonEventListeners = (list) => {
  list.addEventListener('click', (e) => {
    const input = e.target.parentNode.parentNode;
    if (e.target.className === 'deleteButton') {
      handleDeleteTodo(parseInt(input.id, 10), input, e, handleEditTodo);
    }
    if (e.target.className === 'toggleButton') {
      list.classList.toggle('completed');
      handleToggleCompleted(parseInt(e.target.parentNode.parentNode.id, 10));
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
  mountButtonEventListeners(list);

  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target[0].value;
    handleNewTodo(input);
    newTodoForm.reset();
    newTodoForm.classList.add('hide');
  });

  toggleAllButton.addEventListener('click', () => {
    toggleAllTodos();
  });

  toggleNewFormVisibility.addEventListener('click', () => {
    newTodoForm.classList.toggle('hide');
  });
};

// getLocalStorage();
mountStaticEventListeners();
mountTodos();
