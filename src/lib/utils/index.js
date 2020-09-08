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
 * @name     deepClone             深拷贝
 * @param    target     any        数据源
 * @param    sign       boolean    是否使用JSON实现，默认为true
 * */
export function deepClone(target, sign) {
  const temp = sign || false;
  if (temp) {
    const t = judgeDataType(target);
    let o;
    if (t === 'array') {
      o = [];
    } else if (t === 'object') {
      o = {};
    } else {
      return target;
    }
    if (t === 'array') {
      for (let i = 0; i < target.length; i++) {
        o.push(deepClone(target[i]), temp);
      }
    } else if (t === 'object') {
      for (let i of target) {
        o[i] = deepClone(target[i], temp);
      }
    }
    return o;
  } else {
    if (typeof JSON.stringify === 'function') {
      return JSON.parse(JSON.stringify(target));
    }
  }
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
 * @name     $getEle           获取元素
 * @param    element     string     获取元素
 * @param    parent     string     获取元素范围（父元素）
 * */

export function $getEle(element, parent) {
  parent = parent || document;
  let type = element.slice(0, 1);
  if (type === '#') {
    return parent.getElementById(element.slice(1));
  } else if (type === '.') {
    let classArr = [],
        elements = parent.getElementsByTagName('*');
    if (!document.getElementsByClassName) {
      let i = 0,
          l = elements.length;
      for (; i < l; i++) {
        let classNames = elements[i].className.split(' ');
        for (let j in classNames) {
          if (classNames[j] === element.slice(1)) {
            classArr.push(elements[i]);
          }
        }
      }
      return classArr;
    } else {
      return parent.getElementsByClassName(element.slice(1));
    }
  } else {
    return parent.getElementsByTagName(element);
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

export const deleteFn= (data, location)=>{
  const targetData = data[location[0]][location[1]];
  const {parentTdNode=[],childrenTdNode=[]} = targetData;
  if(parentTdNode.length){
    data[parentTdNode[0]][parentTdNode[1]].childrenTdNode = []
  }
  if(childrenTdNode.length){
    deleteFn(data, childrenTdNode)
  }
  delete targetData.childrenProps;
  targetData.childrenTdNode =[];
  targetData.parentTdNode = [];
  targetData.isEmpty = 1;
  targetData.isError = false;
};

/**
 * @name addZero 加零
 * */

export const addZero = (value) => {
  return value >9?value+'': '0'+value;
};