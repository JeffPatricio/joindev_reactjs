/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '../../assets/logo.svg';

function Menu() {
  const checkboxRef = useRef();

  return (
    <>
      <input ref={checkboxRef} type="checkbox" id="check_menu" />
      <label htmlFor="check_menu">
        <span className="iconify" data-icon="ph:list" data-inline="false" />
      </label>
      <section
        id="backdrop"
        onClick={() => {
          checkboxRef.current.checked = false;
        }}
      />
      <div className={styles.container}>
        <a href="/">
          <img src={logo} alt=" " />
        </a>

        <ul>
          <li>
            <NavLink
              to="/main/colab"
              onClick={() => {
                checkboxRef.current.checked = false;
              }}
            >
              <span
                className="iconify"
                data-icon="ph:book-open"
                data-inline="false"
              />
              <p>Colab</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/main/jobs"
              onClick={() => {
                checkboxRef.current.checked = false;
              }}
            >
              <span
                className="iconify"
                data-icon="ph:briefcase"
                data-inline="false"
              />
              <p>Vagas</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/main/events"
              onClick={() => {
                checkboxRef.current.checked = false;
              }}
            >
              <span
                className="iconify"
                data-icon="ph:calendar-blank"
                data-inline="false"
              />
              <p>Eventos</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
