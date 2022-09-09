import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import React from 'react';


function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Banner/>
    </React.Fragment>
  );
}

export default App;
