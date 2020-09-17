import {$createElement as h} from '../../utils/$createElement'
import EventBus from "../../utils/eventBus";
import mainEvent from "../../mainEvent";


/**
 * Input组件
 * */

export class TextArea {
  constructor({props}) {
    this.$el = null;
    this.parentNodes = null;
    this.props = props;
    this.eventBus = new EventBus({...this.proto});
    this.render(this.eventBus.store);
  }

  render() {
    const {insertType} = this.props;
    this.$el = h('div',
        {
          className: ['component-box'],
        }, [
          h('textarea',
              {
                style:{
                  height: '100%',
                },
                placeholder: '多行文本框',
                value: this.props.value
              }
          )
        ]
    );
  }
}
