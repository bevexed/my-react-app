/*
* 按需加载配置
* */

const {injectBabelPlugin} = require('react-app-rewired');
module.exports = function override(config, env) {
    config = injectBabelPlugin(["import", { libraryName: "antd-mobile", style: "css" }],config )// `style: true` 会加载 less 文件)
    return config
}
