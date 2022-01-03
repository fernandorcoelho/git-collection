import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';
import logoImg from '../../assets/logo.svg';

import * as Styles from './styles';

interface RepositoryParams {
  repository: string;
}

interface OwnerProps {
  login: string;
  avatar_url: string;
}

interface GithubRepository {
  full_name: string;
  description: string;
  owner: OwnerProps;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
}

interface User {
  login: string;
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: User;
}

const Repo = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<GithubRepository | null>(null);
  const [issues, setIssues] = useState<GithubIssue[]>([]);

  useEffect(() => {
    api.get(`repos/${params.repository}`)
      .then((response) => setRepository(response.data));
    api.get(`repos/${params.repository}/issues`)
      .then((response) => setIssues(response.data));
  }, [params.repository]);

  return (
    <>
      <Styles.Header>
        <img src={logoImg} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Styles.Header>

      {repository && (
        <Styles.RepoInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </Styles.RepoInfo>
      )}

      <Styles.Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Styles.Issues>
    </>
  );
};

export default Repo;
