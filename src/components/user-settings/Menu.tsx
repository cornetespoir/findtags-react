import React from "react";
import { useState } from "react";
import { FilterInput, Favorites } from "./index";

const Menu = ({ stateChanger, setLoading }) => {
  const [status, setStatus] = useState('open')
  function handleSlide() {
    if (status === 'close')
      setStatus('open')
    else setStatus('close')
  }
  return (
    <>
      <aside className={status}>
        <button onClick={handleSlide} className='exit'><i className="fa-fw fa-solid fa-cog"></i> <span className="sr-text">Toggle content settings</span></button>
        <Favorites stateChanger={stateChanger} setLoading={setLoading} />
        <FilterInput />
      </aside>
    </>

  );
};

export { Menu };
