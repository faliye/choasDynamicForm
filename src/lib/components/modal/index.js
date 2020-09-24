import {$createElement as h} from '../../utils';
import $ from 'jquery'
import './index.scss';

export class Modal {
  constructor(title = '', content = '', themeConfig, confirmHandle, cancelHandle) {
    this.modal = null;
    this.title = title;
    this.content = content;
    this.themeConfig = themeConfig;
    this.confirmHandle = confirmHandle;
    this.cancelHandle = cancelHandle;
    this.render();
  }

  show() {
    this.modal.css({
      display: 'block',
    });
  }

  render() {
    const {mode : themeMode} = this.themeConfig;
    const {primary, danger, borderColor,shadowColor} = this.themeConfig.colorConfig[themeMode];
    this.modal = h('div',
        {
          className: ['modal-wrap'],
          style:{
            border: `1px solid ${borderColor}`,
            boxShadow: `1px  1px 5px ${shadowColor}`
          },
        },
        [
          h('div',
              {
                className: ['modal-title-box']
              },
              [
                h('div',
                    {},
                    [this.title]
                ),
                h('div',
                    {
                      on: {
                        click: () => {
                          this.modal.remove()
                        }
                      }
                    },
                    ['x']
                ),
              ],
          ),
          h('div',
              {
                className: ['modal-content-box']
              },
              [
                this.content
              ]
          ),
          h('div',
              {
                className: ['modal-controller-box']
              },
              [
                h('button',
                    {
                      style:{
                        background: primary,
                      },
                      on: {
                        click: () => {
                          if (_.isFunction(this.confirmHandle)) {
                            this.confirmHandle();
                          }
                          setTimeout(() => {
                            this.modal.remove();
                          });
                        },
                      },
                    },
                    ['确定']
                ),
                h('button',
                    {
                      style:{
                        background: danger
                      },
                      on: {
                        click: () => {
                          if (_.isFunction(this.cancelHandle)) {
                            this.cancelHandle();
                          }
                          setTimeout(() => {
                            this.modal.remove();
                          });
                        }
                      },
                    },
                    ['取消']
                ),
              ]
          )
        ]
    );
    $(document.body).append(this.modal);
  }
}
