const { getDatabase, ref, set, query, orderByChild, get, equalTo } = require('firebase/database');
const uuid = require('uuid');

const all = async (collection) => {
  const db = getDatabase();
  const docRef = query(ref(db, collection));
  const snapshot = await get(docRef);
  const dataObj = snapshot.val();
  if(!dataObj) return [];
  return Object.keys(dataObj).map(id => ({
    id,
    ...dataObj[id],
  }));
}

const create = async (collection, data) => {
  const db = getDatabase();
  const id = uuid.v4()
  await set(ref(db, collection + '/' + id), data);
  return {
    id,
    ...data,
  };
}

const find = async (collection, filter) => {
  const filterKeys = Object.keys(filter);
  if (filterKeys.length == 0) throw `filter empty`;
  const db = getDatabase();
  const collectionRef = query(ref(db, collection), ...[orderByChild(filterKeys[0]), equalTo(filter[filterKeys[0]])]);
  const snapshot = await get(collectionRef);
  const dataObj = snapshot.val();
  if (!dataObj) return [];
  let data = Object.keys(dataObj).map(id => ({
    id: id,
    ...dataObj[id],
  }));
  for(let i=1;i<filterKeys.length;i++) {
    data = data.filter(f => f[filterKeys[i]] == filter[filterKeys[i]]);
  }
  return data;
}

const getById = async (collection, id) => {
  const db = getDatabase();
  const docRef = query(ref(db, collection + '/' + id));
  const snapshot = await get(docRef);
  const dataObj = snapshot.val();
  return {
    id,
    ...dataObj,
  };
}

const updateById = async (collection, id, data) => {
  const db = getDatabase();
  const docRef = query(ref(db, collection + '/' + id));
  const snapshot = await get(docRef);
  const dataObj = snapshot.val();
  const saveObj = Object.assign({}, dataObj, data);
  await set(ref(db, collection + '/' + id), saveObj);
  return {
    id,
    ...saveObj,
  };
}


module.exports = {
  all,
  create,
  find,
  getById,
  updateById,
}