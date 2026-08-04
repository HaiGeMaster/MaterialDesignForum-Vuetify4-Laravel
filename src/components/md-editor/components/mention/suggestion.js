
import {
  GetDatas,
  GetUserToken
} from '@/api/global.js'


import { computePosition, flip, shift } from '@floating-ui/dom'
import { posToDOMRect, VueRenderer } from '@tiptap/vue-3'
import UserMentionList from './users-mention-list.vue'
import TopicMentionList from './topics-mention-list.vue'
const updatePosition = (editor, element) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

const SuggestionGetData = async (data_name,order, search_keywords, search_field) => {
  try {
    var token = GetUserToken()
    const response = await GetDatas(data_name, {
      order: order,
      page: 1,
      type: '',
      question_id: '',
      commentable_id: '',
      commentable_type: '',
      replyable_comment_id: '',
      user_token: token != '' ? token : '',
      search_keywords: search_keywords,
      search_field: search_field,
    })
    if (response.data.is_get == true) {
      return response.data.data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

const SuggestionGetUsers = async (search_keywords) => {
  const users = await SuggestionGetData('users','+user_id', search_keywords, ['username'])
  // return users;
  //只返回前5个
  return users.slice(0, 5);
}


const SuggestionGetTopics = async (search_keywords) => {
  const topics = await SuggestionGetData('topics','+topic_id', search_keywords, ['name'])
  // return topics;
  //只返回前5个
  return topics.slice(0, 5);
}


export default [
  {
    char: '@',
    items: async (query) => {

      // console.log(query)//注意query里有editor和query

      // if (query.query == '') {
      //   return []
      // }

      return SuggestionGetUsers(query.query).then(users => {
        return users;
      })

    },

    render: () => {
      let component

      return {
        onStart: props => {
          component = new VueRenderer(UserMentionList, {
            // using vue 2:
            // parent: this,
            // propsData: props,

            // using vue 3:
            props,
            editor: props.editor,
          })

          if (!props.clientRect) {
            return
          }

          component.element.style.position = 'absolute'

          // document.body.appendChild(component.element)
          document.querySelector('#app').appendChild(component.element)

          updatePosition(props.editor, component.element)
        },

        onUpdate(props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          updatePosition(props.editor, component.element)
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            component.destroy()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit() {
          component.element.remove()
          component.destroy()
        },
      }
    },
  },
  {
    char: '#',
    items: async (query) => {

      // console.log(query)//注意query里有editor和query

      // if (query.query == '') {
      //   return []
      // }

      return SuggestionGetTopics(query.query).then(topics => {
        return topics;
      })

    },

    render: () => {
      let component

      return {
        onStart: props => {
          component = new VueRenderer(TopicMentionList, {
            // using vue 2:
            // parent: this,
            // propsData: props,

            // using vue 3:
            props,
            editor: props.editor,
          })

          if (!props.clientRect) {
            return
          }

          component.element.style.position = 'absolute'

          // document.body.appendChild(component.element)
          document.querySelector('#app').appendChild(component.element)

          updatePosition(props.editor, component.element)
        },

        onUpdate(props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          updatePosition(props.editor, component.element)
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            component.destroy()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit() {
          component.element.remove()
          component.destroy()
        },
      }
    },
  },
]

// export default {
//   // items: ({ query }) => {
//   items: async (query) => {

//     // console.log(query)//注意query里有editor和query

//     if(query.query == ''){
//       return []
//     }

//     return SuggestionGetUsers(query.query).then(users => {
//       return users;
//     })

//   },

//   render: () => {
//     let component

//     return {
//       onStart: props => {
//         component = new VueRenderer(MentionList, {
//           // using vue 2:
//           // parent: this,
//           // propsData: props,
//           // using vue 3:
//           props,
//           editor: props.editor,
//         })

//         if (!props.clientRect) {
//           return
//         }

//         component.element.style.position = 'absolute'

//         document.body.appendChild(component.element)

//         updatePosition(props.editor, component.element)
//       },

//       onUpdate(props) {
//         component.updateProps(props)

//         if (!props.clientRect) {
//           return
//         }

//         updatePosition(props.editor, component.element)
//       },

//       onKeyDown(props) {
//         if (props.event.key === 'Escape') {
//           component.destroy()

//           return true
//         }

//         return component.ref?.onKeyDown(props)
//       },

//       onExit() {
//         component.element.remove()
//         component.destroy()
//       },
//     }
//   },
// }