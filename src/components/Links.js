import React from "react";
const Links = ({ excerpt, linkImage, linkURL, summary, sourceTitle }) => {
  return (
    <div className="caption">
        <a href={linkURL} className="link-container">
        <img src={linkImage} alt=''/>
        <div> <small>{sourceTitle}</small> <h3>{summary}</h3> {excerpt}</div>
        </a>
    </div>
  );
};

export default Links;
