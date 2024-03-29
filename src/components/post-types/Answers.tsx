import React from "react";
const Answers = ({ url, type, answer, asker, question, username }) => {
  if (type !== 'answer') return null;
  return (
    <>
      <div className="ask">
        <div className="questions rounded">
          <div className="asker-header flex align-center">
            <img
              src={
                asker === "Anonymous"
                  ? `https://assets.tumblr.com/pop/src/assets/images/avatar/anonymous_avatar_40-3af33dc0.png`
                  : `https://api.tumblr.com/v2/blog/${asker}/avatar/64`
              }
              className="avatar rounded"
              alt={`avatar for ${asker}`}
            />
            <a href={`https://${asker}.tumblr.com`}>{asker} asked:</a>
          </div>
          <div
            className="question"
            dangerouslySetInnerHTML={{ __html: question }}
          ></div>
        </div>
      </div>
      <div className="captions">
        <div className="reblog-header flex align-center">
          <img
            src={`https://api.tumblr.com/v2/blog/${username}/avatar/64`}
            className="avatar rounded"
            alt={`avatar for ${username}`}
          />
          <a href={url}>{username}</a>
        </div>
        {answer !== "" && (
          <div
            className="caption"
            dangerouslySetInnerHTML={{ __html: answer }}
          ></div>
        )}
      </div>
    </>
  );
};

export { Answers };
