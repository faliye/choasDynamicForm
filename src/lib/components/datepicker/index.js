import {$createElement as h} from '../../utils/$createElement'
import {addZero} from "../../utils";
import './index.scss'

/**
 * Datepicker组件
 * */

export class Datepicker {
  constructor({props, confirmHandle}) {
    this.$el = null;
    this.dropdownBox = null;
    this.titleBox = null;
    this.selectedBox = null;
    this.confirmBtn = null;
    this.confirmHandle = confirmHandle;
    this.cancelBtn = null;
    this.dayList = []; // 日期列表
    this.props = props;

    this.render();
    const time = this.props.value.split('-');
    this.setDateValue(time[0], time[1], time[2]);
    this.input.value = this.inputValue;
    this.setDateBox();
  }

  render() {
    this.input = h('input',
        {
          className: ['datepicker-input'],
          props: {
            placeholder: '请选择日期',
            value: this.inputValue,
          },
          style: {},
          on: {
            focus: () => {
              this.dropdownBox.style.display = 'block';
            },
            blur: () => {
              if (!this.confirmHandle) {
                this.dropdownBox.style.display = 'none';
              }
            },
          }
        }
    );
    // 时间显示框
    this.timeBox = h('span', {}, [this.inputValue]);
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
                    this.timeBox.innerHTML = this.year + '-' + addZero(this.month + 1) + '-' + addZero(this.day);
                    this.setDateBox();
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
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
                    this.timeBox.innerHTML = this.year + '-' + (this.month + 1) + '-' + addZero(this.day);
                    this.setDateBox();
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                  }
                }
              },
              ['>']
          ),
        ]
    );
    this.dayBox = h('div',
        {
          className: ['day-list-box']
        },
        [
          this.createDayListItem()
        ]
    );
    this.selectedBox = h('div',
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
          this.dayBox
        ]
    );
    this.confirmBtn = h('button',
        {
          on: {
            click: (e) => {
              if (this.confirmHandle) {
                this.input.value = this.year + '-' + addZero(this.month + 1) + '-' + addZero(this.day);
                this.confirmHandle(this.input.value)
              }
              this.dropdownBox.style.display = 'none';
              e.stopPropagation();
              e.preventDefault();
              return false;
            },
            mousedown: (e)=>{
              e.stopPropagation();
              e.preventDefault();
              return false;
            }
          }
        },
        ['确认']
    );
    this.cancelBtn = h('button',
        {
          on: {
            click: (e) => {
              this.dropdownBox.style.display = 'none';
              e.stopPropagation();
              e.preventDefault();
              return false;
            },
            mousedown: (e)=>{
              e.stopPropagation();
              e.preventDefault();
              return false;
            }
          }
        },
        ['取消']
    );
    let style={
      top: '100%',
    };
    if(this.props.right){
      style.right = 0
    }
    this.dropdownBox = h('div',
        {
          className: ['datepicker-drop-box'],
          style
        },
        [
          this.titleBox,
          this.selectedBox,
          h('div',
              {
                className: ['datepicker-control-box'],
              },
              [
                this.cancelBtn,
                this.confirmBtn,
              ]
          ),
        ]
    );

    this.$el = h('div',
        {
          className: ['component-box', 'datepicker-box'],
        }, [
          this.input,
          this.dropdownBox,
        ]);
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
    this.inputValue =  (this.props.value || '').split('-').map(item=>addZero(item)).join('-');
    this.timeBox.innerHTML = this.inputValue || this.year + '-' + addZero(this.month) + '-' + addZero(this.day);
  }

  setDateBox() {
    this.createDayList();
    const listDOM = this.createDayListItem();
    this.dayBox.innerHTML = '';
    this.dayBox.appendChild(listDOM);
  }

  createDayListItem() {
    return h('div',
        {},
        this.dayList.map(item => {
          return h('span',
              {
                className: item.type === 'preMonth' || item.type === 'nextMonth' ? ['selected-date-item', 'dark'] : ['selected-date-item'],
                on: {
                  mousedown: (e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                  },
                  click: (e) => {
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
                    this.timeBox.innerHTML = this.year + '-' + addZero(this.month + 1) + '-' + addZero(this.day);
                    this.setDateBox();
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                  },
                }
              },
              [item.value]
          );
        })
    )
  }
}
