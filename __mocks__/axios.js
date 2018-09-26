import books from './books.json';

const API = {
  get: jest.fn((url) => {
    switch (url) {
      case '/books/all':
        return Promise.resolve({
          data:books
        });
      default:
        return Promise.resolve({
          data: books
        })
    
    }
  })
};
module.exports = API;