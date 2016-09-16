/**
 * Created by chuck7 on 16/7/30.
 */
import * as types from '../mutation_types'
export const focusOnArticle = ({ dispatch }, articleId) => {
  dispatch(types.ARTICLE_FOCUS, articleId);
}
export const editArticle = ({ dispatch }) => {
  dispatch(types.ARTICLE_FOCUS);
}
export const saveArticle = ({ dispatch }) => {
  dispatch(types.ARTICLE_SAVE);
}
