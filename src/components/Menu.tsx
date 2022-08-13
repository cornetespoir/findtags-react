import React from "react";
import { useState } from "react";
const Menu = ({ children }) => {
const [status, setStatus] = useState('close')
function handleSlide() {
    if (status === 'close')
    setStatus('open')
    else setStatus('close')
}
  return (
    <>
     <aside className={status}>
     <button onClick={handleSlide} className='exit'><i className="fa-solid fa-cog"></i> <span className="sr-text">Toggle content settings</span></button>
         {children}
    </aside>
    </>
   
  );
};

export default Menu;
