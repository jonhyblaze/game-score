import React, {useEffect, useState} from 'react'
import Badminton from './components/Badminton';
import './assets/css/reset.css'
import './App.css'
import Basketball from './components/Basketball';



function App() {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [selectedGame, setSelectedGame] = useState<string>('')
  
  const handleSelectGame = (event : any) => {
   if(event.target.id === "badminton") {
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
        <section>
          <h1>ScoreFlow</h1>
          <p>Choose game</p>
          <div>
            <h4 onClick={handleSelectGame} id="badminton">Badminton</h4>
          </div>
          <div>
            <h4 onClick={handleSelectGame} id="basketball">Basketball</h4>
          </div>
        </section>}
       
      {selectedGame === 'badminton' && <Badminton startPage={startPage}/>}
      {selectedGame === 'basketball' && <Basketball />}
    </div>
  );
}

export default App;
