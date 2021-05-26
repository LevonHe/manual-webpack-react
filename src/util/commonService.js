import intl from 'react-intl-universal';
import cloneDeep from 'lodash/cloneDeep';
import MD5 from 'crypto-js/md5';
import WordArray from 'crypto-js/lib-typedarrays';
import { NOM_NEFATIVE_INTEGER, ONLY_NUMBER_REG } from './regExpService';

// 过滤请求参数
export const formatRequestParams = (params) => {
  if (!params) {
    return {};
  }
  Object.keys(params).forEach((k) => {
    if (params[k] === undefined || params[k] === null || params[k] === '') {
      delete params[k];
    }
  });
  return params;
};

// 解码JWTtoken
export const decodeToken = (token) => {
  if (!token) {
    return {};
  }
  if (token.indexOf('.') === -1) {
    return {};
  }
  let o;
  try {
    const objStr = decodeURIComponent(escape(window.atob(token.split('.')[1])));
    let newStr = objStr.replace(/"subjectId":(\d+)/, '"subjectId":"$1"');
    const s = newStr.indexOf('{');
    const e = newStr.indexOf('}');
    newStr = newStr.slice(s, e + 1);
    o = JSON.parse(newStr);
  } catch (error) {
    console.error('token is invalid');
    o = {};
  }

  return o;
};

// 过滤数组的重复数据
export const filterRepeatArrayElement = (array, property) => {
  const propertyArr = [];
  const indexArr = [];
  const newArray = [];
  array.forEach((e) => {
    propertyArr.push(e[property]);
  });
  propertyArr.forEach((item, index, self) => {
    if (self.lastIndexOf(item) === index) {
      indexArr.push(index);
    }
  });
  indexArr.forEach((i) => {
    newArray.push(array[i]);
  });
  return newArray;
};
// getBrowserType
function getVersion(versionStr) {
  const versionArr = versionStr.split('.');
  let version;
  if (versionArr.length === 1) {
    version = versionArr[0];
  } else if (versionArr.length > 1) {
    version = versionArr[0] + '.' + versionArr[1];
  }
  return parseFloat(version);
}
export const getBrowserType = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Firefox') > -1) {
    const versionStr = userAgent.split('Firefox/')[1].split(' ')[0];
    const version = getVersion(versionStr);
    return { type: 'Firefox', version };
  }
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Edge') > -1) {
    const versionStr = userAgent.split('Edge/')[1].split(' ')[0];
    const version = getVersion(versionStr);
    return { type: 'Edge', version };
  }
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
    const versionStr = userAgent.split('Chrome/')[1].split(' ')[0];
    const version = getVersion(versionStr);
    return { type: 'Chrome', version };
  }
  if (userAgent.indexOf('Trident') > -1 && userAgent.indexOf('compatible') > -1) {
    if (userAgent.indexOf('MSIE 10.0') > -1) {
      return { type: 'IE', version: 10.0 };
    }
    if (userAgent.indexOf('MSIE 9.0') > -1) {
      return { type: 'IE', version: 9.0 };
    }
  }
  if (userAgent.indexOf('Trident') > -1) {
    return { type: 'IE', version: 11.0 };
  }

  return { type: 'none', version: 0 };
};

export const getUUID = () => {
  const s = [];
  const hexDigits = '01234567890abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';

  const uuid = s.join('');
  return uuid;
};

