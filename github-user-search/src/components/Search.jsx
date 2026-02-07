import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");  // ✅ Add location state
  const [minRepos, setMinRepos] = useState(0);  // optional filter
  const [users, setUsers] = useState([]);       // array for .map()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      // ✅ Pass location and minRepos to service
      const data = await fetchUserData(username, location, minRepos);
      setUsers(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* ✅ Location input */}
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Minimum repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full p-2 bg-black text-white rounded">
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* ✅ Map over users array */}
      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-3 border rounded"
          >
            <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded" />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              {user.location && <p className="text-sm">Location: {user.location}</p>}
              <p className="text-sm">Repos: {user.public_repos || "N/A"}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
