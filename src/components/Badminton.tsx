import React, { useEffect, useState } from 'react'
import { avatars } from '../js/avatars'
import { randomNumbers } from '../js/randomNumbers'
import { TeamState } from '../interfaces/TeamState'

function Badminton(props : any) {
  
  // ? Initializing component's state

  const [random, setRandom] = useState<number[]>(randomNumbers())
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [home, setHome] = useState<TeamState>({
    name: avatars[random[0]].name,
    url: avatars[random[0]].url,
    score: 0
  })
  const [away, setAway] = useState<TeamState>({
    name: avatars[random[1]].name,
    url: avatars[random[1]].url,
    score: 0
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

  // ? Specifying winning conditions for particular game

  useEffect(() => {
    if (
      (home.score > 10 && home.score > away.score + 1) ||
      (away.score > 10 && away.score > home.score + 1)
    ) {
      setIsPlaying(false)
    } else setIsPlaying(true)
  }, [home.score, away.score])

  // ? Event handling functions for main buttons

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

  // Styles

  let winnerColor = {
    backgroundColor: '#7EE68D',
  }

  let looserColor = {
    backgroundColor: '#BDABFF',
  }

  return (
    <div className="badminton--container">
      
      <h1 className="app-name" onClick={props.startPage}><div className='back-button'></div>Badminton</h1>

      {!isPlaying ? (
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
      ) : (
        <div className="game--on">
          <div className="teams">
            <div
              className="team--home team"
              style={away.score < home.score ? winnerColor : looserColor}
            >
              <div className="team--img-name">
                <img src={home.url} alt="" className="team--img" />
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
                <img src={away.url} alt="" className="team--img" />
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
        </div>
      )}

      {!isPlaying && <div id="restart-game" onClick={restartGame} className="button">Next round</div>}
      <div id="new-game" onClick={startNewGame} className="button">
        New Game
      </div>
    </div>
  )
}

export default Badminton
