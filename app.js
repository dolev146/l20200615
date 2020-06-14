// Book class
class Book {
    constructor(isbn, author, title) {
        this.isbn = isbn;
        this.author = author;
        this.title = title;
    }

    Validate() {
        let answer = {
            valid: true,
            msg: 'successfully',
            el: 'title'
        }
        if (this.isbn === '') {
            answer.valid = false;
            answer.msg = 'ISBN is required'
            answer.el = 'isbn'
        }
        if (Store.exists(this.isbn)) {
            answer.valid = false;
            answer.msg = 'ISBN is already exists'
            answer.el = 'isbn'
        }

        if (this.author === '') {
            answer.valid = false;
            answer.msg = 'Author is required'
            answer.el = 'author'
        }

        if (this.title === '') {
            answer.valid = false;
            answer.msg = 'Title is required'
            answer.el = 'title'
        }
        // everithing is valid
        return answer
    }
}


// UI class
class UI {
    static displayBooks() {
        //      const books = StoredBooks;
        const books = Store.getBooks();
        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <i class="fas fa-edit btn btn-primary btn-sm edit" title="EDIT"></i>&nbsp;
                <a href="#" title="DELETE">
                <i class='fas fa-trash-alt btn btn-danger btn-sm delete'></i>
                </a> 
            </td>
        `
// <i style="font-size: 14px" class="fa btn-danger delete btn-sm">&#xf00d;</i>

        list.appendChild(row)
    }

    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            // i   ->   a     ->      td       ->    tr  
            element.parentElement.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, color) {
        let alertDiv = document.createElement('div');
        alertDiv.appendChild(document.createTextNode(message));
        document.body.appendChild(alertDiv)
        alertDiv.style.position = "absolute";
        alertDiv.style.fontSize = "2em"
        alertDiv.className = `alert alert-${color}`;
        alertDiv.style.width = "25%";
        alertDiv.style.top = "40px";
        alertDiv.style.left = "-350px";;
        alertDiv.style.opacity = 0;
        alertDiv.style.transition = "transform 1s , opacity 2s";
        setTimeout(() => {
            alertDiv.style.transform = "translateX(350px)";
            alertDiv.style.opacity = 1
        }, 500)
        setTimeout(() => alertDiv.style.opacity = 0, 2500)
        setTimeout(() => alertDiv.remove(), 5000)
    }

}

// Form helper
class FormBook {
    static get title() {
        return document.querySelector('#title').value
    }

    static get author() {
        return document.querySelector('#author').value
    }
    static get isbn() {
        return document.querySelector('#isbn').value
    }

    static getBook() {
        return new Book(FormBook.isbn, FormBook.author, FormBook.title);
    }

    static focus(input) {
        document.querySelector(`#${input}`).focus()
    }

    static clearFeilds() {
        document.querySelector('#isbn').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#title').value = ''
    }
}
// const StoredBooks = [{
//     isbn: 12123445,
//     author: 'John Doe',
//     title: 'Harry Potter'
// },
// {
//     isbn: 45652367,
//     author: 'Jan Doe',
//     title: 'Danny Potter'
// }
// ];

// Store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static exists(isbn_to_find) {
        const book = Store.getBooks().find(({ isbn }) => isbn === isbn_to_find)
        return book !== undefined;   
    }

    static save(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    static addBook(book) {
        const books = Store.getBooks('books');
        books.push(book)
        Store.save(books)
    }

    static removeBook(isbn) {
        // const books = Store.getBooks('books');
        let books = Store.getBooks('books');
        books = books.filter(book => book.isbn !== isbn)
        Store.save(books)
    }
}


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
    console.log(e.target)
    Store.removeBook(
        e.target.parentElement
         .parentElement
            .previousElementSibling.textContent
    )
    UI.deleteBook(e.target)
    UI.showAlert("Book removed", 'info')

})