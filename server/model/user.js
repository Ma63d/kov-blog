/**
 * Created by chuck7 on 16/8/14.
 */
const logger = require('../util').logger

const User = require('../schema/user')

module.exports = class {
    async create (option) {
        const user = new User(option)
        let result = null
        try {
            result = user.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async findOne () {
        let result = null
        try {
            result = await User.findOne()
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
            result = await User.findByIdAndUpdate(id, {
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
