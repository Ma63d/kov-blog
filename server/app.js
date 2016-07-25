/**
 * Created by chuck7 on 16/7/15.
 */
import config from './config/index';
import mongo from './mongo/index'

import path from 'path'
console.log(path.resolve('./resource'));
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import favicon from 'koa-favicon';
import logger from 'koa-logger';
import cors from 'koa-cors'
import staticCache from 'koa-static-cache';
import router from 'koa-router'

let app = koa();
app.use(logger());
app.use(cors({
    maxAge: 7 * 24 * 60 * 60,
    // 7 days 预请求头有效期
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
    headers: 'Content-Type, Accept, Authorization'
}));
app.use(staticCache(path.resolve('./resource'), {
    maxage: 60 * 60 * 24 * 365,
    //静态文件有效期
    gzip: true
}));

app.use(favicon(path.resolve('../static/favicon.ico')));
app.use(bodyParser());
app.use(router(app))