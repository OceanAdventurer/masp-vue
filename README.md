#MASP-VUE

## 编译设置

``` bash
# 安装相关依赖包
npm install

# 启动服务
npm run dev

# 编译生产包
npm run build

# bundle分析
npm run analyzer

```

## 项目布局

```
├── build                                           // webpack配置文件
│   ├── build.js                                    // 生产环境构建文件
│   ├── check-versions.js                           // 检查node，npm版本
│   ├── logo.png                                    // vue的logo
│   ├── util.js                                     // 构建工具相关
│   ├── vue-loader.js                               // css加载配置
│   ├── webpack.base.conf.js                        // webpack基础配置
│   ├── webpack.dev.conf.js                         // webpack开发环境配置
│   └── webpack.prod.conf.js                        // webpack生产环境配置
├── config                                          // vue基本配置
│   ├── dev.env.js                                  // 开发环境变量
│   ├── index.js                                    // 项目基础配置变量
│   └── prod.env.js                                 // 生产环境变量
├── dist                                            // 项目打包版本
├── doc                                             // 项目文档
├── screenshots                                     // 项目截图
├── src                                             // 项目源码目录
│   ├── api                                         // 数据交互目录
│   │   └── msap.js                                 // 获取数据
│   ├── assets                                      // 资源目录
│   │   ├── css                                     // 样式文件目录
│   │   │   └── common.css                          // msap相关基础样式
│   │   ├── font                                    // 字体文件目录
│   │   ├── images                                  // 静态图片目录
│   │   └── js                                      // 数据交互目录
│   │        ├── bus.js                                 // 事件句柄
│   │        ├── util.js                                // 公用js工具方法
│   │        ├── menuData.js                            // 菜单默认数据处
│   │        └── storage.js                             // localstorage配置
│   ├── components                                  // 项目组件目录
│   │   ├── analysis                                    // 分析模块组件目录
│   │   │   ├── file                                        // 文件模块组件目录
│   │   │   │   ├── AddNewFileParam.vue                         // 提交钻取和辅助线组件(旧)
│   │   │   │   ├── NewFile.vue                                 // 新建分析组件
│   │   │   │   ├── SublineParam.vue                            // 辅助线组件
│   │   │   ├── result                                  // 分析结果组件目录
│   │   │   │   ├── AddSubline.vue                          // 添加辅助线组件
│   │   │   │   ├── AnalysisChart.vue                       // 2D图表组件
│   │   │   │   ├── AnalysisGrid.vue                        // 表格组件
│   │   │   │   ├── AnalysisResult.vue                      // 总体返回结果组件
│   │   │   │   ├── AnalysisTableDetail.vue                 // 数据详情表格
│   │   │   │   ├── AnalysisView.vue                        // 飞行记录视图组件
│   │   │   │   └── Drilldown.vue                           // 钻取组件(旧)
│   │   │   ├── AnalysisTab.vue                         // 管理头部Tab组件
│   │   │   └── Manager.vue                             // 参数提交(新建分析)、提交分析组件
│   │   ├── base                                    // 公共的组件
│   │   │   ├── Container.vue                       // 页面布局组件
│   │   │   ├── CustomTree.vue
│   │   │   ├── DialogModal.vue
│   │   │   ├── HeaderTwo.vue                       // 头部菜单组件
│   │   │   ├── HelpDialog.vue
│   │   │   ├── Loading.vue                         // 加载效果组件
│   │   │   └── Login.vue
│   │   ├── datatable                               // 数据组件目录
│   │   │   ├── dataclean
│   │   │   │   └── DataClean.vue
│   │   │   ├── version
│   │   │   │   ├── versiondetails
│   │   │   │   │   └── VersionDetails.vue
│   │   │   │   └── versionlist
│   │   │   │       └── VersionList.vue
│   │   │   ├── DataStatics.vue
│   │   │   └── DataTableTab.vue
│   │   ├── paramone                                // 工程参数组件目录
│   │   │   ├── ParamOneTab.vue                     // 工程参数菜单组件
│   │   ├── paramtwo                                // 分析参数组件目录
│   │   │   ├── ParamTwoTab.vue                     // 分析参数菜单组件
│   │   └── setting                                 // 设置组件目录
│   │       ├── GroupPermissions.vue
│   │       ├── RolePermissions.vue
│   │       └── SettingTab.vue                      // 设置菜单组件
│   ├── router                                      // vue-router路由目录
│   │   └── index.js                                // 路由配置
│   ├── store                                       // vuex的状态管理
│   │   ├── actions.js                              // 配置actions
│   │   ├── getters.js                              // 配置getters
│   │   ├── index.js                                // 引用vuex，创建store
│   │   ├── mutations.js                            // 配置mutations
│   │   ├── mutation-types.js                       // 定义常量mutations名
│   │   └── state.js                                // 配置state
│   ├── App.vue                                     // 根组件
│   └── main.js                                     // 入口主文件
├── static                                          // 静态资源文件目录
└── index.html                                      // 入口html文件
```

## 生产打包注意事项

```
1. 在main.js文件中饿了么样式的引入这行加上注释，因为在index.html页面引入cdn上的资源
// import 'element-ui/lib/theme-chalk/index.css'

```

本地测试zk地址：zookeeper://10.68.3.120:2181
