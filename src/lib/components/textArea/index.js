import {$createElement as h} from '../../utils/$createElement'
import EventBus from "../../utils/eventBus";
import mainEvent from "../../mainEvent";


/**
 * Input组件
 * */

export class TextArea {
  constructor({props, style}) {
    this.$el = null;
    this.parentNodes = null;
    this.props = props;
    this.style = style;
    this.eventBus = new EventBus({...this.proto});
    this.render(this.eventBus.store);
  }

  render() {
    const {style} =  this.props;
    this.$el = h('div',
        {
          className: ['component-box'],
        }, [
          h('textarea',
              {
                style,
                placeholder: '多行文本框',
                on: {
                },
                value: this.props.value
              }
          )
        ]
    );
  }
}
