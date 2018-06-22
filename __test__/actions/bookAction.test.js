//https://redux.js.org/recipes/writing-tests#async-action-creators
//https://stackoverflow.com/questions/48306319/getting-then-of-undefined-when-trying-to-test-a-dispatch-action-function-in-rea
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/shared/actions/bookAction';

const mockStore = configureMockStore([thunk]);

describe('Test book actions',()=>{
    it('View book action',()=>{
        const store = mockStore();
        const cases = ['addbook','addrequest','answersender','removebook','info'];
        const types = ['VIEW_ADD_BOOK','VIEW_REQUEST_BOOK','VIEW_EXCHANGE_BOOK','VIEW_REMOVE_BOOK','VIEW_BOOK'];
        cases.forEach(function(c,ind){
            store.dispatch(actions.viewBook({},c));
        });
        const expected =cases.map(function(c,ind){
            return {type:types[ind],payload:{btnuse:c}};
        });
        expect(store.getActions()).toEqual(expected);
    });
    
    it('',()=>{return})
})