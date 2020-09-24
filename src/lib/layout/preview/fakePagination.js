import {$createElement as h} from '../../utils/';
import './fakePatination.scss';

const pageChars = [
    '<','1','2','3','4','5','6','…','10','>'
];

export const fakePagination = (data) => {
  return h('div',
      {
        className: ['pagination-box']
      },
      [
          ...pageChars.map(item=>{
            return h('span',
                {
                  className: ['pagination-box-btn']
                },
                [
                    item
                ]
            )
          })
      ]
  );
};
