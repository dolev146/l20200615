
import UI from './ui.js'
import FormBook from './FormBookHelper.js'
import Store from './Store.js'

// global variable
var count = 3; //global variable

// Events : display book
document.addEventListener('DOMContentLoaded', UI.displayBooks())

// Events : add book
document.querySelector('#book-form').addEventListener('submit', e => {
    // prevent actual submit
    e.preventDefault();
    // get form values
    //const title = document.querySelector('#title').value
    const title = FormBook.title;
    const author = FormBook.author;
    const isbn = FormBook.isbn;

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
    if (e.toElement.classList[5] === "delete") {
        console.log(e.target)
        Store.removeBook(
            e.target.parentElement
                .parentElement
                .previousElementSibling.textContent
        )
        UI.deleteBook(e.target)
        UI.showAlert("Book removed", 'info')
    }

    else if (e.toElement.classList[5] === "edit") {
        if (count % 2 === 1) {
            var check = window.confirm("are you sure you want to edit this book? ")
            if (check === true) {
                console.log("edit");
                let bookarr = Store.onebook(e.target.parentElement.parentElement.previousElementSibling.textContent);
                let book = bookarr[0]
                FormBook.title = book.title;
                FormBook.author = book.author;
                FormBook.isbn = book.isbn;
                Store.removeBook(book.isbn);
                count++;
                let addBtn = document.querySelector("#book-form > input")
                addBtn.value = "Save your editing"
                addBtn.onclick = function (e) {
                    const book = FormBook.getBook()
                    let result = book.Validate();
                    if (result.valid) {
                        Store.Update(book)
                        FormBook.clearFeilds();
                        FormBook.focus(result.el);
                        let addBtn = document.querySelector("#book-form > input")
                        addBtn.value = "Add book"
                        UI.showAlert("Book Edited", 'success')

                    }
                    count++
                }
            }
        } else if (count % 2 === 0) {
            const book = FormBook.getBook()
            let result = book.Validate();
            if (result.valid) {
                Store.Update(book)
                FormBook.clearFeilds();
                FormBook.focus(result.el);
                let addBtn = document.querySelector("#book-form > input")
                addBtn.value = "Add book"
                UI.showAlert("Book Edited", 'success')

            }
            count++
        }

    }
})

