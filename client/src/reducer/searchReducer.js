const searchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_STATE":
      return action.payload;

    case "RESET_STATE":
      return {
        dates: [],
        city: "",
        options: {
          adults: "",
          children: "",
          rooms: "",
        },
      };

    default:
      return state;
  }
};

export default searchReducer;
