/**
 * Created by chuck7 on 16/7/30.
 */
import * as types from '../mutation_types'
export const focusOnPost = ({ dispatch }, postId) => {
  dispatch(types.POST_FOCUS, postId);
}
export const editPost = ({ dispatch }) => {
  dispatch(types.POST_Edit);
}
export const savePost = ({ dispatch }) => {
  dispatch(types.POST_SAVE);
}
