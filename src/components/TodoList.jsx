import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({
  todos, handleDeleteTodo, handleEditTodo, handleToggleTodo,
}) => (
  <section className="main">
    {todos.length === 0 && (
    <p className="list__message">Add something to do.</p>
    )}
    <ul className="list">
      {todos.map((todo, index) => (
        <Todo
          key={todo.id}
          id={todo.id}
          todoDesc={todo.todoDesc}
          completed={todo.completed}
          index={index}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
          handleEditTodo={handleEditTodo}
        />
      ))}
      <p className="separator">Completed</p>
    </ul>
    <div className="main__bottom" />
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(Object).isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};

export default TodoList;
