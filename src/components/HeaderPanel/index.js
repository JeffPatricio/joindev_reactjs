/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

function HeaderPanel() {
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.id === 'img_profile') return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.removeAttribute('show');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  function toggleAttrDropdown() {
    dropdownRef.current.toggleAttribute('show');
  }

  return (
    <header className={styles.container}>
      <p>
        Olá <span>Marcos Paulo</span>
      </p>
      <img
        alt=""
        id="img_profile"
        src="https://images.unsplash.com/photo-1614788620367-6180c4122c82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        onClick={toggleAttrDropdown}
      />
      <div ref={dropdownRef}>
        <header>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1614788620367-6180c4122c82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
          />
          <section>
            <div>
              <p>Marcos Paulo</p>
              <p>marcospauloteste@gmail.com</p>
            </div>
          </section>
        </header>
        <ul>
          <li>
            <NavLink to="/settings/profile">
              <span
                className="iconify"
                data-icon="ph:user-light"
                data-inline="false"
              />
              <p>Meu perfil</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/password">
              <span
                className="iconify"
                data-icon="ph:key-light"
                data-inline="false"
              />
              <p>Alterar senha</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/colabs">
              <span
                className="iconify"
                data-icon="ph:book-open-light"
                data-inline="false"
              />
              <p>Meus colabs</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/vacancies">
              <span
                className="iconify"
                data-icon="ph:briefcase-light"
                data-inline="false"
              />
              <p>Minhas vagas</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/events">
              <span
                className="iconify"
                data-icon="ph:calendar-light"
                data-inline="false"
              />
              <p>Meus eventos</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/events">
              <span
                className="iconify"
                data-icon="ph:sign-out-light"
                data-inline="false"
              />
              <p>Sair</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderPanel;
