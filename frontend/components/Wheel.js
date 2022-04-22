import React from "react";

export default function Wheel(props) {
  const turnWheel = (direction) => {
    const cogs = document.querySelectorAll("#wheel .cog");
    const activeCog = document.querySelector("#wheel .cog.active");
    let properElement;
    switch (direction) {
      case "clock":
        if (activeCog.nextElementSibling) {
          properElement = activeCog.nextElementSibling;
        } else {
          properElement = cogs[0];
        }
        break;
      case "counter":
        if (activeCog.previousElementSibling) {
          properElement = activeCog.previousElementSibling;
        } else {
          properElement = cogs[cogs.length - 1];
        }
        break;
    }
    properElement.classList.add("active");
    activeCog.classList.remove("active");
    properElement.innerHTML = activeCog.innerHTML;
    activeCog.innerHTML = "";
  };

  return (
    <div id='wrapper'>
      <div id='wheel'>
        <div className='cog active' style={{ "--i": 0 }}>
          B
        </div>
        <div className='cog' style={{ "--i": 1 }}></div>
        <div className='cog' style={{ "--i": 2 }}></div>
        <div className='cog' style={{ "--i": 3 }}></div>
        <div className='cog' style={{ "--i": 4 }}></div>
        <div className='cog' style={{ "--i": 5 }}></div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id='keypad'>
        <button id='counterClockwiseBtn' onClick={() => turnWheel("counter")}>
          Counter clockwise
        </button>
        <button id='clockwiseBtn' onClick={() => turnWheel("clock")}>
          Clockwise
        </button>
      </div>
    </div>
  );
}
