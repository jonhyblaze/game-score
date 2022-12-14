import React from 'react'
import { randomNumbers } from '../js/randomNumbers'
import { avatars } from '../js/avatars'

function Basketball(props : any) {
  const random = randomNumbers()
  const [home, setHome] = React.useState({ name: '', url: '', score: 0 })
  const [away, setAway] = React.useState({ name: '', url: '', score: 0 })

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
    <div className="basketball--container">
      <h1 className="app-name" onClick={props.startPage}><div className='back-button'></div>Basketball</h1>
      <div className="score"></div>
      <div className="teams">
        <div className="team--home">
          <div className="score--home">{home.score}</div>
          <h3 className="team--home--name">{home.name}</h3>
          <button id="score-one-home" onClick={scoreOne}>
            Score 1pt
          </button>
          <button id="score-two-home" onClick={scoreTwo}>
            Score 2pts
          </button>
          <button id="score-three-home" onClick={scoreThree}>
            Score 3pts
          </button>
        </div>
        <div className="team--away">
          <div className="score--away">{away.score}</div>
          <h3 className="team--away--name">{away.name}</h3>
          <button id="score-one-away" onClick={scoreOne}>
            Score 1
          </button>
          <button id="score-two-away" onClick={scoreTwo}>
            Score 2pts
          </button>
          <button id="score-three-away" onClick={scoreThree}>
            Score 3pts
          </button>
        </div>
      </div>
      <button onClick={startNewGame}>New Game</button>
    </div>
  )
}

export default Basketball
