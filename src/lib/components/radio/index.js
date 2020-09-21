import {$createElement as h} from '../../utils/$createElement'

/**
 * Radio组件
 * */

export class Radio {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.style = props.style;
    this.render();
  }

  render() {
    const name = 'radio-' + Math.random();
    this.$el = [
      h('span',
          {},
          [
            h('input',
                {
                  type: 'radio',
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
                  type: 'radio',
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
                  type: 'radio',
                  name,
                }
            ),
            h('span', {}, ['选项3'])
          ]
      )
    ];
  }
}
