import React, { useEffect, useState } from 'react'
import { avatars } from '../js/avatars'
import { randomNumbers } from '../js/randomNumbers'
import { TeamState } from '../interfaces/TeamState'
import Setup from './Setup'

function Badminton(props : any) {
  const [random, setRandom] = useState<number[]>(randomNumbers())
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isFinised, setIsFinished] = useState<boolean>(false)
  const [rules, setRules] = useState<number>(11)
  const [home, setHome] = useState<TeamState>({
    name: avatars[random[0]].name,
    url: avatars[random[0]].url,
    score: 0,
    win: 0
  })
  const [away, setAway] = useState<TeamState>({
    name: avatars[random[1]].name,
    url: avatars[random[1]].url,
    score: 0,
    win: 0
  })
  
  // ? Describing methods and fetures of component

  const increment = (event: any) => {
    if (event.target.id === 'incrementHome') {
      setHome({ ...home, score: home.score + 1 })
    }
    if (event.target.id === 'incrementAway') {
      setAway({ ...away, score: away.score + 1 })
    }
  }

  const decrement = (event: any) => {
    if (event.target.id === 'decrementHome' && home.score >= 1) {
      setHome({ ...home, score: home.score - 1 })
    }
    if (event.target.id === 'decrementAway' && away.score >= 1) {
      setAway({ ...away, score: away.score - 1 })
    }
  }

  // ? Specifying winning conditions:

  useEffect(() => {
    if (
      (home.score >= rules && home.score > away.score + 1) ||
      (away.score >= rules && away.score > home.score + 1)
    ) {
      setIsPlaying(false)
    } else if (home.score !== 0 || away.score !== 0) {
      setIsPlaying(true)
    }
  }, [home.score, away.score])

// ? Implementing win count update in team state object:

useEffect( ()=>{
  if(home.score >= rules && home.score > away.score + 1) {
    setIsFinished(true)
    setHome({...home, win: home.win + 1})
  }
  if(away.score >= rules && away.score > home.score + 1) {
    setIsFinished(true)
    setAway({...away, win: away.win + 1})
  }
},[away.score, home.score])

  // ? Event handling functions for main buttons:

  const restartGame = () :void => {
    setHome({...home, score: 0})
    setAway({...away, score: 0})
    setIsPlaying(true)
  } 
  
  const startNewGame = (): void => {
    setRandom(randomNumbers())
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
    setIsPlaying(true)
  }

  // Team selection event handler for team icons
  const handleTeamSelection = (event : any) : void =>{ 
    (home.score === 0 && away.score === 0) && setRandom(randomNumbers())
    if(event.target.id === "team--home") {
      setHome({...home, name: avatars[random[0]].name, url: avatars[random[0]].url})
    }
    if(event.target.id === "team--away") {
      setAway({...away, name: avatars[random[1]].name, url: avatars[random[1]].url})
    }
  }

  // Rules togglers 

  const handleSetDuration = (event : any) => {
    if(event.target.className === "timer--plus") {
      rules < 21 && setRules(prev => prev + 1)
    }
    if(event.target.className === "timer--minus") {
      rules > 11 && setRules(prev => prev - 1)
    }
  }

  // Styles

  let winnerColor = {
    backgroundColor: '#7EE68D',
  }

  let looserColor = {
    backgroundColor: '#BDABFF',
  }

  // Condition variables

  const winConditions = !isPlaying && (home.score > away.score || away.score > home.score)

  
  return (
    <div className="badminton--container">
      
      <h1 className="app-name" onClick={props.startPage}><div className='back-button'></div>Badminton</h1>
      {(isPlaying || drawConditions) && <h3 className="sets--score">{home.win}:{away.win}</h3>}
      <Setup isPlayingBadmin={isPlaying} 
             rulesBadmin={rules} 
             handleSetDurationBadmin={handleSetDuration}
             confirmDurationBadmin={startNewGame}
             isSelectedBadmin={props.isSelected}
             selectedGame={props.selectedGame}
      />

      {(isPlaying) &&
        (
        <div className="game--on">
          <div className="teams">
            <div
              className="team--home team"
              style={away.score < home.score ? winnerColor : looserColor}
            >
              <div className="team--img-name">
                <img src={home.url} alt="" className="team--img" id="team--home" onClick={handleTeamSelection}/>
                <div className="team--name">{home.name}</div>
              </div>
              <div className="team--score">{home.score}</div>
              <div className="team--score--buttons">
                <div
                  id="decrementHome"
                  className="button--decrement"
                  onClick={decrement}
                ></div>
                <div
                  id="incrementHome"
                  className="button--increment"
                  onClick={increment}
                ></div>
              </div>
            </div>

            <div
              className="team--away team"
              style={away.score > home.score ? winnerColor : looserColor}
            >
              <div className="team--img-name">
                <img src={away.url} alt="" className="team--img" id="team--away" onClick={handleTeamSelection}/>
                <div className="team--name">{away.name}</div>
              </div>
              <div className="team--score">{away.score}</div>
              <div className="team--score--buttons">
                <div
                  id="decrementAway"
                  className="button--decrement"
                  onClick={decrement}
                ></div>
                <div
                  id="incrementAway"
                  className="button--increment"
                  onClick={increment}
                ></div>
              </div>
            </div>
          </div>
          {!isPlaying || (home.score === 0 && away.score === 0)? 
            (<div id="new-game" onClick={startNewGame} className="button">
              New Game
            </div>) : (<div id="restart-game" onClick={restartGame} className="button">Restart</div>)
          }
        </div>
        
      )}

{/* Rendering Wining condition */}

{winConditions && 
      ( <>
        <div className="game--over">
          {home.score > away.score ? (
            <div className="winner--img-name">
              <img src={home.url} alt="" className="team--img img--final" />
              <div className="team--name winner--name">{home.name} wins!</div>
            </div>
          ) : (
            <div className="winner--img-name">
              <img src={away.url} alt="" className="team--img img--final"/>
              <div className="team--name winner--name">{away.name} wins!</div>
            </div>
          )}
          <div className="final--score">
            {home.score}:{away.score}
          </div>
        </div>
        {!isPlaying && <div id="restart-game" onClick={restartGame} className="button">Next round</div>}
        {!isPlaying && <div id="new-game" onClick={startNewGame} className="button">
        New Game
      </div>}
        </>
      )}  
    </div>
  )
}

export default Badminton
