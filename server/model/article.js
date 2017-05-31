/**
 * Created by chuck7 on 16/8/11.
 */
const logger = require('../util').logger

const Article = require('../schema/article')

module.exports = class {
    async create (option) {
        const article = new Article(option)
        let result = null
        try {
            result = article.save()
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
            result = await Article.find(searchParam)
        .populate('tags')
        .select('title visits tags createTime lastEditTime excerpt')
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
            result = await Article.findOne(searchParam)
        .populate('tags')
        .select('title visits tags createTime lastEditTime excerpt')
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
            result = await Article.findByIdAndUpdate(id, {
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
