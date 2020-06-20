import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; //w2.4 importing Browser router
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {
  
  // no need of the constructor, since we are no longer using the states here.
// BroserRouter tag will config our appilication to make use of routing module.
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter> 
        <div>
          <Main /> {/* W1.6 The state is passed on to the child menu component from app component
          W2.2 Main components has all the information about the state and corresponding view information to its children component*/} 
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
// Navbar and menu are two ui components used here.
export default App;
