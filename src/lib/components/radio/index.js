import $ from 'jquery';
import _ from 'lodash';
import {Modal} from "../modal";
import mainEvent from "../../mainEvent";
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
    this.selectData=props.value;
    this.mode = mode;
    this.render();
    this.$el.on('focus',()=>{
      this.$el.addClass('table-selection-active')
    });
    this.updateData()
  }

  updateData() {
    if (this.mode !== 'edit') {
      return null;
    }
    const {dataListId} = this.props;
    const name = 'radio-' + Math.random();
    const {sizeConfig: {tdInitHeight}} = this.themeConfig;
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
                  return h('span',
                      {
                        className: ['radio-span-wrap'],
                        style: {
                          height: (tdInitHeight/2).toFixed() + 'px',
                          lineHeight: (tdInitHeight/2).toFixed() + 'px',
                        },
                        on:{
                          click:()=>{
                            const {location} = this.props;
                            const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
                            mainData.value = mainData.value || [];
                            if(this.selectData.includes(targetValue)){
                              this.selectData =  this.selectData.filter(item=>item!== targetValue);
                            }else{
                              this.selectData.push(targetValue);
                            }
                            mainData.value = this.selectData;
                          }
                        }
                      },
                      [
                        h('input',
                            {
                              type: 'radio',
                              name,
                              value: targetValue,
                              checked: this.selectData.includes(targetValue)
                            }
                        ),
                        h('span',
                            {},
                            [item['name']])
                      ]
                  )
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
