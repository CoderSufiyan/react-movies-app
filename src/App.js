import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourite from './Components/Favourite';
import {BrowserRouter as Routes, Route, Switch, BrowserRouter} from 'react-router-dom'


function App() {
  return (
      <Routes>
        <Navbar/>
        <Switch>
          <Route path='/' exact render={(props)=>(
            <>
              <Banner {...props} />
              <List {...props} />
            </>
          )} />
          <Route path='/favourites' component={Favourite} />
        </Switch>
        {/* <Banner/>
        <List/> */}
        {/* <Favourite/> */}
      </Routes>
  );
}

export default App;
