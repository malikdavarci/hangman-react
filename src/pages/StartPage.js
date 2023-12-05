import React from 'react'
import './StartPage.css'
import { Link } from 'react-router-dom'

const StartPage = () => {
    return (
        <div className="container">
            <div className='entery_word'>
                <h1>Welcome to word game!</h1>
            </div>
            <div className="game_entery">
                <Link className="link" to="/game">START GAME</Link>
                <Link className="link" to="/rules">RULES</Link>
            </div>
        </div>
      )
}

export default StartPage