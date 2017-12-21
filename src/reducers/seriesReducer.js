
import {FETCH_SERIES} from "../actions/types";

export default function(state = [], action){
    
    switch(action.type){
        case FETCH_SERIES:
            return action.payload || false;
        default :
            return state;
    }
}