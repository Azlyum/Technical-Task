import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/ProjectCard";

const Listings = () => {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalFetched, setTotalFetched] = useState(0);

  useEffect(() => {
    const fetchInterviews = async (page) => {
      try {
        const url = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?page=${page}&apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`;
        const response = await axios.get(url);
        const newInterviews = response.data.data;
        const uniqueInterviews = newInterviews.filter(
          (newInterview) =>
            !interviews.some(
              (existingInterview) => existingInterview.id === newInterview.id
            )
        );

        setInterviews((prevInterviews) => [
          ...prevInterviews,
          ...uniqueInterviews,
        ]);
        setTotalFetched((prevTotal) => prevTotal + uniqueInterviews.length);
        setHasNextPage(response.data.has_next_page);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInterviews(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <h1>Interviews Listings</h1>
        <p>Total Results Returned: {totalFetched}</p>
      </div>
      <div style={cardsContainerStyle}>
        {interviews.map((interview) => (
          <Card key={interview.id} interview={interview} />
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
};

const controlsStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#555",
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

export default Listings;
