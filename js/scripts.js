function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  name = document.querySelector("#inputBookName").value
  author = document.querySelector("#inputBookAuthor").value
  pages = document.querySelector("#inputBookPages").value
  if (document.querySelector("#readCheck").checked) {
    read = true;
  } else {
    read = false;
  }
  let book = new Book(name, author, pages, read)
  myLibrary.push(book)
  saveStorage();
  loadStorage();
  render();
  resetForm();
}

function resetForm() {
  document.querySelector("#bookForm").reset();
}

function render() {

  resetBooks();

  console.log(myLibrary)
  if (myLibrary.length === 0) {
    newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");

    library = document.querySelector(".library-content");
    library.appendChild(newBookCard);

    bookCardEmpty = document.createElement("div");
    bookCardEmpty.classList.add("book-card__empty");
    bookCardEmptyContent = document.createTextNode("No book is this library")
    bookCardEmpty.appendChild(bookCardEmptyContent);
    newBookCard.appendChild(bookCardEmpty);
  } else {
    myLibrary.forEach(function (book, index) {
      newBookCard = document.createElement("div");
      newBookCard.setAttribute("data-id", index);
      newBookCard.classList.add("book-card");

      library = document.querySelector(".library-content");
      library.appendChild(newBookCard);

      bookCardName = document.createElement("div");
      bookCardName.classList.add("book-card__name");
      bookCardNameContent = document.createTextNode(book.name)
      bookCardName.appendChild(bookCardNameContent);
      newBookCard.appendChild(bookCardName);

      bookCardAuthor = document.createElement("div");
      bookCardAuthor.classList.add("book-card__author");
      bookCardAuthorContent = document.createTextNode(book.author)
      bookCardAuthor.appendChild(bookCardAuthorContent);
      newBookCard.appendChild(bookCardAuthor);

      bookCardPages = document.createElement("div");
      bookCardPages.classList.add("book-card__pages");
      bookCardPagesContent = document.createTextNode(book.pages)
      bookCardPages.appendChild(bookCardPagesContent);
      newBookCard.appendChild(bookCardPages);

      bookBtnRead = document.createElement("i");
      bookBtnRead.classList.add("btn-read");
      bookBtnRead.classList.add("far");
      if (book.read) {
        bookBtnRead.classList.add("fa-check-square");
      } else {
        bookBtnRead.classList.add("fa-square");
      }
      newBookCard.appendChild(bookBtnRead);
      bookBtnRead.setAttribute("data-id", index);

      bookBtnRemove = document.createElement("i");
      bookBtnRemove.classList.add("btn-remove");
      bookBtnRemove.classList.add("fas");
      bookBtnRemove.classList.add("fa-times");
      bookBtnRemove.setAttribute("data-id", index);

      newBookCard.appendChild(bookBtnRemove);
    });
  }

  refreshButtons();
}

function refreshButtons() {
  document.querySelectorAll('.btn-remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      id = btn.getAttribute("data-id")
      document.querySelector('[data-id="' + id + '"]').remove()
      myLibrary.splice(id, 1);
      saveStorage();
      render();
    });
  });

  document.querySelectorAll('.btn-read').forEach(function (btn) {
    btn.addEventListener('click', function () {
      id = btn.getAttribute("data-id")
      book = myLibrary[id]
      if (book.read) {
        btn.classList.remove("fa-check-square");
        btn.classList.add("fa-square")
        book.read = false
      } else {
        btn.classList.remove("fa-square");
        btn.classList.add("fa-check-square")
        book.read = true
      }
    });
  });
}

function resetBooks() {
  document.querySelectorAll('.book-card').forEach(function (div) {
    div.remove();
  });
}

function validateForm() {

  error = false

  bookNameInput = document.querySelector("#inputBookName")
  bookNameInput.classList.remove("has-error")
  bookNameError = document.querySelector("#bookNameError")
  bookNameError.textContent = ""

  bookAuthorInput = document.querySelector("#inputBookAuthor")
  bookAuthorInput.classList.remove("has-error")
  bookAuthorError = document.querySelector("#bookAuthorError")
  bookAuthorError.textContent = ""

  bookPagesInput = document.querySelector("#inputBookPages")
  bookPagesInput.classList.remove("has-error")
  bookPagesError = document.querySelector("#bookPagesError")
  bookPagesError.textContent = ""

  bookAuthorInput = document.querySelector("#inputBookAuthor")
  if (bookNameInput.value == "") {
    bookNameError.textContent = "Cannot be blank."
    bookNameInput.focus();
    bookNameInput.classList.add("has-error");
    error = true;
  } else if (bookNameInput.value.length > 20) {
    document.querySelector("#bookNameError").textContent = "Must contain less than 20 characters."
    bookNameInput.focus();
    bookNameInput.classList.add("has-error");
    error = true;
  }

  if (bookAuthorInput.value == "") {
    bookAuthorError.textContent = "Cannot be blank."
    bookAuthorInput.focus();
    bookAuthorInput.classList.add("has-error");
    error = true;
  } else if (bookAuthorInput.value.length > 20) {
    bookAuthorError.textContent = "Must contain less than 20 characters."
    bookAuthorInput.focus();
    bookAuthorInput.classList.add("has-error");
    error = true;
  }

  if (bookPagesInput.value == "") {
    bookPagesError.textContent = "Cannot be blank."
    bookPagesInput.focus();
    bookPagesInput.classList.add("has-error");
    error = true;
  } else if (bookPagesInput.value.length > 5) {
    bookPagesError.textContent = "Must contain less than 5 characters."
    bookPagesInput.focus();
    bookPagesInput.classList.add("has-error");
    error = true;
  }

  if (error) {
    return (false);
  } else {
    addBook();
    return (true);
  }
}

function saveStorage() {
  localStorage.setItem("storedLibrary", JSON.stringify(myLibrary));
}

function loadStorage() {
  myLibrary = JSON.parse(localStorage.getItem("storedLibrary"));
}

function defaultLibrary() {
  let hobbit = new Book("To Kill a Mockingbird", "Harper Lee", "324", false)
  let tempLibrary = []
  tempLibrary.push(hobbit)

  let harry = new Book("Pride and Prejudice", "Jane Austen, Anna Quindlen", "279", false)
  tempLibrary.push(harry)

  return tempLibrary;
}

function initializeLibrary() {
  if (JSON.parse(localStorage.getItem("storedLibrary")) == null) {
    return defaultLibrary();
  }
  else {
    console.log((JSON.parse(localStorage.getItem("storedLibrary"))))
    return (JSON.parse(localStorage.getItem("storedLibrary")));
  }
}
myLibrary = initializeLibrary();
saveStorage();
render();