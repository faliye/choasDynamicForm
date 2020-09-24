import {$createElement as h} from '../../utils';
import $ from 'jquery';
import './index.scss'


/**
 * Input组件
 * */

export class Input {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
  }
  render() {
    this.$el = h('input',
        {
          placeholder: '单行文本输入框',
          type: 'text',
          className:['component-input-box'],
          on: {
          }
        }
    );
  }
}
