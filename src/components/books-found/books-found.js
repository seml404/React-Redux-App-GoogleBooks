import React, { useState } from "react";
import { connect } from "react-redux";
import BookCard from "../book-card/book-card";
import { searchMore } from "../../actions";
import { useNavigate } from "react-router-dom";

import booksLoaderService from "../../services/book-loader-service";

function BooksFound(props) {
  let [paginateIdx, setPaginateIdx] = useState(31);
  const { projectAPI, userRequest, sortBy, searchMore } = props;
  const navigate = useNavigate();
  const booksLoader = new booksLoaderService();

  async function loadMore() {
    let loaded = await booksLoader.loadBooks(userRequest, sortBy, paginateIdx);
    searchMore(loaded.items);
    setPaginateIdx(paginateIdx + 30);
  }

  function renderBooks(array) {
    return (
      <div className="books-results">
        <div className="cards-container">
          {array.map((item) => {
            return (
              <BookCard
                onItemSelected={(bookId) => {
                  navigate(`/${bookId}`);
                }}
                bookInfo={item}
                key={item.id + Math.random()}
              ></BookCard>
            );
          })}
        </div>
        <button onClick={() => loadMore()}>Load more</button>
      </div>
    );
  }

  function renderResult() {
    if (props.filterStatus) {
      return renderBooks(props.booksFiltered);
    } else if (Array.isArray(props.booksList) && props.booksList.length > 0) {
      return renderBooks(props.booksList);
    } else {
      return <p>please, submit your request</p>;
    }
  }
  return <>{renderResult()}</>;
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
