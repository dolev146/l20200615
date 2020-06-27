import Book from './book.js'
// Form helper
export default class FormBook {
    static get title() {
        return document.querySelector('#title').value
    }

    static get author() {
        return document.querySelector('#author').value
    }
    static get isbn() {
        return document.querySelector('#isbn').value
    }
    static set title(item) {
        document.querySelector('#title').value = item
    }

    static set author(item) {
        document.querySelector('#author').value = item
    }
    static set isbn(item) {
        document.querySelector('#isbn').value = item
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
