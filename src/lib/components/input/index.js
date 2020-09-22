import {$createElement as h} from '../../utils';
import $ from 'jquery';


/**
 * Input组件
 * */

export class Input {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.style = {
      ...props.style
    };
    this.render();
  }

  render() {
    const {location} = this.props;
    this.$el = h('input',
        {
          placeholder: '单行文本输入框',
          type: 'text',
          style:{
            height: $('#td-'+location[0]+'-'+ location[1]).innerHeight(),
          },
          on: {
          }
        }
    );
  }
}
