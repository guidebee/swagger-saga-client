import swaggerReducer, {swaggerReducers} from "../swaggerReducer";
import {fromJS} from 'immutable';

const reducers = (state = {}, action) =>
  swaggerReducers(['store', 'pet', 'store1', 'pet1'])(state, action);

const reducer = (state = {}, action) =>
  swaggerReducer('pet')(state, action);

const initialState = fromJS({});

describe('single reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle PET_FETCH_SUCCESS', () => {
    const action = {
      type: 'PET_FETCH_SUCCESS',
      entity: {
        body: 'body'
      }

    };

    const state = reducer(initialState, action);
    const petState = state.get('pet');
    expect(petState).toEqual({status: 'success', body: 'body'});
  });

  it('should handle PET_FETCH_FAILURE', () => {
    const action = {
      type: 'PET_FETCH_FAILURE',
      entity: {}

    };

    const state = reducer(initialState, action);
    const petState = state.get('pet');
    expect(petState.status).toBe('failure');
  });

  it('should handle PET_FETCH_TIMEOUT', () => {
    const action = {
      type: 'PET_FETCH_TIMEOUT',
      entity: {}

    };

    const state = reducer(initialState, action);
    const petState = state.get('pet');
    expect(petState.status).toBe('timeout');
  });

});

describe('multiple reducers', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual({});
  });

  it('should handle PET_FETCH_SUCCESS', () => {
    const action = {
      type: 'PET_FETCH_SUCCESS',
      entity: {
        body: 'body'
      }

    };

    const state = reducers(initialState, action);
    const petState = state.get('pet');
    expect(petState).toEqual({status: 'success', body: 'body'});
  });

  it('should handle PET_FETCH_FAILURE', () => {
    const action = {
      type: 'PET_FETCH_FAILURE',
      entity: {}

    };

    const state = reducers(initialState, action);
    const petState = state.get('pet');
    expect(petState.status).toBe('failure');
  });

  it('should handle PET_FETCH_TIMEOUT', () => {
    const action = {
      type: 'PET_FETCH_TIMEOUT',
      entity: {}

    };

    const state = reducers(initialState, action);
    const petState = state.get('pet');
    expect(petState.status).toBe('timeout');
  });

  it('should handle STORE_FETCH_SUCCESS', () => {
    const action = {
      type: 'STORE_FETCH_SUCCESS',
      entity: {
        body: 'body'
      }

    };

    const state = reducers(initialState, action);
    const storeState = state.get('store');
    expect(storeState).toEqual({status: 'success', body: 'body'});
  });

  it('should handle STORE_FETCH_FAILURE', () => {
    const action = {
      type: 'STORE_FETCH_FAILURE',
      entity: {}

    };

    const state = reducers(initialState, action);
    const storeState = state.get('store');
    expect(storeState.status).toBe('failure');
  });

  it('should handle STORE_FETCH_TIMEOUT', () => {
    const action = {
      type: 'STORE_FETCH_TIMEOUT',
      entity: {}

    };

    const state = reducers(initialState, action);
    const storeState = state.get('store');
    expect(storeState.status).toBe('timeout');
  });
});
