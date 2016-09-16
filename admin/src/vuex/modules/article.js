/**
 * Created by chuck7 on 16/7/30.
 */
import {
  ARTICLE_FOCUS,
  ARTICLE_Edit,
  ARTICLE_SAVE
} from '../mutation_types'

const state = {
  currentArticle: null,
  articleSaved:true
}

// mutations
const mutations = {
  [ARTICLE_FOCUS] (state, articleId) {
    if(state.articleSaved){
      state.currentArticle = articleId
    }
  },
  [ARTICLE_Edit](state){
    if(state.articleSaved){
      state.articleSaved = false;
    }
  },
  [ARTICLE_SAVE](state){
    if(!state.articleSaved){
      state.articleSaved = true;
    }
  }
}

export default {
  state,
  mutations
}
