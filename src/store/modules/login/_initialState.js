const initialState = {
  userInfo: {
    indentity: '', // 用户名
    userId: '', // 用户ID
    roleName: '', // 角色名称
    roleId: '', // 角色ID
    organizationId: '', // 机构ID
    email: '', // 邮箱
    phoneNumber: '', // 手机号
  }, // 登录用户信息
  menuAside: [], // 视图权限对象
  permissionNameArr: [], // 接口权限数组
  urlArr: [], // 当前一级路由的url列表
  browserTip: true, // 是否显示低版本浏览器提示
};

export default initialState;
