import React from "react";
import { Answers, Photos, Videos, Links, PostInfo, Captions } from './post-types/index'

const Articles = ({ item, removeLink, handleTag }) => {
    return (
        <article
            className={`rounded ${item["type"]}-post link-removed-${removeLink}`}
            id={item["id"]}
        >
            <Photos type={item["type"]} photos={item["photos"]} />
            {item["type"] === "video" ? (
                <Videos
                    type={item["type"]}
                    player={item["player"][2]["embed_code"]}
                />
            ) : item["type"] === "audio" ? (
                <Videos type={item["type"]} player={item["player"]} />
            ) : null}
            <Links
                excerpt={item["excerpt"]}
                type={item["type"]}
                linkImage={item["link_image"]}
                linkURL={item["url"]}
                summary={item["summary"]}
                sourceTitle={item["source_title"]}
            />
            <Answers
                url={`https://${item["blog_name"]}.tumblr.com`}
                username={item["blog_name"]}
                answer={item["answer"]}
                question={item["question"]}
                asker={item["asking_name"]}
                type={item["type"]}
            />
            <Captions
                type={item["type"]}
                title={item["title"]}
                url={`https://${item["blog_name"]}.tumblr.com`}
                username={item["blog_name"]}
                content={
                    item["type"] === "text"
                        ? item["body"]
                        : item["type"] === "quote"
                            ? item["text"]
                            : item["type"] === "link"
                                ? item["description"]
                                : item["caption"]
                }
                sourceurl={item["source_url"] != null && item["source_url"]}
                sourcetitle={
                    item["source_title"] != null && item["source_title"]
                }
            />
            <PostInfo
                noteCount={item["note_count"]}
                dateTime={item["date"]}
                reblogURL={item["reblog_key"]}
                postURL={item["post_url"]}
            />
            <div className="tags">
                {(item["tags"] as []).map((tag, i) => {
                    return <button key={`${tag}-${i}`} onClick={(e) => handleTag(tag)}>{tag}</button>;
                })}
            </div>
        </article>
    );
};

export default Articles;
