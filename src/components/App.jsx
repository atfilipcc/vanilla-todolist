import React, { Component } from 'react';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('todos');
      const todos = JSON.parse(json);
      if (todos) {
        this.setState(() => ({ todos }));
      }
    } catch (error) {
      //
    }
  }

  componentDidUpdate() {
    const { todos } = this.state;
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }

	handleAddTodo = todo => {
	  if (todo.todoDesc.trim().length === 0) return 'Please enter something.';
	  return this.setState(prevState => ({ todos: [todo].concat(prevState.todos) }));
	};

	handleToggleTodo = index => {
	  const { todos } = this.state;
	  const updatedTodo = {
	    ...todos[index],
	    completed: !todos[index].completed,
	  };
	  todos[index] = updatedTodo;
	  this.setState({ todos });
	};

	handleEditTodo = (index, newTodoDesc) => {
	  const { todos } = this.state;
	  const updatedTodo = {
	    ...todos[index],
	    todoDesc: newTodoDesc,
	  };
	  todos[index] = updatedTodo;
	  this.setState({ todos });
	};

	handleDeleteTodo = toRemove => {
	  this.setState(prevState => ({
	    todos: prevState.todos.filter(todo => toRemove !== todo.todoDesc),
	  }));
	};

	handleDeleteAllTodos = () => {
	  this.setState(() => ({ todos: [] }));
	};

	handleToggleAllTodos = () => {
	  const { todos } = this.state;
	  let completedTodos = 0;
	  todos.forEach(todo => {
	    if (todo.completed === true) completedTodos += 1;
	  });
	  for (let i = 0; i < todos.length; i += 1) {
	    const allCompleted = completedTodos === todos.length;
	    const updatedTodo = {
	      ...todos[i],
	      completed: !allCompleted,
	    };
	    todos[i] = updatedTodo;
	    this.setState({ todos });
	  }
	};

	render() {
	  const {
	    handleAddTodo,
	    handleDeleteAllTodos,
	    handleToggleAllTodos,
	    handleDeleteTodo,
	    handleToggleTodo,
	    handleEditTodo,
	  } = this;
	  const { todos } = this.state;
	  return (
  <>
    <Header />
    <div className="container">
      <div className="main">
        <TodoForm
          todos={todos}
          handleAddTodo={handleAddTodo}
          handleDeleteAllTodos={handleDeleteAllTodos}
          handleToggleAllTodos={handleToggleAllTodos}
        />
        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
          handleEditTodo={handleEditTodo}
        />
      </div>
    </div>
  </>
	  );
	}
}
