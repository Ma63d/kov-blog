/**
 * Created by chuck7 on 16/8/14.
 */
const logger = require('../util').logger

const User = require('../schema/user')

class UserModel {
    /**
     * @param {Object}  option                 参数选项
     * @param {String}  option.title,
     * @param {String}  option.name
     * @param {String}  option.username
     * @param {String}  option.password        capital md5
     * @param {String}  option.avatar
     * @param {Date}    option.createTime
     * */
    async create (option) {
        const user = new User(option)
        let result = null
        try {
            result = user.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }

    async findOne (username = null) {
        let searchParam = {}
        if (username) {
            searchParam.username = username
        }
        let result = null
        try {
            result = await User.findOne(searchParam)
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
            result = await User.findByIdAndUpdate(id, {
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
}

module.exports = new UserModel()
