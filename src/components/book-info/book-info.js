import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import booksLoaderService from "../../services/book-loader-service";

function BookInfo(props) {
  const { projectAPI } = props;
  let params = useParams();
  let bookId = params.bookId;
  let [bookInfo, setBookInfo] = useState();
  const booksLoader = new booksLoaderService();

  async function updateItem(id) {
    let loadedInfo = await booksLoader.loadBookInfo(id);
    setBookInfo({ ...loadedInfo.volumeInfo });
  }

  useEffect(() => {
    console.log("I update");
    updateItem(bookId);
  }, [bookId]);

  if (bookInfo) {
    return (
      <>
        <div className="book-info-container">
          <div className="book-img">
            <img
              src={
                bookInfo.imageLinks?.thumbnail
                  ? bookInfo.imageLinks.thumbnail
                  : ""
              }
              alt="bookImg"
            ></img>
          </div>
          <div className="book-information">
            <div className="book-category">
              {bookInfo.categories ? bookInfo.categories[0] : ""}
            </div>
            <div className="book-title">
              {" "}
              {bookInfo.title ? bookInfo.title : ""}
            </div>
            <div className="book-title">
              {bookInfo.authors ? bookInfo.authors.join(" ") : ""}
            </div>
            <div className="book-title">
              {bookInfo.description ? bookInfo.description : ""}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <span>Please, select an item to see info</span>;
  }
}

const mapStateToProps = (state) => {
  return {
    projectAPI: state.projectAPI,
  };
};

export default connect(mapStateToProps)(BookInfo);
