import React from "react";
import { useState, useEffect } from "react";
import Results from "./components/Results";
import Articles from './components/Articles'
import { Menu } from './components/user-settings/Menu'

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
      if (data?.response?.at(-1)?.timestamp != null) {
        setBefore(data.response.at(-1).timestamp);
        setItems(data.response);
      }
    };
    setLoading('loading')
    setItems([])
    beforePosts();
    setTimeout(function () {
      setLoading('')
    }, 1000);
    window.scroll({ top: 0, left: 0, behavior: "auto" });
  };

  useEffect(() => {
    const tumblrAlts = document.querySelectorAll('.tmblr-alt-text-helper')
    tumblrAlts.forEach((tumblrAlt) => {
      const previousImg = tumblrAlt.previousElementSibling
      if (previousImg != null && previousImg.tagName === 'IMG') {
        tumblrAlt.innerHTML = `ALT <span class='tmblr-alt-text'><b>Image description</b><br> ${previousImg.getAttribute('alt') ?? 'no caption provided'}</span>`
      }
    })
  })

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
      <Menu stateChanger={setSearchQuery} setLoading={setLoading} />
      <main>
        {items.length > 0 ? (
          items.map((item) => (
            <Articles key={item["id"]} item={item} removeLink={removeLink} handleTag={handleTag} />
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
      </main>
    </div>
  );
}

export default App;


