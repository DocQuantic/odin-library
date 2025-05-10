const myLibrary = [];

class Book {
    constructor(title, author, pages, isRead, id){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = id;
    }

    switchReadState(){
        this.isRead ? this.isRead=false : this.isRead=true;
    }
}

function addBookToLibrary(title, author, pages, isRead){
    const id = crypto.randomUUID();
    let book = new Book(title, author, pages, isRead, id);

    myLibrary.push(book);

    updateLibrary();
}

function createBookCard(book){
    const library = document.querySelector(".library");

    book.isRead ? readState="Read" : readState="Not read yet";
    book.isRead ? readBtnId="read-button" : readBtnId="not-read-button"

    const newCard = document.createElement("div");
    newCard.classList.add("book-card");
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
    readButton.setAttribute("id", readBtnId);
    readButton.setAttribute("data-attribute", book.id);
    readButton.innerHTML = readState;
    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.setAttribute("data-attribute", book.id);
    removeButton.innerHTML = "Remove";

    cardButtons.appendChild(readButton);
    cardButtons.appendChild(removeButton);

    newCard.appendChild(bookTitle);
    newCard.appendChild(bookAuthor);
    newCard.appendChild(bookPages);
    newCard.appendChild(cardButtons);

    library.appendChild(newCard);

    removeButton.addEventListener("click", function(event) {
        bookId = this.getAttribute("data-attribute");
        
        cardToRemove = document.querySelector(`.book-card[data-attribute="${bookId}"]`);
        bookIndex = myLibrary.findIndex((book) => {
            return book.id === bookId;
        })
        myLibrary.splice(bookIndex, 1);
        updateLibrary();
    })

    readButton.addEventListener("click", function() {
        bookId = this.getAttribute("data-attribute");
        
        cardToRemove = document.querySelector(`.book-card[data-attribute="${bookId}"]`);
        bookIndex = myLibrary.findIndex((book) => {
            return book.id === bookId;
        })
        myLibrary[bookIndex].switchReadState();
        updateLibrary();
    })
}

function clearLibrary(){
    const cards = document.querySelectorAll(".book-card");
    for(let i=0; i<cards.length; i++){
        cards[i].remove();
    }
}

function updateLibrary(){
    clearLibrary();

    for(let i=0; i<myLibrary.length; i++){
        const book = myLibrary[i];
        createBookCard(book);
    }
}

addBookBtn = document.querySelector("#add-book-btn");
addBookBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    bookTitle = document.querySelector("#book-title").value;
    bookAuthor = document.querySelector("#book-author").value;
    bookPages = document.querySelector("#book-pages").value;
    bookRead = document.querySelector("input[name='book-read']:checked").value;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
})