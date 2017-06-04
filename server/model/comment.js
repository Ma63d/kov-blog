/**
 * Created by chuck7 on 16/8/11.
 */
const logger = require('../util').logger

const Comment = require('../schema/comment')

class CommentModel extends Comment {
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
    async find (sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Comment.find()
        .populate('respondTo')
        .select('message respondTo createTime author authorAvatar likes')
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async findOne (id, sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Comment.findOne({
                _id: id
            })
            .populate('respondTo')
            .select('message respondTo createTime author authorAvatar likes')
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async update (id, modifyParam) {
        let result = null
        try {
            result = await Comment.findByIdAndUpdate(id, {
                $set: modifyParam
            }, {
                new: true
            }).exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async delete (id) {
        let result = null
        try {
            result = await Comment.remove({
                _id: id
            }).exec()
        } catch (e) {
            logger.error(e)
        }
        return result
    }
}
module.exports = new CommentModel()
