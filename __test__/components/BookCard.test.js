import '../enzymeSetup';
import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import reducer from "../../src/shared/reducers";
import thunk from "redux-thunk";
import BookCard from '../../src/shared/components/BookCard';

function setupIntegrationTest(reducers) {
  const dispatchSpy = jest.fn(() => ({})); 
  const reducerSpy = (state, action) => dispatchSpy(action);
  const emptyStore = applyMiddleware(thunk)(createStore);
  const combinedReducers = combineReducers({
    reducerSpy,
    ...reducers,
  });
  const store = emptyStore(combinedReducers);

  return { store, dispatchSpy };
}

describe('BookCard integration test', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    ({ store, dispatchSpy } = setupIntegrationTest({ reducer }));
  });
  
  it('test to be completed', () => {
    var info = {
        authors:[],
        bookId:"",
        categories:[],
        description:"",
        imageUrl:"",
        ownBy:[],
        publishedDate:"",
        publisher:"",
        title:""
    };
    const sut = mount(
    <Provider store={store}>
      <BookCard info={info} modaluse={modaluse}/>
    </Provider>
    );
    const modaluse = "info";
    const expected = {...info,btnuse:modaluse};
    
    sut.find('.card').simulate('click');
    
    expect(dispatchSpy).toBeCalledWith({ type: 'VIEW_BOOK',payload:expected });
  
    });
})