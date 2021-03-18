/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo_landing.png';
import avatarProfile from '../../assets/avatar1.png';
import { useAuth } from '../../contexts/AuthContext';

function Menu() {
  const { signOut } = useAuth();

  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt=" " />
        <span className="iconify" data-icon="uil:bars" data-inline="false" />
      </header>

      <div className={styles.profile}>
        <img src={avatarProfile} alt="Foto do perfil" />
        <section>
          <span
            className="iconify"
            data-icon="uil:setting"
            data-inline="false"
          />
          <h1>Marcos Paulo</h1>
        </section>
        <div className={styles.line} />
      </div>

      <ul>
        <li>
          <section>
            <span
              className="iconify"
              data-icon="uil:briefcase-alt"
              data-inline="false"
            />
            <h1>Vagas</h1>
          </section>
        </li>
        <li>
          <section>
            <span
              className="iconify"
              data-icon="uil:calender"
              data-inline="false"
            />
            <h1>Eventos</h1>
          </section>
        </li>
        <li>
          <section>
            <span
              className="iconify"
              data-icon="uil:book-open"
              data-inline="false"
            />
            <h1>Colab</h1>
          </section>
        </li>
        <li onClick={signOut}>
          <section>
            <h1>Sair</h1>
          </section>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
