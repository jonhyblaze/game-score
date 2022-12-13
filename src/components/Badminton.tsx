import React, {useEffect, useState} from "react"
import { avatars } from "../js/avatars"
import { randomNumbers } from '../js/randomNumbers';

function Badminton () {
  let [random, setRandom] = useState(randomNumbers())
  // let [randomHome, setRandomHome] = useState(random[0])
  // let [randomAway, setRandomAway] = useState(random[1])
  const [home, setHome] = useState({name: avatars[random[0]].name, url: avatars[random[0]].url, score: 0})
  const [away, setAway] = useState({name: avatars[random[1]].name, url: avatars[random[1]].url, score: 0})
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect( () =>{
    setHome({...home, name: avatars[random[0]].name, url: avatars[random[0 ]].url})
    setAway({...away, name: avatars[random[1]].name, url: avatars[random[1]].url})
  },[random])


  console.log(random)
  console.log(home)
  console.log(away)



  const increment = (event:any) => {
  if(event.target.id === "incrementHome")  {
    setHome({...home, score: home.score + 1})
  } 
  if(event.target.id === "incrementAway") {
    setAway({...away, score: away.score + 1})
  }
}

const decrement = (event:any) => {
  if(event.target.id === "decrementHome" && home.score >= 1) {
    setHome({...home, score: home.score - 1})
  }
  if(event.target.id === "decrementAway" && away.score >= 1) { 
    setAway({...away, score: away.score - 1})
  }
}

useEffect( ()=>{
  if( (home.score > 10 && home.score > away.score + 1) || (away.score > 10 && away.score > home.score + 1)) {
    setIsPlaying(false)
  } else setIsPlaying(true)
},[home.score, away.score])



const startNewGame = () : void => {
  setRandom(randomNumbers())
  setHome({...home, name: avatars[random[0]].name, url: avatars[random[0]].url, score: 0})
  setAway({...home, name: avatars[random[1]].name, url: avatars[random[1]].url, score: 0})
  setIsPlaying(true)
}

console.log(isPlaying)


// Styles

let winnerColor = {
  backgroundColor: '#7EE68D'
}

let looserColor = {
  backgroundColor: '#BDABFF'
}

  return (
    <div className="badminton--container">
       
       <h1 className="app-name">Badminton</h1>
       
       {!isPlaying ? 
         <div className="game--over">
            {home.score > away.score ? 
              <div className="winner--img-name">
                {/* <div className="team--img--home team--img img--final "></div> */}
                <img src={home.url}
                     alt=""
                     className="team--img img--final" 
                />
                <div className="team--name winner--name">{home.name} wins!</div>
              </div>
            : <div className="winner--img-name">
                {/* <div className="team--img--away team--img img--final"></div> */}
                  <img src={away.url}
                     alt=""
                     className="team--img img--final" 
                 />
                  <div className="team--name winner--name">{away.name} wins!</div>
              </div>}
            <div className="final--score">{home.score}:{away.score}</div>
         </div> 
         :  <div className="game--on">
              <div className="teams">
           
           <div className="team--home team" style={away.score < home.score ? winnerColor : looserColor}>
             <div className="team--img-name">               
               <img src={home.url}
                    alt=""
                    className="team--img"
                />
               <div className="team--name">{home.name}</div>
             </div>
             <div className="team--score">
               {home.score}
             </div>
             <div className="team--score--buttons">
             <div id="decrementHome"
                    className="button--decrement"
                    onClick={decrement}>
               </div>
                <div id="incrementHome"
                    className="button--increment"
                    onClick={increment}>
               </div>
             </div>
           </div>
          
        <div className="team--away team" style={away.score > home.score ? winnerColor : looserColor}>
           <div className="team--img-name">
           <img src={away.url}
                    alt=""
                    className="team--img"
            />
             <div className="team--name">{away.name}</div>
          </div> 
           <div className="team--score">
             {away.score}
           </div>
           <div className="team--score--buttons">
               <div id="decrementAway"
                    className="button--decrement"
                    onClick={decrement}>
               </div>
                <div id="incrementAway"
                    className="button--increment"
                    onClick={increment}>
               </div>
            </div>
          </div>

         </div>
       </div>
       }

      <div id="new-game"
           onClick={startNewGame}
           className="button--newgame">New Game
      </div>
    
    </div>
  )
}

export default Badminton