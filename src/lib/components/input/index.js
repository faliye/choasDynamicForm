import {$createElement as h} from '../../utils/$createElement'
import EventBus from "../../utils/eventBus";
import mainEvent from "../../mainEvent";


/**
 * Input组件
 * */

export class Input {
  constructor({props, style}) {
    this.$el = null;
    this.props = props;
    this.style = style;
    this.render();
  }

  render() {
    this.$el = h('div',
        {
          className: ['component-box'],
        }, [
          h('input',
              {
                placeholder: '单行文本输入框',
                on: {
                }
              }
          )
        ]
    );
  }
}
