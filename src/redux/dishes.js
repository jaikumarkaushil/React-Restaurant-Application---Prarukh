// here, we will write reducer functions in this file, this file is redux store
import * as ActionTypes from './ActionTypes';

// below is the reducer function of dishes state in which we can pass the action.

// redux thunk 4, it will create action for various task like adding dishes, dishloading and dish loading failed
export const Dishes = (state  = { 
    isLoading: true,
    errMess: null,
    dishes:[]}, 
    action) => {
        switch (action.type) {
            case ActionTypes.ADD_DISHES:
                return {...state, isLoading: false, errMess: null, dishes: action.payload};

            case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true, errMess: null, dishes: []};

            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};

            default:
            return state;
        }
};