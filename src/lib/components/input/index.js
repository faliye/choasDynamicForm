import {$createElement as h} from '../../utils';
import $ from 'jquery';
import './index.scss'
import mainEvent from "../../mainEvent";


/**
 * Input组件
 * */

export class Input {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
    this.$el.on('focus',()=>{
      this.$el.addClass('table-selection-active');
    });
  }
  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.$el = h('input',
        {
          placeholder: '单行文本输入框',
          type: 'text',
          className:['component-input-box'],
          value: mainData.value,
          on: {
            input:(e)=>{
              mainData.value = e.target.value;
            },
          }
        }
    );
  }
}
