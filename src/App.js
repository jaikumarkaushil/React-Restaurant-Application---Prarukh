/* eslint-disable import/first */
import React, { Component, Suspense } from 'react';
const Main = React.lazy(() => import('./components/MainComponent'));
import { Loading } from './components/LoadingComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; //w2.4 importing Browser router
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";

const store = ConfigureStore();

class App extends Component {
  
  // no need of the constructor, since we are no longer using the states here.
// BroserRouter tag will config our appilication to make use of routing module.
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter> 
        <div>
          <LightgalleryProvider
            //   onAfterSlide={(event, lightgallery_object) => {
            //     console.log(lightgallery_object);
            //     console.log(
            //         `Prev slide index: ${event.detail.prevIndex}; Current index: ${event.detail.index}`
            //     );
            // }}
          >
          <Suspense fallback={<Loading/>}>
            <Main />
          </Suspense>
          </LightgalleryProvider>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
// Navbar and menu are two ui components used here.
export default App;
