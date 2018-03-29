import axios from "axios";

function apiHandler(){
    const apiurl = "https://www.googleapis.com/books/v1/volumes?maxResults=40";
    this.search = function(req,res){
        console.log(req.params.bookname);
        var url = apiurl+"&q="+encodeURI(req.params.bookname);
        axios.get(url)
        .then(response=> {
            var retObj = response.data.items.map(function(book){
                return({
                    bookId:book.id,
                    title:book.volumeInfo.title,
                    authors:book.volumeInfo.authors,
                    publisher:book.volumeInfo.publisher,
                    publishedDate:book.volumeInfo.publishedDate,
                    description:book.volumeInfo.description,
                    imageUrl:book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:null,
                    categories:book.volumeInfo.categories
                    
                })
            });
            res.send(retObj)
            
        })
        .catch(error=> {
            console.log(error);
            res.send('Search error');
        });
    };
}

export default new apiHandler();

