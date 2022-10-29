import React from "react";
const Links = ({ excerpt, linkImage, type, linkURL, summary, sourceTitle }) => {

  if (type !== "link") return null
  return (
    <div className="caption">
      <a href={linkURL} target="_blank" rel="noreferrer" className="link-container">
        <img src={linkImage} alt='' />
        <div> <small>{sourceTitle}</small> <h3>{summary}</h3> {excerpt}</div>
      </a>
    </div>
  );
};

export { Links };
