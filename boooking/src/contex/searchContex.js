import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  date: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
 
 /* useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('searchContext'));
    if (savedState) {
      dispatch({ type: "NEW_SEARCH", payload: savedState });
    }
  }, []);

  // Save context to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchContext', JSON.stringify(state));
  }, [state]);   */

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        options: state.options,
        date: state.date,
       
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};