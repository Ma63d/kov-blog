/**
 * @file base config
 * @author liucan10(chuck7liu@gmail.com)
 */
const path = require('path')

// 生产环境配置
module.exports = {

    // 应用配置
    app: {
        name: 'kov-blog',
        port: 3000,
        // 后台路径
        apiPath: '/api'
    },

    // 是否开启 debug
    debug: false,

    // mongo 数据库配置
    mongoConfig: { // 数据库配置
        url: 'mongodb://localhost:27017/kov-blog',
        opts: {
            user: '',
            pass: ''
        }
    },

    // jwt 私钥
    jwt: {
        'cert': 'kov-blog'
    },

    // 目录配置
    dir: {
        root: path.resolve(__dirname, '..', '..'),
        log: path.resolve(__dirname, '..', 'logs'),
        server: path.dirname(__dirname),
        upload: path.resolve(path.dirname(__dirname), 'runtime', 'upload')
    },

    routerName: {
        articles: 'articles',
        drafts: 'drafts',
        tags: 'tags',
        publications: 'publications',
        tokens: 'tokens',
        me: 'me'
    }
}
