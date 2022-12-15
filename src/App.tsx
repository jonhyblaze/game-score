import React, {useEffect, useState} from 'react'
import Badminton from './components/Badminton';
import './assets/css/reset.css'
import './App.css'
import './assets/css/badminton.css'
import './assets/css/basketball.css'
import Basketball from './components/Basketball';



function App() {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [selectedGame, setSelectedGame] = useState<string>('')
  
  const handleSelectGame = (event : any) => {
   if(event.target.id === 'badminton') {
    setSelectedGame('badminton')
    setIsSelected(true)
   }
   else if(event.target.id === "basketball"){
    setSelectedGame('basketball')
    setIsSelected(true)
   }
  }

  const startPage = () => {
    setSelectedGame('')
    setIsSelected(false)
  }


  return (
    <div className="App">
      {!isSelected &&      
        <section className="start-page">
          <h1 className="app-name" style={{alignSelf: "center"}}>ScoreFlow</h1>
          <div className="game--component" onClick={handleSelectGame} id="badminton">
            <h4 onClick={handleSelectGame} id="badminton">Badminton</h4>
            <div className="badminton-logo logo"></div>
          </div>
          <div className="game--component" onClick={handleSelectGame} id="basketball">
            <h4 onClick={handleSelectGame} id="basketball">Basketball</h4>
            <div className="basketball-logo logo"></div>
          </div>
        </section>}
       
      {selectedGame === 'badminton' && <Badminton startPage={startPage}/>}
      {selectedGame === 'basketball' && <Basketball startPage={startPage}/>}
    </div>
  );
}

export default App;
