import {$createElement as h} from '../../utils/$createElement'

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
    this.$el =  [
      h('span',
          {},
          [
            h('input',
                {
                  type: 'checkbox',
                  name,
                }
            ),
            h('span', {}, ['选项1'])
          ]
      ),
      h('span',
          {},
          [
            h('input',
                {
                  type: 'checkbox',
                  name,
                }
            ),
            h('span', {}, ['选项2'])
          ]
      ),
      h('span',
          {},
          [
            h('input',
                {
                  type: 'checkbox',
                  name,
                }
            ),
            h('span', {}, ['选项3'])
          ]
      )
    ];
  }
}
