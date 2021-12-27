import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Styles from './styles';
import logoImg from '../../assets/logo.svg';

import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

interface OwnerProps {
  login: string;
  avatar_url: string;
}

interface GithubRepository {
  full_name: string;
  description: string;
  owner: OwnerProps;
}

export const Dashboard = () => {
  const [repos, setRepos] = useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories');

    if (storageRepos) {
      return JSON.parse(storageRepos);
    }

    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewRepo(event.target.value);
  }

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  const handleAddRepo = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    try {
      const response = await api.get<GithubRepository>(`/repos/${newRepo}`);

      const repository = response.data;

      setRepos([...repos, repository]);
      formEl.current?.reset();
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Repositório não encontrado no Github');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitCollection" />
      <Styles.Title>Catálogo de repositórios do Github</Styles.Title>

      <Styles.Form
        ref={formEl}
        onSubmit={handleAddRepo}
        hasError={Boolean(inputError)}
      >
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Styles.Form>

      {inputError && <Styles.Error>{inputError}</Styles.Error>}

      <Styles.Repos>
        {repos.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Styles.Repos>
    </>
  );
};
