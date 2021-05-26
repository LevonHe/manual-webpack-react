// 登录账号：邮箱/手机号码
export const ACCOUNT_REG = /^\s*((\w-*\.*)+@(\w-?)+(\.\w{2,})+)\s*|\s*([1][3-9][0-9]{9})\s*$/;
// 邮箱
export const EMAIL_REG = /^\s*(\w-*\.*)+@(\w-?)+(\.\w{2,})+\s*$/;
// 手机号码
export const TELEPHONE_REG = /^\s*[1][3-9][0-9]{9}\s*$/;
// 验证码
export const VERIFICATION_CODE_REG = /^\d{1,6}$/;
// 密码：8～20位，必须同时包含字母、数字及除去回车、空格、TAB的特殊符号
export const PASSWORD_REG = /^(?=.*\d)(?=.*[A-Za-z])(?!.*\s)(?=.*[^A-Za-z0-9]+)[^\u4e00-\u9fa5]*$/;
// 经度：取值范围0-180,保留0-6位小数
export const LONGITUDE_REG =
  /^\s*[+-]?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)\s*$/;
// 纬度：取值范围0-90,保留0-6位小数
export const LATITUDE_REG = /^\s*[+-]?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)\s*$/;
// url：以http开头
// export const HTTP_URL_REG = /^\s*https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\\/=\\?%\-&_~`@[\]\\':+!]*([^<>\\"\\"])*\s*$/;
export const HTTP_URL_REG =
  /^\s*((ht|f)tps?):\/\/[\u4e00-\u9fa5\w-]+(\.[\u4e00-\u9fa5\w-]+)+([\u4e00-\u9fa5\w.,@?^=%&:/~+#-{}]*[\u4e00-\u9fa5\w@?^=%&/~+#-{}])?\s*$/;
// 版本号：格式如a.b.c.d，a、b、c最大由4位数字组成，d可以是时间格式YYYYMMDD，或版本代号base、alpha、beta、RC、release，或时间与版本代号的组合YYYYMMDD_base
// eslint-disable-next-line
export const VERSION_REG =
  /^\s*\d{1,4}\.\d{1,4}\.\d{1,4}\.(((?!0000)[0-9]{4}((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])31)_(base|alpha|beta|RC|release))|(base|alpha|beta|RC|release|(?!0000)[0-9]{4}((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])31)))\s*$/i;
// 标识符：1～32位，字符：英文、"_-"、数字、允许中间有空格
export const IDENTIFIER_REG = /^\s*[A-Za-z0-9_-](([A-Za-z0-9_-\s]{0,30}[A-Za-z0-9_-])|([A-Za-z0-9_-]{0,31}))\s*$/;
// 参数标识符：1～64位，字符：英文、"_-"、数字、允许中间有空格
export const PARAM_IDENTIFIER_REG = /^\s*[A-Za-z0-9_-](([A-Za-z0-9_-\s]{0,62}[A-Za-z0-9_-])|([A-Za-z0-9_-]{0,63}))\s*$/;
// 通用：允许中间有空格
export const TRIM_REG = /^\s*\S(([\s\S]{0,253}\S)|([\s\S]{0,254}))\s*$/;
// 通用：允许中间有空格,描述
export const DESCRIPTION_REG = /^\s*\S(([\s\S]{0,510}\S)|([\s\S]{0,511}))\s*$/;
// 用户名：1～32位，字符：由8~32位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const USER_NAME_REG = /^\s*\S((.{0,30}\S)|(\S{0,31}))\s*$/;
// 名称：1～32位，字符：由1~32位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const NAME32_REG = /^\s*\S((.{0,30}\S)|(\S{0,31}))\s*$/;
// 名称：1～64位，字符：由1~64位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const NAME64_REG = /^\s*\S((.{0,62}\S)|(\S{0,63}))\s*$/;
// 名称：1～128位，字符：由1~64位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const NAME128_REG = /^\S((.{0,126}\S)|(\S{0,127}))$/;
// 名称：1～256位，字符：由1~64位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const NAME256_REG = /^\S((.{0,126}\S)|(\S{0,127}))$/;
// 设备序列号：1～32位，英文、数字、中划线、下划线、点、@
export const DEVICE_SERIAL_NUMBER_REG = /^\s*[a-zA-Z0-9-_@.]{1,32}\s*$/;
// 模型编码：1～64位，英文、数字、中划线、下划线、点、@
export const MODEL_CODE_REG = /^\s*[a-zA-Z0-9-_@.]{1,64}\s*$/;
// 非空格
export const NO_SPACE_REG = /^\S+$/;
// 纯数字,负数也ok
export const ONLY_NUMBER_REG = /^-?\d+$/;
// 非负整数
export const NOM_NEFATIVE_INTEGER = /^(0|([1-9]\d*))$/;
// 默认值：允许中间有空格,描述
export const DEFAULT_VALUE_REG = /^\s*\S(([\s\S]{0,62}\S)|([\s\S]{0,63}))\s*$/;
// 外部数据源--host校验
export const HOST_REG = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
// modbus-寄存器地址校验
export const REGISTER_ADDRESS_REG = /^0x[\da-f]{2,4}$/;
// 0-255
export const NUMBER0255_REG = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/;
// IP地址
export const IP_REG =
  /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
// 端口号校验1024-65535
export const PORT102465535_REG =
  /^(1(02[4-9]|0[3-9][0-9]|[1-9][0-9]{2})|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
// 端口号校验1024-65535
export const PORT_REG = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
