import axios from 'axios'

const GITHUB_API_BASE = 'https://api.github.com'

/**
 * Fetch user data from GitHub API by username
 * @param {string} username - GitHub username
 * @returns {Promise} Promise that resolves to user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found')
    }
    throw error
  }
}

/**
 * Search for GitHub users with advanced criteria
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.query - Search query (username, location, etc.)
 * @param {string} searchParams.location - Filter by location
 * @param {number} searchParams.minRepos - Minimum number of repositories
 * @param {number} searchParams.page - Page number for pagination
 * @returns {Promise} Promise that resolves to search results
 */
export const searchUsers = async ({ query, location, minRepos, page = 1 }) => {
  try {
    let searchQuery = query || ''
    
    // Build advanced search query
    if (location) {
      searchQuery += ` location:${location}`
    }
    
    if (minRepos) {
      searchQuery += ` repos:>${minRepos}`
    }
    
    // If no query provided, search for all users with filters
    if (!query && (location || minRepos)) {
      searchQuery = searchQuery.trim() || 'type:user'
    }
    
    const response = await axios.get(`${GITHUB_API_BASE}/search/users`, {
      params: {
        q: searchQuery.trim() || 'type:user',
        page,
        per_page: 10
      }
    })
    
    // Fetch detailed information for each user
    const users = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await axios.get(user.url)
          return userDetails.data
        } catch (error) {
          return user
        }
      })
    )
    
    return {
      users,
      total_count: response.data.total_count,
      page,
      hasMore: response.data.items.length === 10
    }
  } catch (error) {
    throw error
  }
}
