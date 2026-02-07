import axios from "axios";

/**
 * Fetch GitHub users with optional filters
 * @param {string} query - GitHub username or keyword
 * @param {string} location - optional location filter
 * @param {number} minRepos - optional minimum repositories
 * @param {number} page - pagination (default 1)
 * @returns {Promise} - GitHub API search results
 */
export const fetchUserData = async (query, location = "", minRepos = 0, page = 1) => {
  // Build search query
  let searchQuery = query;

  if (location) {
    searchQuery += ` location:${location}`;
  }

  if (minRepos > 0) {
    searchQuery += ` repos:>=${minRepos}`;
  }

  // GitHub Search API
  const url = `https://api.github.com/search/users?q=${searchQuery}&page=${page}&per_page=5`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    },
  });

  return response.data.items; // returns array of users
};
