import React from 'react';

import * as Styles from './styles';
import logoImg from '../../assets/logo.svg';

import { FiChevronRight } from 'react-icons/fi';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="GitCollection" />
      <Styles.Title>Catálogo de repositórios do Github</Styles.Title>

      <Styles.Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Styles.Form>

      <Styles.Repos>
        <a href="/repositories">
          <img
            src="https://avatars.githubusercontent.com/u/63662083?v=4"
            alt="Repositório"
          />

          <div>
            <strong>Fernando Rodrigues Coelho/mini-curso-reactjs</strong>
            <p>Repositório do mini-curso gratuito de ReactJS</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Styles.Repos>
    </>
  );
};
