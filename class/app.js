
// Events : display book
document.addEventListener('DOMContentLoaded', UI.displayBooks())

// Events : add book
document.querySelector('#book-form').addEventListener('submit', e => {
    // prevent actual submit
    e.preventDefault();
    // get form values
//    const title = document.querySelector('#title').value
// members
// data myname            o.myname
// method callIt()        o.callIt()
// property get title     o.title = "dfdfgdfg"

    //const title = FormBook.title;
    //const author = FormBook.author;
    //const isbn = FormBook.isbn;

    // instantiate book
    //const book = new Book(isbn, author, title);
    const book = FormBook.getBook()
    //console.log(book)
    let result = book.Validate();
    if (result.valid) {
        // add book to UI - list of books
        UI.addBookToList(book);
        Store.addBook(book)
        // clear feilds
        FormBook.clearFeilds();
        FormBook.focus(result.el);
        UI.showAlert("Book added", 'success')
    } else {
        //alert(result.msg)
        UI.showAlert(result.msg, 'danger')
        FormBook.focus(result.el)
    }
});

// Events : remove book [use event propogation]
document.querySelector('#book-list').addEventListener('click', e => {
    console.log(e.target)
    Store.removeBook(
        e.target.parentElement
         .parentElement
            .previousElementSibling.textContent
    )
    UI.deleteBook(e.target)
    UI.showAlert("Book removed", 'info')

})
