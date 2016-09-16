/**
 * Created by chuck7 on 16/9/14.
 */
import api from '../index.js'
export default {
  getDraftList(){
    return api.get('drafts',undefined,{Authorization:'Bearer '+sessionStorage.getItem('token')});
  },
  getDraft(id){
    return api.get('drafts/'+id,undefined,{Authorization:'Bearer '+sessionStorage.getItem('token')});
  },
  modifyDraftContent(id,content){
    return api.patch('drafts/'+id,{content},{Authorization:'Bearer '+sessionStorage.getItem('token')});
  },
  modifyDraftTitle(id,title){
    return api.patch('drafts/'+id,{title},{Authorization:'Bearer '+sessionStorage.getItem('token')});
  },
  modifyDraftTags(id,tags){
    return api.patch('drafts/'+id,{tags},{Authorization:'Bearer '+sessionStorage.getItem('token')});
  },
}
