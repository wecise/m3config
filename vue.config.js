
function resolve(dir) {
    return path.join(__dirname, dir)
}

const path = require('path')

// 从m3js模版加载vue cli配置信息
const m3config = require("@wecise/m3js/mbase/vue.config")
// 输出vue cli配置信息
module.exports = m3config({
    // 开发阶段本地web服务
    devServer: {
        port: 8080, // 开发阶段本地服务端口，当前端口被占用时按自动+1处理
        proxy: {
            "/static": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/user": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/matrix": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/script": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/web": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/config": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/fs": {
                target: `http://${process.env.VUE_APP_M3_HOST}`,
            },
            "/help":{
                target: `http://${process.env.VUE_APP_M3_HOST}/help`
            },
            "/mxobject":{
                target: `http://${process.env.VUE_APP_M3_HOST}`
            }
        }
    },
    configureWebpack: {
        entry: {
            app: "./src/main.js"
        }
    },
    chainWebpack(config) {

        // ============压缩图片 start============
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
        // ============压缩图片 end============

        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()

          /* config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) */
    }
})