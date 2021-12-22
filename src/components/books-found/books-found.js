import React, { useState } from "react";
import { connect } from "react-redux";
import BookCard from "../book-card/book-card";

function BooksFound(props) {
  console.log(props);

  function renderBooks() {
    if (props.filterStatus) {
      return props.booksFiltered.map((item) => {
        return (
          <BookCard bookInfo={item} key={item.id + Math.random()}></BookCard>
        );
      });
    } else if (Array.isArray(props.booksList) && props.booksList.length > 0) {
      return props.booksList.map((item) => {
        return (
          <BookCard bookInfo={item} key={item.id + Math.random()}></BookCard>
        );
      });
    } else {
      return <p>please, submit your request</p>;
    }
  }
  return (
    <>
      <div className="books-container">{renderBooks()}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    filterStatus: state.filterStatus,
    booksFiltered: state.booksFiltered,
    booksList: state.booksList,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(BooksFound);
