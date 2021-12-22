const booksFound = (newBooksList) => {
  return {
    type: "BOOKS_FOUND",
    list: newBooksList,
  };
};

const booksRequested = () => {
  return {
    type: "BOOKS_REQUESTED",
  };
};

export { booksFound, booksRequested };
