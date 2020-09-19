import {$createElement as h} from '../../utils/$createElement'
import $ from 'jquery'

/**
 * Input组件
 * */

export class TextArea {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
    this.setInnerEleSize();
  }

  setInnerEleSize(){
    const {location} = this.props;
    setTimeout(()=>{
      $(this.$el).children('textarea').css({
        height: $('#td-' + location[0] + '-' + location[1]).innerHeight()
      })
    })
  }

  render() {
    this.$el = h('div',
        {
          className: ['component-box'],
        }, [
          h('textarea',
              {
                style:{
                  height: '0',
                },
                placeholder: '多行文本框',
                value: this.props.value
              }
          )
        ]
    );
  }
}
