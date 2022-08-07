import React from "react";

interface PostProps {
  noteCount: number;
  postURL: string;
  reblogURL: number;
  dateTime: string;
}
const Postinfo = ({ noteCount, postURL, reblogURL, dateTime }: PostProps) => {
  const postURLString = postURL.substring(postURL.indexOf("post/") + 5);
  const reblogString = postURLString.substring(0, postURLString.lastIndexOf("/"));
  const realReblogUrl = `${reblogString}/${reblogURL}`;

  const indexed = dateTime.substring(0, dateTime.indexOf(" "));
  const options :Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const newDate = new Date(indexed).toLocaleDateString("en-US", options);

  return (
    <div className="info flex justify-between">
      <a href={postURL} className="flex align-center">
        <span>
          Posted on <span title={dateTime}>{newDate}</span> with {noteCount}
          {noteCount === 1 ? ' note' : ' notes'}
        </span>
      </a>
      <a href={`https://tumblr.com/reblog/${realReblogUrl}`} rel="noreferrer" target="_blank">
        <span className="fa fa-retweet"></span> Reblog
      </a>
    </div>
  );
};

export default Postinfo;
