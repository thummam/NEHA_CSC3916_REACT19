import constants from '../constants/actionTypes'

let initialState = {
      movies: [],
      selectedMovie: null
}

const initialState = {
  movies: [],
  searchResults: [],
  error: null,
};


const movieReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_MOVIES:
                  updated['movies'] = action.movies;
                  updated['selectedMovie'] = action.movies[0];
                  return updated;
            case constants.SET_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case constants.FETCH_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case 'SEARCH_MOVIES_SUCCESS':
                    return {
                      ...state,
                      searchResults: action.payload,
                      error: null,
                    };
                  case 'SEARCH_MOVIES_FAIL':
                    return {
                      ...state,
                      searchResults: [],
                      error: action.payload,
                    };
            default:
                  return state;
      }
}

export default movieReducer;
