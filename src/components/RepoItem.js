import React from 'react';
import '../styles/RepoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaStar } from 'react-icons/fa';

const RepoItem = ({ repo }) => {
  return (
    <div className="repo-item">
        <div className="repo-details">
            <h5 className="repo-name">{repo.name}</h5>
            <p className="repo-description">{repo.description || "No description available"}</p>
        </div>
        <div className="repo-footer">
            <div className="repo-owner">
            <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="repo-avatar"
            />
            <span className="repo-username">{repo.owner.login}</span>
            </div>
            <div className="repo-stars">
            <FaStar /> {repo.stargazers_count}
            </div>
        </div>
    </div>
  );
};

export default RepoItem;