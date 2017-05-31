/**
 * Created by chuck7 on 16/8/11.
 */
const logger = require('../util').logger

const Tag = require('../schema/tag')

module.exports = class {
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
    async find (searchParam, sort = null, limit = null, skip = null) {
        searchParam = {
            hidden: false,
            ...searchParam
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
        return result
    }
    async findOne (searchParam, sort = null, limit = null, skip = null) {
        searchParam = {
            hidden: false,
            ...searchParam
        }
        let result = null
        try {
            result = await Tag.findOne(searchParam)
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
