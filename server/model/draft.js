/**
 * Created by chuck7 on 16/9/14.
 */
const logger = require('../util').logger

const Draft = require('../schema')

class DraftModel extends Draft {
    /**
     * @param {Object}  option                 参数选项
     * @param {String}  option.title,
     * @param {Number}  option.visits,
     * @param {Date}    option.createTime,
     * @param {Date}    option.lastEditTime,
     * @param {String}  option.excerpt,
     * @param {String}  option.content,
     * @param {Id}      option.article          对应的文章 Id
     * @param {Boolean} option.draftPublished   是否已经发布
     * */
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

    async find (tag) {
        let draftArr = null
        try {
            let searchParam = {}
            if (tag) {
                searchParam = {
                    '$all': [tag]
                }
            }
            draftArr = await Draft.find(searchParam)
                .populate('tags')
                .select('title tags createTime lastEditTime excerpt article draftPublished')
                .sort({
                    lastEditTime: -1
                })
                .exec()
            const resultArr = []
            if (draftArr.length) {
                draftArr.forEach((draft, index, arr) => {
                    draft = draft.toObject()
                    resultArr.push(draft)
                })
            }
        } catch (e) {
            logger.error(e)
            throw e
        }
        return draftArr || draftArr.map(item => item.toObject())
    }

    async findOne (id, sort = null, limit = null, skip = null) {
        let result = null
        try {
            result = await Draft.findOne({
                _id: id
            })
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
        return result || result.toObject()
    }
    async update (id, modifyParam) {
        let result = null
        try {
            result = await Draft
                .findByIdAndUpdate(id, {
                    $set: modifyParam
                }, {
                    new: true
                })
                .populate('tags')
                .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result.toObject()
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

module.exports = new DraftModel()
