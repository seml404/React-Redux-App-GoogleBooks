import React, { useState } from "react";
import { connect } from "react-redux";
import BookCard from "../book-card/book-card";

function BooksFound(props) {
  console.log(props);
  return (
    <>
      <div className="books-container">
        {Array.isArray(props.booksList) && props.booksList.length > 0 ? (
          props.booksList.map((item) => {
            return <BookCard bookInfo={item} key={item.id}></BookCard>;
          })
        ) : (
          <p>please, submit your request</p>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    booksList: state.booksList,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(BooksFound);
