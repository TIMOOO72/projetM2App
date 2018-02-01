import axios from "axios";
import {FETCH_USER} from "./types";
import {FETCH_SERIES} from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER, payload : res.data});
   
};

export const fetchSerieCollection = () => async dispatch => {
    const res = await axios.get("http://projetm2-lemans.herokuapp.com/api/serieCollection");
    dispatch({type:"fetch_serieCollection", payload: res.data});
}; 

export const addSerie = (values) => async dispatch => {
    const details = await axios.get('https://api.themoviedb.org/3/tv/'+values.id,{
        params:{
            api_key: "23b1cff8b37c4540541d6f1fae9e1bd3",
            language: 'en-US'
        }
    });
    console.log("ADD SERIE ACTION FUNCTION");
    console.log(details);
    values.nbEpisodes = details.data.number_of_episodes;
    console.log(values);
    const res = await axios.post("/api/addSerie",values);
    dispatch({type:FETCH_USER, payload: res.data});
}


export const fetchSeries = (research) => async dispatch => {
    const res = await axios.get('https://api.themoviedb.org/3/search/tv?language=en-US&page=1',{
        params:{
            api_key: "23b1cff8b37c4540541d6f1fae9e1bd3",
            query: research
        }
    });
    dispatch({type:FETCH_SERIES, payload: res.data.results});
};

