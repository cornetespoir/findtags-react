import React from "react";
const Postinfo = ({ noteCount, postURL, reblogURL, dateTime }) => {
  const postURLString = postURL.substring(postURL.indexOf("post/") + 5);
  const reblogString = postURLString.substr(0, postURLString.lastIndexOf("/"));
  const realReblogUrl = `${reblogString}/${reblogURL}`;

  const indexed = dateTime.substring(0, dateTime.indexOf(" "));
  const options = { year: "numeric", month: "short", day: "numeric" };
  const newDate = new Date(indexed).toLocaleDateString("en-US", options);

  return (
    <div className="info flex justify-between">
      <a href={postURL} className="flex align-center">
        <span>
          {" "}
          Posted on <span title={dateTime}>{newDate}</span> with {noteCount}{" "}
          notes
        </span>
      </a>
      <a href={`https://tumblr.com/reblog/${realReblogUrl}`}>
        <span class="fa fa-retweet"></span> Reblog
      </a>
    </div>
  );
};

export default Postinfo;
