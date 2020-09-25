import {$createElement as h} from '../../utils';
import $ from 'jquery';
import './inde.scss';
import mainEvent from "../../mainEvent";

/**
 * Input组件
 * */

export class TextArea {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
    this.$el.on('focus',()=>{
      this.$el.addClass('table-selection-active')
    })
  }

  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    console.log( mainData)
    this.$el = h('textarea',
        {
          className: ['component-textarea-box'],
          placeholder: '多行文本框',
          value: mainData.value,
          on:{
            input:(e)=>{
              console.log(mainData.value)
              mainData.value = e.target.value;
              console.log(mainEvent.store.data)
              mainEvent.emit('dataChange', mainEvent.store.data);
            }
          }
        },
    )
  }
}
