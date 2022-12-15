import React, {useEffect, useState} from 'react'
import { randomNumbers } from '../js/randomNumbers'
import { avatars } from '../js/avatars'
import { TeamState } from '../interfaces/TeamState'

function Basketball(props : any) {
  
  // ? Initializing component's state

  const [random, setRandom] = useState<number[]>(randomNumbers())
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [home, setHome] = React.useState<TeamState>({ 
    name: avatars[random[0]].name,
    url: avatars[random[0]].url,
    score: 0
  })
  const [away, setAway] = React.useState<TeamState>({
    name: avatars[random[1]].name,
    url: avatars[random[1]].url,
    score: 0
  })
 
  // ? Describing methods and fetures of component

  const scoreOne = (event: any) => {
    if (event.target.id === 'score-one-home') {
      setHome({ ...home, score: home.score + 1 })
    }
    if (event.target.id === 'score-one-away') {
      setAway({ ...away, score: away.score + 1 })
    }
  }

  const scoreTwo = (event: any) => {
    if (event.target.id === 'score-two-home') {
      setHome({ ...home, score: home.score + 2 })
    }
    if (event.target.id === 'score-two-away') {
      setAway({ ...away, score: away.score + 2 })
    }
  }

  const scoreThree = (event: any) => {
    if (event.target.id === 'score-three-home') {
      setHome({ ...home, score: home.score + 3 })
    }
    if (event.target.id === 'score-three-away') {
      setAway({ ...away, score: away.score + 3 })
    }
  }


  const handleSetTimer = (event : any) : void => {
    if(event.target.className === "timer--minus") {
      setTimer(prev => (prev > 2) ? prev - 1 : 0)
    } 
    else if (event.target.className === "timer--plus") {
      setTimer(prev => (prev <= 11) ? prev + 1 : 12)
    }
  }

  const confirmTime = () => {
    setIsPlaying(prev => !prev)
  }

  const startNewGame = (): void => {
    setHome({
      ...home,
      name: avatars[random[0]].name,
      url: avatars[random[0]].url,
      score: 0,
    })
    setAway({
      ...home,
      name: avatars[random[1]].name,
      url: avatars[random[1]].url,
      score: 0,
    })
  }




  return (
    <section className="basketball--container">
      <h1 className="app-name" onClick={props.startPage}><div className='back-button'></div>Basketball</h1>
      {!isPlaying && 
      <div className="game--input">
        <p>Choose game duration</p>
        <div className="timer--setup">  
          <div className="timer--minus" onClick={handleSetTimer}>min</div>
          <div className="timer--value team--score">{timer}</div>
          <div className="timer--plus" onClick={handleSetTimer}>plus</div>
        </div>
        <button onClick={confirmTime}>Ok</button>
      </div>
        }
      {isPlaying && <>  
      <div className="teams">
        <div className="team--home">
          <img src={home.url} alt="" className="team--img"/>
          <h3 className="team--home--name">{home.name}</h3>
          <div className="team--score">{home.score}</div>
          <button id="score-one-home" onClick={scoreOne}>
            +1pt
          </button>
          <button id="score-two-home" onClick={scoreTwo}>
             +2pts
          </button>
          <button id="score-three-home" onClick={scoreThree}>
             +3pts
          </button>
        </div>
        <div className="team--away">
          <img src={away.url} alt="" className="team--img"/>
          <h3 className="team--away--name">{away.name}</h3>
          <div className="team--score">{away.score}</div>
          <button id="score-one-away" onClick={scoreOne}>
            +1pt
          </button>
          <button id="score-two-away" onClick={scoreTwo}>
            +2pts
          </button>
          <button id="score-three-away" onClick={scoreThree}>
            +3pts
          </button>
        </div>
      </div>
      <div onClick={startNewGame} className="button">New Game</div>
      </>}
    </section>
  )
}

export default Basketball
