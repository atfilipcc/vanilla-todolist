import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './TopBar';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caughtError: undefined,
    };
  }

	handleAddTodoLocal = event => {
	  event.preventDefault();
	  const { handleAddTodo, todos } = this.props;
	  const newTodo = {
	    todoDesc: event.target.elements.input.value.trim(),
	    completed: false,
	    id: ((todos.length + 1) * Math.random() * 1000000).toFixed(0),
	  };
	  const caughtError = handleAddTodo(newTodo);

	  this.setState(() => ({ caughtError }));
	  if (!caughtError) {
	    const element = event.target.elements.input;
	    element.value = '';
	  }
	};

	render() {
	  const { handleDeleteAllTodos, handleToggleAllTodos } = this.props;
	  const { caughtError } = this.state;
	  return (
  <>
    <TopBar
      handleToggleAllTodos={handleToggleAllTodos}
      handleDeleteAllTodos={handleDeleteAllTodos}
    />
    <form
      name="todoForm"
      className="form hide"
      onSubmit={this.handleAddTodoLocal}
    >
      {caughtError && (
      <p className="form__error">{caughtError}</p>
      )}
      <input type="text" className="form__input" placeholder="What will you do?" name="input" />
      <button type="submit" className="form__button">
        Add
      </button>
    </form>
  </>
	  );
	}
}

TodoForm.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleToggleAllTodos: PropTypes.func.isRequired,
  handleDeleteAllTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(Object).isRequired,
};
