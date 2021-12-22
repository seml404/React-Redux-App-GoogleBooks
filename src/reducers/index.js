const initialState = {
  booksList: [],
  loading: true,
  items: [],
  userFilter: "",
  booksFiltered: [],
  filterStatus: false,
  sortBy: "relevance",
  userRequest: "",
  projectAPI: "AIzaSyBegn1BYkKYId9tsTKsCtjKa1IhDsFK3JM",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case "BOOKS_FOUND":
    //   if (state.filterStatus) {
    //     let filtered = action.list.filter((item) => {
    //       console.log(item.volumeInfo.categories?.includes(state.userFilter));
    //       return item.volumeInfo.categories?.includes(state.userFilter);
    //     });
    //     return {
    //       ...state,
    //       booksList: action.list,
    //       booksFiltered: filtered,
    //       loading: false,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       booksList: action.list,
    //       loading: false,
    //     };
    //   }

    case "SEARCH_INITIATED":
      if (state.filterStatus) {
        let filtered = action.newBooksList.filter((item) => {
          console.log(item.volumeInfo.categories?.includes(state.userFilter));
          return item.volumeInfo.categories?.includes(state.userFilter);
        });
        return {
          ...state,
          booksList: action.newBooksList,
          userRequest: action.request,
          booksFiltered: filtered,
          loading: false,
        };
      } else {
        return {
          ...state,
          booksList: action.newBooksList,
          userRequest: action.request,
          loading: false,
        };
      }

    case "SEARCH_MORE":
      if (state.filterStatus) {
        let filtered = action.addToBooksList.filter((item) => {
          return item.volumeInfo.categories?.includes(state.userFilter);
        });
        return {
          ...state,
          booksList: [...state.booksList, ...action.addToBooksList],
          booksFiltered: [...state.booksFiltered, ...filtered],
        };
      } else {
        return {
          ...state,
          booksList: [...state.booksList, ...action.addToBooksList],
          loading: false,
        };
      }

    case "REQUEST_SENT":
      return {
        ...state,
        loading: true,
      };

    case "BOOKS_UNFILTERED":
      return {
        ...state,
        userFilter: "",
        booksFiltered: [],
        filterStatus: false,
      };

    case "BOOKS_LOADED_FILTERED":
      const filterRequest = action.filter;
      const booksFiltered = [...state.booksList].filter((item) => {
        return item.volumeInfo.categories?.includes(filterRequest);
      });
      return {
        ...state,
        filterStatus: true,
        booksFiltered: booksFiltered,
      };

    case "BOOKS_TO_BE_LOADED_AND_FILTERED":
      return {
        ...state,
        filterStatus: true,
        userFilter: action.filter,
      };

    case "BOOKS_TOGGLE_SORTING":
      return {
        ...state,
        sortBy: action.typeOfSorting,
      };

    default:
      return state;
  }
};

export default reducer;
