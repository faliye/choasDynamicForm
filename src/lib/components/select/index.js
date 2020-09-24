import {$createElement as h} from '../../utils'
import mainEvent from "../../mainEvent";
import $ from 'jquery';
import './index.scss';


/**
 * Input组件
 * */

export class Select {
  constructor({props, themeConfig}) {
    this.$el = null;
    this.props = props;
    this.themeConfig = themeConfig;
    this.render();
  }

  render() {
    const {location} = this.props;
    const {sizeConfig: {tdInitHeight}} = this.themeConfig;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.$el = [
      h('select',
          {
            className: ['select-component-box'],
            style: {
              height: tdInitHeight + 'px',
              width: '100%'
            },
            on: {
              change: (e) => {
                mainData.value = e.target.value;
              }
            },
            value: this.props.value
          },
          ['选项1', '选项2', '选项3'].map(item => {
            return h('option',
                {
                  value: item,
                },
                [item])
          })
      )
    ];
  }
}
