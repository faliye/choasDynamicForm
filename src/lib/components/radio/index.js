import {$createElement as h} from '../../utils/$createElement'

/**
 * Radio组件
 * */

export class Radio {
  constructor({props, style}) {
    this.$el = null;
    this.props = props;
    this.style = style;
    this.render();
  }

  render() {
    const name = 'radio-' + Math.random();
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
        ]
    );
  }
}
