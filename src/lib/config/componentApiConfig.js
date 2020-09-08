/**
 * 用于快速的插入TitleBoxClass
 * */
export const defaultValidate = [
  {
    key: 'isRequire',
    value: 0,
    name: '是否必选',
    event: ['change'],
  },
  {
    key: 'max',
    value: null,
    name: '最大长度',
    event: ['change'],
  },
  {
    key: 'min',
    value: null,
    name: '最小长度',
    event: ['change'],
  }
];
export const defaultTimeValidate = [
  // {
  //   key: 'formatter',
  //   name: '格式',
  //   value: 'yyyy-MM-dd hh:mm:ss'
  // },
  {
    key: 'defaultValue',
    name: '默认值',
    value: ''
  },
  {
    key: 'startTime',
    name: '开始时间',
    value: ''
  },
  {
    key: 'endTime',
    name: '结束时间',
    value: ''
  }
];

export class ChildrenProps {
  constructor(
      {
        tagName = '',
        keyName = '',
        cnName = '',
        isSearch = 0,
        value = '',
        dataType = 'string',
        placeholder = '',
        style = {},
        dataListId = '',
        isMultiple = 0,
        validate = [],
        timeValidate = []
      }
  ) {
    this.tagName = tagName;
    this.keyName = keyName;
    this.cnName = cnName;
    this.isSearch = isSearch;
    this.value = value;
    this.placeholder = placeholder;
    this.style = style;
    this.dataListId = dataListId;
    this.dataType = dataType;
    this.isMultiple = isMultiple;
    this.validate = validate;
    this.timeValidate = timeValidate;
    if (this.tagName === 'Datepicker') {
      delete this.validate;
    } else {
      delete this.timeValidate;
    }
    if(this.tagName!=='TitleBox'){
      delete this.keyName;
      delete this.cnName;
    }
    if (!['Radio', 'Checkbox', 'Select'].includes(this.tagName)) {
      delete this.dataListId;
      delete this.isMultiple;
    }
  }
}


export class TdBoxClass {
  /**
   * @param insertType 方向
   * @param colSpan 跨行
   * @param rowSpan 跨列
   * @param location 插入点坐标
   * @param isHidden 是否隐藏
   * @param isEmpty 是否为空
   * @param isError 是否报错
   * @param style 插入样式
   * @param parentTdNode 父td坐标
   * @param childrenTdNode 子td坐标
   * @param childrenProps 子节点属性
   * */
  constructor(
      {
        insertType = 'row',
        colSpan = 1,
        rowSpan = 1,
        location = [],
        isHidden = 0, // hidden情况下必为empty
        isEmpty = 1, // 是否为空
        isError = 0, // 是否报错
        style = {},
        parentTdNode = [],
        childrenTdNode = [],
        childrenProps = {},
      }
  ) {
    this.tag = 'td';
    this.insertType = insertType;
    this.colSpan = colSpan;
    this.rowSpan = rowSpan;
    this.location = location;
    this.isHidden = isHidden;
    this.isEmpty = isEmpty;
    this.isError = isError;
    this.style = style;
    this.parentTdNode = parentTdNode;
    this.childrenTdNode = childrenTdNode;
    this.childrenProps = childrenProps;
  }
}
