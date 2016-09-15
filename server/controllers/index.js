/**
 * Created by chuck7 on 16/8/7.
 */
const token = require('./token.js');
const tag = require('./tag.js');
const article = require('./article.js');
const draft = require('./draft.js');
const publication = require('./publication')
module.exports.init = function(router){
  token.init(router);
  tag.init(router);
  article.init(router);
  draft.init(router);
  publication.init(router);
}
