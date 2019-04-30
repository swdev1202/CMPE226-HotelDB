import React, {Component} from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

// App component
class App extends Component
{
  render()
  {
    return(
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/*App component has a child component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

// export the app component so that it can be used in index.js
export default App;