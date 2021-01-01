let i=1;
class AddBook{
    constructor(name,writer,testimonials){
        this.name=name;
        this.writer=writer;
        this.testimonials=testimonials;

    }

}
class UpdateDisplay{

    static ShowLocalStorageBook(books_data){
        var books= JSON.parse(books_data) 
        books.forEach(book => {
         UpdateDisplay.UpdateUI(book)
        });
    }

    static UpdateUI(book){
    const tbody=document.querySelector('tbody')
     tbody.innerHTML+=`<tr>
     <th scope="row">${i++}</th>
     <td>${book.name}</td>
     <td>${book.writer}</td>
     <td>${book.testimonials}</td>
     <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
     </tr>`
    }

    static Reset(){
        bookName.value=''
        writerName.value=''
        testTimonials.value=''
    }

    static Alert(text,condition){
        const appendAlert=document.querySelector('.append-alert')
        const labelBook=document.querySelector('.label-book')
        const divAlert=document.createElement('div')   
        divAlert.className=`alert alert-${condition}`
        divAlert.textContent=`${text}`
        divAlert.setAttribute('role','alert') 
        appendAlert.insertBefore(divAlert,labelBook)
        setTimeout(() => {
            divAlert.remove()
        }, 2000);
    }
} 

class StoredBooks{
  
    static LocalstorageBooks(book){
        if(localStorage.getItem('data-book')===null){
            localStorage.setItem('data-book','[]')
        }
         var dataBooksarray=JSON.parse(localStorage.getItem('data-book'))
         dataBooksarray.push(book)
         localStorage.setItem('data-book',JSON.stringify(dataBooksarray))         
    }
    static DeleteLocalstorageBooks(DataLocalDelete){
        var dataBooksarray=JSON.parse(localStorage.getItem('data-book'))
        dataBooksarray.forEach((data_book,index) => {
         if (data_book.name===DataLocalDelete) {
            dataBooksarray.splice(index,1)
            localStorage.setItem('data-book',JSON.stringify(dataBooksarray))  
         }
       });

    }
    
}
const bookName=document.querySelector('#book-name')
const writerName=document.querySelector('#writer-name')
const testTimonials=document.querySelector('#testimonials')
const submitBook=document.querySelector('.submit-book')

submitBook.addEventListener('click',(e)=>{
    if(bookName.value==''||writerName.value==''||testTimonials.value==''){
    UpdateDisplay.Alert('Fill In Properly','danger')

    }else{
    const Books_data=new AddBook(bookName.value,writerName.value,testTimonials.value)
    UpdateDisplay.UpdateUI(Books_data)
    UpdateDisplay.Reset()
    UpdateDisplay.Alert('Success In Adding Books','success')
    // Store Data Books From Local Storage
    StoredBooks.LocalstorageBooks(Books_data)
}
})



// Delete Button
document.body.addEventListener('click',(x)=>{
if(x.target.classList.contains('btn-delete')){
    let parentElementData=x.target.parentElement.parentElement
    let DataLocalDelete=parentElementData.childNodes[3].innerText
    StoredBooks.DeleteLocalstorageBooks(DataLocalDelete)
    parentElementData.remove()
   i--
}
})

// Show Data From LocalStorage 
function showDataBook(){
if(localStorage.getItem('data-book')!= null){
    UpdateDisplay.ShowLocalStorageBook(localStorage.getItem('data-book'))
 }
}

showDataBook()