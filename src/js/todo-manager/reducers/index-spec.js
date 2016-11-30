import { expect } from 'chai';
import { fromJS } from 'immutable';
import reducer, { TodoManagerRecord } from './';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from '../actions';

describe('Todo Manager => Reducer', () => {
  describe('Default', () => {
    it('given unknown action, should return initial state', () => {
      expect(reducer(undefined, { type: 'UNKNOWN' })).to.deep.equal(new TodoManagerRecord());
    });
  });

  describe('ADD_TODO', () => {
    it('when adding todo, should return new todo', () => {
      const initialState = new TodoManagerRecord();

      const actualState = reducer(initialState, { type: ADD_TODO, id: 1, text: 'item 1' });

      const expectedState = new TodoManagerRecord({
        todos: fromJS([
          {
            id: 1,
            text: 'item 1',
            completed: false
          }
        ])
      });

      expect(actualState.toJS()).to.deep.equal(expectedState.toJS());
    });
  });

  describe('TOGGLE_TODO', () => {
    it('when toggling incomplete todo, should return completed flag', () => {
      const initialState = new TodoManagerRecord({
        todos: fromJS([
          {
            id: 1,
            text: 'item 1',
            completed: false
          },
          {
            id: 2,
            text: 'item 2',
            completed: false
          }
        ])
      });

      const actualState = reducer(initialState, { type: TOGGLE_TODO, id: 1 });

      const expectedState = new TodoManagerRecord({
        todos: fromJS([
          {
            id: 1,
            text: 'item 1',
            completed: true
          },
          {
            id: 2,
            text: 'item 2',
            completed: false
          }
        ])
      });

      expect(actualState.toJS()).to.deep.equal(expectedState.toJS());
    });
  });

  describe('SET_VISIBILITY_FILTER', () => {
    it('given a filter, should return action', () => {
      const initialState = new TodoManagerRecord();

      const actualState = reducer(initialState, { type: SET_VISIBILITY_FILTER, filter: 'ALL' });

      const expectedState = new TodoManagerRecord({ visibilityFilter: 'ALL' });

      expect(actualState.toJS()).to.deep.equal(expectedState.toJS());
    });
  });
});