import $ from 'jquery';
import {$createElement as h} from '../../utils';
import mainEvent from "../../mainEvent";
import './index.scss';

/**
 * TitleBox
 * */
export class TitleBox {
  constructor({props}) {
    this.$el = null;
    this.contentBox = null;
    this.inputBox = null;
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
      this.contentBox.add(this.inputBox).css({
        width,
        height,
      });
    })
  }

  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.contentBox = h('div',
        {
          className: ['title-content-box'],
          on: {
            click: () => {
              this.inputBox
                  .css({
                    display: 'inline-block',
                    height: $('#td-' + location[0] + '-' + location[1]).innerHeight(),
                  })
                  .html(mainData.cnName)
                  .focus();
              this.contentBox
                  .css({
                    display: 'none',
                  });
            },
            blur: () => {
              this.inputBox
                  .css({
                    display: 'none',
                  });
              this.contentBox
                  .css({
                    display: 'inline-block',
                    height: $('#td-' + location[0] + '-' + location[1]).innerHeight(),
                  })
                  .html(mainData.cnName);
            },
          }
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
        }
    );
    this.$el = [
      this.contentBox,
      this.inputBox,
    ];
  }
}
