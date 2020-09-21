import $ from 'jquery'
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
 * @name     assign     实现object.assign()浅拷贝
 * @param    target     object     合并至对象
 * @param    source     object     合并对象
 * */
export function assign(target, source) {
  if (
      judgeDataType(target) === 'object' &&
      judgeDataType(source) === 'object'
  ) {
    if (typeof Object.assign == 'function') {
      return Object.assign(target, source);
    } else if (typeof Object.keys == 'function') {
      const sourceKeys = Object.keys(source);
      let i = 0,
          len = sourceKeys.length;
      for (; i < len; i++) {
        let temp = sourceKeys[i];
        target[temp] = source[temp];
      }
      return target;
    } else {
      for (let key of source) {
        target[key] = source[key];
      }
      return target;
    }
  }
}

/**
 * @name  addEvent    绑定事件
 * @param element     string     元素
 * @param event       string     事件名
 * @param fn          function   事件函数
 * @param useCapture  capture
 * */

export function addEvent(element, event, fn, useCapture) {
  useCapture = useCapture || false;
  if (document.addEventListener) {
    element.addEventListener(event, fn, useCapture);
    return function () {
      element.removeEventListener('event', fn);
    };
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, fn);
    return function () {
      return element.detachEvent('on' + event, fn);
    };
  } else {
    element['on' + event] = fn;
  }
}

// 获取页面的宽度
/**
 * @name getPageSize
 * */

export const getPageSize = () => {
  let scrW, scrH;
  if (window.innerHeight && window.scrollMaxY) {
    // Mozilla
    scrW = window.innerWidth + window.scrollMaxX;
    scrH = window.innerHeight + window.scrollMaxY;
  } else if (document.body.scrollHeight > document.body.offsetHeight) {
    // all but IE Mac
    scrW = document.body.scrollWidth;
    scrH = document.body.scrollHeight;
  } else if (document.body) { // IE Mac
    scrW = document.body.offsetWidth;
    scrH = document.body.offsetHeight;
  }

  let winW, winH;
  if (window.innerHeight) { // all except IE
    winW = window.innerWidth;
    winH = window.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight || document.documentElement.clientWidth) {
    // IE 6 Strict Mode
    winW = document.documentElement.clientWidth;
    winH = document.documentElement.clientHeight;
  } else if (document.body) { // other
    winW = document.body.clientWidth;
    winH = document.body.clientHeight;
  }

  // for small pages with total size less then the viewport
  const pageW = (scrW < winW) ? winW : scrW;
  const pageH = (scrH < winH) ? winH : scrH;

  return {PageW: pageW, PageH: pageH, WinW: winW, WinH: winH};
};


/**
 * @name getHeight 获取元素高
 * */

export const getHeight = (ele) => {
  if (!ele) {
    return '0'
  }
  return ele.offsetHeight;
};


/**
 * @name getWidth 获取元素宽
 * */

export const getWidth = (ele) => {
  if (!ele) {
    return '0'
  }
  return ele.offsetWidth;
};

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
