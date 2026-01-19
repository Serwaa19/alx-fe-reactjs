// src/components/UserProfile.jsx
import React from "react";

function UserProfile(props) {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '15px',
        margin: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h2 style={{ color: 'blue', marginBottom: '10px' }}>
        {props.name}
      </h2>

      <p style={{ fontSize: '16px' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>

      <p style={{ color: '#555' }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}





// Optional: simple inline styles for a card look
const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    margin: "16px auto",
    textAlign: "center",
    boxShadow: "2px 2px 12px rgba(0,0,0,0.1)",
  },
};

export default UserProfile;
