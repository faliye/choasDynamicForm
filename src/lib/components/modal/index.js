import {$createElement as h} from '../../utils/$createElement';
import {judgeDataType} from "../../utils";
import './index.scss';

export class Modal {
  constructor(title = '', content = '', confirmHandle, cancelHandle) {
    this.modal = null;
    this.title = title;
    this.content = content;
    this.confirmHandle = confirmHandle;
    this.cancelHandle = cancelHandle;
    this.render();
  }
  show(){
    this.modal.style.display = 'block';
  }

  render() {
    this.modal = h('div',
        {
          className: ['modal-wrap']
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
                      on: {
                        click: () => {
                          if(judgeDataType(this.confirmHandle) === 'function') {
                            this.confirmHandle();
                          }
                          setTimeout(()=>{
                            this.modal.remove();
                          });
                        },
                      },
                    },
                    ['确定']
                ),
                h('button',
                    {
                      on: {
                        click: () => {
                          if(judgeDataType(this.cancelHandle) === 'function'){
                            this.cancelHandle();
                          }
                          setTimeout(()=> {
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
    document.body.appendChild(this.modal)
  }
}
