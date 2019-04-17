import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';





class App extends Component {
  render() {
    return (
      <div className="App container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              <img src={process.env.PUBLIC_URL + '/assets/images/bloc_jams_logo.png'} alt="logo"/>

            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/library'>Library</Link>
          </li>
        </ul>
        <h1 className="container text-center mt-5"> Blurry Jams</h1>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
