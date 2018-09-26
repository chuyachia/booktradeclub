import '../enzymeSetup';
import React from 'react';
import { mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import reducer from "../../src/shared/reducers";
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from 'redux';
import Main from '../../src/shared/pages/Main';
import BookCard from '../../src/shared/components/BookCard';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Main page test',()=>{
    let store;
    let component;
    beforeEach(async ()=>{
        store=  applyMiddleware(thunk)(createStore)(reducer);
        component = mount(<Router><Provider store={store}><Main/></Provider></Router>);
        await flushPromises();
        component.update();
    });    
    it('Main page render n BookCards',()=>{
        expect(component.find(BookCard)).toHaveLength(2);
    }); 
    
    it('Main page snapshot',()=>{
        expect(EnzymeToJson(component)).toMatchSnapshot();
    });  
})