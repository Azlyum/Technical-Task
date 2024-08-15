import React from "react";
import ProjectCard from "./ProjectCard";
import Listings from "../apiCall/apiCall-Unauthorised ";

const ProjectList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Listings.map((Listings) => (
        <ProjectCard key={Listings.id} project={Listings} />
      ))}
    </div>
  );
};

export default ProjectList;
