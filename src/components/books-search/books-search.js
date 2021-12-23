import React, { useState } from "react";
import { connect } from "react-redux";
import {
  booksRequested,
  searchInitiated,
  booksUnfiltered,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksToggleSorting,
  clearPrevRequest,
} from "../../actions";
import booksLoaderService from "../../services/book-loader-service";

function BooksSearch(props) {
  const {
    searchInitiated,
    booksUnfiltered,
    booksToBeLoadedAndFiltered,
    booksLoadedFiltered,
    booksToggleSorting,
    projectAPI,
    clearPrevRequest,
  } = props;
  let { booksList, sortBy, booksCounter } = props;
  let [userRequest, setUserRequest] = useState();

  const booksLoader = new booksLoaderService();

  async function searchForBooks(request, sorting) {
    let loaded = await booksLoader.loadBooks(request, sorting);
    searchInitiated(loaded.items, request);
  }

  function submitRequest(event) {
    event.preventDefault();
    if (userRequest) {
      searchForBooks(userRequest, sortBy);
    }
  }

  function trackRequest(event) {
    let value = event.target.value;
    if (!value) {
      clearPrevRequest();
    }
    setUserRequest(value);
  }

  function toggleFilter(value) {
    if (value === "All") {
      booksUnfiltered();
    } else if (booksList.length > 0) {
      booksLoadedFiltered(value);
    } else {
      booksToBeLoadedAndFiltered(value);
    }
  }

  function toggleSorting(item) {
    +item.options.selectedIndex === 0
      ? booksToggleSorting("relevance")
      : booksToggleSorting("newest");
    if (booksList.length > 0) {
      searchForBooks(userRequest, sortBy);
    }
  }

  return (
    <>
      <h1>Search for books</h1>
      <form
        type="submit"
        onSubmit={(e) => {
          submitRequest(e);
        }}
      >
        <div className="search-container">
          <input
            type="text"
            placeholder="Please, enter your request"
            onChange={(e) => trackRequest(e)}
          ></input>
          <button
            className="btn-search"
            type="submit"
            onSubmit={(e) => {
              submitRequest(e);
            }}
          >
            find
          </button>
        </div>
        <div className="select-container">
          <label htmlFor="categories">Categories</label>
          <select
            onChange={(e) => toggleFilter(e.target.value)}
            id="categories"
          >
            <option id="All">All</option>
            <option id="Art">Art</option>
            <option id="Biography">Biography</option>
            <option id="Computers">Computers</option>
            <option id="History">History</option>
            <option id="Medical">Medical</option>
            <option id="Poetry">Poetry</option>
          </select>
          <label htmlFor="sort-by">Sort by</label>
          <select id="sort-by" onChange={(e) => toggleSorting(e.target)}>
            <option>relevance</option>
            <option>newest</option>
          </select>
        </div>
      </form>
      <div className="counter-contatainer">
        <p>total amount found is: {booksCounter}</p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    booksList: state.booksList,
    loading: state.loading,
    sortBy: state.sortBy,
    projectAPI: state.projectAPI,
    booksCounter: state.booksCounter,
  };
};

const mapDispatchToProps = {
  booksRequested,
  searchInitiated,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksUnfiltered,
  booksToggleSorting,
  clearPrevRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksSearch);
