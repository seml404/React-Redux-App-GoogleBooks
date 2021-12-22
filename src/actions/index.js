const booksFound = (newBooksList) => {
  return {
    type: "BOOKS_FOUND",
    list: newBooksList,
  };
};

const booksUnfiltered = () => {
  return {
    type: "BOOKS_UNFILTERED",
  };
};

const booksRequested = () => {
  return {
    type: "BOOKS_REQUESTED",
  };
};

const booksLoadedFiltered = (filter) => {
  return {
    type: "BOOKS_LOADED_FILTERED",
    filter: filter,
  };
};

const booksToBeLoadedAndFiltered = (filter) => {
  return {
    type: "BOOKS_TO_BE_LOADED_AND_FILTERED",
    filter: filter,
  };
};

const booksToggleSorting = (typeOfSorting) => {
  return {
    type: "BOOKS_TOGGLE_SORTING",
    typeOfSorting: typeOfSorting,
  };
};

export {
  booksFound,
  booksRequested,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksUnfiltered,
  booksToggleSorting,
};
