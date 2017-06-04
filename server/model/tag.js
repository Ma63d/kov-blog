/**
 * Created by chuck7 on 16/8/11.
 */
const logger = require('../util').logger

const Tag = require('../schema/tag')

class TagModel extends Tag {
    async create (option) {
        const tag = new Tag(option)
        let result = null
        try {
            result = tag.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async find (sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Tag.find()
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
            result = await Tag.findOne({
                _id: id
            })
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
            result = await Tag.findByIdAndUpdate(id, {
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
}

module.exports = new TagModel()
