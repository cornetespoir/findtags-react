import React from "react";

interface PostProps {
  noteCount: number;
  postURL: string;
  reblogURL: number;
  dateTime: string;
}
const PostInfo = ({ noteCount, postURL, reblogURL, dateTime }: PostProps) => {
  const postURLString = postURL.substring(postURL.indexOf("post/") + 5);
  const reblogString = postURLString.substring(0, postURLString.lastIndexOf("/"));
  const realReblogUrl = `${reblogString}/${reblogURL}`;

  const indexed = dateTime.substring(0, dateTime.indexOf(" ")).split('-');
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: `numeric` };
  const newDate = new Date(indexed as any).toLocaleDateString(undefined, options);

  return (
    <div className="info flex justify-between">
      <a href={postURL} rel="noreferrer" target="_blank" className="flex align-center note-count">
        <span>
          Posted on <span title={dateTime}>{newDate}</span> with {noteCount}
          {noteCount === 1 ? ' note' : ' notes'}
        </span>
      </a>
      <a href={`https://tumblr.com/reblog/${realReblogUrl}`} className="reblog" rel="noreferrer" target="_blank">
        <span className="fa fa-retweet"></span> Reblog
      </a>
    </div>
  );
};

export { PostInfo };
