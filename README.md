# React-web

react react-router react-redux redux redux-persist

redux-persist 通过 localStorage 实现本地持久化

token 通过 cookie 存储，有效期 1 小时

## 开发步骤：

1.在项目根目录执行 yarn install 安装依赖

2.执行 yarn run dev 或 yarn run start 启动本地服务

3.配置非安全浏览器：chrome 快捷方式 --> 属性 --> 快捷方式 --> 目标 中补充输入 --disable-web-security --user-data-dir=c:\kkk --disable-features=CrossSiteDocumentBlockingIfIsolating

4.在非安全浏览器中输入: localhost:3004 或 http://127.0.0.1:3004 访问本地服务

## 目录结构

src --> assets : 存放 图片、样式、国际化词条配置

src --> server : 存放 基于 axios 的 http 请求文件，包括 业务 api、request 方法（GET、PUT、PATCH、DELETE、POST）、axios 配置

src --> util : 存放 工具文件

- CookieService：cookie 封装
- MsgService：接口提示组件
- regExpService：正则表达式
- StompService：websocket 封装
- Storage Service：localStorage 封装

src --> store : redux

- configStore：全局状态管理，redux
- history：全局 history 注入
- rootReducer：全局 reducer

src --> feature : 存放 业务代码

src --> feature --> \* : 每一个文件夹表示一个业务模块，其中 Layout 是一级、二级路由配置文件

src --> feature --> common : 存放业务中的公用组件、高阶组件、通用处理方法等

- JarvisCreateHeader: 模块主页面页头组件，所需参数：createHeader
- JarvisCardList: 模块主页面卡片列表，所需参数：key，entity，titleClick，dropBtns
- JarvisDetailHeader：模块详情页面页头组件，所需参数：profile
- JarvisDeleteModal：删除弹窗，所需参数：visible，onOk，onCancel，deleteParam
- JarvisRefreshBtn：刷新按钮组件，所需参数：onClick
- businessTypes：业务需要的常量配置
- LocalDateFormat：时间日期格式化方法
- PermissionControl：权限控制，高阶组件，所需参数 pName
- WithDialog：弹窗组件
- WithLoadable：路由懒加载，高阶组件
- Loading：react 路由懒加载过程中显示的组件
