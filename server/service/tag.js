/**
 * Created by chuck7 on 16/8/11.
 */
const logger = require('../util').logger

const Tag = require('../model/tag')

class TagService {
    /**
     * @param {Object}  option                 参数选项
     * @param {String}  option.name
     * */
    async create (option) {
        const tag = new Tag(option)
        let result = null
        try {
            result = tag.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async find (startWith = null, sort = null, limit = null, skip = null) {
        let searchParam = {}
        if (startWith) {
            searchParam['$regex'] = `^${startWith}`
        }
        let result = null
        try {
            result = await Tag.find(searchParam)
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.map(item => item.toObject())
    }
    async findOne (id, name = null, sort = null, skip = null) {
        let searchParam = {}

        if (id) {
            searchParam._id = id
        }

        if (name) {
            searchParam.name = name
        }

        let result = null
        try {
            result = await Tag.findOne(searchParam)
            .sort(sort)
            .skip(skip)
            .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async update (id, name) {
        let result = null
        try {
            result = await Tag.findByIdAndUpdate(id, {
                $set: {
                    name
                }
            }, {
                new: true
            }).exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async delete (id) {
        let result = null
        try {
            result = await Tag.remove({
                _id: id
            }).exec()
        } catch (e) {
            logger.error(e)
        }
        return result
    }
}

module.exports = new TagService()
