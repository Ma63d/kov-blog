/**
 * Created by chuck7 on 16/8/11.
 */
const logger = require('../util').logger

const Comment = require('../model/comment')

class CommentService extends Comment {
    async create (option) {
        const comment = new Comment(option)
        let result = null
        try {
            result = comment.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async find (articleId, limit = null, skip = null) {
        let result = null
        try {
            result = await Comment.find({
                article: articleId
            })
            .populate('respondTo')
            .select('message respondTo createTime author authorAvatar likes')
            .sort({
                createTime: 1
            })
            .limit(limit)
            .skip(skip)
            .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.map(item => item.toObject())
    }
    async findOne (id) {
        let result = null
        try {
            result = await Comment.findOne({
                _id: id
            })
            .populate('respondTo')
            .select('message respondTo createTime author authorAvatar likes')
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async count () {
        let result = null
        try {
            result = await Comment.count().exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
}
module.exports = new CommentService()
