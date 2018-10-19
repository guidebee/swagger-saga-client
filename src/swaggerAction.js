export default function entityFetchInit(entity, request) {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_INIT = `${ENTITY}_FETCH_INIT`;

  return {
    type: ENTITY_FETCH_INIT,
    entity,
    request,
  };
}

export function entityFetchInitActionCreator(entity) {
  const ENTITY = entity.toUpperCase();
  const ENTITY_FETCH_INIT = `${ENTITY}_FETCH_INIT`;
  const initAction = (request) => ({
    type: ENTITY_FETCH_INIT,
    entity,
    request,
  });
  return initAction;
}

export function entityFetchBatchInitActionCreator(batch) {
  const BATCH = batch.toUpperCase();
  const BATCH_FETCH_INIT = `${BATCH}_BATCH_FETCH_INIT`;
  const initAction = (requests) => ({
    type: BATCH_FETCH_INIT,
    batch,
    requests,
  });
  return initAction;
}
