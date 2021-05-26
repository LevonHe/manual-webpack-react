export default {
  common: {
    readAndAgreed: '我已阅读和同意',
    bagType: '镜像包类型',
    save: '保存',
    check: '校验',
    selectAll: '全选',
    temporaryStorage: '暂存',
    view: '查看',
    add: '增加',
    create: '创建',
    delete: '删除',
    remove: '移除',
    rename: '重命名',
    edit: '编辑',
    preview: '预览',
    clear: '清除',
    update: '更新',
    detail: '详情',
    query: '查询',
    search: '搜索',
    test: '测试',
    release: '发布',
    register: '注册',
    registerNow: '立即注册',
    login: '登录',
    confirm: '确认',
    cancel: '取消',
    reset: '重置',
    back: '返回',
    implement: '执行',
    operation: '操作',
    zh_CN: '中文简体',
    en_US: 'English',
    status: '状态',
    type: '类型',
    version: '版本号',
    thingSpecLangVersion: '物模型版本号',
    softwareVersion: '软件版本号',
    firmwareVersion: '固件版本号',
    currentVersion: '当前版本号',
    targetVersion: '目标版本号',
    start: '启动',
    stop: '停止',
    started: '已启动',
    stopped: '已停止',
    yes: '是',
    no: '否',
    or: '或',
    name: '名称',
    ID: 'ID',
    loading: '加载中...',
    createTime: '创建时间',
    updateTime: '更新时间',
    startTime: '开始时间',
    endTime: '结束时间',
    description: '描述',
    metadata: '扩展信息',
    metadataDesc: '扩展信息，可自定义设备其他的属性信息，JSON格式',
    userManual: '用户手册',
    userAgreement: '用户协议',
    forgetPwd: '忘记密码',
    accountPassword: '账号密码',
    browserNotSupportTip:
      '当前浏览器可能存在兼容问题，请切换Chrome 69+，Firefox 47+，ie 11+，Edge浏览器，以获得稳定的交互体验。',
    maxLength: '长度限制在{0}位!',
    noSpace: '输入框中不能有空格！',
    longInteger: '数字大小需在长整型范围之内',
    errorVersion: '版本号格式不正确',
    platformName: '西人马塔斯云',
    platformInfo: `有感而发，智汇预见
    自主研发、制造的芯片
    多维信号采集的传感器
    大数据聚变和多模态AI
    灵活定制、安全加持、快速落地、开放生态`,
    synchronization: '同步',
    asc: '升序',
    desc: '降序',
    invalid: {
      metadata: '扩展信息不合法，长度：0~1024，JSON格式，非数组',
      data: '扩展信息不合法，长度：0~1024，JSON格式，数组',
      description: '描述不合法，长度：0~512',
      versionRequired: '请输入版本号',
      version14:
        '格式如a.b.c.d，a、b、c最大由4位数字组成，d可以是时间格式YYYYMMDD，或版本代号base、alpha、beta、RC、release，或时间与版本代号的组合YYYYMMDD_base',
      typeRequired: '请选择类型',
      bagTypeRequired: '请选择包类型',
      noPermission: '该用户没有权限',
      noViewPermission: '该用户没有视图权限',
      noInterfacePermission: '该用户没有接口权限',
      interfaceTimeout: '接口超时，请稍后重试',
      NAME64_REG: '由1~64位中文字符、英文字母、数字、@、点、下划线、中划线等(除回车、TAB外)组成',
      ONLY_NUMBER_REG: '由数字组成',
      json: '请输入JSON格式的内容',
      NOM_NEFATIVE_INTEGER: '请输入正整数',
    },
    placeholder: {
      description: '请输入描述',
      metadata: '请输入扩展信息',
      version: '请输入版本号',
      startTime: '请选择开始时间',
      endTime: '请选择结束时间',
    },
    username: '用户名',
    email: '邮箱',
    role: '角色',
    phone: '手机号',
    userInfo: '用户信息',
    updatePwd: '修改密码',
    retrievePwd: '找回密码',
    confirmModification: '确认修改',
    logout: '退出登录',
    logoutText: '确定要 退出登录 吗？',
    logoutSuccess: '退出登录成功',
    cancelLogout: '取消登出操作',
    oldPassword: '原密码',
    newPassword: '新密码',
    confirmPassword: '确认密码',
    accountValid: '账号不合法，格式：邮箱/手机号',
    passwordValid: '由8~20位英文字母、数字和特殊符号(除回车、空格、TAB外)组成',
    pwdNotConsistent: '两次密码不一致',
    successUpdatePwd: '密码修改成功',
    failureUpdatePwd: '密码修改失败',
    total: '共 {0} 条',
    enable: '启用',
    disable: '禁用',
    complete: '完成',
    nextStep: '下一步',
    INTEGER: '整型',
    DOUBLE: '浮点型',
    STRING: '字符串',
    BOOLEAN: '布尔型',
    BYTES: '字节',
    JSON: 'JSON类型',
    NUMBER: '数字',
    ARRAY: '数组',
    OBJECT: '对象',
    DATE: '日期',
    PATH: '路径',
    QUERY: '请求参数',
    HEADER: '请求头',
    BODY: '请求体',
    READ_AND_WRITE: '读写',
    READONLY: '只读',
    hour: '1小时',
    day: '24小时',
    week: '7天',
    custom: '自定义',
    minute: '分钟',
    uninstall: '卸载',
    load: '加载',
    download: '下载',
    modalTitle: '弹窗标题',
    copyright1: 'Copyright © 2020-',
    copyright2: ' Levon He',
    order: '序号',
    mapLoadSuccess: '高德地图加载成功',
    mapLoadError: '高德地图加载失败',
    downloadFail: '下载失败',
    deleteTip: '删除后数据将无法恢复',
  },
  menu: {
    Home: '概览',
  },
  login: {
    enterUserName: '请输入用户名',
    enterPwd: '请输入密码',
    account: '邮箱/手机号',
    password: '密码',
  },
  register: {
    phoneNumberRegister: '手机号注册',
    emailRegister: '邮箱注册',
    accountExisted: '已有账号',
    verificationCode: '短信验证码',
    verificationCodeInvaid: '验证码为6位数字',
    enterVerificationCode: '请输入验证码',
    getVerificationCode: '获取验证码',
    resend: '{0}秒后重发',
    registerSuccess: '注册成功',
  },
  forgetPwd: {
    phoneNumberRetrieval: '手机号找回密码',
    emailRetrieval: '邮箱找回密码',
    updatePwdSuccess: '修改密码成功',
    newPassword: '请输入新密码',
  },
  errorCode: {
    '000': '网络异常',
    400: '无效请求',
    401: '未认证',
    403: '请求被禁止',
    404: '资源不存在',
    406: '请求不被接受',
    408: '请求超时',
    409: '服务器在完成请求时发生冲突',
    411: '长度无效',
    412: '未满足前提条件',
    415: '不支持的媒体类型',
    417: '未满足期望值',
    500: '内部服务异常',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    601: '非法参数',
    602: '非法操作',
    603: '不存在',
    604: '已存在',
    605: '参数缺失',
    606: '操作过于频繁，请稍后再试',
    607: '上传文件不存在',
    608: '上传文件大小超过限制',
    609: '上传文件类型不允许',
    10001: '系统异常',
    10002: '无法下载图片，请提供有效的图片链接',
    10003: '输入数据格式有误',
    10004: '缺少必要字段',
    10005: '输入参数有误',
    10006: '模型编码错误',
    10007: '模型类别错误',
    10301: '组已经存在',
    10302: '组不存在',
    10303: '用户不存在',
    20001: '图片应小于2M',
    20301: '图片中没有人脸',
    20302: '活体检测未通过',
    30101: '电梯数据指标数量有误',
    30301: '人脸光照不好',
    30302: '人脸模糊',
    100103: '机构不存在',
    100104: '机构已存在',
    100105: '机构包含资源，无法删除',
    1060103: '无效的密码',
    1060105: '无效的账户名或密码',
    1060107: '验证码已过期',
    1060108: '验证码错误',
    1060109: 'Token无效，请重新登录',
    1060206: '账户已被锁定 {{lockTime}} 分',
    1060302: '账户不存在',
    1060304: '账户已禁用',
    1060401: '账户已存在',
    1160105: '角色已被使用',
    1160106: '权限已被使用',
    1160209: '角色越权',
    1160303: '角色不存在',
    1160304: '权限不存在',
    1160307: '用户未绑定角色',
    1160208: '公开角色不能修改',
    1160401: '角色已存在',
    1160402: '权限已存在',
    1260109: '该邮箱已被占用',
    1260111: '该手机号已被使用',
    1260112: '该邮箱已被占用',
    1260304: '用户不存在',
    1260401: '用户名已存在',
    1260402: '邮箱已存在',
    1260403: '手机已存在',
    1360303: '租户不存在',
    1360304: '机构已存在',
    1360401: '租户已存在',
    1360402: '机构已存在',
    1440001: '功能定义的传输类型和数据通道不匹配',
    1460105: '产品不允许修改',
    1460164: '物模型不允许修改',
    1460165: '功能类型不允许修改',
    1460185: '协议与当前产品类型不符合',
    1460302: '产品已被移除',
    1460322: '数据通道不已存在',
    1460342: '功能定义不存在',
    1460362: '物模型已被移除',
    1460403: '产品包含设备信息',
    1460404: '产品名称已存在',
    1460421: '数据通道名称已存在',
    1460441: '功能名称或标识符已存在',
    1460460: '物模型已发布',
    1460461: '物模型名称已存在',
    1460463: '物模型包含设备信息',
    1460475: '分类已存在',
    1460480: '模板已发布',
    1460381: '模板未发布',
    1460382: '模板已被移除',
    1460383: '物模型不能为空',
    1460384: '存在物模型功能未定义',
    1460376: '分类已被管理员移除',
    1460477: '分类下存在模板',
    1460479: '分类下存在素材',
    1460378: '父级分类不存在',
    1560208: '设备已经被绑定',
    1560209: '设备已经由其他应用绑定',
    1560214: '设备在当前网关下存在冲突',
    1560314: '设备未被绑定',
    1560416: '只有直连设备和直连网关能直接绑定',
    1560301: '设备不存在',
    1560302: '设备分组不存在',
    1560403: '设备分组已存在',
    1560404: '设备分组包含多种产品',
    1560405: '设备分组的产品不允许修改',
    1560406: '设备已存在',
    1560407: '设备和分组的产品不匹配',
    1560410: '文件内容不合法',
    1560411: '导入设备数量过多',
    1750001: '动作下发失败',
    1750006: '编码失败',
    1760301: '设备最新状态不存在',
    1760302: '设备最新数据不存在',
    1760303: '动作参数错误',
    1860101: '页码无效',
    2040001: '镜像配置错误',
    2040002: '设备组中没有设备',
    2040003: '部分设备已存在其它任务中运行',
    2040301: '请求中包含禁止修改的内容',
    2040302: '禁止切换到此状态',
    2060102: '设备的OTA项目类型错误',
    2060103: 'OTA项目下的设备组id错误',
    2060104: '黑白名单类型错误',
    2060105: '黑白名单下的设备未全部在此OTA项目下',
    2060301: '版本不存在',
    2140001: '版本不需要升级',
    2140601: '黑白名单文件无效',
    2140009: '设备组已被分配',
    2140010: '产品和设备组不匹配',
    2140011: '该设备已存在于其他任务中',
    2140012: '设备分组类型不是OTA',
    2150013: '任务启动失败',
    2150014: '任务信息与镜像信息不匹配',
    2150016: '任务删除失败',
    2160102: '版本号不匹配规则',
    2160103: '黑白名单文件无效',
    2160106: '镜像文件无效',
    2160211: '产品不允许修改',
    2160301: '任务不存在',
    2160304: '黑白名单文件中包含无效的设备id',
    2160305: '黑白名单文件不存在',
    2160307: '镜像文件不存在',
    2160308: '镜像信息重复',
    2160309: '镜像文件无法被更改',
    2160310: '镜像文件无法被删除',
    2160311: '镜像文件删除失败',
    2160312: '镜像不存在',
    2160408: '版本已存在',
    2260301: '任务不存在',
    2260302: '设备分组不存在或为空',
    2260303: '暂无可升级设备',
    2340002: '设备分组已经被分配',
    2340003: '产品和设备组不匹配',
    2360102: 'url无效',
    2360204: '产品不允许被修改',
    2360206: '应用中存在设备',
    2360301: '订阅不存在',
    2360303: '应用不存在',
    2360404: '应用已存在',
    2360405: '订阅已存在',
    2460402: '规则已存在',
    2460403: '规则引擎的执行动作尚未配置，请先配置',
    3060204: '模型已发布',
    3060205: '模型未发布',
    3060301: '模型不存在',
    3060306: '模型参数不存在',
    3060309: '模型绑定应用不存在',
    3060402: '模型已存在',
    3060403: '模型名称或编码已存在',
    3060407: '模型参数已存在',
    3060408: '模型参数名称或标识符已存在',
    3060410: '模型绑定应用已存在',
    3060330: '数据集不存在',
    3060431: '数据集已存在',
    3060432: '数据集名称已存在',
    3060233: '数据集未停用',
    3060234: '数据集已停用',
    3060335: '数据不存在',
    3060236: '数据未停用',
    3060237: '数据已停用',
    3060238: '数据数量超出限制',
    3060139: '非图片类型数据',
    3060140: '图片超出限制大小',
    3060141: '图片类型不支持',
    3060142: '图片数量错误（图片数量过多或过少）',
    3060243: '模型已关联该数据集',
    3060246: '任务未完成',
    3060345: '任务不存在',
    3060444: '存在未结束的任务',
    3160103: '产品类型必须是网关类型',
    3160104: '产品和物模型不匹配',
    3160105: '产品物模型和设备不匹配',
    3160106: '该网关设备已与其他实例绑定',
    3160107: '网关设备配置没有被修改',
    3160108: '驱动上传失败',
    3160109: '驱动不存在',
    3160110: '边缘规则已被绑定',
    3160111: '边缘规则不存在',
    3160112: '该规则中存在不属于该实例的设备',
    3160113: '规则中动作未配置，不允许分配',
    3160114: '规则不允许运行在云端',
    3160115: 'ai模型资源文件不存在',
    3160116: 'ai模型不存在',
    3160117: '边缘实例正处于部署中状态',
    3160301: '边缘实例不存在',
    3160402: '边缘实例已存在',
    3260401: '数据源已存在',
    3260302: '数据源不存在',
    3260403: '数据API已存在',
    3260304: '数据API不存在',

    3360301: '文件不存在',
    3360202: '未绑定的文件不允许下载',
    3360203: '文件已完整或已绑定',
    3360204: 'MD5不一致',
    3360105: '文件大小超过限制',
    3360106: '文件后缀名不符合限制',
    3360207: '文件大小不一致',
    3360108: '文件名称过长',
    3360109: '文件太大，请单独下载',

    3560401: '素材名称已存在',
    3560302: '素材不存在',
    3560303: '看板页不存在',
    3560407: '看板名称已存在',
    3560304: '鉴权规则已存在',
    3560305: '执行鉴权规则失败',
    3560306: 'api转发获取失败',
    3560307: 'api校验失败',
    3560308: 'api接口返回值不可用',
    3560309: 'api请求时间参数不匹配',
    3560408: '数据源名称已存在',
    3560409: '鉴权规则已被绑定',

    // 大数据的错误码
    999999: '未知错误',
    '000000': 'OK',
    '010101': '系统异常',
    '060101': '格式错误',
    '060102': '缺少必要字段',
    '060103': '输入参数有误',
    '020000': '插入异常',
    '020101': '数据库不存在',
    '020102': '数据表不存在',
    '020103': 'topic不存在',
    '020104': '租户不存在',
    '020105': '产品不存在',
    '020106': '物模型不存在',
    '020107': '设备不存在',
    '020108': '物标签不存在',
    '020109': '机构不存在',
    '020201': '数据库已存在',
    '020202': '数据表已存在',
    '020203': 'topic已存在',
    '020204': '租户已存在',
    '020205': '产品已存在',
    '020206': '物模型已存在',
    '020207': '设备已存在',
    '020208': '物标签已存在',
    '020209': '机构已存在',
    '020210': '数据源已存在',
    '020211': 'api名字已存在',
    '030000': '删除异常',
    '030101': '数据库不存在',
    '030102': '数据表不存在',
    '030103': 'topic不存在',
    '030104': '租户不存在',
    '030105': '产品不存在',
    '030106': '物模型不存在',
    '030107': '设备不存在',
    '030108': '物标签不存在',
    '030109': '机构不存在',
    '030110': '数据源不存在',
    '030201': '数据表有数据',
    '030202': '数据库中有表格',
    '030203': 'topic有数据',
    '040000': '修改异常',
    '040101': '数据库不存在',
    '040102': '数据表不存在',
    '040103': 'topic不存在',
    '040104': '租户不存在',
    '040105': '产品不存在',
    '040106': '物模型不存在',
    '040107': '设备不存在',
    '040108': '物标签不存在',
    '040109': '机构不存在',
    '040110': '数据源不存在',
    '050000': '查询异常',
    '050101': '数据库不存在',
    '050102': '数据表不存在',
    '050103': 'topic不存在',
    '050104': '租户不存在',
    '050105': '产品不存在',
    '050106': '物模型不存在',
    '050107': '设备不存在',
    '050108': '物标签不存在',
    '050109': '机构不存在',
    '050110': '数据源不存在',
    '050201': '租户和产品不匹配',
    '050202': '产品和物模型不匹配',
    '050203': '物模型和设备不匹配',
    '050204': '物模型和功能标签不匹配',
  },
};