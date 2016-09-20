/**
 * Created by chuck7 on 16/9/20.
 */
import api from '../index.js'
export default {
  getPostListWithTag(tagId){
    return api.get('articles',{tag:tagId})
  },
  getAllTags(){
    return api.get('tags');
  }
}
