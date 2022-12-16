import React, {useEffect, useState} from 'react'
import { randomNumbers } from '../js/randomNumbers'
import { avatars } from '../js/avatars'
import { TeamState } from '../interfaces/TeamState'
import Setup from './Setup'

function Basketball(props : any) {
  
  // ? Initializing component's state

  const [random, setRandom] = useState<number[]>(randomNumbers())
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(5)
  const [countdown, setCountdown] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [home, setHome] = React.useState<TeamState>({ 
    name: avatars[random[0]].name,
    url: avatars[random[0]].url,
    score: 0,
    win: 0
  })
  const [away, setAway] = React.useState<TeamState>({
    name: avatars[random[1]].name,
    url: avatars[random[1]].url,
    score: 0,
    win: 0
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
      setTimer(prev => (prev > 2) ? prev - 1 : 1)
    } 
    else if (event.target.className === "timer--plus") {
      setTimer(prev => (prev <= 11) ? prev + 1 : 12)
    }
  }

  const confirmTime = () : void => {
    setIsPlaying(prev => !prev)
    setCountdown(timer * 60)
  }

  const handleTeamSelection = (event : any) : void =>{ 
    (home.score === 0 && away.score === 0) && setRandom(randomNumbers())
    if(event.target.id === "team--home") {
      setHome({...home, name: avatars[random[0]].name, url: avatars[random[0]].url})
    }
    if(event.target.id === "team--away") {
      setAway({...away, name: avatars[random[1]].name, url: avatars[random[1]].url})
    }
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
    setCountdown(timer*60)
  }

  useEffect(() => {
    // Check if the countdown value is greater than 0
    if (countdown > 0 && isRunning) {
      // If the countdown value is greater than 0, decrement it by 1
      // every second using the setInterval() function
      const intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      // Return a cleanup function to clear the interval when the
      // component unmounts
      return () => clearInterval(intervalId);
    }
  }, [countdown, isRunning]);

  
  const newCountdown = new Date(countdown * 1000).toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  );
  
  // Formatting the countdown to this: '00:00'
  let formattedCountdown = newCountdown.slice(2,8)

  const toggleIsRunning = () : void => {
    setIsRunning(prev => !prev)
  }

  useEffect( ()=> {
    if(countdown === 0 && (home.score > 0 || away.score > 0)) {
      setIsRunning(false)
    }
    
  },[countdown])

  // Additinal styles

  let winnerColor = {
    backgroundColor: '#7EE68D',
  }

  let looserColor = {
    backgroundColor: '#BDABFF',
  }

  return (
  <section className="basketball--container">
      <h1 className="app-name" onClick={props.startPage}>
        <div className='back-button'></div>Basketball
      </h1>
      <Setup isPlayingBasket={isPlaying} 
             confirmTimeBasket={confirmTime} 
             timerBasket={timer} 
             handleSetTimerBasket={handleSetTimer}
             isSelectedBasket={props.isSelected}
             selectedGame={props.selectedGame}
      />

      {/* Rendering playing conditions */}

      {countdown > 0 && <>  
      <h3 className="timer--countdown">{formattedCountdown} left to play</h3>
      <div className="teams">
        <div className="team--home team" style={away.score < home.score ? winnerColor : looserColor}>
          <div className="team--img-name">
            <img src={home.url} alt="" className="team--img" id="team--home" onClick={handleTeamSelection}/>
            <h3 className="team--home--name">{home.name}</h3>
          </div>
          <div className="team--score">{home.score}</div>
          <div className="buttons--plus">
              <div id="score-one-home" 
                   onClick={scoreOne}
                   className="button--plus1">
              </div>
              <div id="score-two-home" 
                   onClick={scoreTwo}
                   className="button--plus2">
              </div>
              <div id="score-three-home" 
                   onClick={scoreThree}
                   className="button--plus3">
              </div>
          </div>
        </div>
        <div className="team--away team" style={away.score > home.score ? winnerColor : looserColor}>
          <div className="team--img-name">
            <img src={away.url} alt="" className="team--img" id="team--away" onClick={handleTeamSelection}/>
            <h3 className="team--away--name">{away.name}</h3>
          </div>
          <div className="team--score">{away.score}</div>
          <div className="buttons--plus">
              <div id="score-one-away" 
                  onClick={scoreOne}
                  className="button--plus1">
              </div>
              <div id="score-two-away" 
                   onClick={scoreTwo}
                   className="button--plus2">
              </div>
              <div id="score-three-away" 
                   onClick={scoreThree}
                   className="button--plus3">
              </div>
          </div>
        </div>
      </div>
      <div onClick={toggleIsRunning}className="button">{isRunning ? 'Pause' : 'Start'}</div>
      <div onClick={startNewGame} className="button">New Game</div>
      </>}
      
        {/* Rendering winning conditions */}

      {(countdown < 1 && (home.score > away.score || home.score < away.score)) && 
      <>
        <div className="game--over">
        {home.score > away.score ? (
          <div className="winner--img-name">
            <img src={home.url} alt="" className="team--img img--final" />
            <div className="team--name winner--name">{home.name} wins!</div>
          </div>
        ) : (
          <div className="winner--img-name">
            <img src={away.url} alt="" className="team--img img--final" />
            <div className="team--name winner--name">{away.name} wins!</div>
          </div>
        )}
        <div className="final--score">
          {home.score}:{away.score}
        </div>
      </div>
      <div onClick={startNewGame} className="button">New Game</div>
    </>
    }

  {/* Rendering Draw condition */}

    {(countdown < 1 && (home.score === away.score) && isPlaying) && 
    <>
      <div className="game--over game--over-draw">
        <div className="teams--avatars">
          <img src={home.url} alt="" className="team--img team--img--draw"/>
          <span className="winner--name">VS</span>
          <img src={away.url} alt="" className="team--img team--img--draw"/>
        </div>
        <div className="final--score">
          <div className="team--name winner--name">It's a draw!</div>
          {home.score}:{away.score}
        </div>
      </div>
      <div onClick={startNewGame} className="button">New Game</div>
    </>
    }
  </section>
  )
}

export default Basketball
