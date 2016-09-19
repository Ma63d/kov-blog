/**
 * Created by chuck7 on 16/9/19.
 */
import api from '../index.js'
export default {
  getAllTags(){
    return api.get('tags',undefined);
  },
  modifyTag(id,name){
    return api.patch('tags/'+id,{name},{Authorization:'Bearer '+sessionStorage.getItem('token')});
  },
  deleteTag(id){
    return api.delete('tags/'+id,undefined,{Authorization:'Bearer '+sessionStorage.getItem('token')});
  }
}
