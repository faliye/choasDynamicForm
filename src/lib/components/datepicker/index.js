import {$createElement as h} from '../../utils';
import {addZero} from "../../utils";
import mainEvent from "../../mainEvent";
import $ from 'jquery';
import _ from 'lodash';
import './index.scss';

/**
 * Datepicker组件
 * */

export class Datepicker {
  constructor({props, propsStyle, confirmHandle, themeConfig}) {
    this.$el = null;
    this.dropdownBox = null;
    this.titleBox = null;
    this.themeConfig = themeConfig;
    this.confirmHandle = confirmHandle;
    this.dayList = []; // 日期列表
    this.props = props;
    this.propsStyle = propsStyle;
    this.timer = null;
    this.render();
    const time = this.props.value.split('-');
    this.setDateValue(time[0], time[1], time[2]);
    const date =  new Date();
    this.inputValue = props.value || date.getFullYear()+ '-' + addZero(date.getMonth()+1)+ '-'+ addZero(date.getDate());
    if(this.inputValue){
      this.input.val(this.inputValue);
      this.timeBox.html(this.inputValue);
    }
    this.setDateBox();
  }

  render() {
    const {location = []} = this.props;
    let mainData;
    if (location.length) {
      mainData = _.get(mainEvent.store.data[location[0]][location[1]], 'childrenProps', {});
    }

    this.input = h('input',
        {
          className: ['datepicker-input'],
          props: {
            placeholder: '请选择日期',
            value: _.get(mainData, 'value', this.inputValue),
          },
          style: {},
          on: {
            focus: (e) => {
              this.dropdownBox = this.createDrop(style);
              const target = $(e.target);
              const {left, top} = target.offset();
              this.dropdownBox.css({
                top: top + target.height(),
              });
              if ((left + this.dropdownBox.width()) > $(document.body).width()) {
                this.dropdownBox.css({
                  right: 0,
                });
              } else {
                this.dropdownBox.css({
                  left: left,
                });
              }
            },
            blur: ()=>{
              this.timer = setTimeout(()=>{
                this.dropdownBox.remove();
              },400);
            }
          }
        }
    );
    // 时间显示框
    this.timeBox = h('span', {}, []);
    this.titleBox = h('div',
        {
          className: ['datepicker-title-box'],
        },
        [
          h('span',
              {
                on: {
                  click: (e) => {
                    this.month--;
                    if (this.month < 0) {
                      this.month = 11;
                      this.year--;
                    }
                    this.setDateValue(this.year, this.month, this.day);
                    this.timeBox.html(this.year + '-' + addZero(this.month + 1) + '-' + addZero(this.day));
                    this.setDateBox();
                  }
                }
              }
              , ['<']
          ),
          this.timeBox,
          h('span',
              {
                on: {
                  click: (e) => {
                    this.month++;
                    if (this.month > 11) {
                      this.month = 0;
                      this.year++;
                    }
                    this.setDateValue(this.year, this.month, this.day);
                    this.timeBox.html(this.year + '-' + (this.month + 1) + '-' + addZero(this.day));
                  }
                }
              },
              ['>']
          ),
        ]
    );
    let style = {
      top: '100%',
    };
    if (this.props.right) {
      style.right = 0
    }
    this.$el = [
      h('div',
          {
            className: ['date-box-wrap'],
            style: this.propsStyle,
          },
          [
            this.input,
          ]
      )
    ]
  }

