// 读写类型
export const ReadWriteTypes = [
  {
    key: 'READ_AND_WRITE',
    value: 'common.READ_AND_WRITE',
  },
  {
    key: 'READONLY',
    value: 'common.READONLY',
  },
];
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 }, // < 576px
    sm: { span: 8 }, // >= 576px
    md: { span: 8 }, // >= 768px
    lg: { span: 8 }, // >= 992px
    xl: { span: 8 }, // >= 1200px
    xxl: { span: 6 }, // >= 1600px
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 16 },
    lg: { span: 16 },
    xl: { span: 16 },
    xxl: { span: 18 },
  },
};

export const formItemLayoutEn = {
  labelCol: {
    xs: { span: 24 }, // < 576px
    sm: { span: 24 }, // >= 576px
    md: { span: 24 }, // >= 768px
    lg: { span: 24 }, // >= 992px
    xl: { span: 10 }, // >= 1200px
    xxl: { span: 8 }, // >= 1600px
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 14 },
    xxl: { span: 16 },
  },
};

// 数据类型
export const AuthenticationDataTypes = [
  {
    key: 'STRING',
    value: 'common.STRING',
  },
  {
    key: 'NUMBER',
    value: 'common.NUMBER',
  },
  {
    key: 'ARRAY',
    value: 'common.ARRAY',
  },
  {
    key: 'OBJECT',
    value: 'common.OBJECT',
  },
];
