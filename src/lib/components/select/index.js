import {$createElement as h} from '../../utils/$createElement'
import mainEvent from "../../mainEvent";
import $ from 'jquery';


/**
 * Input组件
 * */

export class Select {
  constructor({props}) {
    this.$el = null;
    this.props = props;
    this.style = {
      ...props.style,
    };
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
                style:{
                  height: $('#td-'+location[0]+'-'+ location[1]).innerHeight() || 35 +'px',
                },
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
