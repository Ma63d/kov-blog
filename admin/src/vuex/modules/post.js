/**
 * Created by chuck7 on 16/7/30.
 */
import {
  RECEIVE_ALL_POSTS,
  POST_FOCUS,
  POST_EDIT,
  POST_TITLE_EDIT,
  POST_SAVE,
  POST_TITLE_SAVE,
  POST_DELETE,
  POST_PUBLISH,
  POST_TITLE_MODIFY,
  POST_EXCERPT_MODIFY,
  POST_LAST_EDIT_TIME,
  POST_CREATE,
  POST_TAG_MODIFY
} from '../mutation_types'

const state = {
  all:[],
  currentPostId: null,
  currentPostIndex:-1,
  //post其实只是笔记/草稿,article才是对外发布后,外部可见的文章
  articleId:null,
  title:'',
  postSaved:true,
  postTitleSaved:true,
}

// mutations
const mutations = {
  [RECEIVE_ALL_POSTS](state,postList){
    if(state.postSaved && state.postTitleSaved){
      state.all = postList;
      if(postList.length === 0){
        state.currentPostId = null;
        state.currentPostIndex = -1;
      }
    }
  },
  [POST_FOCUS] (state, index) {
    //当前草稿还没保存的话不允许切换
    if(state.postSaved && state.postTitleSaved){
      state.currentPostIndex = index;
      state.currentPostId = state.all[index].id;
      state.excerpt = state.all[index].excerpt;
      state.articleId = state.all[index].article
      state.title = state.all[index].title;
    }
  },
  [POST_EDIT](state){
    if(state.postSaved){
      state.all[state.currentPostIndex].draftPublished = false;
      state.postSaved = false;
    }
  },
  [POST_SAVE](state){
    if(!state.postSaved){
      state.postSaved = true;
    }
  },
  [POST_TITLE_EDIT](state){
    if(state.postTitleSaved){
      state.all[state.currentPostIndex].draftPublished = false;
      state.postTitleSaved = false;
    }
  },
  [POST_TITLE_SAVE](state){
    if(!state.postTitleSaved){
      state.postTitleSaved = true;
    }
  },
  [POST_DELETE](state){
    if(state.postSaved && state.postTitleSaved){
      state.all.splice(state.currentPostIndex,1);
      if(state.all.length){
        state.currentPostIndex = 0;
        state.currentPostId = state.all[0].id;
        state.title = state.all[0].title;
        state.articleId = state.all[0].article
      }else{
        state.currentPostId = null;
        state.currentPostIndex = -1;
        state.articleId = null;
        state.title = '';
      }
    }
  },
  [POST_PUBLISH](state,articleId){
    state.articleId = articleId;
    state.all[state.currentPostIndex].article = articleId;
    state.all[state.currentPostIndex].draftPublished = true;
  },
  [POST_TITLE_MODIFY](state,title){
    state.title = title;
    state.all[state.currentPostIndex].title = title;
  },
  [POST_EXCERPT_MODIFY](state,excerpt){
    state.all[state.currentPostIndex].excerpt = excerpt;
  },
  [POST_TAG_MODIFY](state){
    state.all[state.currentPostIndex].draftPublished = false;
  },
  [POST_LAST_EDIT_TIME](state,time){
    state.all[state.currentPostIndex].lastEditTime = time;
  },
  [POST_CREATE](state,post){
    state.all.unshift(post);
    state.currentPostIndex = 0;
    state.currentPostId = state.all[0].id;
    state.title = state.all[0].title;
    state.articleId = state.all[0].article
  }
}

export default {
  state,
  mutations
}
