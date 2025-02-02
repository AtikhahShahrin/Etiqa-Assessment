import React, { useState, useEffect } from 'react';
import RepoItem from './RepoItem';
import LoadingSpinner from './LoadingSpinner';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const today = new Date();
  const last10Days = new Date(today.setDate(today.getDate() - 10)).toISOString().split('T')[0];

  const fetchRepos = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${last10Days}&sort=stars&order=desc&page=${page}`
      );
      const data = await response.json();

      if (response.ok) {
        setRepos(data.items);
        setTotalPages(Math.ceil(data.total_count / 30)); // GitHub returns up to 30 items per page
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Trending Repos</h1>

      {loading && <LoadingSpinner />}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Main container for all repo items (medium box) */}
      <div className="repo-item-container">
        {repos.length === 0 && !loading && !error ? (
          <p>No repositories found.</p>
        ) : (
          repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)
        )}
        
        {/* Pagination controls */}
        <div className="pagination-btns">
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <span className="mx-3">
            {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
