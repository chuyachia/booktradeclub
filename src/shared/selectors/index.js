import { createSelector } from 'reselect';

const ownedBooks = store => store.userinfo.ownedbooks;
export const getBooksId = createSelector(
    ownedBooks,
    books=>books.map(book=>book.bookId)
);

const outRequests = store=>store.userinfo.outrequests;
const targetBook = store=>store.viewbook.info.bookId;
export const getExistingRequests =  createSelector(
    [outRequests,targetBook],
    (requests,target)=>requests.filter(request=>
    request.receiver.bookId==target&&request.status!="declined").map(
        request=>request.receiver.username
    )
);
const inRequests = store=>store.userinfo.inrequests;
export const getAllUnreadRequests = createSelector(
    [outRequests,inRequests],
    (outrequests,inrequests)=>{return outrequests.filter(request=>request.sender.unread==true).length+
    inrequests.filter(request=>request.receiver.unread==true).length}
);