let myLibrary = [];

const Library ={
    books: [],
    addBookToLibrary: function(book){
        this.books.push(book);
    }
}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function(){
    readState = this.read ? "read" : "not read";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readState} yet`;
}

let b1 = new Book("Book One", "A. B. Richards", 234, false);
let b2 = new Book("Book Two", "A. B. Richards", 226, false);
let b3 = new Book("Book Three", "Clive Smiths", 34, true);

Library.addBookToLibrary(b1);
Library.addBookToLibrary(b2);
Library.addBookToLibrary(b3);