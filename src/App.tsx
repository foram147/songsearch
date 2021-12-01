import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchSong from './components/FetchSong';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FetchSong/>
      </header>
    </div>
  );
}

export default App;
