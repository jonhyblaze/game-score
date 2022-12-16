import React, {useState} from "react";

 function Setup (props : any) : any {
  
  return ( 
    !props.isPlaying && <div className="game--input">
        <p>Choose game duration</p>
        <div className="timer--container">
          <div className="timer--setup">  
            <div className="timer--minus" onClick={props.handleSetTimer}></div>
            <div className="timer--value team--score">{props.timer}</div>
            <div className="timer--plus" onClick={props.handleSetTimer}></div>
          </div>
          <h4>Minutes</h4>
        </div>
        <div onClick={props.confirmTime} className="button--ok"></div>
      </div>
  )
}

export default Setup