import React, { useState } from "react";
import { connect } from "react-redux";
import {
  booksRequested,
  booksFound,
  booksUnfiltered,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksToggleSorting,
} from "../../actions";

function BooksSearch(props) {
  console.log(props);

  const {
    booksFound,
    booksUnfiltered,
    booksToBeLoadedAndFiltered,
    booksLoadedFiltered,
    booksToggleSorting,
  } = props;
  let { booksList, sortBy } = props;

  let [userRequest, setUserRequest] = useState();

  const projectAPI = "AIzaSyBegn1BYkKYId9tsTKsCtjKa1IhDsFK3JM";

  async function searchForBooks(request, sorting) {
    console.log(request, sorting);
    let first = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${request}&orderBy=${sorting}&key=${projectAPI}`
    );
    let res = await first.json();
    console.log(res.items);
    booksFound(res.items);
  }

  function submitRequest(event) {
    event.preventDefault();
    if (userRequest) {
      searchForBooks(userRequest, sortBy);
    }
  }

  function trackRequest(event) {
    let value = event.target.value;
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    booksList: state.booksList,
    loading: state.loading,
    sortBy: state.sortBy,
  };
};
const mapDispatchToProps = {
  booksRequested,
  booksFound,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksUnfiltered,
  booksToggleSorting,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksSearch);
