/**
 * Created by chuck7 on 16/7/30.
 */
import * as types from '../mutation_types'
import service from '../../services/posts/index'
export const getAllPost = ({ dispatch },tags) =>{
  return service.getDraftList(tags).then(res=>{
    if(res.success){
      dispatch(types.RECEIVE_ALL_POSTS,res.data);
      if(res.data.length){
        dispatch(types.POST_FOCUS, 0);
      }
    }
  })
}
export const focusOnPost = ({ dispatch }, index) => {
  dispatch(types.POST_FOCUS, index);
}
export const editPost = ({ dispatch }) => {
  dispatch(types.POST_EDIT);
}
export const savePost = ({ dispatch }) => {
  dispatch(types.POST_SAVE);
}
export const editPostTitle = ({ dispatch }) => {
  dispatch(types.POST_TITLE_EDIT);
}
export const savePostTitle = ({ dispatch }) => {
  dispatch(types.POST_TITLE_SAVE);
}
export const deletePost = ({ dispatch,state }) => {
  if(state.post.postSaved){
    return service.deleteDraft(state.post.currentPostId).then(res => {
      if(res.success){
        dispatch(types.POST_DELETE);
      }
    })
  }else{
    let err = new Error();
    err.error_message = '文章尚未保存,请稍后再试';
    return Promise.reject(err);
  }
};
export const publishPost = ({ dispatch, state }) => {
  return service.publish(state.post.currentPostId).then(res => {
    if(res.success){
      dispatch(types.POST_PUBLISH,res.data.article.id);
    }
  });
}
export const submitPostTitle = ({ dispatch, state },title) => {
  return service.modifyDraftTitle(state.post.currentPostId,title).then(res => {
    if(res.success){
      dispatch(types.POST_TITLE_MODIFY,title)
      dispatch(types.POST_LAST_EDIT_TIME,res.data.lastEditTime);
    }
  })
}
export const submitPostExcerpt = ({ dispatch}, excerpt,time) => {
  dispatch(types.POST_EXCERPT_MODIFY,excerpt)
  dispatch(types.POST_LAST_EDIT_TIME,time);
}

export const createPost = ({dispatch}) => {
  return service.createDraft('新文章').then(res => {
    if(res.success){
      dispatch(types.POST_CREATE,res.data)
    }else{
      return Promise.reject();
    }
  })
}
export const postTagsModify = ({ dispatch}, time) => {
  dispatch(types.POST_TAG_MODIFY)
  dispatch(types.POST_LAST_EDIT_TIME,time);
}
