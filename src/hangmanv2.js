// HangmanGame.js

import React, { useState, useEffect } from 'react';
import './HangmanGame.css';

const words = ['react', 'hangman', 'javascript', 'developer', 'programming'];

// Rastgele bir kelime seçen yardımcı fonksiyon
const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

// HangmanGame bileşeni
const HangmanGame = () => {
  // State kullanarak oyunun durumunu yönet
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Kullanıcının klavye tuşlarına basmasını bekleyen useEffect
  useEffect(() => {
    const handleKeyPress = (event) => {
      const letter = event.key.toUpperCase();
      // Sadece harf ve daha önce tahmin edilmemiş bir harf ise kontrol et
      if (/[A-Z]/.test(letter) && !guessedLetters.includes(letter) && !gameOver) {
        checkLetter(letter);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    // Component unmount olduğunda event listener'ı kaldır
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [guessedLetters, gameOver]);

  // Girilen harfi kontrol eden fonksiyon
  const checkLetter = (letter) => {
    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setIncorrectAttempts(incorrectAttempts + 1);
    }

    checkGameStatus();
  };

  // Oyun durumunu kontrol eden fonksiyon
  const checkGameStatus = () => {
    const revealedWord = word
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join('');

    if (revealedWord === word) {
      setGameOver(true);
      alert('Tebrikler! Oyunu kazandınız.');
    } else if (incorrectAttempts === 6) {
      setGameOver(true);
      alert(`Oyun bitti. Doğru kelime: ${word}`);
    }
  };

  // Oyunu sıfırlayan fonksiyon
  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setIncorrectAttempts(0);
    setGameOver(false);
  };

  // Hangman SVG elemanlarını oluşturan fonksiyon
  const renderHangman = () => {
    // Hangman parçalarının pozisyonları ve stil özellikleri
    const parts = [
      { x1: 50, y1: 10, x2: 50, y2: 30, strokeWidth: 2 },
      { cx: 50, cy: 45, r: 15, strokeWidth: 2 },
      { x1: 50, y1: 30, x2: 50, y2: 70, strokeWidth: 2 },
      { x1: 50, y1: 70, x2: 30, y2: 90, strokeWidth: 2 },
      { x1: 50, y1: 70, x2: 70, y2: 90, strokeWidth: 2 },
      { x1: 50, y1: 70, x2: 50, y2: 110, strokeWidth: 2 },
      { x1: 50, y1: 110, x2: 30, y2: 150, strokeWidth: 2 },
      { x1: 50, y1: 110, x2: 70, y2: 150, strokeWidth: 2 },
    ];

    // Yanlış tahmin sayısına göre hangman parçalarını göster
    return parts.slice(0, incorrectAttempts).map((part, index) => {
      if (index === 1) {
        return <circle key={index} {...part} fill="#000" />;
      } else {
        return <line key={index} {...part} stroke="#000" />;
      }
    });
  };

  // HangmanGame bileşenini render et
  return (
    <div className="HangmanGame">
      <h1>Hangman Oyunu</h1>
      {/* SVG elemanları için renderHangman fonksiyonunu çağır */}
      <svg width="100" height="200">
        {renderHangman()}
      </svg>
      <div className="Word">
        {/* Kelimenin her harfini kontrol edip görüntüle */}
        {word.split('').map((letter) => (guessedLetters.includes(letter) ? letter : '_'))}
      </div>
      <div className="GuessedLetters">
        <p>Tahmin Edilen Harfler: {guessedLetters.join(', ')}</p>
      </div>
      <div className="IncorrectAttempts">
        <p>Yanlış Denemeler: {incorrectAttempts}/6</p>
      </div>
      {!gameOver && <p>Bir harf yazın.</p>}
      {gameOver && (
        <div>
          <p>Oyun bitti!</p>
          <button onClick={resetGame}>Yeni Oyun</button>
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
