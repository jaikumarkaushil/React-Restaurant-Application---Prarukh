import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { InitialReserve } from './reserveform';
export const ConfigureStore = () => {
    const store = createStore(
        // combine reducer maps the overall smaller, simpler reducer function into various properties in the overall.
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback,
                reservation: InitialReserve,
            })
        }),
        applyMiddleware(thunk, logger)  //redux thunk 1
    );

    return store;
}