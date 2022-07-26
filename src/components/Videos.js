import React from "react";
const Videos = ({ player }) => {
  console.log(player);
  return (
    <div className="videos" dangerouslySetInnerHTML={{ __html: player }}></div>
  );
};

export default Videos;
