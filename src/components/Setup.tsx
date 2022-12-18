import React, {useState} from "react";

 function Setup (props : any) : any {
  const [isSet, setIsSet] = useState<boolean>(false)
  
  const okConfirmation = (event : any) => {
    if(event.target.id ==="button--ok--badmin") {
      props.confirmDurationBadmin()
      setIsSet(true)
    } 
    if(event.target.id ==="button--ok--basket"){
      props.confirmTimeBasket()
      setIsSet(true)
    }
  } 
  
  return (<>
    {(!props.isPlayingBasket && props.isSelectedBasket && !isSet) && 
      <div className="game--input">
        <p>Choose game duration</p>
        <div className="timer--container">
          <div className="timer--setup">  
            <div className="timer--minus" onClick={props.handleSetTimerBasket}></div>
            <div className="timer--value team--score">{props.timerBasket}</div>
            <div className="timer--plus" onClick={props.handleSetTimerBasket}></div>
          </div>
          <h4>Minutes</h4>
        </div>
        <div onClick={okConfirmation} className="button--ok" id="button--ok--basket"></div>
      </div>}

    {(props.isSelectedBadmin && !props.isPlayingBadmin && !isSet) && 
    <div className="game--input">
       <p>Choose game set</p>
       <div className="timer--container">
         <div className="timer--setup">  
           <div className="timer--minus" onClick={props.handleSetDurationBadmin}></div>
           <div className="timer--value team--score">{props.rulesBadmin}</div>
           <div className="timer--plus" onClick={props.handleSetDurationBadmin}></div>
         </div>
         <h4>Points</h4>
       </div>
       <div onClick={okConfirmation} className="button--ok" id="button--ok--badmin"></div>
     </div>}
  </>)
}

export default Setup