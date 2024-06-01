import React, { useState } from 'react';

const App = () => {
  const [circles, setCircles] = useState([]);
  const [removedCircles, setRemovedCircles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const newCircles = [...circles.slice(0, currentIndex + 1), { x, y }];
    setCircles(newCircles);
    setRemovedCircles([]);
    setCurrentIndex(newCircles.length - 1);
  };

  const handleBack = () => {
    if (currentIndex >= 0) {
      const newRemovedCircles = [...removedCircles, circles[currentIndex]];
      setRemovedCircles(newRemovedCircles);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleForward = () => {
    if (removedCircles.length > 0) {
      const lastRemovedCircle = removedCircles[removedCircles.length - 1];
      const newRemovedCircles = removedCircles.slice(0, -1);
      const newCircles = [...circles.slice(0, currentIndex + 1), lastRemovedCircle];
      setCircles(newCircles);
      setRemovedCircles(newRemovedCircles);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <div onClick={handleClick} style={{ height: '100%', width: '100%' }}>
        {circles.slice(0, currentIndex + 1).map((circle, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: circle.y + 12,
              left: circle.x - 15,
              width: '15px',
              height: '15px',
              backgroundColor: 'red',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <button onClick={handleBack} disabled={currentIndex < 0}>Voltar</button>
        <button onClick={handleForward} disabled={removedCircles.length === 0}>Avançar</button>
      </div>
    </div>
  );
};

export default App;