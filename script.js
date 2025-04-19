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
}

addBookToLibrary("The Witcher", "Me", 234, true);
console.log(myLibrary);
console.log(myLibrary[0].info())