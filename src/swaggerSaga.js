import Swagger from 'swagger-client';

import { delay } from 'redux-saga';
import { takeEvery, call, put, race } from 'redux-saga/effects';

const TIMEOUT_DEFAULT = 15000;

function fetchEntitySuccess(entity, response) {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_SUCCESS = `${ENTITY}_FETCH_SUCCESS`;
  return {
    type: ENTITY_FETCH_SUCCESS,
    entity: response,
  };
}

function fetchEntityFailure(entity, error) {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_FAILURE = `${ENTITY}_FETCH_FAILURE`;
  return {
    type: ENTITY_FETCH_FAILURE,
    entity: error,
  };
}

function fetchEntityTimeout(entity, timeout) {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_TIMEOUT = `${ENTITY}_FETCH_TIMEOUT`;
  return {
    type: ENTITY_FETCH_TIMEOUT,
    entity: timeout,
  };
}

function* fetchEntities(e, action) {
  const entity = action.entity;
  try {
    const { responses } = yield race({
      responses: call(Swagger.http, action.request),
      timeout: call(delay, TIMEOUT_DEFAULT),
    });
    if (responses) {
      yield put(fetchEntitySuccess(entity, responses));
    } else {
      yield put(fetchEntityTimeout(entity, 'timeout'));
    }
  } catch (err) {
    yield put(fetchEntityFailure(entity, err));
  }
}

function* fetchBatchEntities(e, action) {
  let response = null;
  const nextRquests = action.requests;
  const size = nextRquests.length;
  for (let i = 0; i < size; i += 1) {
    const { entity, func } = nextRquests[i];
    const request = func(response);
    try {
      const result = yield race({
        response: call(Swagger.http, request),
        timeout: call(delay, TIMEOUT_DEFAULT),
      });
      if (result) {
        response = result.response;
        yield put(fetchEntitySuccess(entity, response));
      } else {
        yield put(fetchEntityTimeout(entity, 'timeout'));
        break;
      }
    } catch (err) {
      yield put(fetchEntityFailure(entity, err));
      break;
    }
  }
}

export default function* swaggerSaga(entity, payload) {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_INIT = `${ENTITY}_FETCH_INIT`;

  yield takeEvery(ENTITY_FETCH_INIT, fetchEntities, payload);
}

export function* swaggerBatchSaga(batch, payload) {
  const BATCH = batch.toUpperCase();
  const BATCH_FETCH_INIT = `${BATCH}_BATCH_FETCH_INIT`;

  yield takeEvery(BATCH_FETCH_INIT, fetchBatchEntities, payload);
}
