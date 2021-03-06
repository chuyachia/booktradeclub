import axios from "axios";


export default function (req,res){
    const apiurl = "https://www.googleapis.com/books/v1/volumes?maxResults=40";
    var url = apiurl+"&q="+encodeURI(req.params.bookname);
    axios.get(url)
    .then(response=> {
        var duplicated = [];
        var retObj = [];
        response.data.items.forEach(function(book){
            if (duplicated.indexOf(book.id)==-1) {
                duplicated.push(book.id);
                retObj.push({
                    bookId:book.id,
                    title:book.volumeInfo.title,
                    authors:book.volumeInfo.authors,
                    publisher:book.volumeInfo.publisher,
                    publishedDate:book.volumeInfo.publishedDate,
                    description:book.volumeInfo.description,
                    imageUrl:book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:null,
                    categories:book.volumeInfo.categories
                    
                });
            }
        });
        res.json(retObj);
        
    })
    .catch(error=> {
        console.log(error);
        res.json('Search error');
    });
}

