import {$createElement as h} from '../../utils'
import $ from 'jquery'

/**
 * Input组件
 * */

export class TextArea {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
    this.setStyle();
  }


  setStyle() {
    setTimeout(() => {
      const {location} = this.props;
      const ele = $(`#td-${location[0]}-${location[1]}`);
      const width = ele.width();
      const height = ele.height();
      this.$el.css({
        width,
        height,
      });
    })
  }

  render() {
    this.$el = h('textarea',
        {
          placeholder: '多行文本框',
          value: this.props.value
        }
    )
  }
}
