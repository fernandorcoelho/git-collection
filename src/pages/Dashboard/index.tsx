import React from 'react';

import * as Styles from './styles';
import logoImg from '../../assets/logo.svg';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="GitCollection"/>
      <Styles.Title>Catálogo de repositórios do Github</Styles.Title>

      <Styles.Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Styles.Form>
    </>
  );
};
