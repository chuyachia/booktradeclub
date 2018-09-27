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

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Main page test',()=>{
    let store;
    let wrapper;
    beforeEach(async ()=>{
        store=  applyMiddleware(thunk)(createStore)(reducer);
        wrapper = mount(<Router><Provider store={store}><Main/></Provider></Router>);
        await flushPromises();
        wrapper.update();
    });    
    it('Main page render n BookCards',()=>{
        expect(wrapper.find('BookCard')).toHaveLength(2);
    }); 
    it('Main page enter filter term',()=>{
        var filterField= wrapper.find('.searchbook');
        filterField.simulate('change', {target: {value: 'Mont'}});
        expect(wrapper.find('BookCard')).toHaveLength(1);
    });     
    it('Main page snapshot',()=>{
        expect(EnzymeToJson(wrapper)).toMatchSnapshot();
    }); 
})