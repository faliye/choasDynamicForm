import {$createElement as h} from '../../utils/$createElement'
import mainEvent from "../../mainEvent";


/**
 * Input组件
 * */

export class Select {
  constructor({props, style}) {
    this.$el = null;
    this.props = props;
    this.style = style;
    this.render();
  }

  render() {
    const {location} = this.props;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.$el = h('div',
        {
          className: ['component-box'],
        }, [
          h('select',
              {
                on: {
                  change: (e) => {
                    mainData.value = e.target.value;

                  }
                },
                value: this.props.value
              },
              ['选项1','选项2','选项3'].map(item=>{
                return h('option',
                    {
                      value: item,
                    },
                    [item])
              })
          )
        ]
    );
  }
}
