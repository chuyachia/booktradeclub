import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import Modal from '../../src/shared/components/Modal';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const mockStore = configureStore();

describe('Modal Snapshot',()=>{
    let data;
    beforeEach(()=>{
        data = {
            viewbook:{
                btnuse: '',
                tologin:false,
                open:true,
                info:{
                    authors:[],
                    bookId:"",
                    categories:[],
                    description:"",
                    imageUrl:"",
                    ownBy:[],
                    publishedDate:"",
                    publisher:"",
                    title:""
                },
            ownerslocation:[]
            }, userinfo:{
                username : null,
                email:null,
                ownedbooks:[],
                outrequests:[]                
            }, alerts:{
                open:true,
                message:'test'
            }
        };
    });
    
    it('Snapshot of Modal for add request use', () => {
        data.viewbook.btnuse = 'addrequest';
        var store = mockStore(data);
        expect(EnzymeToJson(mount(<Provider store={store}><Modal/></Provider>))).toMatchSnapshot();
    });
    
    it('Snapshot of Modal for add book use', () => {
        data.viewbook.btnuse = 'addbook';
        var store = mockStore(data);
        expect(EnzymeToJson(mount(<Provider store={store}><Modal/></Provider>))).toMatchSnapshot();
    });

    it('Snapshot of Modal for answer sender use', () => {
        data.viewbook.btnuse = 'answersender';
        var store = mockStore(data);
        expect(EnzymeToJson(mount(<Provider store={store}><Modal/></Provider>))).toMatchSnapshot();
    });
    
    it('Snapshot of Modal for remove book use', () => {
        data.viewbook.btnuse = 'removebook';
        var store = mockStore(data);
        expect(EnzymeToJson(mount(<Provider store={store}><Modal/></Provider>))).toMatchSnapshot();
    });
});