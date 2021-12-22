import React from "react";

function BookCard(props) {
  const { bookInfo } = props;
  console.log("card");

  return (
    <>
      <div className="book-card">
        <p className="card-title">{bookInfo.volumeInfo.title}</p>
        <button variant="primary">See the book</button>
      </div>
    </>
  );
}

export default BookCard;
