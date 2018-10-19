## Swagger saga client

### Installation

`npm install swagger-saga-client --save`


### Documentation

Basic usage:

`reducer.js `

```JS
import { fromJS } from 'immutable';

import { swaggerReducers } from 'swagger-saga-client';

const initialState = fromJS({});

export default (state = initialState, action) =>
  swaggerReducers(['store', 'pet', 'store1', 'pet1'])(state, action);

```

`saga.js `

```JS
import { swaggerSaga, swaggerBatchSaga } from 'swagger-saga-client';
import { all } from 'redux-saga/effects';
export default function* rootSaga(payload) {
  yield all([
    swaggerSaga('pet', payload),
    swaggerSaga('store', payload),
    swaggerSaga('pet1', payload),
    swaggerSaga('store1', payload),
    swaggerBatchSaga('petstore', payload),
  ]);
}


```

`index.js `
```JS
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import Dashboard from 'material/dashboard/views/Dashboard/Dashboard';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  entityFetchBatchInitActionCreator,
  entityFetchInit,
  entityFetchInitActionCreator,
} from 'swagger-saga-client';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';

const batchFetchInit = () => {
  const requests = [
    {
      entity: 'store1',
      func: () => ({
        url: 'https://petstore.swagger.io/v2/store/inventory',
        method: 'get',
      }),
    },
    {
      entity: 'pet1',
      func: (response) => {
        const petId = response.body.status;

        return {
          url: `https://petstore.swagger.io/v2/pet/${petId}`,
          method: 'get',
        };
      },
    },
  ];
  return entityFetchBatchInitActionCreator('petstore')(requests);
};

function petFetchInit(id) {
  return entityFetchInit('pet', {
    url: `https://petstore.swagger.io/v2/pet/${id}`,
    method: 'get',
  });
}

const storeFetchInit = () =>
  entityFetchInitActionCreator('store')({
    url: 'https://petstore.swagger.io/v2/store/inventory',
    method: 'get',
  });

const mapStateToProps = createStructuredSelector({
  singlePlayback: makeSelectHomePage(),
});

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    props.batchFetch();
    props.fetchStores();
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPets: () => dispatch(petFetchInit(3)),
    fetchStores: () => dispatch(storeFetchInit()),
    batchFetch: () => dispatch(batchFetchInit()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'HomePage', reducer });

const withSaga = injectSaga({ key: 'HomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);


```

`selectors.js `
```JS
import { createSelector } from 'reselect';

/**
 * Direct selector to the HomePage state domain
 */
const selectHomePageDomain = (state) => state.get('HomePage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, (substate) => substate.toJS());

export default makeSelectHomePage;
export { selectHomePageDomain };


```
