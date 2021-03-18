import React from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo_landing.svg';
import avatarProfile from '../../assets/avatar1.png';

function Menu() {
  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt=" " />
      </header>

      <div className={styles.profile}>
        <img src={avatarProfile} alt="Foto do perfil" />
        <p>Marcos Paulo</p>
        <div>
          <span
            className="iconify"
            data-icon="ph:gear-six"
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
  );
}

export default Menu;
