import $ from 'jquery'
import {$createElement as h} from '../../utils/$createElement'
import mainEvent from "../../mainEvent";

/**
 * TitleBox
 * */
export class TitleBox {
  constructor({props, style}) {
    this.$el = null;
    this.contentBox = null;
    this.inputBox = null;
    this.props = props;
    this.style = {
      flex: 1,
      maxHeight: '35px',
      width: '100%',
      wordBreak: 'break-all',
      whiteSpace: 'break-spaces',
      alignItems: 'center',
      textAlign: 'center',
      ...props.style,
    };
    this.render();
  }

  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.contentBox = h('div',
        {
          style:this.style,
          on: {
            click: () => {
              $(this.inputBox).css({
                display: 'inline-block',
              }).focus();
              $(this.contentBox).css({
                display: 'none',
              });
            },
            blur: () => {
              $(this.inputBox).css({
                display: 'none',
              }).focus();
              $(this.contentBox).css({
                display: 'inline-block',
              }).html(mainData.cnName);
            },
          }
        },
        [this.props.cnName || '暂无标题']
    );
    this.inputBox = h('input',
        {
          className: ['table-edit-input-open'],
          placeholder: '请输入标题',
          style: {
            display: 'none',
            width: '100%',
            height: '35px',
            border: 'none'
          },
          on: {
            blur: (e) => {
              $(this.inputBox).css({
                display: 'none',
              });
              $(this.contentBox).css({
                display: 'block',
              }).html(e.target.value);
              // 主存 修改value值 但不刷新页面
              mainData.cnName = e.target.value;
              mainEvent.emit('dataChange', mainEvent.store.data);
            },
            input: (e) => {
              // 主存 修改value值 但不刷新页面
              mainData.cnName = e.target.value;
            }
          },
          value: this.props.cnName
        }
    );
    this.$el = h('div',
        {
          className: ['component-box'],
        }, [
          this.contentBox,
          this.inputBox,
        ]
    );
  }
}
