import Store from './Store.js'
// UI class
export default class UI {
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
