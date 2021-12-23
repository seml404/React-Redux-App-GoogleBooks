export default class booksLoaderService {
  constructor() {
    this._apiBase = "AIzaSyBegn1BYkKYId9tsTKsCtjKa1IhDsFK3JM";
    this._apiAddress = "https://www.googleapis.com/books/v1/volumes";
  }

  requestSender = async (url) => {
    let first = await fetch(url);
    let res = await first.json();
    return res;
  };

  loadBooks = async (request, sorting = "relevance", idx = 0) => {
    let res = await this.requestSender(
      `${this._apiAddress}?q=${request}&orderBy=${sorting}&startIndex=${idx}&maxResults=30&key=${this._apiBase}`
    );
    return res;
  };

  loadBookInfo = async (bookId) => {
    let res = await this.requestSender(
      `${this._apiAddress}/${bookId}?key=${this._apiBase}`
    );
    return res;
  };
}

// async function searchForBooks(request, sorting) {
//   console.log(request, sorting);
//   let first = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${request}&orderBy=${sorting}&startIndex=0&maxResults=30&key=${projectAPI}`
//   );
//   let res = await first.json();
//   searchInitiated(res.items, request);
// }

// async function loadMore() {
//   let idx = paginateIdx;
//   let first = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${userRequest}&orderBy=${sortBy}&startIndex=${idx}&maxResults=30&key=${projectAPI}`
//   );
//   let res = await first.json();
//   searchMore(res.items);
//   setPaginateIdx(paginateIdx + 30);
// }

//   async function updateItem() {
//     let first = await fetch(
//       `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${projectAPI}`
//     );
//     let res = await first.json();
//     console.log(res);
//     setBookInfo({ ...res.volumeInfo });
//   }

// case "BOOKS_FOUND":
//   if (state.filterStatus) {
//     let filtered = action.list.filter((item) => {
//       console.log(item.volumeInfo.categories?.includes(state.userFilter));
//       return item.volumeInfo.categories?.includes(state.userFilter);
//     });
//     return {
//       ...state,
//       booksList: action.list,
//       booksFiltered: filtered,
//       loading: false,
//     };
//   } else {
//     return {
//       ...state,
//       booksList: action.list,
//       loading: false,
//     };
//   }

// case "SEARCH_MORE":
//   if (state.filterStatus) {
//     let filtered = action.addToBooksList.filter((item) => {
//       return item.volumeInfo.categories?.includes(state.userFilter);
//     });
//     return {
//       ...state,
//       booksList: [...state.booksList, ...action.addToBooksList],
//       booksFiltered: [...state.booksFiltered, ...filtered],
//       booksCounter: [...state.booksFiltered, ...filtered].length,
//     };
//   } else {
//     return {
//       ...state,
//       booksList: [...state.booksList, ...action.addToBooksList],
//       loading: false,
//       booksCounter: [...state.booksList, ...action.addToBooksList].length,
//     };
//   }

// const booksFound = (newBooksList) => {
//   return {
//     type: "BOOKS_FOUND",
//     list: newBooksList,
//   };
// };
