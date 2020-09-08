import {addEvent} from "./index";

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
  let ele = null;

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
      ele = document.createElement(tag);
      Object.keys(proto).forEach(key => {
        if (key === 'style') {
          // style属性
          Object.keys(proto['style']).forEach(styleKey => {
            ele['style'][styleKey] = proto['style'][styleKey]
          })
        } else if (key === 'props') {
          // props属性
          Object.keys(proto['props']).forEach(propsKey => {
            ele[propsKey] = proto['props'][propsKey]
          });
        } else if (key === 'className') {
          let classArr = proto['className'] || [];
          ele.className = classArr.join(' ')
        } else if (key === 'on') {
          // 绑定事件
          Object.keys(proto['on']).forEach(eventName => {
            addEvent(ele, eventName, proto['on'][eventName])
          })
        }else {
          ele[key] = proto[key];
        }
      });

      if (tag === 'td') {
        ele.className += ' td-div'
      }
      (childDOMs || []).forEach(childDOM => {
        if (typeof childDOM !== 'object') {
          ele.appendChild(document.createTextNode(childDOM));
        } else {
          ele.appendChild(childDOM)
        }
      });
    }
  }


  return ele;
};
