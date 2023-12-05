import React from 'react'
import './EnterGame.css'


function EnterGame() {
  return (
    <div className="container">
        <div className='entery_word'>
            <h1>Welcome to word game!</h1>
        </div>
        <div className="game_entery">
            <input type="button" value="START GAME" />
            <input type="button" value="RULES" />
            <input type="button" value="HELP" />
        </div>
    </div>
  )
}

export default EnterGame