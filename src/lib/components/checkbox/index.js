import {$createElement as h} from '../../utils/$createElement'

/**
 * Input组件
 * */

export class Checkbox {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.style = {
      ...props.style,
    };
    this.render();
  }

  render() {
    this.$el = h('div',
        {
          className: ['component-box', 'radio-box'],
        },

        [
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
        ]
    )
  }
}
