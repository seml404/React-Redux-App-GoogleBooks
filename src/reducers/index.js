const initialState = {
  booksList: [],
  loading: true,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKS_FOUND":
      console.log(state, action);
      return {
        ...state,
        booksList: action.list,
        loading: false,
      };
    case "BOOKS_REQUESTED":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
