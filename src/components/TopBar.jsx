import React from 'react';
import PropTypes from 'prop-types';

const TopBar = ({ handleDeleteAllTodos, handleToggleAllTodos }) => (
  <div className="topbar">
    <h2 className="topbar__title">Your Todos</h2>
    <section className="topbar__buttons">
      <button
        type="button"
        onClick={() => {
          document.querySelector('.form').classList.toggle('hide');
          document.querySelector('.form__input').focus();
        }}
      >
        New Todo
      </button>
      <button
        type="button"
        onClick={handleToggleAllTodos}
      >
        Toggle All

      </button>
      <button
        type="button"
        onClick={handleDeleteAllTodos}
      >
        Clear List

      </button>
    </section>
  </div>
);

TopBar.propTypes = {
  handleToggleAllTodos: PropTypes.func.isRequired,
  handleDeleteAllTodos: PropTypes.func.isRequired,

};

export default TopBar;
