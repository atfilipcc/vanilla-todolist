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
        New
      </button>
      <button
        type="button"
        onClick={handleToggleAllTodos}
      >
        Toggle

      </button>
      <button
        type="button"
        onClick={handleDeleteAllTodos}
      >
        Clear

      </button>
    </section>
  </div>
);

TopBar.propTypes = {
  handleToggleAllTodos: PropTypes.func.isRequired,
  handleDeleteAllTodos: PropTypes.func.isRequired,

};

export default TopBar;
