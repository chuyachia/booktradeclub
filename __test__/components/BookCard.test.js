//https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import reducer from "../../src/shared/reducers";
import thunk from "redux-thunk";
import BookCard from '../../src/shared/components/BookCard';

enzyme.configure({ adapter: new ReactSixteenAdapter() });

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