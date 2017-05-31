/**
 * Created by chuck7 on 16/9/14.
 */
const logger = require('../util').logger

const Draft = require('../schema')

module.export = class {
    async create (option) {
        const draft = new Draft(option)
        let result = null
        try {
            result = draft.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async find (searchParam, sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Draft.find(searchParam)
        .populate('tags')
        .select('title tags createTime lastEditTime excerpt article draftPublished content')
        .exec()
        .toObject()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async findOne (searchParam, sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Draft.findOne(searchParam)
        .populate('tags')
        .select('title tags createTime lastEditTime excerpt article draftPublished content')
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
            result = await Draft.findByIdAndUpdate(id, {
                $set: modifyParam
            }, {
                new: true
            }).populate('tags')
        .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async delete (id) {
        let result = null
        try {
            result = await Draft.remove({
                _id: id
            }).exec()
        } catch (e) {
            logger.error(e)
        }
        return result
    }
}
