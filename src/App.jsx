import { useState } from 'react';
import Images from './Images';

import './App.css'

function App() {
  const [cards, setCards] = useState([...Images ].sort(() => Math.random() - 0.5));
  const [clicks,setClicks] = useState(0);
  const [won,setWon] = useState(false);
  const [activeCards,setActiveCards] = useState([]);
  const [foundPairs,setFoundPairs] = useState([]);


  function restart() {
    setCards([...Images ].sort(() => Math.random() - 0.5));
    setClicks(0);
    setWon(false);
    setActiveCards([]);
    setFoundPairs([]);
  }

  function handleClick(index, id) {

    if (activeCards.length === 0) {
      setActiveCards([{ind: index, id: id}]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0].ind;
      const secondIndex = index;

      const firstId = activeCards[0].id;
      const secondId = id;

      if (cards[firstId] === cards[secondId]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
        setFoundPairs( [...foundPairs, firstIndex, secondIndex] );
      }
      setActiveCards([...activeCards, {ind: index, id: id}]);
    }
    if (activeCards.length === 2) {
      setActiveCards([{ind: index, id: id}]);
    }
    setClicks(clicks + 1);
  }

  return (
    <div>
      <div className="board">
        {cards.map((card,index) => {


          if (activeCards.length === 0) {
            var firstInd = typeof -1
            var secondInd = -1
          } else if (activeCards.length === 1) {
            var firstInd = activeCards[0].ind
            var secondInd = -1
          } else if (activeCards.length === 2) {
            var firstInd = activeCards[0].ind
            var secondInd = activeCards[1].ind
          }

          const flippedToFront =  (firstInd === index ? true : false || secondInd === index ? true : false || foundPairs.indexOf(index) !== -1);
          return (
            <div key={index} className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                 onClick={() => (flippedToFront ? '' : handleClick(index, card.id))}>
              <div className="card">
                <div className="front">
                  <img src={card.img} alt=""/>
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stats">
        {won && (
          <>
          Você ganhou! Parabéns!<br />
          Clique no botão para jogar de novo.<br />
          <input type="button" value="Reiniciar" onClick={restart}/>
          <br />
          
          </>
        )}
        Cliques: {clicks} &nbsp;&nbsp;&nbsp; Encontrados:{foundPairs.length/2}
      </div>
    </div>
  );
}

export default App;