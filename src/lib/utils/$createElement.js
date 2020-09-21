import {addEvent} from "./index";
import $ from 'jquery'

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
      ele = $(document.createElement(tag));
      const {style={},props,className=[], on={},...propsKey} = proto;
      ele.css(style).attr({...props,...propsKey}).addClass(className);
      Object.keys(on).forEach(eventName => {
        ele.on(eventName, proto['on'][eventName])
      });
      if (tag === 'td') {
        ele.addClass(['td-div']);
      }
      ele.append(childDOMs)
    }
  }
  return ele;
};
