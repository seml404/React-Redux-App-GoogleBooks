import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { booksRequested, booksFound } from "../../actions";

function BooksSearch(props) {
  const { booksFound } = props;

  // let [booksFound, setBooksFound] = useState("");

  let [userRequest, setUserRequest] = useState("");

  const projectAPI = "AIzaSyBegn1BYkKYId9tsTKsCtjKa1IhDsFK3JM";

  async function searchForBooks(request) {
    let first = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${request}&key=${projectAPI}`
    );
    let res = await first.json();
    console.log(res.items);
    booksFound(res.items);
  }

  function submitRequest(event) {
    event.preventDefault();
    if (userRequest) {
      searchForBooks(userRequest);
    }
  }

  function trackRequest(event) {
    let value = event.target.value;
    setUserRequest([value]);
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
          <button type="submit"></button>
        </div>
        <div className="select-container">
          <select>
            <option>1</option>
          </select>
          <select>
            <option>1</option>
          </select>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    booksList: state.BooksList,
    loading: state.loading,
  };
};
const mapDispatchToProps = { booksRequested, booksFound };

export default connect(mapStateToProps, mapDispatchToProps)(BooksSearch);
