/**
 * Created by chuck7 on 16/7/19.
 */


import mongodb from 'mongodb';
import config from '../config';
let connect = mongodb.connect;

mongodb.connect = function *() {
  if (mongodb.db) {
    yield mongodb.db.close();
  }

  // export mongo db instance
  var db = mongodb.db = yield connect(config.db.url);

  // export default collections
  mongodb.counters = db.collection('counters');
  mongodb.users = db.collection('users');
  mongodb.posts = db.collection('posts');
};

mongodb.getNextSequence = function *(counterName) {
  var results = yield mongodb.counters.findAndModify(
    {_id: counterName},
    [],
    {$inc: {seq: 1}},
    {new: true}
  );
  return results.value.seq;
};


export default mongodb;