  createDrop(style) {
    const {mode: themeMode} = this.themeConfig;
    const {primary, danger} = this.themeConfig.colorConfig[themeMode];
    this.dropdownBox = h('div',
        {
          className: ['datepicker-drop-box'],
          style,
          on: {
            click: () => {
              clearTimeout(this.timer);
            }
          }
        },
        [
          this.titleBox,
          h('div',
              {
                className: ['datepicker-selected-box'],
              },
              [
                h('div',
                    {
                      className: ['week-name']
                    },
                    ['日', '一', '二', '三', '四', '五', '六'].map((item, index) => {
                      return h('span',
                          {
                            className: !index || index === 6 ? ['selected-date-item', 'dark'] : ['selected-date-item']
                          }
                          ,
                          [item]
                      );
                    })
                ),
                h('div',
                    {
                      className: ['day-list-box']
                    },
                    [
                      this.createDayListItem()
                    ]
                )
              ]
          ),
          h('div',
              {
                className: ['datepicker-control-box'],
              },
              [
                h('button',
                    {
                      style: {
                        background: danger,
                      },
                      on: {
                        click: () => {
                          this.dropdownBox.remove();
                        }
                      }
                    },
                    ['取消']
                ),
                h('button',
                    {
                      style: {
                        background: primary
                      },
                      on: {
                        click: () => {
                          if (this.confirmHandle) {
                            this.inputValue = this.year + '-' + addZero(this.month + 1) + '-' + addZero(this.day);
                            this.confirmHandle(this.inputValue)
                          }
                          this.dropdownBox.remove();
                          this.input.val(this.inputValue);
                        }
                      }
                    },
                    ['确认']
                ),
              ]
          ),
        ]
    );
    $(document.body).append(this.dropdownBox);
    return this.dropdownBox;
  }

  createDayList() {
    this.dayList = [];
    const {year, month} = this;
    const preMonth = new Date(year, month, 0); // 上月
    let preMonthLastDayWeekDay = preMonth.getDay(); // 上月最后一天的星期数
    const preMonthLastDay = preMonth.getDate(); // 上月的最后一天
    let count = preMonthLastDayWeekDay;
    while (count >= 0) {
      this.dayList.push({
        value: preMonthLastDay - count,
        type: 'preMonth'
      });
      count--;
    }
    const selectedMonth = new Date(year, month + 1, 0);
    const selectedMonthDay = selectedMonth.getDate();
    count = 1;
    while (count <= selectedMonthDay) {
      this.dayList.push({
        value: count++,
        type: 'selectedMonth'
      });
    }
    let nextMonthDay = 6 * 7 - this.dayList.length;
    count = 1;
    while (count <= nextMonthDay) {
      this.dayList.push({
        value: count++,
        type: 'nextMonth'
      });
    }
    this.dayList = this.dayList.map(item => {
      return {
        value: addZero(item.value),
        type: item.type
      }
    })
  }

  setDateValue(year, month, day) {
    let date;
    if (year && month && day) {
      date = new Date(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10))
    } else {
      date = new Date();
    }
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.inputValue = (this.props.value || '').split('-').map(item => addZero(item)).join('-');
    this.timeBox.html(this.inputValue || this.year + '-' + addZero(this.month) + '-' + addZero(this.day));
  }

  setDateBox() {
    this.createDayList();
    const listDOM = this.createDayListItem();
    $('.day-list-box').html('').html(listDOM);
  }

  createDayListItem() {
    const wrap = $('<div></div>');
    this.dayList.forEach(item => {
      const OSpan = $('<span></span>');
      const className = item.type === 'preMonth' || item.type === 'nextMonth' ? ['selected-date-item', 'dark'] : ['selected-date-item']
      OSpan.addClass(className).on('click', () => {
        if (item.type === 'preMonth') {
          this.month--;
          if (this.month < 0) {
            this.month = 11;
            this.year--;
          }
        } else if (item.type === 'nextMonth') {
          this.month++;
          if (this.month > 11) {
            this.month = 0;
            this.year++;
          }
        }
        this.day = item.value;
        this.setDateValue(this.year, this.month, this.day);
        this.timeBox.html(this.year + '-' + addZero(this.month + 1) + '-' + addZero(this.day));
        this.setDateBox();
      }).html(item.value);
      wrap.append(OSpan)
    });
    return wrap;
  }
}
