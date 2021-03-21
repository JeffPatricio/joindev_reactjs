/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo.svg';
import avatarProfile from '../../assets/avatar1.png';

function Menu() {
  const checkboxRef = useRef();

  return (
    <>
      <input ref={checkboxRef} type="checkbox" id="check_menu" />
      <div
        id="backdrop"
        onClick={() => {
          checkboxRef.current.checked = false;
        }}
      />
      <div className={styles.container}>
        <header>
          <a href="/main/colab">
            <img src={logo} alt=" " />
          </a>
        </header>

        <div className={styles.profile}>
          <img src={avatarProfile} alt="Foto do perfil" />
          <p>Marcos Paulo</p>
          <div title="Configurações">
            <span
              className="iconify"
              data-icon="ph:gear-light"
              data-inline="false"
            />
          </div>
        </div>

        <ul>
          <li>
            <span
              className="iconify"
              data-icon="ph:briefcase"
              data-inline="false"
            />
            <p>Vagas</p>
          </li>
          <li>
            <span
              className="iconify"
              data-icon="ph:calendar-blank"
              data-inline="false"
            />
            <p>Eventos</p>
          </li>
          <li>
            <span
              className="iconify"
              data-icon="ph:book-open"
              data-inline="false"
            />
            <p>Colab</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
