/**
 * Created by chuck7 on 16/9/14.
 */
import api from '../index.js'
export default {
  getDraftList(tag){
    let queryObj = undefined;
    if(undefined !== tag){
      queryObj = {tag};
    }
    return api.get('drafts',queryObj,{Authorization:'Bearer '+sessionStorage.getItem('token')});
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
  createTags(tagName){
    return api.post('tags',{name:tagName},{Authorization:'Bearer '+sessionStorage.getItem('token')})
  },
  getAllTags(){
    return api.get('tags',undefined);
  },
  createDraft(title){
    return api.post('drafts',{title:title},{Authorization:'Bearer '+sessionStorage.getItem('token')})
  },
  publish(id){
    return api.post('publications',{draftId:id},{Authorization:'Bearer '+sessionStorage.getItem('token')})
  },
  deleteDraft(id){
    return api.delete('drafts/'+id,undefined,{Authorization:'Bearer '+sessionStorage.getItem('token')})
  },
  searchTagWithWord(keyword){
    return api.get('tags',{'start-with':keyword})
  }
}
