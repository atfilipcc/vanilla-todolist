import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  componentDidUpdate() {
    if (this.textInput) this.textInput.focus();
  }

	handleChangeEditState = () => {
	  const { editing } = this.state;
	  this.setState({
	    editing: !editing,
	  });
	};

	handleChange = event => {
	  event.preventDefault();
	  const { index, handleEditTodo } = this.props;
	  const { value } = event.target;
	  handleEditTodo(index, value);
	};

	handleEnterKey = e => {
	  if (e.keyCode === 13) {
	    this.handleChangeEditState();
	  }
	}

	editTemplate = () => {
	  const { index, todoDesc } = this.props;
	  const { handleChange } = this;
	  return (
  <>
    <input
      name="todoDesc"
      ref={input => { this.textInput = input; }}
      id={index}
      onChange={e => handleChange(e)}
      onKeyDown={e => this.handleEnterKey(e)}
      onBlur={this.handleChangeEditState}
      className="todo__desc--input"
      placeholder={todoDesc}
      value={todoDesc}
    />
  </>
	  );
	}

	viewTemplate = () => {
	  const { index, todoDesc } = this.props;
	  return (
  <p id={index} className="todo__desc">
    {todoDesc}
  </p>
	  );
	}

	render() {
	  const {
	    completed,
	    todoDesc,
	    index,
	    handleDeleteTodo,
	    handleToggleTodo,
	  } = this.props;
	  const { editing } = this.state;
	  const {
	    editTemplate, viewTemplate, handleChangeEditState,
	  } = this;
	  return (
  <li className={`todo ${completed ? 'completed' : ''}`}>
    {editing ? editTemplate() : viewTemplate()}
    <div className="todo__button">
      <button
        type="button"
        className="todo__button--delete"
        onClick={() => {
				  handleDeleteTodo(todoDesc);
        }}
      >
        ×
      </button>

      <button
        type="button"
        className="todo__button--edit"
        onMouseDown={e => {
				  e.preventDefault();
				  handleChangeEditState();
        }}
      >
        ‎
      </button>
      <button
        type="button"
        className="todo__button--toggle"
        onClick={() => handleToggleTodo(index)}
      >
        ‎
        ‎
      </button>
    </div>
  </li>
	  );
	}
}

Todo.propTypes = {
  handleEditTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  todoDesc: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
