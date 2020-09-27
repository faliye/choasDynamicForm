import {$createElement as h} from '../../utils';
import $ from 'jquery';
import _ from 'lodash';
import {Modal} from "../modal";
import './index.scss';
import mainEvent from "../../mainEvent";


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
  constructor({props, mode, themeConfig}) {
    this.$el = null;
    this.props = props;
    this.mode = mode;
    this.themeConfig = themeConfig;
    this.selectData = props.value;
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
                  return h('span',
                      {
                        className: ['checkbox-span-wrap'],
                        on:{
                          click:()=>{
                            const {location} = this.props;
                            const mainData = mainEvent.store.data[location[0]][location[1]].childrenProps;
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
                              type: 'checkbox',
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
