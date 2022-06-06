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

let b1 = new Book("Book One", "A. B. Richards", 234, "Unread");
let b2 = new Book("Book Two", "A. B. Richards", 226, "Unread");
let b3 = new Book("Book Three", "Clive Smiths", 34, "Read");
let b4 = new Book("Eloquent Javascript", "Marijn Haverbeke", 234, "Unread");
let b5 = new Book("You Don't Know JS Yet", "Kyle Simpson", 143, "Read");

Library.addBookToLibrary(b1);
Library.addBookToLibrary(b2);
Library.addBookToLibrary(b3);
Library.addBookToLibrary(b4);
Library.addBookToLibrary(b5);

//Add elements to body
let dom_utils = {};
(function(context) {
   
    /**
     * @param {Object} o - object literal with element properties
     */
    context.createEl = function(o) {
      let type = o.type || 'div';
      let el = document.createElement(type);
        for (const key of (Object.keys(o))) {
          if (key != 'attrs' && key != 'type') {
            el[key] = o[key];
          }
        }
        if (o.attrs) {
             for (let key of (Object.keys(o.attrs))) {
                let value = o.attrs[key];
                if (key != key.toLowerCase()) {
                   key = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
                }
                el.setAttribute(key, value);
            }
        }
       
        return el;
    };

})(dom_utils);

function changeColor(el) {
  let color = Math.floor(Math.random()*16777215).toString(16);
  el.style.color = '#' + color;
}

function removeBook(el){
    let card = el.parentElement.parentElement;
    let index = el.parentElement.parentElement.dataset.id;
    Library.books.splice(index,1);
    card.style.display="none";
    card.parentElement.innerHTML ="";
    init();
}

function toggleReadStatus(el){
    let index = el.parentElement.parentElement.dataset.id;
    let status = el.options[el.selectedIndex].value;
    Library.books[index].read = status;
    console.log(status);
}
function init() {
  let root = document.querySelector('.main');
  Library.books.forEach((book, index) => {
    let el =  dom_utils.createEl({
        type:'div',
        className:'card',
        innerHTML:`<div class="inner">
        <h2>${book.title}</h2>
        <p>by</p>
        <p><strong>${book.author}</strong></p>
    </div>
    <div class="bookOptions">
        <select name="bookRead"  onchange="toggleReadStatus(this)">
            <option value="Read">Read</option>
            <option value="Unread">Unread</option>
          </select>
          <i class="fa fa-trash" aria-hidden="true" onclick="removeBook(this)"></i>
    </div>`,
        attrs:{
          dataId:`${index}`,
          dataFoo:'bar',
          dataBaz:'garply',
          onclick:'changeColor(this);'
        }
      });

      if(book.read=="Read"){
        el.children[1].children[0].value="Read"
      }else{
        el.children[1].children[0].value="Unread"
      }
      root.appendChild(el);      
  });
  let el = dom_utils.createEl({
    type:'div',
    className:'card',
    innerHTML:`<div class="inner">
    <h2>You Don't Know JS Yet</h2>
    <p>by</p>
    <p><strong>Kyle Simpson</strong></p>
</div>
<div class="bookOptions">
    <select name="bookRead">
        <option value="Read">Read</option>
        <option value="Unread">Unread</option>
      </select>
      <i class="fa fa-trash" aria-hidden="true"></i>
</div>`,
    attrs:{
      dataFoo:'bar',
      dataBaz:'garply',
      onclick:'changeColor(this);'
    }
  });
  root.appendChild(el);
}

init();