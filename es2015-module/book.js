import Store from './Store.js'

export default class Book {
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

