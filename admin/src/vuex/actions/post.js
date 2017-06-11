/**
 * Created by chuck7 on 16/7/30.
 */
import * as types from '../mutation_types'
import service from '../../services/posts/index'
export const getAllPost = ({ commit }, tags) => {
    return service.getDraftList(tags).then(res => {
        if (res.success) {
            commit(types.RECEIVE_ALL_POSTS, res.data)
            if (res.data.length) {
                commit(types.POST_FOCUS, 0)
            }
        }
    })
}
export const focusOnPost = ({ commit }, index) => {
    commit(types.POST_FOCUS, index)
}
export const editPost = ({ commit }) => {
    commit(types.POST_EDIT)
}
export const savePost = ({ commit }) => {
    commit(types.POST_SAVE)
}
export const editPostTitle = ({ commit }) => {
    commit(types.POST_TITLE_EDIT)
}
export const savePostTitle = ({ commit }) => {
    commit(types.POST_TITLE_SAVE)
}
export const deletePost = ({ commit, state }) => {
    if (state.post.postSaved) {
        return service.deleteDraft(state.post.currentPostId).then(res => {
            if (res.success) {
                commit(types.POST_DELETE)
            }
        })
    } else {
        let err = new Error()
        err.errorInfo = '文章尚未保存,请稍后再试'
        return Promise.reject(err)
    }
}
export const publishPost = ({ commit, state }) => {
    return service.publish(state.post.currentPostId).then(res => {
        if (res.success) {
            commit(types.POST_PUBLISH, res.data.article.id)
        }
    })
}
export const submitPostTitle = ({ commit, state }, title) => {
    return service.modifyDraftTitle(state.post.currentPostId, title).then(res => {
        if (res.success) {
            commit(types.POST_TITLE_MODIFY, title)
            commit(types.POST_LAST_EDIT_TIME, res.data.lastEditTime)
        }
    })
}
export const submitPostExcerpt = ({ commit}, excerpt, time) => {
    commit(types.POST_EXCERPT_MODIFY, excerpt)
    commit(types.POST_LAST_EDIT_TIME, time)
}

export const createPost = ({ commit }) => {
    return service.createDraft('新文章').then(res => {
        if (res.success) {
            commit(types.POST_CREATE, res.data)
        } else {
            return Promise.reject()
        }
    })
}
export const postTagsModify = ({ commit }, time) => {
    commit(types.POST_TAG_MODIFY)
    commit(types.POST_LAST_EDIT_TIME, time)
}
