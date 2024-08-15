import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/ProjectCard";

const RickAndMorty = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalFetched, setTotalFetched] = useState(0);

  useEffect(() => {
    const fetchCharacters = async (page) => {
      try {
        const url = `https://rickandmortyapi.com/api/character?page=${page}`;
        const response = await axios.get(url);
        const newCharacters = response.data.results;
        const uniqueCharacters = newCharacters.filter(
          (newChar) =>
            !characters.some((existingChar) => existingChar.id === newChar.id)
        );

        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...uniqueCharacters,
        ]);
        setTotalFetched((prevTotal) => prevTotal + uniqueCharacters.length);
        setHasNextPage(response.data.info.next !== null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return <div style={errorStyle}>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <h1>Rick and Morty Characters</h1>
        <p>Total Results Returned: {totalFetched}</p>
      </div>
      <div style={cardsContainerStyle}>
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
      {hasNextPage && (
        <button onClick={handleNextPage} style={buttonStyle}>
          Next
        </button>
      )}
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
  boxSizing: "border-box",
};

const controlsStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#fff",
};

const cardsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const buttonStyle = {
  display: "block",
  margin: "20px auto",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  margin: "20px",
};

export default RickAndMorty;
