import Header from './components/Header'
import { useState, useEffect } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [items, setItems] = useState([])
  const [headerBg, setHeaderBg] = useState([])

  useEffect(() => {
    const fetchGifs = async () => {
      const res = await fetch('https://api.giphy.com/v1/gifs/search?api_key=API_KEY&limit=25&q=' + searchQuery)
      const data = await res.json ()
      setHeaderBg(data.data[Math.floor(Math.random()*items.length)].images.downsized_medium.url)
      setItems(data.data)
      return data
    }
    fetchGifs()
  }, [searchQuery])

 const onSubmit = (e) => {
  e.preventDefault()
}
  return (
    <div className="App">
        <Header style={{ 
  backgroundImage: "url(" + headerBg + ")"}}/>
            <form onSubmit={onSubmit} className={'flex flex-center'}>
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>   
        </form>   
        <main>
           {items.map((item) =>(
            <article key={item.id} dimensions={item.images.original.width + ' x ' + item.images.original.height} className={item.images.original.width > 450  && item.images.original.height > 450 ? ('big') : ('') || item.images.original.width > 450 && item.images.original.height < 300 ? ('wide') : ('') || item.images.original.height > 450 && item.images.original.width < 400? ('tall') : ('')}>
                <img src={item.images.downsized_medium.url} className={item.images.original.width + '-width gif-result'}/>
            <a className={'caption flex flex-center'} title={'View on Giphy'} href={item.url} target={'_blank'}> 
            {item.user !== undefined ? (
            <div className={'user flex flex-center'}>
              <img src={item.user.avatar_url} className={'user-avatar'}/>
              <span>{item.user.display_name}</span>
              </div>
            ) : '' }
              {item.title}
            </a>
            </article>
          ))} 
        </main> 
    </div>
  );
}

export default App;
