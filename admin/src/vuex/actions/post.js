/**
 * Created by chuck7 on 16/7/30.
 */
import service from '../../services/posts/index'
import {
    RECEIVE_ALL_POSTS,
    POST_FOCUS,
    POST_EDIT,
    POST_TITLE_EDIT,
    POST_SAVE,
    POST_TITLE_SAVE,
    POST_DELETE,
    POST_PUBLISH,
    POST_TITLE_UPDATE,
    POST_CONTENT_UPDATE,
    POST_EXCERPT_UPDATE,
    POST_LAST_EDIT_TIME,
    POST_CREATE,
    POST_TAG_UPDATE
} from '../mutation_types'

export const getAllPosts = ({ commit }, tags) => {
    return service.getDraftList(tags).then(res => {
        if (res.success) {
            commit(RECEIVE_ALL_POSTS, res.data)
            if (res.data.length) {
                commit(POST_FOCUS, 0)
            }
        }
    })
}

export const getPost = ({commit}) => {
    return service.getDraft(this.currentPostId).then(res => {
        if (res.success) {
            commit(POST_CONTENT_UPDATE, res.data.content)
            commit(POST_TAG_UPDATE, res.data.tag)
        }
    })
}

export const createPost = ({ commit }) => {
    return service.createDraft('新文章').then(res => {
        if (res.success) {
            commit(POST_CREATE, res.data)
        }
    })
}

export const focusOnPost = ({ commit }, index) => {
    commit(POST_FOCUS, index)
}

export const editPost = ({ commit }) => {
    commit(POST_EDIT)
}

export const deletePost = ({ commit, state }) => {
    if (state.post.postSaved) {
        return service.deleteDraft(state.post.currentPostId).then(res => {
            if (res.success) {
                commit(POST_DELETE)
            }
        })
    } else {
        let err = new Error()
        err.errorInfo = '文章尚未保存,请稍后再试'
        return Promise.reject(err)
    }
}

export const savePost = ({ commit }) => {
    commit(POST_SAVE)
}

export const publishPost = ({ commit, state }) => {
    return service.publish(state.post.currentPostId).then(res => {
        if (res.success) {
            commit(POST_PUBLISH, res.data.article.id)
        }
    })
}

export const editPostTitle = ({ commit }) => {
    commit(POST_TITLE_EDIT)
}

export const savePostTitle = ({ commit }) => {
    commit(POST_TITLE_SAVE)
}

export const updatePostTitle = ({ commit, dispatch, state }, title) => {
    return service.updateDraftTitle(state.post.currentPostId, title).then(res => {
        if (res.success) {
            commit(POST_TITLE_UPDATE, title)
            return res
        }
    })
}

export const updatePostContent = ({ commit, dispatch, state }, content) => {
    return service.updateDraftContent(state.post.currentPostId, content).then(res => {
        if (res.success) {
            commit(POST_CONTENT_UPDATE, res.data.content)
        }
    })
}

export const updatePostExcerpt = ({ commit }, excerpt) => {
    commit(POST_EXCERPT_UPDATE, excerpt)
}

export const updatePostEditTime = ({ commit }, time) => {
    commit(POST_LAST_EDIT_TIME, time)
}

export const updatePostTags = ({ commit }, tags) => {
    commit(POST_TAG_UPDATE, tags)
}
