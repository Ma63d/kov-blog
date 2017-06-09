/**
 * Created by chuck7 on 16/8/7.
 */
module.exports = {
    env: 'development',
    debug: true,
    mongoConfig: {
        url: 'mongodb://127.0.0.1:27017/kov-blog-dev',
        opts: {
            user: '',
            pass: ''
        }
    },
    'jwt': {
        'cert': 'kov-blog-dev'
    }
}
