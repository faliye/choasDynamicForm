import {$createElement as h} from '../../utils';
import './index.scss';


const noticeArr = [
  '选项1',
  '比较长的一个选项2',
  '选项3',
  '选项4',
];

/**
 * Input组件
 * */

export class Checkbox {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.render();
  }

  render() {
    this.$el = h('div',
        {
          className: ['checkbox-component-box'],
        },
        noticeArr.map(item => {
          return h('span',
              {
                className: ['checkbox-span-wrap'],
              },
              [
                h('input',
                    {
                      type: 'checkbox',
                      name,
                    }
                ),
                h('span',
                    {},
                    [item])
              ]
          )
        })
    );
  }
}
