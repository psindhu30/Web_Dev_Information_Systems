import { createContext, useReducer } from "react";
import searchReducer from "../reducer/searchReducer";

const SearchContext = createContext();
const initialState = {
  dates: [],
  city: "",
  options: {
    adults: 1,
    children: 0,
    rooms: 1,
  },
};

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
export { SearchContext };
