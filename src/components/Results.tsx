import React from "react";

interface ResultsProps {
  searchQuery: string;
}
const Results = ({ searchQuery }: ResultsProps) => {
  return (
    <div className="caption flex flex-center search-results">
      {searchQuery.length ? (
        <h3>
          Showing posts tagged with <span>#{searchQuery}</span>
        </h3>
      ) : (
        <div className="text-center">
          <h3>Welcome to findtags</h3>
          <p>
            Type into the search bar above and press the <span className="key">enter</span> key to search. Your results will display below.
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
