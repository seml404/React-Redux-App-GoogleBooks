import React, { useState } from "react";
import { connect } from "react-redux";
import BookCard from "../book-card/book-card";
import { searchMore } from "../../actions";

function BooksFound(props) {
  let [paginateIdx, setPaginateIdx] = useState(31);

  const { projectAPI, userRequest, sortBy, searchMore } = props;

  async function loadMore() {
    let idx = paginateIdx;
    console.log(
      paginateIdx,
      `https://www.googleapis.com/books/v1/volumes?q=${userRequest}&orderBy=${sortBy}&startIndex=${idx}&maxResults=30&key=${projectAPI}`
    );
    let first = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${userRequest}&orderBy=${sortBy}&startIndex=${idx}&maxResults=30&key=${projectAPI}`
    );
    let res = await first.json();
    // console.log(res);
    // console.log(res.items);
    searchMore(res.items);
    setPaginateIdx(paginateIdx + 30);
  }

  function renderBooks() {
    if (props.filterStatus) {
      return (
        <div className="books-container">
          {props.booksFiltered.map((item) => {
            return (
              <BookCard
                bookInfo={item}
                key={item.id + Math.random()}
              ></BookCard>
            );
          })}
          <button onClick={() => loadMore()}>Load more</button>
        </div>
      );
    } else if (Array.isArray(props.booksList) && props.booksList.length > 0) {
      return (
        <div className="books-container">
          {props.booksList.map((item) => {
            return (
              <BookCard
                bookInfo={item}
                key={item.id + Math.random()}
              ></BookCard>
            );
          })}
          <button onClick={() => loadMore()}>Load more</button>
        </div>
      );
    } else {
      return <p>please, submit your request</p>;
    }
  }
  return <>{renderBooks()}</>;
}

const mapStateToProps = (state) => {
  return {
    filterStatus: state.filterStatus,
    booksFiltered: state.booksFiltered,
    booksList: state.booksList,
    loading: state.loading,
    userRequest: state.userRequest,
    projectAPI: state.projectAPI,
    sortBy: state.sortBy,
  };
};

const mapDispatchToProps = {
  searchMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksFound);
