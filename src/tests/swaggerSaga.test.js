import swaggerSaga, {swaggerBatchSaga} from '../swaggerSaga';


describe('swaggerSaga', () => {
  it('swagger saga', () => {

    const sagaGen = swaggerSaga('pet', null);
    const result = sagaGen.next();
    const FORK = result.value.FORK;
    expect(FORK.args[0]).toBe('PET_FETCH_INIT');

    const sagaGen1 = swaggerSaga('store', null);
    const result1 = sagaGen1.next();
    const FORK1 = result1.value.FORK;
    expect(FORK1.args[0]).toBe('STORE_FETCH_INIT');

    const sagaGen2 = swaggerBatchSaga('petstore', null);
    const result2 = sagaGen2.next();
    const FORK2 = result2.value.FORK;
    expect(FORK2.args[0]).toBe('PETSTORE_BATCH_FETCH_INIT');

  });
});
