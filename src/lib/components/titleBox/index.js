import {$createElement as h} from '../../utils/$createElement'
import EventBus from "../../utils/eventBus";
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
    this.style = style;
    this.render();
  }

  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.contentBox = h('div',
        {
          style: {
            width: '100%',
            height: '33px',
            lineHeight: '33px',
            display: 'inline-block',
            ...this.style
          },
          on: {
            click: () => {
              this.inputBox.style.display = 'inline-block';
              this.inputBox.focus();
              this.contentBox.style.display = 'none';
            },
            blur: () => {
              this.inputBox.style.display = 'none';
              this.contentBox.style.display = 'inline-block';
              this.contentBox.innerHTML = mainData.cnName;
            },
          }
        },
        [this.props.cnName || '暂无标题']
    );
    this.inputBox = h('input',
        {
          className: ['table-edit-input-open'],
          placeholder: '请输入标题',
          style:{
            display: 'none',
            width: '100%',
            height: '100%',
          },
          on: {
            blur: (e) => {
              this.inputBox.style.display = 'none';
              this.contentBox.style.display = 'inline-block';
              this.contentBox.innerHTML = e.target.value;
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
