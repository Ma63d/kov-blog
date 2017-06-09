/**
 * Created by chuck7 on 16/8/11.
 */
const {logger, print} = require('../util')

const Article = require('../schema/article')

class ArticleModel {
    /**
     * @param {Object} option                 参数选项
     * @param {String} option.title,
     * @param {Number} option.visits,
     * @param {Date}   option.createTime,
     * @param {Date}   option.lastEditTime,
     * @param {String} option.excerpt,        摘要
     * @param {String} option.content,
     * @param {Array}  option.comments
     * */
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
    async find (sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Article.find()
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
        return result && result.map(item => item.toObject())
    }
    async findOne (id, sort = null, limit = null, skip = null) {
        let searchParam = {
            _id: id
        }
        let result = null
        try {
            result = await Article.findOne(searchParam)
            .populate('tags')
            .select('title visits tags createTime lastEditTime excerpt')
            .sort({
                createTime: -1,
                ...sort
            })
            .limit(limit)
            .skip(skip)
            .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
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
        return result && result.toObject()
    }
    async findWithTag (tag) {
        let result = null
        try {
            result = await Article.find({
                tags: {
                    '$all': [tag]
                }
            })
            .select('title createTime lastEditTime')
            .sort({
                createTime: -1
            })
            .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.map(item => item.toObject())
    }
    async findPrev (id) {
        let result = null
        try {
            result = Article.findOne({_id: {$gt: id}}, 'title _id')
                .sort({
                    _id: -1
                })
                .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async findNext (id) {
        let result = null
        try {
            result = Article.findOne({_id: {$gt: id}}, 'title _id').exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async incVisits (article) {
        if (article) {
            try {
                await article.update({$inc: {visits: 1}}).exec()
            } catch (e) {
                logger.error(e)
                throw e
            }
        }
    }
    async deleleTag (tagId) {
        try {
            await Article.update({},
                {
                    $pull: {
                        tags: tagId
                    }
                })
                .exec()
        } catch (e) {
            logger.error(e)
        }
    }
    async count () {
        let result = null
        try {
            result = await Article.count().exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
}
module.exports = new ArticleModel()
