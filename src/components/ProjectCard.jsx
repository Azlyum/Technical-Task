import React from "react";

const ProjectCard = ({ character }) => {
  return (
    <div style={cardStyle}>
      <img src={character.image} alt={character.name} style={imageStyle} />
      <h2 style={titleStyle}>{character.name}</h2>
      <p style={descriptionStyle}>{character.species}</p>
      <p style={statusStyle}>{character.status}</p>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "20px",
  margin: "10px",
  width: "100%",
  maxWidth: "250px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  boxSizing: "border-box",
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  borderRadius: "5px",
  objectFit: "cover",
  height: "auto",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const descriptionStyle = {
  fontSize: "14px",
  marginBottom: "10px",
};

const statusStyle = {
  fontSize: "12px",
  color: "#555",
};

export default ProjectCard;
