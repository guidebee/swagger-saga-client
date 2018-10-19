const swaggerReducer = (entity) => {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_FAILURE = `${ENTITY}_FETCH_FAILURE`;
  const ENTITY_FETCH_SUCCESS = `${ENTITY}_FETCH_SUCCESS`;
  const ENTITY_FETCH_TIMEOUT = `${ENTITY}_FETCH_TIMEOUT`;

  const withswaggerReducer = (state, action) => {
    switch (action.type) {
      case ENTITY_FETCH_SUCCESS:
        return state.set(entity, {
          status: 'success',
          body: action.entity.body,
        });

      case ENTITY_FETCH_FAILURE:
        return state.set(entity, {
          status: 'failure',
          body: action.entity,
        });

      case ENTITY_FETCH_TIMEOUT:
        return state.set(entity, {
          status: 'timeout',
          body: action.entity,
        });

      default:
        return state;
    }
  };

  return withswaggerReducer;
};

export const swaggerReducers = (entities) => {
  const ENTITIES = entities.map((entity) => entity.toUpperCase());
  const ENTITY_FETCH_FAILURES = ENTITIES.map(
    (ENTITY) => `${ENTITY}_FETCH_FAILURE`
  );
  const ENTITY_FETCH_SUCCESSES = ENTITIES.map(
    (ENTITY) => `${ENTITY}_FETCH_SUCCESS`
  );
  const ENTITY_FETCH_TIMEOUTS = ENTITIES.map(
    (ENTITY) => `${ENTITY}_FETCH_TIMEOUT`
  );

  const withswaggerReducer = (state, action) => {
    const indexSuccess = ENTITY_FETCH_SUCCESSES.indexOf(action.type);
    if (indexSuccess >= 0) {
      return state.set(entities[indexSuccess], {
        status: 'success',
        body: action.entity.body,
      });
    }
    const indexFailure = ENTITY_FETCH_FAILURES.indexOf(action.type);
    if (indexFailure >= 0) {
      return state.set(entities[indexFailure], {
        status: 'failure',
        body: action.entity,
      });
    }
    const indexTimeout = ENTITY_FETCH_TIMEOUTS.indexOf(action.type);
    if (indexTimeout >= 0) {
      return state.set(entities[indexTimeout], {
        status: 'timeout',
        body: action.entity,
      });
    }
    return state;
  };

  return withswaggerReducer;
};

export default swaggerReducer;
