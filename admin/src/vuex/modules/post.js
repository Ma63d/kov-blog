/**
 * Created by chuck7 on 16/7/30.
 */
import {
  POST_FOCUS,
  POST_Edit,
  POST_SAVE
} from '../mutation_types'

const state = {
  currentPost: null,
  postSaved:true
}

// mutations
const mutations = {
  [POST_FOCUS] (state, postId) {
    if(state.postSaved){
      state.currentPost = postId
    }
  },
  [POST_Edit](state){
    if(state.postSaved){
      state.postSaved = false;
    }
  },
  [POST_SAVE](state){
    if(!state.postSaved){
      state.postSaved = true;
    }
  }
}

export default {
  state,
  mutations
}
