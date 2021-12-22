import React from "react";

import BooksSearch from "../books-search/books-search";
import BooksFound from "../books-found/books-found";

const App = () => {
  return (
    <div>
      <BooksSearch></BooksSearch>
      <BooksFound></BooksFound>
    </div>
  );
};

export default App;
