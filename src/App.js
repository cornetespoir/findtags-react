import Captions from "./components/Captions";
import PostInfo from "./components/PostInfo";
import Answers from "./components/Answers";
import { React, useState, useEffect } from "react";

const THE_KEY = process.env.REACT_APP_TUMBLR_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState("findtags.intro");
  const [items, setItems] = useState([]);
  const [before, setBefore] = useState([]);
  const [animation, setAnimation] = useState("");

  const params = new URLSearchParams(window.location.search);
  params.set("tag", searchQuery);

  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `https://api.tumblr.com/v2/tagged?api_key=${THE_KEY}&tag=${searchQuery}`
      );
      const data = await res.json();
      setItems(data.response);
      console.log(data.response);
      return data;
    };
    fetchPosts();
    setAnimation("");
  }, [searchQuery]);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const setChangeQuery = (e) => {
    if (e.target.value.length) setSearchQuery(e.target.value);
  };

  const handleTag = (tag) => {
    setSearchQuery(tag);
    document.getElementById("query-setter").value = tag;
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleBefore = () => {
    const beforePosts = async () => {
      const res = await fetch(
        `https://api.tumblr.com/v2/tagged?api_key=${THE_KEY}&tag=${searchQuery}&before=${before}`
      );
      const data = await res.json();
      setBefore(data.response.at(-1).timestamp);
      setItems(data.response);
      return data;
    };
    beforePosts();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleBefore()
  }, [])
  return (
    <div className="App">
      <header className={"flex flex-center"}>
        <h1>Look up any tag on tumblr</h1>
        <p>
          Enter a word to search for posts that use that tag*. <br />
          <i>*must be within the first 5 tags of a post</i>
        </p>
      </header>
      <form onSubmit={onSubmit} className={"flex flex-center"}>
        <input
          type="text"
          id="query-setter"
          placeholder="Search"
          onChange={(e) => setChangeQuery(e)}
        />
      </form>
      <div className="flex flex-center search-results">
        <h3>
          Showing posts tagged with <span>#{searchQuery}</span>
        </h3>
      </div>
      <main className={animation}>
        {items.length > 0 ? (
          items.map((item) => (
            <article className="rounded" key={item.id} id={item.id}>
              {item.type === "photo" ? (
                <div className="photo">
                  <div
                    className="photoset-grid"
                    photoset-layout={item.photoset_layout}
                  >
                    {item.photos.map((photos, i) => {
                      return (
                        <div key={item.photos[i].alt_sizes[1].url}>
                          <img
                            src={item.photos[i].alt_sizes[1].url}
                            alt={item.photos[i].caption}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {item.type === "answer" && (
                <Answers
                  url={`https://${item.blog_name}.tumblr.com`}
                  username={item.blog.name}
                  answer={item.answer}
                  question={item.question}
                  asker={item.asking_name}
                />
              )}
              <Captions
                type={item.type}
                title={item.title}
                url={`https://${item.blog_name}.tumblr.com`}
                username={item.blog.name}
                content={
                  item.type === "text"
                    ? item.body
                    : item.type === "quote"
                    ? item.text
                    : item.caption
                }
                sourceurl={item.source_url != null && item.source_url}
                sourcetitle={item.source_title != null && item.source_title}
              />
              <PostInfo
                noteCount={item.note_count}
                dateTime={item.date}
                reblogURL={item.reblog_key}
                postURL={item.post_url}
              />
              <div className="tags">
                <span className="fa fa-hashtag"></span>
                {item.tags.map((tag) => {
                  return <button onClick={(e) => handleTag(tag)}>{tag}</button>;
                })}
              </div>
            </article>
          ))
        ) : (
          <article>
            <div className="caption rounded text-center">
              <h2>No results for {searchQuery}</h2>
            </div>
          </article>
        )}
        <button className="pagination" onClick={handleBefore}>
          View Older Posts
        </button>
      </main>
    </div>
  );
}

export default App;
