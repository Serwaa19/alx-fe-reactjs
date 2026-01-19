// src/components/UserProfile.jsx
import React from "react";

const UserProfile = (props) => {
  return (
    <div style={styles.card}>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

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
