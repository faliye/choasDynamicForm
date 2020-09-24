import {$createElement as h} from '../../utils';
import $ from 'jquery';
import './inde.scss';

/**
 * Input组件
 * */

export class TextArea {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
  }

  render() {
    this.$el = h('textarea',
        {
          className: ['component-textarea-box'],
          placeholder: '多行文本框',
          value: this.props.value,
        }
    )
  }
}
