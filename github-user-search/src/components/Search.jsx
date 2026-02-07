import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]); // change to array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setUsers([]); // reset array

    try {
      const data = await fetchUserData(username);
      setUsers([data]); // wrap single user in array
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Map over the users array */}
      {users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <img src={user.avatar_url} alt="avatar" width="100" />
            <h3>{user.name || user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        ))}
    </div>
  );
}

export default Search;
