import $ from 'jquery';
import {$createElement as h} from '../../utils';
import mainEvent from "../../mainEvent";
import './index.scss';

/**
 * TitleBox
 * */
export class TitleBox {
  constructor({props, mode}) {
    this.$el = null;
    this.contentBox = null;
    this.inputBox = null;
    this.props = props;
    this.mode = mode;
    this.render();
  }

  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.contentBox = h('div',
        {
          className: ['title-content-box'],
          on: this.mode === 'design' ? {
            click: () => {
              this.inputBox
                  .css({
                    display: 'block',
                  })
                  .html(mainData.cnName)
                  .focus().addClass('table-selection-active');
              this.contentBox
                  .css({
                    width: 0,
                    height: 0
                  });
            },
            blur: () => {
              this.inputBox.css({display: 'none',});
              this.contentBox
                  .css({
                    display: 'block',
                  })
                  .html(mainData.cnName);
            },
          } : {}
        },
        [
          h('span',
              {},
              [this.props.cnName || '暂无标题']
          ),
        ]
    );
    this.inputBox = h('textarea',
        {
          className: ['title-content-textarea'],
          placeholder: '请输入标题',
          on: this.mode === 'design' ? {
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
              console.log(e.target.value)
              mainData.cnName = e.target.value;
            }
          } : {},
        }
    );
    this.$el = [
      this.contentBox,
      this.inputBox,
    ];
  }
}
