import {$createElement as h} from '../../utils';
import './index.scss';

const noticeArr = [
  '选项1',
  '比较长的一个选项2',
  '选项3',
  '选项4',
];

/**
 * Radio组件
 * */

export class Radio {
  constructor({props, mode, themeConfig}) {
    this.$el = null;
    this.props = props;
    this.themeConfig = themeConfig;
    this.mode = mode;
    this.render();
    this.updateData()
  }

  updateData() {
    if (this.mode !== 'edit') {
      return null;
    }
    const {dataListId} = this.props;
    console.log(dataListId);
  }

  render() {
    const name = 'radio-' + Math.random();
    const {sizeConfig: {tdInitHeight}} = this.themeConfig;
    this.$el = h('div',
        {
          className: ['radio-component-box']
        },
        noticeArr.map(item => {
      return h('span',
          {
            className: ['radio-span-wrap'],
            style: {
              height: (tdInitHeight/2).toFixed() + 'px',
              lineHeight: (tdInitHeight/2).toFixed() + 'px',
            },
          },
          [
            h('input',
                {
                  type: 'radio',
                  name,
                }
            ),
            h('span',
                {},
                [item]
            ),
          ]
      )
    })
    )
  }
}
