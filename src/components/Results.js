import React from "react";
const Results = ({ searchQuery }) => {
  return (
    <div className="flex flex-center search-results">
      {searchQuery.length ? (
        <h3>
          Showing posts tagged with <span>#{searchQuery}</span>
        </h3>
      ) : (
        <div className="text-center">
          <h3>Welcome to findtags!</h3>
          <p>
          This can be used for resource blogs to find content, search your tracked tags, or make it easier to find new content!
          <br />
          Your results will display below. 
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
