import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';



function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Banner/>
      <List/>
    </React.Fragment>
  );
}

export default App;
