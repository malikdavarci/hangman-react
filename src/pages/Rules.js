import React from 'react'
import { Link } from 'react-router-dom'
import './Rules.css'

const Rules = () => {
  return (
    <div className="container">
        <h1>The Rules</h1>
        <div className="rules_text">
            <p>Oyunun anlatımı burada olacak</p>
        </div>
        <Link className="link" to="/">BACK</Link>
    </div>
  )
}

export default Rules