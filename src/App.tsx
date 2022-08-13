import React from "react";
import { useState, useEffect } from "react";
import Captions from "./components/Captions";
import PostInfo from "./components/PostInfo";
import Answers from "./components/Answers";
import Results from "./components/Results";
import Links from "./components/Links";
import Photos from "./components/Photos";
import Videos from "./components/Videos";
import FilterInput from "./components/FilterInput";
import Favorites from "./components/Favorites";
import Menu from "./components/Menu";

const THE_KEY = process.env.REACT_APP_TUMBLR_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [before, setBefore] = useState([]);
  const [loading, setLoading] = useState('');

  const params = new URLSearchParams(window.location.search);
  params.set("tag", searchQuery);
  window.history.replaceState({}, "", `${window.location.pathname}`);
  useEffect(() => {
    if (searchQuery !== "") {
      const fetchPosts = async () => {
        const res = await fetch(
          `https://api.tumblr.com/v2/tagged?api_key=${THE_KEY}&tag=${searchQuery}`
        );
        const data = await res.json();
        setItems(data.response);
        console.log(items)
        setBefore(data.response.at(-1).timestamp);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        );
        return data;
      };
      fetchPosts();
    } else {
      setItems([]);
    }
  }, [searchQuery]);

  const filters = JSON.parse(localStorage.getItem('filters') as string);
  const removeLink = JSON.parse(localStorage.getItem('removeLinks') as string);

  function updateArticles() {
    if (filters)
      filters.forEach((filter) => {
        const tags = document.querySelectorAll('article .tags button')
        const captions = document.querySelectorAll('article .caption')
        captions.forEach((caption) => {
          if (caption.innerHTML.includes(filter.filter.toLowerCase())) {
            caption.closest('article')?.classList.add('hidden-word')
            const taglist = caption.closest('article')?.querySelector('.tags')
            if (taglist) {
              taglist.innerHTML = filter.filter
            }
            const noteCount = caption.closest('article')?.querySelector('.note-count')
            if (noteCount) {
              if (removeLink === false) {
                noteCount.innerHTML = 'View original post'
              }
              else {
                noteCount.remove()
              }
            }
          }
        })
        tags.forEach((tag) => {
          if (tag.innerHTML.toLowerCase() === (filter.filter.toLowerCase())) {
            tag.closest('article')?.classList.add('hidden')
            tag.classList.add('blocked-tag')
            const noteCount = tag.closest('article')?.querySelector('.note-count')
            if (noteCount) {
              if (removeLink === false) {
                noteCount.innerHTML = 'View original post'
              }
              else {
                noteCount.remove()
              }
            }

          }
        })

      }
      )
  }

  useEffect(() => {
    updateArticles()
  })


  const onSubmit = (e) => {
    e.preventDefault();
  };
  const setChangeQuery = (e) => {
    if (e.keyCode === 13) {
      setLoading('loading')
      setItems([])
      setSearchQuery(e.target.value);
      setTimeout(function () {
        setLoading('')
      }, 1000);
    }
  };

  const handleTag = (tag) => {
    setLoading('loading')
    setItems([])
    setSearchQuery(tag);
    setTimeout(function () {
      setLoading('')
    }, 1000);
    if (tag != null) {

      (document.getElementById("query-setter") as HTMLInputElement).value = tag;
      window.scroll({ top: 0, left: 0, behavior: "auto" });
      updateArticles()
    }
  };

  const handleBefore = () => {
    const beforePosts = async () => {
      const res = await fetch(
        `https://api.tumblr.com/v2/tagged?api_key=${THE_KEY}&tag=${searchQuery}&before=${before}`
      );
      const data = await res.json();
      setBefore(data.response.at(-1).timestamp);
      setItems(data.response);
    };
    setLoading('loading')
    setItems([])
    beforePosts();
    setTimeout(function () {
      setLoading('')
    }, 1000);
    window.scroll({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <div className="App">
      <header className={"flex flex-center"}>
        <h1>Look up any tag on tumblr</h1>
        <p>
          Enter a word to search for posts that use that tag*. <br />
          <i>*must be within the first 5 tags of a post</i>
        </p>
      </header>
      <form onSubmit={onSubmit} className={"flex flex-center search"}>
        <input
          type="text"
          id="query-setter"
          placeholder="Search"
          onKeyDown={(e) => setChangeQuery(e)}
        />
      </form>
      <Results searchQuery={searchQuery} />
      <Menu>
        <Favorites stateChanger={setSearchQuery} setLoading={setLoading}/>
        <FilterInput />
      </Menu>
      <main>
        {items.length > 0 ? (
          items.map((item) => (
            <article
              className={`rounded ${item["type"]}-post link-removed-${removeLink}`}
              key={item["id"]}
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
          ))
        ) : searchQuery === "" ? (
          ""
        ) : (
          <article className={loading}>
            <div className="caption rounded text-center">
              <h2 className={loading}>No results for {searchQuery}</h2>
            </div>
          </article>
        )}
        {searchQuery !== "" && (
          <button className="pagination" onClick={handleBefore}>
            View Older Posts
          </button>
        )}
        <p className="text-center">
          <a
            href="https://github.com/cornetespoir/findtags-react"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about findtags
          </a>
        </p>
      </main>
    </div>
  );
}

export default App;
