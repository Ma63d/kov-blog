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
    return api.get('drafts',queryObj);
  },
  getDraft(id){
    return api.get('drafts/'+id);
  },
  modifyDraftContent(id,content){
    return api.patch('drafts/'+id,{content});
  },
  modifyDraftTitle(id,title){
    return api.patch('drafts/'+id,{title});
  },
  modifyDraftTags(id,tags){
    return api.patch('drafts/'+id,{tags});
  },
  createTags(tagName){
    return api.post('tags',{name:tagName})
  },
  getAllTags(){
    return api.get('tags');
  },
  createDraft(title){
    return api.post('drafts',{title:title})
  },
  publish(id){
    return api.post('publications',{draftId:id})
  },
  deleteDraft(id){
    return api.delete('drafts/'+id)
  },
  searchTagWithWord(keyword){
    return api.get('tags',{'start-with':keyword})
  }
}