// 校验json
export const isJSON = (str) => {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const jsonValidator = (rule, value, callback) => {
  try {
    const valueObject = JSON.parse(value);
    if (Object.prototype.toString.call(valueObject) !== '[object Object]') {
      return callback(intl.get('common.invalid.json'));
    }
  } catch (error) {
    return callback(intl.get('common.invalid.json'));
  }
  callback();
};

// metadata校验
export const metadataValidator = (rule, value, callback) => {
  if (!value) {
    return callback();
  }
  try {
    const valueObject = JSON.parse(value);
    if (Object.prototype.toString.call(valueObject) !== '[object Object]') {
      return callback(intl.get('common.invalid.metadata'));
    }
  } catch (error) {
    return callback(intl.get('common.invalid.metadata'));
  }
  if (value.length > 1024) {
    return callback(intl.get('common.invalid.metadata'));
  }
  callback();
};

// 预期性维护中data校验
export const dataValidator = (rule, value, callback) => {
  if (!value) {
    return callback(intl.get('contentAnalysis.placeholder.data'));
  }
  try {
    const valueObject = JSON.parse(value);
    if (Object.prototype.toString.call(valueObject) !== '[object Array]') {
      return callback(intl.get('common.invalid.data'));
    }
  } catch (error) {
    return callback(intl.get('common.invalid.data'));
  }
  if (value.length > 1024) {
    return callback(intl.get('common.invalid.data'));
  }
  callback();
};

// 订阅端口校验
export const subscribeHostValidator = (rule, value, callback) => {
  if (!value) {
    return callback(intl.get('application.placeholder.inputRequired', { 0: intl.get('application.port') }));
  }
  try {
    if (value.toString().indexOf('.') > -1) {
      return callback(intl.get('application.invalid.port'));
    }
    const host = Number(value);
    if (host < 1024 || host > 65535) {
      return callback(intl.get('application.invalid.port'));
    }
  } catch (error) {
    return callback(intl.get('application.invalid.port'));
  }
  callback();
};

export const subscribeClientIdValidator = (rule, value, callback) => {
  if (!value) {
    return callback(intl.get('application.placeholder.inputRequired', { 0: intl.get('application.clientId') }));
  }
  // eslint-disable-next-line no-useless-escape
  if (/[\+#]/g.test(value)) {
    return callback(intl.get('application.invalid.clientId'));
  }
  callback();
};

export const subscribeTopicValidator = (rule, value, callback) => {
  if (!value) {
    return callback(intl.get('application.placeholder.inputRequired', { 0: intl.get('application.topic') }));
  }
  // eslint-disable-next-line no-useless-escape
  if (/[\+#]/g.test(value)) {
    return callback(intl.get('application.invalid.topic'));
  }
  callback();
};

export const samplingFrequencyValidator = (rule, value, callback) => {
  if (!NOM_NEFATIVE_INTEGER.test(value)) {
    return callback(intl.get('common.invalid.NOM_NEFATIVE_INTEGER'));
  }
  const num = parseInt(value, 10);
  if (num < 1 || num > 86400) {
    callback(intl.get('tsl.invalid.samplingFrequency'));
    return;
  }
  callback();
};

// 处理bigint类型字符串数组
export const processStrArrayBigInt = (strArray) => strArray.replace(/\[(\d+)/g, '["$1"').replace(/,\s+(\d+)/g, ',"$1"');

// processFieldsValue
export const processFieldsValue = (fieldsValue) => {
  // 去空格
  Object.keys(fieldsValue).forEach((key) => {
    if (fieldsValue[key] && Object.prototype.toString.call(fieldsValue[key]) === '[object String]') {
      fieldsValue[key] = fieldsValue[key].trim();
    }
  });
  // 处理metadata，为空时删除该字段，不为空时转换为对象
  if (fieldsValue.metadata) {
    fieldsValue.metadata = JSON.parse(fieldsValue.metadata);
  } else {
    delete fieldsValue.metadata;
  }
};

// 判断数值是否存在
export const isValueExist = (value) => {
  if (value || (value !== undefined && value !== null)) {
    return true;
  }
  return false;
};

// 文件大小单位换算
export const unitConversion = (value) => {
  if (value === 0) return '0 B';
  const k = 1024; // or 1000
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(value) / Math.log(k));
  return (value / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
};

// 判断表单数值是否为整型
export const isInteger = (val) => {
  if (!ONLY_NUMBER_REG.test(val)) {
    return false;
  }
  const numVal = parseFloat(val, 10);
  return numVal % 1 === 0;
};

// 浮点数校验
export const isFloat = (val) => {
  if (Number.isNaN(val * 1)) {
    return false;
  }
  let value = val;
  // 判断字符串首位是否有符号
  if (val[0] === '-') {
    value = val.substr(1);
  }
  // 判断是否包含小数点
  if (!value.includes('.')) {
    // 数值为整数，且长度不为1时
    if (value.length !== 1) {
      // 判断第一位数是否为0
      if (value[0] === '0') {
        return false;
      }
      // 判断长度是否大于15
      if (value.length > 15) {
        return false;
      }
      return true;
    }
    return true;
  }
  const arr = value.split('.');
  // 将字符串变为数组，分为整数小数两部分，判断数组长度是否为2
  if (arr.length !== 2) {
    return false;
  }
  // 判断整数部分和小数部分的长度是否为0
  if (arr[0].length === 0 || arr[1].length === 0) {
    return false;
  }
  let len = 0;
  // 整数部分，长度不为1时
  if (arr[0].length !== 1) {
    // 判断首位是否为0
    if (arr[0][0] === '0') {
      return false;
    }
    len = arr[0].length;
    // 首位不为0时，判断小数部分长度加整数部分长度加起来是否超过15
    if (arr[1].length > 15 - len) {
      return false;
    }
    return true;
  }
  // 整数部分长度为1，且不为0时
  if (arr[0] !== '0') {
    len = 1;
    // 直接判断小数部分是否大于14
    if (arr[1].length > 15 - len) {
      return false;
    }
    return true;
  }
  // 整数部分为1，且为0时，将小数部分划为数组，找出首位不为0的下标，之后往后取数，判断长度是否大于15
  const strArr = arr[1].split('');
  const index = arr[1].indexOf(strArr.find((item) => item !== '0'));
  len = arr[1].substr(index).length;
  if (len > 15) {
    return false;
  }
  return true;
};

/**
 * @description 异步加载高德地图
 */
export function loadMP() {
  const mp = new Promise((resolve, reject) => {
    const hasLoaded = document.getElementById('amap');
    if (hasLoaded) {
      resolve(AMap);
      return;
    }
    window.init = function init() {
      resolve(AMap);
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://webapi.amap.com/maps?v=1.4.15&plugin=Map3D,AMap.DistrictLayer&key=57a4d486403bc19c1d3123c93975f20e&callback=init';
    script.id = 'amap';
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return mp;
}

/**
 * description 分页接口一次请求所有数据
 * @param {*} fetchFunc http请求
 * @param {*} pageIndex 当前页码，默认1
 * @param {*} pageSize 每页条数，默认10
 * @param params 其他查询参数对象
 */
export function getTotalList(fetchFunc, pageIndex = 1, pageSize = 10, params = {}, id) {
  return new Promise((resolve, reject) => {
    // 对函数做操作
    const funcImplement = (param) => {
      if (id) {
        return fetchFunc(id, param);
      }
      return fetchFunc(param);
    };
    funcImplement({ pageIndex, pageSize, ...params })
      .then((res) => {
        const result = res.data;
        if (res.totalRecords <= pageSize) {
          resolve(result);
        } else {
          const _total = ~~((res.totalRecords - 1) / pageSize) + 1;
          const _pageList = new Array(_total - 1).fill(1).map((v, index) => index + 1 + pageIndex);
          Promise.all(_pageList.map((page) => funcImplement({ pageIndex: page, pageSize, ...params })))
            .then((resList) => {
              resList.forEach((_res) => {
                Array.prototype.push.apply(result, _res.data);
              });
              resolve(result);
            })
            .catch(reject);
        }
      })
      .catch(reject);
  });
}

export function getMapDeviceList(fetchFunc, page_index = 1, page_size = 1000, params = {}) {
  return new Promise((resolve, reject) => {
    function request(ret, pI, pS) {
      fetchFunc({ page_index: pI, page_size: pS, ...params })
        .then((res) => {
          ret = ret.concat(res.data.result);
          if (res.data.device_total_count <= pI * page_size) {
            resolve(ret);
            return;
          }
          request(ret, pI + 1, pS);
        })
        .catch((error) => {
          if (!ret || ret.length === 0) {
            reject(error);
            return;
          }
          resolve(ret);
        });
    }
    request([], page_index, page_size);
  });
}

export function getMapDeviceList1(fetchFunc, pageIndex = 1, pageSize = 1000, params = {}) {
  return new Promise((resolve, reject) => {
    function request(ret, pI, pS) {
      fetchFunc({ pageIndex: pI, pageSize: pS, ...params })
        .then((res) => {
          ret = ret.concat(res.data);
          if (res.totalRecords <= pI * pageSize) {
            resolve(ret);
            return;
          }
          request(ret, pI + 1, pS);
        })
        .catch((error) => {
          if (!ret || ret.length === 0) {
            reject(error);
            return;
          }
          resolve(ret);
        });
    }
    request([], pageIndex, pageSize);
  });
}

// 将数字三位分隔
export const formatLocalString = (num) => {
  if (num === undefined || num === null) return '';
  if (!num.toString) return;
  return num.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
};

export const getFileMd5 = (file) => {
  if (!file) return '';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let md5 = '';
      try {
        const wordArray = WordArray.create(reader.result);
        md5 = MD5(wordArray).toString();
        resolve(md5);
      } catch (error) {
        console.log(error);
        resolve('');
      }
    };
    reader.onerror = (error) => {
      resolve('');
    };
    reader.readAsArrayBuffer(file);
  });
};

// 获取meta标签的content信息
export const getMeta = (metaName) => {
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content');
    }
  }
};

// 菜单高亮
export const pathObj = {
  user: ['userDetail'],
  role: ['roleDetail'],
  tenant: ['tenantCreate', 'tenantDetail'],
};
export const leftMenuHighLightKey = (pathKey) => {
  let highLightKey = pathKey;
  Object.keys(pathObj).every((k) => {
    if (pathObj[k].includes(pathKey)) {
      highLightKey = k;
      return false;
    }
    return true;
  });
  return highLightKey;
};

// 抽取权限名称
export const mapChangeArray = (arr, arrNew) => {
  arr.forEach((o) => {
    arrNew.push(o.name);
    if (
      o.permissions &&
      Object.prototype.toString.call(o.permissions) === '[object Array]' &&
      o.permissions.length > 0
    ) {
      mapChangeArray(o.permissions, arrNew);
    }
  });
};

// 过滤左侧菜单
export const filterMenuAside = (menu, permissionNameArr) => {
  const arr = [];
  menu.forEach((ele) => {
    if (ele.name === 'Home' || ele.name === 'DeviceDebug' || ele.name === 'AppComponent') {
      // 首页默认显示
      arr.push(ele);
    }
    if (ele.auth && permissionNameArr.includes(ele.auth)) {
      const target = cloneDeep(ele);
      if (ele.permissions && ele.permissions.length > 0) {
        target.permissions = filterMenuAside(ele.permissions, permissionNameArr);
      }
      // 当有permission字段并且该字段在权限数组中
      arr.push(target);
    }
  });
  return arr;
};

// 抽取name
export const extractName = (arr, arrNew) => {
  arr.forEach((o) => {
    if (o.name) {
      arrNew.push(o.name);
    }
    if (o.permissions && o.permissions.length > 0) {
      extractName(o.permissions, arrNew);
    }
  });
};

// 抽取url
export const extractUrl = (arr, arrNew) => {
  arr.forEach((o) => {
    if (o.url) {
      arrNew.push(o.url);
    }
    if (o.permissions && o.permissions.length > 0) {
      extractUrl(o.permissions, arrNew);
    }
  });
};
