import React from "react"


function Badminton () {
  const [scoreHome, setScoreHome] = React.useState(0)
  const [scoreAway, setScoreAway] = React.useState(0)
  const [avatars, setAvatar] = React.useState(
    ['/src/assets/images/angry-boar.png', 
    '/src/assets/images/wild-dog.png'])

const increment = (event:any) => {
  if(event.target.id === "incrementHome")  {
    setScoreHome(prev => prev +1)
  } 
  if(event.target.id === "incrementAway") {
    setScoreAway(prev => prev +1)
  }
}

const decrement = (event:any) => {
  if(event.target.id === "decrementHome" && scoreHome >= 1) {
    setScoreHome(prev => prev - 1)
  }
  if(event.target.id === "decrementAway" && scoreAway >= 1) {
    setScoreAway(prev => prev - 1)
  }
}

const startNewGame = () => {
  setScoreAway(0)
  setScoreHome(0)
}


// Styles 

let winnerColor = {
  backgroundColor: '#7EE68D'
}

let looserColor = {
  backgroundColor: '#BDABFF'
}

  return (
    <div className="badminton--container">
       
       <h1 className="app-name">Game Score</h1>
       
       { ((scoreHome > 10 && scoreHome > scoreAway + 1) ||
         ( scoreAway > 10 && scoreAway > scoreHome + 1)) ? 
         <div className="game--over">
            {scoreHome > scoreAway ? 
              <div className="winner--img-name">
                <div className="team--img--home team--img img--final "></div>
                <div className="team--name">Wild Boars wins!</div>
              </div>
            : <div className="winner--img-name">
                <div className="team--img--away team--img img--final"></div>
                  <div className="team--name">Raging Dogs wins!</div>
              </div>}
            <div className="final--score">{scoreHome}:{scoreAway}</div>
         </div> 
         :  <div className="game--on">
              <div className="teams">
           
           <div className="team--home team" style={scoreAway < scoreHome ? winnerColor : looserColor}>
             <div className="team--img-name">
               <div className="team--img team--img--home"></div>
               <div className="team--name">Wild Boars</div>
             </div>
             <div className="team--score">
               {scoreHome}
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
          
        <div className="team--away team" style={scoreAway > scoreHome ? winnerColor : looserColor}>
           <div className="team--img-name">
             <div className="team--img team--img--away"></div>
             <div className="team--name">Raging Dogs</div>
          </div> 
           <div className="team--score">
             {scoreAway}
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