
import React from 'react'
const Captions = ({url, content, username, sourceurl, sourcetitle, type}) => {
        if (type === 'answer') {
            return null
        } 
    return (
       <div className="captions">
           <div className="reblog-header flex align-center">
               <img src={`https://api.tumblr.com/v2/blog/${username}/avatar/64`} className="rounded" alt={`avatar for ${username}`}/>
               <a href={url}>{username}</a>
           </div>
            {content !== "" &&  <div className="caption" dangerouslySetInnerHTML={{__html: content}}></div> } 
            {sourceurl.length && <p class="content-source">Source: <a href={sourceurl}>{sourcetitle}</a></p>}
       </div>
    )
}

export default Captions