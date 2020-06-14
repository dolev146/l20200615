export default class Store {
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
