import React from "react";
const Videos = ({ player, type }) => {
  if (type != 'video' || type != 'audio') return null
  return (
    <div className="videos" dangerouslySetInnerHTML={{ __html: player }}></div>
  );
};

export default Videos;
