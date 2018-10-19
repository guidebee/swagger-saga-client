import entityFetchInit, {entityFetchInitActionCreator, entityFetchBatchInitActionCreator} from '../swaggerAction';

describe('entityFetchInit', () => {
  it('entity fetch init', () => {
    const action = entityFetchInit('pet', null);
    expect(action.type).toBe('PET_FETCH_INIT');
    expect(action.entity).toBe('pet');
  });
});


describe('entityFetchInitActionCreator', () => {
  it('entity fetch init action creator', () => {
    const actionCreator = entityFetchInitActionCreator('pet');
    const action = actionCreator(null);
    expect(action.type).toBe('PET_FETCH_INIT');
    expect(action.entity).toBe('pet');
  });
});

describe('entityFetchBatchInitActionCreator', () => {
  it('entity fetch batch init action creator', () => {
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
    const action = entityFetchBatchInitActionCreator('petstore')(requests)
    expect(action.type).toBe('PETSTORE_BATCH_FETCH_INIT');
    expect(action.batch).toBe('petstore');
    expect(action.requests).toBe(requests);
  });
});
