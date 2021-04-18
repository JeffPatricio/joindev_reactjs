/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';

function HeaderPanel() {
  const dropdownRef = useRef();
  const { authUser, signOut } = useAuth();

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
        Olá <span>{authUser.name}</span>
      </p>
      <img
        alt=""
        id="img_profile"
        src={authUser.photo || 'https://i.ibb.co/dDpxVpV/Group-50.png'}
        onClick={toggleAttrDropdown}
      />
      <div ref={dropdownRef}>
        <header>
          <img
            alt=""
            src={authUser.photo || 'https://i.ibb.co/dDpxVpV/Group-50.png'}
          />
          <section>
            <div>
              <p>{authUser.name}</p>
              <p>{authUser.email}</p>
            </div>
          </section>
        </header>
        <ul>
          <li>
            <NavLink to="/main/profile">
              <span
                className="iconify"
                data-icon="ph:user-light"
                data-inline="false"
              />
              <p>Meu perfil</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/mycolabs">
              <span
                className="iconify"
                data-icon="ph:book-open-light"
                data-inline="false"
              />
              <p>Meus colabs</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/myjobs">
              <span
                className="iconify"
                data-icon="ph:briefcase-light"
                data-inline="false"
              />
              <p>Minhas vagas</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/myevents">
              <span
                className="iconify"
                data-icon="ph:calendar-light"
                data-inline="false"
              />
              <p>Meus eventos</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={() => signOut()} className="logout">
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
