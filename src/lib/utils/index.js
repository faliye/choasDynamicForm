import $ from 'jquery';
import _ from 'lodash';

import {TitleBox} from "../components/titleBox";
import {Input} from "../components/input";
import {TextArea} from "../components/textArea";
import {Select} from "../components/select";
import {Radio} from "../components/radio";
import {Checkbox} from "../components/checkbox";
import {Datepicker} from "../components/datepicker";

/**
 * @name $createElement 创建元素
 * */
export const $createElement = (tag, proto = {}, childDOMs = []) => {
  let ele;
  switch (tag) {
    case 'TitleBox': {
      ele = new TitleBox(proto).$el;
      break;
    }
    case 'Input': {
      ele = new Input(proto).$el;
      break;
    }
    case 'TextArea': {
      ele = new TextArea(proto).$el;
      break;
    }
    case 'Select': {
      ele = new Select(proto).$el;
      break;
    }
    case 'Datepicker': {
      ele = new Datepicker(proto).$el;
      break;
    }
    case 'Radio': {
      ele = new Radio(proto).$el;
      break;
    }
    case 'Checkbox': {
      ele = new Checkbox(proto).$el;
      break;
    }
    default : {
      ele = $(document.createElement(tag));
      const {style={},props,className=[], on={},...propsKey} = proto;
      ele.each((k,v)=>{
        $(v).css(style).attr({...props,...propsKey}).addClass(className);
        Object.keys(on).forEach(eventName => {
          $(v).on(eventName, proto['on'][eventName])
        });
      });
      ele.append(...childDOMs)
    }
  }
  return ele;
};



/**
 * @name     judgeDataType     判断数据类型
 * @param    target     any    数据源
 * */
export function judgeDataType(target) {
  if (arguments.length === 0) {
    return '未传入需要判断的数据参数！';
  }
  if (typeof Object.prototype.toString.call == 'function') {
    const str = Object.prototype.toString.call(target);
    return str.split(' ')[1].slice(0, -1).toLowerCase();
  }
  if (typeof Array.isArray == 'function') {
    if (Array.isArray(target)) {
      return 'array';
    }
  }
  let arr = [
    'object',
    'array',
    'string',
    'symbol',
    'number',
    'boolean',
    'null',
    'undefined',
  ];
  if (target === null && typeof target === 'object') {
    return 'null';
  }
  let i = 0,
      len = arr.length;
  for (; i < len; i++) {
    if (typeof target === arr[i] && typeof target !== 'object') {
      return arr[i];
    } else if (typeof target === arr[i] && typeof target == 'object') {
      return target instanceof Array ? 'array' : 'object';
    }
  }
  arr = null;
  return '类型判断失败，或数据类型为非浏览器内置，请检查！';
}

/**
 * @name deleteFn 删除元素
 * */

export const deleteFn= (data,selectStart ,selectEnd)=>{
  for (let j = selectStart[0];j<=selectEnd[0];++j){
    for (let i= selectStart[1];i<=selectEnd[1];++i){
      const targetData = data[j][i];
      const {parentTdNode=[],childrenTdNode=[]} = targetData;
      if(parentTdNode.length){
        data[parentTdNode[0]][parentTdNode[1]].childrenTdNode = []
      }
      if(childrenTdNode.length){
        deleteFn(data, childrenTdNode,childrenTdNode)
      }
      delete targetData.childrenProps;
      targetData.childrenTdNode =[];
      targetData.parentTdNode = [];
      targetData.isEmpty = 1;
      targetData.isError = false;
    }
  }

};

/**
 * @name addZero 加零
 * */

export const addZero = (value) => {
  return value >9?value+'': '0'+value;
};


/**
 * @name calcSelectWidth 计算选区宽度
 * */
export const calcSelectWidth=(start,end)=>{
  let width = 0;
  for (let i = start[1], count = 0; i <= end[1]; ++i) {
    const ele = $('#td-' + end[0] + '-' + i);
    const colSpan = ele.attr('colSpan');
    if(colSpan>1){
      count = i+ parseInt(colSpan, 10);
      width+=parseInt(ele.outerWidth(), 10);
    }else{
      if(i>=count){
        count = 0;
        let eleWidth = parseInt(ele.outerWidth(), 10);
        // 隐藏元素 向下查找不隐藏元素
        //
        if(ele.css('display')==='none'){
          for(let j = end[0];j<100;++j){
            const ele1 = $('#td-' + j + '-' + i);
            if(ele1.css('display')!=='none' && ele1.attr('colSpan')==='1'){
              eleWidth =ele1.outerWidth();
              break;
            }
          }
        }
        width+=eleWidth
      }
    }
  }
  return width;
};


/**
 * @name calcSelectHeight 计算选区高度
 * */
export const calcSelectHeight=(start,end)=>{
  let height = 0;

  for (let i = start[0],count = 0; i <= end[0]; ++i) {
    const ele = $('#td-' + i + '-' + end[1]);
    let rowSpan = ele.attr('rowSpan');
    if(rowSpan>1){
      count = i+ parseInt(rowSpan, 10);
      height+=parseInt(ele.outerHeight(), 10);
    }else{
      if(i>=count){
        count = 0;
        height+=parseInt(ele.parent('tr').outerHeight(), 10);
      }
    }
  }
  return height;
};

/**
 * @name createContentBoxStyle 计算选区样式
 * @param styleProps 样式属性
 * */

export const createContentBoxStyle=(styleProps)=>{
  const {
    alignItems,
    textAlign,
    color,
    backgroundColor,
  } = styleProps;
  return {
    color,
    alignItems,
    textAlign,
    background: backgroundColor,
  };
};

/**
 * @name computedTdStyle 计算选区样式
 * @param tdData 样式属性
 * @param themeConfig 样式属性
 * */

export const computedTdStyle=(tdData = {}, themeConfig)=>{
  const {
    rowSpan,
    colSpan,
    isHidden = 0,
    isError = 0,
    props = {},
  } = tdData;
  const style ={};
  if(isHidden){
    style.display = 'none';
  }else{
    style.width = themeConfig.sizeConfig.tdInitWidth*colSpan;
    style.height = themeConfig.sizeConfig.tdInitHeight*rowSpan;
  }
  return style;
};

