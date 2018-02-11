import {combineReducers} from "redux";

import authReducer from "./authReducer";
import seriesReducer from "./seriesReducer";
import popularReducer from "./popularReducer";
import collectionReducer from "./collectionReducer";

export default combineReducers({
    auth : authReducer,
    series : seriesReducer,
    popular : popularReducer,
    serieCollection : collectionReducer
});