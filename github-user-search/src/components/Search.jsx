import { useState } from 'react'
import { fetchUserData, searchUsers } from '../services/githubService'

const Search = () => {
  const [searchType, setSearchType] = useState('basic') // 'basic' or 'advanced'
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const handleBasicSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setUser(null)
    setUsers([])

    try {
      const userData = await fetchUserData(username.trim())
      setUser(userData)
    } catch (err) {
      setError(err.message || 'Looks like we cant find the user')
    } finally {
      setLoading(false)
    }
  }

  const handleAdvancedSearch = async (e) => {
    e.preventDefault()
    if (!username.trim() && !location.trim() && !minRepos.trim()) {
      setError('Please provide at least one search criterion')
      return
    }

    setLoading(true)
    setError(null)
    setUser(null)
    setUsers([])
    setCurrentPage(1)

    try {
      const results = await searchUsers({
        query: username.trim() || undefined,
        location: location.trim() || undefined,
        minRepos: minRepos ? parseInt(minRepos) : undefined,
        page: 1
      })
      setUsers(results.users)
      setTotalCount(results.total_count)
      setHasMore(results.hasMore)
    } catch (err) {
      setError(err.message || 'An error occurred while searching')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (!hasMore || loading) return

    setLoading(true)
    try {
      const nextPage = currentPage + 1
      const results = await searchUsers({
        query: username.trim() || undefined,
        location: location.trim() || undefined,
        minRepos: minRepos ? parseInt(minRepos) : undefined,
        page: nextPage
      })
      setUsers([...users, ...results.users])
      setHasMore(results.hasMore)
      setCurrentPage(nextPage)
    } catch (err) {
      setError(err.message || 'An error occurred while loading more results')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Type Toggle */}
      <div className="mb-6 flex gap-4 justify-center">
        <button
          onClick={() => {
            setSearchType('basic')
            setError(null)
            setUser(null)
            setUsers([])
          }}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            searchType === 'basic'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Basic Search
        </button>
        <button
          onClick={() => {
            setSearchType('advanced')
            setError(null)
            setUser(null)
            setUsers([])
          }}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            searchType === 'advanced'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Advanced Search
        </button>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={searchType === 'basic' ? handleBasicSearch : handleAdvancedSearch}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {searchType === 'advanced' && (
              <>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Repositories (optional)
                  </label>
                  <input
                    type="number"
                    id="minRepos"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    placeholder="e.g., 10"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && !user && users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Basic Search Results */}
      {user && searchType === 'basic' && !loading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-32 h-32 rounded-full mx-auto md:mx-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name || user.login}</h2>
              <p className="text-gray-600 mb-4">@{user.login}</p>
              {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <span>📍</span> {user.location}
                  </span>
                )}
                {user.public_repos !== undefined && (
                  <span className="flex items-center gap-1">
                    <span>📦</span> {user.public_repos} repositories
                  </span>
                )}
                {user.followers !== undefined && (
                  <span className="flex items-center gap-1">
                    <span>👥</span> {user.followers} followers
                  </span>
                )}
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Profile on GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results */}
      {users.length > 0 && searchType === 'advanced' && !loading && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600">
              Found <span className="font-semibold">{totalCount}</span> users
            </p>
          </div>
          {users.map((userItem) => (
            <div key={userItem.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={userItem.avatar_url}
                  alt={userItem.login}
                  className="w-24 h-24 rounded-full mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {userItem.name || userItem.login}
                  </h3>
                  <p className="text-gray-600 mb-2">@{userItem.login}</p>
                  {userItem.bio && <p className="text-gray-700 mb-4">{userItem.bio}</p>}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    {userItem.location && (
                      <span className="flex items-center gap-1">
                        <span>📍</span> {userItem.location}
                      </span>
                    )}
                    {userItem.public_repos !== undefined && (
                      <span className="flex items-center gap-1">
                        <span>📦</span> {userItem.public_repos} repositories
                      </span>
                    )}
                    {userItem.followers !== undefined && (
                      <span className="flex items-center gap-1">
                        <span>👥</span> {userItem.followers} followers
                      </span>
                    )}
                  </div>
                  <a
                    href={userItem.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Profile on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
