import React from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  return(
    <div >
      <h2>Click on the canva to draw circle</h2>
      <p>Circle Will change to red  when they  overlap</p>     
      <Canvas/> 
    </div>
  );
}

export default App;