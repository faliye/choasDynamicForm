import {$createElement as h} from '../../utils'
import mainEvent from "../../mainEvent";
import $ from 'jquery';
import _ from 'lodash';
import './index.scss';
import {Modal} from "../modal";


/**
 * Input组件
 * */

export class Select {
  constructor({props, mode, themeConfig}) {
    this.$el = null;
    this.props = props;
    this.mode = mode;
    this.selectData=props.value;
    this.themeConfig = themeConfig;
    this.render();
    this.updateData();
  }


  updateData() {
    if (this.mode !== 'edit') {
      return null;
    }
    const {dataListId} = this.props;
    const accessToken = sessionStorage.getItem('accessToken');
    $.get({
          url: this.props.api + `?enumTypeId=${dataListId}&pageNo=1&pageSize=100`,
          headers: {Authorization: accessToken},
          success: (data) => {
            if (data.code === 200) {
              const items = _.get(data, 'data.items', []);
              if (!_.isEmpty(items)) {
                this.$el.html('').append(items.map(item => {
                  const targetValue = item['pkId'];
                  return h('option',
                      {
                        value: targetValue,
                        selected: this.selectData.includes(targetValue)
                      },
                      [item['name']]
                  );
                }))
              }
            }
          },
          error: () => {
            new Modal('数据请求错误!', '请稍后再试!', this.themeConfig).show()
          }
        },
    )
  }

  render() {
    const {location} = this.props;
    const {sizeConfig: {tdInitHeight}} = this.themeConfig;
    const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
    this.$el = h('select',
        {
          className: ['select-component-box'],
          style: {
            height: tdInitHeight + 'px',
            width: '100%'
          },
          on: {
            change: (e) => {
              const {location} = this.props;
              const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
              mainData.value = mainData.value || [];
              this.selectData= [e.target.value];
              mainData.value= this.selectData;
            }
          },
        },
        ['选项1', '选项2', '选项3'].map(item => {
          return h('option',
              {
                value: item,
              },
              [item])
        })
    );
  }
}
