const myLibrary = [];

function Book(title, author, pages, isRead, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    
    this.info = function() {
      this.read ? readState="read" : readState="not read yet";
      info = `${this.title} by ${this.author}, ${this.pages} pages, ${readState}`;
      return info;
    }
}

function addBookToLibrary(title, author, pages, isRead){
    const id = crypto.randomUUID();
    let book = new Book(title, author, pages, isRead, id);

    myLibrary.push(book);

    updateLibrary();
}

function createBookCard(book){
    book.read ? readState="Read" : readState="Not read yet";

    const library = document.querySelector(".library");
    console.log(library);

    const newCard = document.createElement("div");
    newCard.classList.add("book");
    newCard.setAttribute("data-attribute", book.id);
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = book.title;
    const bookAuthor = document.createElement("h3");
    bookAuthor.innerText = `by ${book.author}`;
    const bookPages = document.createElement("p");
    bookPages.innerText = `${book.pages} pages`;
    const cardButtons = document.createElement("div");
    cardButtons.classList.add("buttons");
    const readButton = document.createElement("button");
    readButton.setAttribute("type", "button");
    readButton.innerHTML = readState;
    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.innerHTML = "Remove";

    cardButtons.appendChild(readButton);
    cardButtons.appendChild(removeButton);

    newCard.appendChild(bookTitle);
    newCard.appendChild(bookAuthor);
    newCard.appendChild(bookPages);
    newCard.appendChild(cardButtons);

    library.appendChild(newCard);
}

function updateLibrary(){
    for(let i=0; i<myLibrary.length; i++){
        const book = myLibrary[i];
        createBookCard(book);
    }
}

addBookToLibrary("The Witcher", "Me", 234, true);
console.log(myLibrary);
console.log(myLibrary[0].info())