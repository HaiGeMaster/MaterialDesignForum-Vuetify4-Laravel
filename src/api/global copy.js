import axios from 'axios';
import cookies from 'vue-cookies';
import { getCurrentWindow } from "@tauri-apps/api/window";
// import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

// const MainCheckServer = 'aHR0cDovL2xvY2FsaG9zdDo4My9hcGkvYw==';//http://localhost:83/api/c
const MainCheckServer = 'aHR0cHM6Ly9tZGYueGJlZHJvY2suY29tL2FwaS9j';//https://demo.xbedrock.com/api/c

// web 模式
const Is_Tauri = false;//true;//
const Is_Electron = false;//true;//
const Is_MobileApp = false;//true;//

// console.log('当前环境', process.env.NODE_ENV);
//如果是开发环境
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'http://localhost:83';
  axios.defaults.baseURL = 'http://localhost:82';
  // axios.defaults.baseURL = 'https://laravelwww.xbedrock.com';
  // axios.defaults.baseURL = 'http://192.168.124.50:83';
  // axios.defaults.baseURL = 'https://www.xbedrock.com';
}
//如果是生产环境
if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = 'https://www.xbedrock.com';
  //如果是tauri、electron、mobileapp
  if (Is_Tauri || Is_Electron || Is_MobileApp) {
    axios.defaults.baseURL = 'https://www.xbedrock.com';
  }
}
// console.log('axios.defaults.baseURL', axios.defaults.baseURL);
// console.log('window.location.href', window.location.href);

// async function TauriNotification() {
//   let permissionGranted = await isPermissionGranted();
//   if (!permissionGranted) {
//     const permission = await requestPermission();
//     permissionGranted = permission === 'granted';
//   }
//   if (permissionGranted) {
//     sendNotification('Tauri is awesome!');
//     sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
//   }
// }

// TauriNotification();

// const PostError = (response) => {
//   //如果response.data包含error字样或者Warning字样，则弹出错误信息

//   if (response.data.error) {
//     console.error(response.data.error);
//     //将response.data转换为字符串
//     const data = JSON.stringify(response.data);
//     alert(data);
//   }
// }

// //axios拦截检查请求是否有错误
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   PostError(response);
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  // 自动附加 Authorization Bearer token
  const token = GetUserToken();
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

/***
 * @description 添加ClarityScript
 */
export function AddClarityScript() {
  //如果域名包含localhost
  if (window.location.href.indexOf('localhost') !== -1) {
    return;
  }
  var a = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rgskmt7i7n");`

  // var b = `
  //   (function(c,l,a,r,i,t,y){
  //       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  //       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  //       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  //   })(window, document, "clarity", "script", "tmclixk8ed");
  // `

  //将a添加到head中
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  // script.innerHTML = a;
  //如果域名是xbedrock.com
  if (window.location.href.indexOf('xbedrock.com') !== -1) {
    script.innerHTML = a;
  } else {//否则添加b
    script.innerHTML = a;//暂时使用a
    // script.innerHTML = b;
  }
  head.appendChild(script);
}
/***
 * @description 添加域名活动记录
 * @param {String} domain_name_base64 域名
 * @returns {v:bool,t:time} v返回假则域名已经被封禁，不允许使用。t返回续费到期时间
 */
export async function AddActivity({
  domain_name_base64
}) {
  //将MainCheckServer使用base64解码
  const m = atob(MainCheckServer)
  const response = await axios.post(m + '/aa/' + domain_name_base64);
  return response;
}
/***
 * @description 续费域名
 * @param {String} domain_name_base64 域名
 * @param {String} renewal_key_base64 续费序列号
 * @param {String} renewal_email_base64 续费者邮箱
 * @returns {v:bool,t:time} v返回假则续费失败，t返回续费到期时间
 */
export async function RenewalDomain({
  domain_name_base64,
  renewal_key_base64,
  renewal_email_base64,
}) {
  //将MainCheckServer使用base64解码
  const m = atob(MainCheckServer)
  const response = await axios.post(m + '/rd/' + domain_name_base64 + '/' + renewal_key_base64, {
    renewal_email_base64
  });
  return response;
}

//如果域名==www.xbedrock.com
// if (window.location.href.indexOf('www.xbedrock.com') !== -1) {
//   AddClarityScript();
// }

//以上内容不可公开使用
//以上内容不可公开使用
//以上内容不可公开使用
//以上内容不可公开使用
//以上内容不可公开使用


/**
 * @typedef {Object} AnswerModel 回答
 * @property {number} answer_id 回答ID
 * @property {number} question_id 问题ID
 * @property {number} user_id 用户ID
 * @property {string} content_markdown 回答内容Markdown
 * @property {string} content_rendered 回答内容渲染
 * @property {number} comment_count 评论数量
 * @property {number} vote_count 投票数量
 * @property {number} vote_up_count 赞成票数量
 * @property {number} vote_down_count 反对票数量
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} ArticleModel 文章
 * @property {number} article_id 文章ID
 * @property {number} user_id 用户ID
 * @property {string} title 标题
 * @property {string} content_markdown 内容Markdown
 * @property {string} content_rendered 内容渲染
 * @property {number} comment_count 评论数量
 * @property {number} follower_count 关注者数量
 * @property {number} vote_count 投票数量
 * @property {number} vote_up_count 赞成票数量
 * @property {number} vote_down_count 反对票数量
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} CacheModel 缓存
 * @property {string} name 缓存名称
 * @property {string} value 缓存值
 * @property {number} create_time 创建时间
 * @property {number} life_time 缓存时间
 */
/**
 * @typedef {Object} ChatGroupModel 聊天组
 * @property {number} chat_group_id 聊天组ID
 * @property {string} chat_group_name 聊天组名称
 * @property {string} chat_group_avatar 聊天组头像
 * @property {number} chat_group_user_count 聊天组用户数量
 * @property {string} chat_group_info 聊天组信息
 * @property {number} chat_group_owner_user_id 聊天组所有者用户ID
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} ChatGroupAbleModel 聊天组关联
 * @property {number} chat_groupable_id 聊天组关联ID
 * @property {number} user_id 用户ID
 * @property {number} chat_group_id 聊天组ID
 * @property {number} create_time 创建时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} CommentModel 评论
 * @property {number} comment_id 评论ID
 * @property {number} commentable_id 评论关联ID
 * @property {string} commentable_type 评论关联类型 用户评论类型：article-文章、answer-答案
 * @property {number} user_id 用户ID
 * @property {string} content 评论内容
 * @property {number} reply_count 评论回复数量
 * @property {number} vote_count 评论投票数量
 * @property {number} vote_up_count 评论赞成票数量
 * @property {number} vote_down_count 评论反对票数量
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} FollowModel 关注
 * @property {number} follow_id 关注ID
 * @property {number} user_id 用户ID
 * @property {string} followable_type 关注关联类型 用户关注类型：user-用户、topic-话题、question-问题、article-文章
 * @property {number} followable_id 关注关联ID
 * @property {number} create_time 创建时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} ImageModel 图片
 * @property {string} key 图片ID
 * @property {string} filename 文件名
 * @property {number} width 宽度
 * @property {number} height 高度
 * @property {number} create_time 创建时间
 * @property {string} item_type 项目类型
 * @property {number} item_id 项目ID
 * @property {number} user_id 用户ID
 */
/**
 * @typedef {Object} InboxModel 私信
 * @property {number} inbox_id 私信ID
 * @property {number} sender_id 发送者ID
 * @property {string} sender_type 发送者类型
 * @property {number} receiver_id 接收者ID
 * @property {string} content_markdown 私信内容Markdown
 * @property {string} content_rendered 私信内容渲染
 * @property {number} create_time 创建时间
 * @property {number} read_time 读取时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} NotificationModel 通知
 * @property {number} notification_id 通知ID
 * @property {number} receiver_id 接收者ID
 * @property {number} sender_id 发送者ID
 * @property {string} type 消息类型
 * @property {string} content_markdown 内容Markdown
 * @property {string} content_rendered 内容渲染
 * @property {number} article_id 文章ID
 * @property {number} question_id 提问ID
 * @property {number} answer_id 回答ID
 * @property {number} comment_id 评论ID
 * @property {number} reply_id 回复ID
 * @property {number} reply_to_reply_id 回复回复ID
 * @property {number} create_time 创建时间
 * @property {number} read_time 阅读时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} OptionModel 配置项
 * @property {string} name 配置项名称
 * @property {string} value 配置项值
 */
/**
 * @typedef {Object} QuestionModel 问题
 * @property {number} question_id 问题ID
 * @property {number} user_id 用户ID
 * @property {string} title 标题
 * @property {string} content_markdown 内容Markdown
 * @property {string} content_rendered 内容渲染
 * @property {number} comment_count 评论数
 * @property {number} answer_count 回答数
 * @property {number} follower_count 关注数
 * @property {number} vote_count 投票数
 * @property {number} vote_up_count 赞成投票数
 * @property {number} vote_down_count 反对投票数
 * @property {number} last_answer_time 最后回答时间
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} ReplyModel 回复
 * @property {number} reply_id 回复ID
 * @property {number} replyable_id 回复对象ID
 * @property {string} replyable_type 回复对象类型 用户回复类型：comment-评论、reply-回复
 * @property {number} replyable_user_id 回复对象用户ID
 * @property {number} replyable_comment_id 回复对象评论ID
 * @property {number} user_id 用户ID
 * @property {string} content 内容
 * @property {number} reply_count 回复数量
 * @property {number} vote_count 投票数量
 * @property {number} vote_up_count 赞成投票数量
 * @property {number} vote_down_count 反对投票数量
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} ReportModel 举报
 * @property {number} report_id 举报ID
 * @property {number} reportable_id 举报对象ID
 * @property {string} reportable_type 举报对象类型 用户举报类型：user-用户、topic-话题、question-问题、article-文章、answer-答案、comment-评论、reply-回复
 * @property {number} user_id 用户ID
 * @property {string} reason 举报理由
 * @property {number} report_handle_state 举报处理状态
 * @property {number} create_time 创建时间
 */
/**
 * @typedef {Object} TokenModel 令牌
 * @property {string} token 令牌
 * @property {number} user_id 用户ID
 * @property {string} device 设备
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} expire_time 过期时间
 */
/**
 * @typedef {Object} TopicModel 话题
 * @property {number} topic_id 话题ID
 * @property {number} user_id 用户ID
 * @property {string} name 话题名称
 * @property {object} cover 话题封面
 * @property {string} description 话题描述
 * @property {number} article_count 文章数量
 * @property {number} question_count 问题数量
 * @property {number} follower_count 关注者数量
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 */
/**
 * @typedef {Object} TopicAbleModel 话题关联
 * @property {number} topic_id 话题ID
 * @property {number} topicable_id 话题关联ID
 * @property {string} topicable_type 话题关联类型 用户话题关联类型：article-文章、question-问题
 * @property {number} create_time 创建时间
 */
/**
 * @typedef {Object} UserModel 用户
 * @property {number} user_id 用户ID
 * @property {number} user_group_id 用户组ID
 * @property {string} username 用户名
 * @property {string} email 邮箱
 * @property {object} avatar 头像
 * @property {object} cover 封面
 * @property {string} password 密码
 * @property {string} create_ip 创建IP
 * @property {string} create_location 创建位置
 * @property {number} last_login_time 最后登录时间
 * @property {string} last_login_ip 最后登录IP
 * @property {string} last_login_location 最后登录位置
 * @property {number} follower_count 粉丝数
 * @property {number} followee_count 关注数
 * @property {number} following_topic_count 关注的话题数
 * @property {number} following_article_count 关注的文章数
 * @property {number} following_question_count 关注的问题数
 * @property {number} topic_count 话题数
 * @property {number} article_count 文章数
 * @property {number} question_count 问题数
 * @property {number} answer_count 回答数
 * @property {number} comment_count 评论数
 * @property {number} reply_count 回复数
 * @property {number} notification_unread 未读通知数
 * @property {number} inbox_system 系统消息数
 * @property {number} inbox_user_group 用户组消息数
 * @property {number} inbox_private_message 私信数
 * @property {string} headline 个人简介
 * @property {string} bio 个人介绍
 * @property {string} blog 博客链接
 * @property {string} company 公司
 * @property {string} location 地址
 * @property {string} language 语言
 * @property {string} create_time 创建时间
 * @property {string} update_time 更新时间
 * @property {string} disable_time 禁用时间
 */
/**
 * @typedef {Object} UserGroupModel 用户组
 * @property {number} user_group_id 用户组ID
 * @property {string} user_group_name 用户组名称
 * @property {string} user_group_description 用户组描述
 * @property {string} user_group_icon 用户组图标
 * @property {string} user_group_icon_show 用户组图标展示
 * @property {string} user_group_color 用户组颜色
 * @property {number} user_group_user_count 用户组用户数量
 * @property {number} create_time 创建时间
 * @property {number} update_time 更新时间
 * @property {number} delete_time 删除时间
 * @property {number} is_admin 是否管理员
 * @property {number} ability_normal_login 普通用户登录权限
 * @property {number} ability_admin_login 登录权限
 * @property {number} ability_admin_manage_user_group 管理用户组权限
 * @property {number} ability_admin_manage_user 管理用户权限
 * @property {number} ability_admin_manage_topic 管理话题权限
 * @property {number} ability_admin_manage_question 管理问题权限
 * @property {number} ability_admin_manage_article 管理文章权限
 * @property {number} ability_admin_manage_comment 管理评论权限
 * @property {number} ability_admin_manage_answer 管理回答权限
 * @property {number} ability_admin_manage_reply 管理回复权限
 * @property {number} ability_admin_manage_report 管理举报权限
 * @property {number} ability_admin_manage_option 管理选项权限
 * @property {number} ability_create_article 创建文章权限
 * @property {number} ability_create_question 创建问题权限
 * @property {number} ability_create_answer 创建回答权限
 * @property {number} ability_create_comment 创建评论权限
 * @property {number} ability_create_reply 创建回复权限
 * @property {number} ability_create_topic 创建话题权限
 * @property {number} ability_edit_own_article 编辑自己的文章权限
 * @property {number} ability_edit_own_question 编辑自己的问题权限
 * @property {number} ability_edit_own_answer 编辑自己的回答权限
 * @property {number} ability_edit_own_comment 编辑自己的评论权限
 * @property {number} ability_edit_own_reply 编辑自己的回复权限
 * @property {number} ability_edit_own_topic 编辑自己的话题权限
 * @property {number} ability_delete_own_article 删除自己的文章权限
 * @property {number} ability_delete_own_question 删除自己的问题权限
 * @property {number} ability_delete_own_answer 删除自己的回答权限
 * @property {number} ability_delete_own_comment 删除自己的评论权限
 * @property {number} ability_delete_own_reply 删除自己的回复权限
 * @property {number} ability_delete_own_topic 删除自己的话题权限
 * @property {number} time_before_edit_article 编辑文章前等待时间
 * @property {number} time_before_edit_question 编辑问题前等待时间
 * @property {number} time_before_edit_answer 编辑回答前等待时间
 * @property {number} time_before_edit_comment 编辑评论前等待时间
 * @property {number} time_before_edit_reply 编辑回复前等待时间
 * @property {number} time_before_edit_topic 编辑话题前等待时间
 * @property {number} time_before_delete_article 删除文章前等待时间
 * @property {number} time_before_delete_question 删除问题前等待时间
 * @property {number} time_before_delete_answer 删除回答前等待时间
 * @property {number} time_before_delete_comment 删除评论前等待时间
 * @property {number} time_before_delete_reply 删除回复前等待时间
 * @property {number} time_before_delete_topic 删除话题前等待时间
 * @property {number} ability_edit_article_only_no_comment 编辑文章只有没有评论权限
 * @property {number} ability_edit_question_only_no_answer 编辑问题只有没有回答权限
 * @property {number} ability_edit_answer_only_no_comment 编辑回答只有没有评论权限
 * @property {number} ability_edit_question_only_no_comment 编辑问题只有没有评论权限
 * @property {number} ability_edit_comment_only_no_reply 编辑评论只有没有回复权限
 * @property {number} ability_edit_topic_only_no_article_or_question 编辑话题只有没有文章或问题权限
 * @property {number} ability_delete_article_only_no_comment 删除文章只有没有评论权限
 * @property {number} ability_delete_question_only_no_answer 删除问题只有没有回答权限
 * @property {number} ability_delete_answer_only_no_comment 删除回答只有没有评论权限
 * @property {number} ability_delete_question_only_no_comment 删除问题只有没有评论权限
 * @property {number} ability_delete_comment_only_no_reply 删除评论只有没有回复权限
 * @property {number} ability_delete_topic_only_no_article_or_question 删除话题只有没有文章或问题权限
 * @property {number} ability_edit_own_info 编辑自己的信息权限
 * @property {number} ability_vote 投票权限
 */
/**
 * @typedef {Object} VoteModel 投票
 * @property {number} vote_id 投票ID
 * @property {number} user_id 用户ID
 * @property {number} votable_id 投票对象ID
 * @property {string} votable_type 投票对象类型 用户点赞类型：article-文章、answer-答案、comment-评论、reply-回复
 * @property {number} type 投票类型
 * @property {number} create_time 创建时间
 */

//以下为杂项

export function UseLocalStorageGlassThemeData() {
  // console.log(localStorage.getItem('theme_client_form'))
  const client_form = JSON.parse(localStorage.getItem('theme_client_form'))
  if (client_form) {
    AddBodyClass_UseGlassMorphism(client_form.global_galss_effect)
    AddBodyClass_UseGlassMorphismAppbar(client_form.appbar_galss_effect)
    AddBodyClass_UseGlassMorphismBottomNav(client_form.bottom_nav_galss_effect)
  } else {
    const client_form = {
      global_galss_effect: true,
      appbar_galss_effect: true,
      bottom_nav_galss_effect: true,
      vconsole: false,
    }
    localStorage.setItem('theme_client_form', JSON.stringify(client_form))
    AddBodyClass_UseGlassMorphism(client_form.global_galss_effect)
    AddBodyClass_UseGlassMorphismAppbar(client_form.appbar_galss_effect)
    AddBodyClass_UseGlassMorphismBottomNav(client_form.bottom_nav_galss_effect)
  }
}
export function AddBodyClass_UseGlassMorphism(val) {
  if (val) {
    document.body.classList.add('use-glass-morphism')
  } else {
    document.body.classList.remove('use-glass-morphism')
  }
}
export function AddBodyClass_UseGlassMorphismAppbar(val) {
  if (val) {
    document.body.classList.add('use-glass-morphism-app-bar')
  } else {
    document.body.classList.remove('use-glass-morphism-app-bar')
  }
}
export function AddBodyClass_UseGlassMorphismBottomNav(val) {
  if (val) {
    document.body.classList.add('use-glass-morphism-bottom-navigation')
  } else {
    document.body.classList.remove('use-glass-morphism-bottom-navigation')
  }
}

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t -= 1;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
/**
 * 滚动到顶部
 * @param {number} duration 滚动时间，单位ms
 */
export function scrollToTop(duration = 300) {

  const start = window.scrollY || window.scrollY;//pageYOffset;
  const stop = document.body.getBoundingClientRect().top + start;
  const distance = stop - start;
  let timeStart;
  let timeElapsed;
  let next;
  function loop(timeCurrent) {
    if (!timeStart) {
      timeStart = timeCurrent;
    }
    timeElapsed = timeCurrent - timeStart;
    next = easeInOutQuad(timeElapsed, start, distance, duration);
    window.scrollTo(0, next);
    if (timeElapsed < duration) {
      window.requestAnimationFrame(loop);
    } else {
      window.scrollTo(0, start + distance);
      timeStart = false;
    }
  }
  window.requestAnimationFrame(loop);
}
/**
 * 水平滚动元素
 * @param {HTMLElement} element 要滚动的元素
 * @param {Object} options 选项
 * @param {number} options.duration 滚动时间，单位ms
 * @param {number} options.offset 滚动距离，单位px
 * @param {function} options.callback 滚动结束后的回调函数
 */
export function scrollHorizontal(element, options) {
  const duration = options.duration || 500;
  const offset = options.offset || 0;
  const { callback } = options;
  const start = element.scrollLeft;
  let timeStart;
  let timeElapsed;
  let next;
  function loop(timeCurrent) {
    if (!timeStart) {
      timeStart = timeCurrent;
    }
    timeElapsed = timeCurrent - timeStart;
    next = easeInOutQuad(timeElapsed, start, offset, duration);
    element.scrollLeft = next;
    if (timeElapsed < duration) {
      window.requestAnimationFrame(loop);
    } else {
      // 滚动结束后，纠正误差
      element.scrollLeft = start + offset;
      if (callback) {
        callback();
      }
      timeStart = false;
    }
  }
  window.requestAnimationFrame(loop);
}
/**
 * 是否为tauri环境。第三方开发主题无法使用！！！
 * @returns {bool} true为tauri环境，false为非tauri环境
 */
export function IsTauri() {
  return Is_Tauri;
}
/**
 * 是否为electron环境。第三方开发主题无法使用！！！
 * @returns {bool} true为electron环境，false为非electron环境
 */
export function IsElectron() {
  return Is_Electron;
}
/**
 * 是否为移动端应用环境。第三方开发主题无法使用！！！
 * @returns {bool} true为移动端应用环境，false为非移动端应用环境
 */
export function IsMobileApp() {
  return Is_MobileApp;
}
/**
 * 设置客户端主题，将主题名称保存到cookie由服务端输出。由于cookies不可用，请自行替换此方法
 * @returns {bool} true为移动端应用环境，false为非移动端应用环境
 */
export function SwitchClientTheme(value) {
  if (IsElectron()) {
    // console.log(`window-set-client-theme-${value}`)
    return false
  }
  cookies.set('theme', value);
  if (cookies.get('theme') !== '') {
    return true;
  }
  return false;
}
/**
 * 切换electron窗口。第三方开发主题无法使用！！！
 * @param {string} type 窗口类型
 * @returns {void}
 */
export async function OnWindowOpen(type) {
  if (IsElectron()) {
    switch (type) {
      case 'window-open-admin':
        // console.log('window-open-admin')
        break
      case 'window-open-home':
        // console.log('window-open-home')
        break
      case 'window-min':
        // console.log('window-min')
        break
      case 'window-max':
        // console.log('window-max')
        break
      case 'window-close':
        // console.log('window-close')
        break
      case 'window-top':
        // console.log('window-top')
        break
      case 'window-top-cancel':
        // console.log('window-top-cancel')
        break
    }
    return;
  } else if (IsTauri()) {
    switch (type) {
      case 'window-open-admin':
        break
      case 'window-open-home':
        break
      case 'window-min':
        await getCurrentWindow().minimize();
        break
      case 'window-max':
        await getCurrentWindow().toggleMaximize();
        break
      case 'window-close':
        await getCurrentWindow().close();
        break
      case 'window-top':
        await getCurrentWindow().setAlwaysOnTop(true);
        break
      case 'window-top-cancel':
        await getCurrentWindow().setAlwaysOnTop(false);
        break
    }
    return
  } else {
    alert('当前环境不支持该功能')
  }
}
/**
 * 将字符串转换为Base64编码
 * @param {String} str 要转换的字符串
 * @returns {String} Base64编码后的字符串
 */
export function stringToBase64(str) {
  // 注意：btoa 只支持 Latin1（即单字节字符），如果字符串包含非 Latin1 字符（如中文），需要先转成 UTF-8 字节数组
  // return btoa(unescape(encodeURIComponent(str)));
  return btoa(String.fromCharCode(...new TextEncoder().encode(str)));
}
/**
 * 将Base64编码的字符串转换为普通字符串
 * @param {String} base64Str Base64编码的字符串
 * @returns {String} 转换后的普通字符串
 */
export function base64ToString(base64Str) {
  // return decodeURIComponent(escape(atob(base64Str)));
  return new TextDecoder().decode(new Uint8Array([...atob(base64Str)].map(c => c.charCodeAt(0))));
}
/**
 * 获取Cookie。第三方开发主题无法使用！！！
 * @param {String} name Cookie名
 * @returns {String} Cookie值
 */
export function GetCookie(name) {
  return cookies.get(name);
}
/**
 * 设置Cookie。第三方开发主题无法使用！！！
 * @param {String} name Cookie名
 * @param {String} value Cookie值
 * @param {String} options Cookie选项
 * @returns {String} Cookie值
 */
export function SetCookie(name, value, options) {
  return cookies.set(name, value, options);
}
/**
 * 检查更新
 * @returns 返回响应
 */
export async function CheckUpdate({ user_token }) {
  const response = await axios.post('/api/update/check', {
    user_token: user_token,
  });
  return response;
}
// /**
//  * 开始更新
//  * @returns 返回响应
//  */
// export async function ServeUpdateInfo({ user_token }) {
//   const response = await axios.post('/api/update/server/info', {
//     user_token: user_token,
//   });
//   return response;
// }
/**
 * 获取基本url
 * @returns 基本url
 */
export function GetBaseUrl() {
  return axios.defaults.baseURL === undefined ? '' : axios.defaults.baseURL;
}
/**
 * @description 获取用户token
 * @returns {String} user_token 用户token
 */
export function GetUserToken() {
  return GetCookie('user_token') || localStorage.getItem('user_token') || document.cookie.replace(/(?:(?:^|.*;\s*)user_token\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '';
}
/**
 * @description 设置用户token
 * @param {String} user_token 用户token
 * @returns {Void} 
 */
export function SetUserToken(user_token) {
  SetCookie('user_token', user_token, '1d');
  localStorage.setItem('user_token', user_token);
}
/**
 * @description 删除用户token
 * @returns {Void} 
 */
export function RemoveUserToken() {
  cookies.remove('user_token');
  // document.cookie = 'user_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  localStorage.removeItem('user_token');
}
/**
 * 获取数据
 * @param {String} type 
 * @param {Object} data 
 * @returns {Object} response
 */
export async function GetDatas(type, data) {
  let typeArr = [
    'users',
    'questions',
    'answers',
    'articles',
    'topics',
    'follows',
    'comments',
    'replys',
    'reports',
    'user_groups',
  ];
  if (typeArr.indexOf(type) === -1) {
    return null;
  }
  const response = await axios.post('/api/' + type + '/get', data);
  return response;
}
/**
 * 删除数据
 * @param {String} type
 * @param {Object} data
 * @returns {Object} response
 */
export async function DeleteDatas(type, data) {
  let typeArr = [
    'topics',
    'articles',
    'questions',
    'answers',
    'comments',
    'users',
    'replys',
    'reports',
    'user_groups',
  ];
  if (typeArr.indexOf(type) === -1) {
    return null;
  }
  const response = await axios.post('/api/' + type + '/delete', data);
  return response;
}

// ==================== 获取SEO内容接口 ====================

/**
 * @description 获取首页打字机效果数据
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_TEXT_PLAYERS() {
  if (window.G_INDEX_TEXT_PLAYERS !== null && window.G_INDEX_TEXT_PLAYERS !== undefined) {
    const data = window.G_INDEX_TEXT_PLAYERS;
    window.G_INDEX_TEXT_PLAYERS = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页话题列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_TOPICS() {
  if (window.G_INDEX_TOPICS !== null && window.G_INDEX_TOPICS !== undefined) {
    const data = window.G_INDEX_TOPICS;
    window.G_INDEX_TOPICS = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页最新问题列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_QUESTIONS_RECENT() {
  if (window.G_INDEX_QUESTIONS_RECENT !== null && window.G_INDEX_QUESTIONS_RECENT !== undefined) {
    const data = window.G_INDEX_QUESTIONS_RECENT;
    window.G_INDEX_QUESTIONS_RECENT = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页热门问题列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_QUESTIONS_POPULAR() {
  if (window.G_INDEX_QUESTIONS_POPULAR !== null && window.G_INDEX_QUESTIONS_POPULAR !== undefined) {
    const data = window.G_INDEX_QUESTIONS_POPULAR;
    window.G_INDEX_QUESTIONS_POPULAR = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页最新文章列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_ARTICLES_RECENT() {
  if (window.G_INDEX_ARTICLES_RECENT !== null && window.G_INDEX_ARTICLES_RECENT !== undefined) {
    const data = window.G_INDEX_ARTICLES_RECENT;
    window.G_INDEX_ARTICLES_RECENT = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页热门文章列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_ARTICLES_POPULAR() {
  if (window.G_INDEX_ARTICLES_POPULAR !== null && window.G_INDEX_ARTICLES_POPULAR !== undefined) {
    const data = window.G_INDEX_ARTICLES_POPULAR;
    window.G_INDEX_ARTICLES_POPULAR = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页最新用户列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_USERS_RECENT() {
  if (window.G_INDEX_USERS_RECENT !== null && window.G_INDEX_USERS_RECENT !== undefined) {
    const data = window.G_INDEX_USERS_RECENT;
    window.G_INDEX_USERS_RECENT = null;
    return data;
  }
  return null;
}
/**
 * @description 获取首页热门用户列表
 * @returns {Object} data 数据
 */
export function Get_G_INDEX_USERS_POPULAR() {
  if (window.G_INDEX_USERS_POPULAR !== null && window.G_INDEX_USERS_POPULAR !== undefined) {
    const data = window.G_INDEX_USERS_POPULAR;
    window.G_INDEX_USERS_POPULAR = null;
    return data;
  }
  return null;
}
/**
 * @description 获取推荐话题列表
 * @returns {Object} data 数据
 */
export function Get_G_TOPICS_RECOMMENDED() {
  if (window.G_TOPICS_RECOMMENDED !== null && window.G_TOPICS_RECOMMENDED !== undefined) {
    const data = window.G_TOPICS_RECOMMENDED;
    window.G_TOPICS_RECOMMENDED = null;
    return data;
  }
  return null;
}
/**
 * @description 获取话题
 * @returns {Object} data 数据
 */
export function Get_G_TOPIC() {
  if (window.G_TOPIC !== null && window.G_TOPIC !== undefined) {
    const data = window.G_TOPIC;
    window.G_TOPIC = null;
    return data;
  }
  return null;
}
/**
 * @description 获取最新问题列表
 * @returns {Object} data 数据
 */
export function Get_G_QUESTIONS_RECENT() {
  if (window.G_QUESTIONS_RECENT !== null && window.G_QUESTIONS_RECENT !== undefined) {
    const data = window.G_QUESTIONS_RECENT;
    window.G_QUESTIONS_RECENT = null;
    return data;
  }
  return null;
}
/**
 * @description 获取热门问题列表
 * @returns {Object} data 数据
 */
export function Get_G_QUESTIONS_POPULAR() {
  if (window.G_QUESTIONS_POPULAR !== null && window.G_QUESTIONS_POPULAR !== undefined) {
    const data = window.G_QUESTIONS_POPULAR;
    window.G_QUESTIONS_POPULAR = null;
    return data;
  }
  return null;
}
/**
 * @description 获取问题
 * @returns {Object} data 数据
 */
export function Get_G_QUESTION() {
  if (window.G_QUESTION !== null && window.G_QUESTION !== undefined) {
    const data = window.G_QUESTION;
    window.G_QUESTION = null;
    return data;
  }
  return null;
}
/**
 * @description 获取问题回答列表
 * @returns {Object} data 数据
 */
export function Get_G_QUESTION_ANSWERS() {
  if (window.G_QUESTION_ANSWERS !== null && window.G_QUESTION_ANSWERS !== undefined) {
    const data = window.G_QUESTION_ANSWERS;
    window.G_QUESTION_ANSWERS = null;
    return data;
  }
  return null;
}
/**
 * @description 获取最新文章列表
 * @returns {Object} data 数据
 */
export function Get_G_ARTICLES_RECENT() {
  if (window.G_ARTICLES_RECENT !== null && window.G_ARTICLES_RECENT !== undefined) {
    const data = window.G_ARTICLES_RECENT;
    window.G_ARTICLES_RECENT = null;
    return data;
  }
  return null;
}
/**
 * @description 获取热门文章列表
 * @returns {Object} data 数据
 */
export function Get_G_ARTICLES_POPULAR() {
  if (window.G_ARTICLES_POPULAR !== null && window.G_ARTICLES_POPULAR !== undefined) {
    const data = window.G_ARTICLES_POPULAR;
    window.G_ARTICLES_POPULAR = null;
    return data;
  }
  return null;
}
/**
 * @description 获取文章
 * @returns {Object} data 数据
 */
export function Get_G_ARTICLE() {
  if (window.G_ARTICLE !== null && window.G_ARTICLE !== undefined) {
    const data = window.G_ARTICLE;
    window.G_ARTICLE = null;
    return data;
  }
  return null;
}
/**
 * @description 获取文章评论列表
 * @returns {Object} data 数据
 */
export function Get_G_ARTICLE_COMMENTS() {
  if (window.G_ARTICLE_COMMENTS !== null && window.G_ARTICLE_COMMENTS !== undefined) {
    const data = window.G_ARTICLE_COMMENTS;
    window.G_ARTICLE_COMMENTS = null;
    return data;
  }
  return null;
}
/**
 * @description 获取用户
 * @returns {Object} data 数据
 */
export function Get_G_USER() {
  if (window.G_USER !== null && window.G_USER !== undefined) {
    const data = window.G_USER;
    window.G_USER = null;
    return data;
  }
  return null;
}
/**
 * @description 获取用户问题列表
 * @returns {Object} data 数据
 */
export function Get_G_USER_QUESTIONS() {
  if (window.G_USER_QUESTIONS !== null && window.G_USER_QUESTIONS !== undefined) {
    const data = window.G_USER_QUESTIONS;
    window.G_USER_QUESTIONS = null;
    return data;
  }
  return null;
}
/**
 * @description 获取用户回答列表
 * @returns {Object} data 数据
 */
export function Get_G_USER_ANSWERS() {
  if (window.G_USER_ANSWERS !== null && window.G_USER_ANSWERS !== undefined) {
    const data = window.G_USER_ANSWERS;
    window.G_USER_ANSWERS = null;
    return data;
  }
  return null;
}
/**
 * @description 获取用户文章列表
 * @returns {Object} data 数据
 */
export function Get_G_USER_ARTICLES() {
  if (window.G_USER_ARTICLES !== null && window.G_USER_ARTICLES !== undefined) {
    const data = window.G_USER_ARTICLES;
    window.G_USER_ARTICLES = null;
    return data;
  }
  return null;
}
/**
 * @description 获取推荐用户列表
 * @returns {Object} data 数据
 */
export function Get_G_USERS_RECOMMENDED() {
  if (window.G_USERS_RECOMMENDED !== null && window.G_USERS_RECOMMENDED !== undefined) {
    const data = window.G_USERS_RECOMMENDED;
    window.G_USERS_RECOMMENDED = null;
    return data;
  }
  return null;
}

// ==================== 以下为UI客户端接口 ====================

// $collector->get('/api/user/signin/add', function () {
//       $data = Share::GetRequestData();
//       return Share::HandleArrayToJSON(
//         \MaterialDesignForum\Controllers\Extension\UserSignIn::AddUserSignIn($data['user_token'] ?? null)
//       );
//     });
//     $collector->get('/api/user/signin/get', function () {
//       $data = Share::GetRequestData();
//       return Share::HandleArrayToJSON(
//         \MaterialDesignForum\Controllers\Extension\UserSignIn::GetUserSignInData($data['user_token'] ?? null)
//       );
//     });


// Route::post('/api/user/oauths/get', function (Request $request) {
//     $result = OauthController::GetUserOauthBindings(
//         $request->input('user_token', $request->bearerToken()),
//     );
//     return response()->json($result);
// });


// ==================== User 用户 ====================

/**
 * @description 获取用户OAuth绑定
 * @param {String} user_token 用户token
 * @returns {Promise} response 返回的响应
 */
export async function GetOauths({
  user_token
}) {
  const response = await axios.post('/api/user/oauths/get', {
    user_token
  });
  return response;
}

/**
 * 用户签到添加
 * @param {String} user_token 用户token
 * @returns {Promise} response 返回的响应
 */
export async function AddUserSignIn({
  user_token
}) {
  const response = await axios.post('/api/user/signin/add', {
    user_token
  });
  return response;
}
/**
 * 用户签到获取
 * @param {String} user_token 用户token
 * @returns {Promise} response 返回的响应
 */
export async function GetUserSignIn({
  user_token
}) {
  const response = await axios.post('/api/user/signin/get', {
    user_token
  });
  return response;
}

/**
 * @description 用户获取图片验证码
 * @param {String} time 时间
 * @returns {Promise<String>} img_url 图片地址
 */
export async function GetImageCaptcha() {
  const img_url = axios.defaults.baseURL !== undefined ? axios.defaults.baseURL : '';
  const captcha = img_url + '/api/user/image_captcha/' + new Date().getTime();
  return captcha;
}
/**
 * @description 设置激活码
 * @param {String} user_token 用户token
 * @param {String} site_activation_key 站点激活码
 * @returns {Promise} response 返回的响应
 */
export async function SetActivationKey({
  user_token,
  site_activation_key
}) {
  const response = await axios.post('/api/option/set/site_activation_key', {
    user_token,
    site_activation_key
  });
  return response;
}
/**
 * @description 获取激活码
 * @param {String} user_token 用户token
 * @returns {Promise} response 返回的响应
 */
export async function GetActivationKey({
  user_token
}) {
  const response = await axios.post('/api/option/get/site_activation_key', {
    user_token
  });
  return response;
}
// /**
//  * @typedef {Object} InfoData
//  * @property {String} site_name 站点名称
//  * @property {String} site_description 站点描述
//  * @property {String} site_keywords 站点关键词
//  * @property {String} site_icp_beian 站点ICP备案号
//  * @property {String} site_gongan_beian 站点公网安备号
//  * @property {String} default_language 默认语言
//  */
// /**
//  * @description 获取信息设置
//  * @param {String} user_token 用户token
//  * @returns {Promise<InfoData>}
//  */
// export async function GetInfoData() {
//   const response = await axios.post('/api/option/get/info', {
//     // user_token
//   });
//   return response;
// }
/**
 * @description 设置信息设置
 * @param {String} form_data 表单数据
 * @param {String} user_token 用户token
 * @returns {Promise<{is_set: Boolean}>}
 */
export async function SetInfoData({
  form_data, user_token
}) {
  const response = await axios.post('/api/option/set/info', {
    form_data,
    user_token
  });
  return response;
}
/**
 * @typedef {Object} MailData
 * @property {String} smtp_host 邮件服务器
 * @property {String} smtp_password 邮件服务器密码
 * @property {String} smtp_port 邮件服务器端口
 * @property {String} smtp_reply_to 邮件服务器回复地址
 * @property {String} smtp_secure 邮件服务器加密方式
 * @property {String} smtp_send_name 邮件服务器用户名
 * @property {String} smtp_username 邮件服务器用户名
 */
/**
 * @description 获取邮件设置
 * @param {String} user_token 用户token
 * @returns {Promise<MailData>}
 */
export async function GetMailData({
  user_token
}) {
  const response = await axios.post('/api/option/get/mail', {
    user_token
  });
  return response;
}
/**
 * @description 设置邮件设置
 * @param {String} form_data 表单数据
 * @param {String} user_token 用户token
 * @returns {Promise<{is_set: Boolean}>}
 */
export async function SetMailData({
  form_data,
  user_token
}) {
  const response = await axios.post('/api/option/set/mail', {
    form_data,
    user_token
  });
  return response;
}
// /**
//  * @description 获取主题配置
//  * @param {String} user_token 用户token
//  * @param {String} theme_name 主题名称
//  * @returns {Promise<{is_get: Boolean, themes: Array}>}
//  */
// export async function GetThemeSettingColor({
//   user_token,
//   theme_name
// }) {
//   const response = await axios.post('/api/option/get/theme/setting_color', {
//     user_token,
//     theme_name
//   });
//   return response;
// }
/**
 * @description 设置主题配置
 * @param {String} user_token 用户token
 * @param {String} theme_name 主题名称
 * @param {Array} theme_color 主题配置
 * @returns {Promise<{is_set: Boolean}>}
 */
export async function SetThemeSettingColor({
  user_token,
  theme_name,
  theme_color
}) {
  const response = await axios.post('/api/option/set/theme/setting_color', {
    user_token,
    theme_name,
    theme_color
  });
  return response;
}
/**
 * @description 获取主题设置
 * @param {String} user_token 用户token
 * @returns {Promise} [{path，files}，...]
 */
export async function GetThemeData({
  user_token
}) {
  const response = await axios.post('/api/option/get/theme', {
    user_token
  });
  return response;
}
/**
 * @description 获取当前主题
 * @returns {Promise<{is_get: Boolean, theme: String}>}
 */
export async function GetCurrentTheme() {
  const response = await axios.post('/api/option/get/theme_current');
  return response;
}
/**
 * @description 设置当前主题
 * @param {String} theme_name 主题名称
 * @param {String} user_token 用户token
 * @returns {Promise<{is_set: Boolean}>}
 */
export async function SetCurrentTheme({
  theme_name,
  user_token
}) {
  const response = await axios.post('/api/option/set/theme_current', {
    theme_name,
    user_token
  });
  return response;
}
/**
 * 获取所有的配置信息
 * @param {String} user_token 用户token
 * @returns {Promise} response 返回的响应
 */
export async function GetAllOptions({
  user_token
}) {
  const response = await axios.post('/api/option/get/all', {
    user_token
  });
  return response;
}
/**
 * 获取指定的配置信息
 * @param {String} name 配置名称
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean, value: String}>}
 */
export async function GetOption({
  name,
  user_token
}) {
  const response = await axios.post('/api/option/get', {
    name,
    user_token
  });
  return response;
}
/**
 * 获取oauth配置信息
 * @param {String} name 配置名称
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean, value: String}>}
 */
export async function GetOauthOptions({
  user_token
}) {
  const response = await axios.post('/api/options/get/oauth', {
    user_token
  });
  return response;
}
export async function SetOauthOptions({
  user_token,
  form_data
}) {
  const response = await axios.post('/api/options/set/oauth', {
    user_token,
    form_data
  });
  return response;
}
/**
 * 设置指定的配置信息
 * @param {String} name 配置名称
 * @param {String} value 配置值
 * @param {String} user_token 用户token
 * @returns {Promise<{is_set: Boolean}>}
 */
export async function SetOption({
  name,
  value,
  user_token
}) {
  const response = await axios.post('/api/option/set', {
    name,
    value,
    user_token
  });
  return response;
}
// /**
//  * @description 设置主题颜色参数
//  * @param {String} user_token 用户token
//  * @param {String} json_text json文本
//  * @returns {Promise<{is_set: Boolean, json_text: String}>}
//  */
// export async function SetThemeColorParamJson({
//   user_token,
//   json_text
// }) {
//   const response = await axios.post('/api/option/set/theme_color_param', {
//     user_token,
//     json_text
//   });
//   return response;
// }
// /**
//  * @description 获取主题颜色参数
//  * @param {String} user_token 用户token
//  * @returns {Promise<{is_get: Boolean, json_text: String}>}
//  */
// export async function GetThemeColorParamJson({
//   user_token
// }) {
//   const response = await axios.post('/api/option/get/theme_color_param', {
//     user_token
//   });
//   return response;
// }
// /**
//  * @description 设置主题打字机参数
//  * @param {String} user_token 用户token
//  * @param {String} json_text json文本
//  * @returns {Promise<{is_set: Boolean, json_text: String}>}
//  */
// export async function SetThemeTypedParamJson({
//   user_token,
//   json_text
// }) {
//   const response = await axios.post('/api/option/set/theme_typed_param', {
//     user_token,
//     json_text
//   });
//   return response;
// }
// /**
//  * @description 获取主题打字机参数
//  * @param {String} user_token 用户token
//  * @returns {Promise<{is_get: Boolean, json_text: String}>}
//  */
// export async function GetThemeTypedParamJson({
//   user_token
// }) {
//   const response = await axios.post('/api/option/get/theme_typed_param', {
//     user_token
//   });
//   return response;
// }
// /**
//  * @description 设置轮播图参数
//  * @param {String} user_token 用户token
//  * @param {String} json_text json文本
//  * @returns {Promise<{is_set: Boolean, json_text: String}>}
//  */
// export async function SetThemeCarouselParamJson({
//   user_token,
//   json_text
// }) {
//   const response = await axios.post('/api/option/set/theme_carousel_param', {
//     user_token,
//     json_text
//   });
//   return response;
// }
// /**
//  * @description 获取轮播图参数
//  * @param {String} user_token 用户token
//  * @returns {Promise<{is_get: Boolean, json_text: String}>}
//  */
// export async function GetThemeCarouselParamJson({
//   user_token
// }) {
//   const response = await axios.post('/api/option/get/theme_carousel_param', {
//     user_token
//   });
//   return response;
// }
/**
 * @description 用户头像重置
 * @param {String} user_id 用户ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_reset: Boolean,user: UserModel}>}
 */
export async function ResetAvatar({
  user_id,
  user_token
}) {
  const response = await axios.post('/api/user/avatar/reset', {
    user_id,
    user_token
  });
  return response;
}
/**
 * @description 用户封面重置
 * @param {String} user_id 用户ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_reset: Boolean,user: UserModel}>}
 */
export async function ResetCover({
  user_id,
  user_token
}) {
  const response = await axios.post('/api/user/cover/reset', {
    user_id,
    user_token
  });
  return response;
}
/**
 * @description 获取邮箱验证码
 * @param {String} email 邮箱
 * @param {String} lang 语言-可选-发送给对象邮箱的内容语言
 * @returns {Promise<{is_send: Boolean}>}
 */
export async function GetEmailCaptcha(
  email, lang
) {
  // email = btoa(email);
  // lang = btoa(lang);
  // email = Buffer.from(email).toString('base64');
  // lang = Buffer.from(lang).toString('base64');

  email = stringToBase64(email);
  lang = stringToBase64(lang);
  const response = await axios.post('/api/user/email_captcha', {
    email,
    lang
  });
  return response;
}
/**
 * @description Token自动登录
 * @param {String} user_token 用户token
 * @returns {Promise<{is_login: Boolean,user: UserModelInfo}>}
 */
export async function AutoLogin(
  user_token
) {
  const response = await axios.post('/api/user/auto_login', {
    user_token
  });
  return response;
}
/**
 * @description 注册
 * @param {String} username 用户名
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} email_captcha 邮箱验证码 使用 GetEmailCaptcha(email, lang)
 * @param {String} language 语言
 * @returns {Promise<{is_add: Boolean}>}
 */
export async function Register({
  username,
  email,
  password,
  email_captcha,
  language
}) {
  // email = btoa(email);
  // password = btoa(password);
  // email_captcha = btoa(email_captcha);
  // email = Buffer.from(email).toString('base64');
  // password = Buffer.from(password).toString('base64');
  // email_captcha = Buffer.from(email_captcha).toString('base64');

  email = stringToBase64(email);
  password = stringToBase64(password);
  email_captcha = stringToBase64(email_captcha);
  const response = await axios.post('/api/user/register', {
    username,
    email,
    password,
    email_captcha,
    language
  });
  return response;
}
/**
 * @description 登录-使用Login获得 user_token 后-使用AutoLogin(user_token)进行登录来获取用户对象
 * @param {String} username_or_email 用户名或邮箱
 * @param {String} password 密码
 * @param {String} image_capthca 图片验证码-可为空-5分钟有效-建议密码错误三次后请求<GetImageCaptcha>方法获取图片验证码-随后一起提交。
 * @returns {Promise<{is_login: Boolean,token: String}>}
 */
export async function Login({
  username_or_email,
  password,
  image_capthca
}) {
  // password = btoa(password);
  // image_capthca = image_capthca ? btoa(image_capthca) : '';
  // password = Buffer.from(password).toString('base64');
  // image_capthca = image_capthca ? Buffer.from(image_capthca).toString('base64') : '';

  password = stringToBase64(password);
  image_capthca = image_capthca ? stringToBase64(image_capthca) : '';
  const response = await axios.post('/api/user/login', {
    username_or_email,
    password,
    image_capthca
  });
  return response;
}
/**
 * @description 重置密码
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} email_captcha 邮箱验证码 使用 GetEmailCaptcha(email, lang)
 * @returns {Promise<{is_reset: Boolean}>}
 */
export async function Reset({
  email,
  password,
  email_captcha
}) {
  // email = btoa(email);
  // password = btoa(password);
  // email_captcha = btoa(email_captcha);

  // email = Buffer.from(email).toString('base64');
  // password = Buffer.from(password).toString('base64');
  // email_captcha = Buffer.from(email_captcha).toString('base64');

  email = stringToBase64(email);
  password = stringToBase64(password);
  email_captcha = stringToBase64(email_captcha);
  const response = await axios.post('/api/user/reset', {
    email,
    password,
    email_captcha
  });
  return response;
}
/**
 * @typedef {Object} UserModelInfo
 * @property {...UserModel} user 继承用户模型
 * @property {Boolean} is_follow 是否关注
 * @property {UserGroupModel} user_group 用户组模型
 */
/**
 * @description 获取用户
 * @param {String} user_id 用户ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,user: UserModelInfo}>} UserModel对于自己视角和他人视角的字段不同
 */
export async function GetUser({
  user_id,
  user_token
}) {
  const response = await axios.post('/api/user/get', {
    user_id,
    user_token
  });
  return response;
}
/**
 * @typedef {Object} FollowButtonModel
 * @property {Boolean} is_follow 是否关注
 * @property {String} followable_type 关注类型：user-用户、topic-话题、question-问题、article-文章
 * @property {String} followable_id 关注ID
 * @property {String} followable_object 关注对象
 */
/**
 * @description 关注或取消关注
 * @param {String} user_token 用户token
 * @param {String} followable_type 关注类型：user-用户、topic-话题、question-问题、article-文章
 * @param {String} followable_id 关注ID
 * @returns {Promise<FollowButtonModel>} 关注按钮模型
 */
export async function Follow({
  user_token,
  followable_type,
  followable_id
}) {
  const response = await axios.post('/api/user/follow', {
    user_token,
    followable_type,
    followable_id
  });
  return response;
}
/**
 * @description 获取关注按钮联系人列表
 * @param {String} user_token 用户token
 * @param {Number} page 页码
 * @param {Number} per_page 每页数量
 * @returns {Promise} response 返回的响应
 */
export async function GetFollowMutualAttentionList({
  user_token,
  page,
  per_page
}) {
  const response = await axios.post('/api/user/follow/contacts', {
    user_token,
    page,
    per_page
  });
  return response;
}
/**
 * @description 编辑用户信息
 * @param {String} email 邮箱
 * @param {String} username 用户名
 * @param {String} user_group_id 用户组ID
 * @param {String} headline 头衔
 * @param {String} blog 博客
 * @param {String} company 公司
 * @param {String} location 地址
 * @param {String} bio 简介
 * @param {String} user_token 用户token
 * @param {String} edit_target_user_id 编辑目标用户ID
 * @returns {Promise<{is_edit: Boolean,user: UserModelInfo}>} 
 */
export async function EditInfo({
  email,
  username,
  user_group_id,
  headline,
  blog,
  company,
  location,
  bio,
  user_token,
  edit_target_user_id
}) {
  const response = await axios.post('/api/user/editinfo', {
    email,
    username,
    user_group_id,
    headline,
    blog,
    company,
    location,
    bio,
    user_token,
    edit_target_user_id
  });
  return response;
}
/**
 * @description 上传用户头像
 * @param {String} user_token 用户token
 * @param {String} avatar 头像
 * @returns {Promise<{is_upload: Boolean,user: UserModelInfo}>} 
 */
export async function UploadAvatar({
  user_token,
  avatar
}) {
  const response = await axios.post('/api/user/avatar/upload', {
    user_token,
    avatar
  });
  return response;
}
/**
 * @description 上传用户封面
 * @param {String} user_token 用户token
 * @param {String} cover 封面
 * @returns {Promise<{is_upload: Boolean,user: UserModelInfo}>} 
 */
export async function UploadCover({
  user_token,
  cover
}) {
  const response = await axios.post('/api/user/cover/upload', {
    user_token,
    cover
  });
  return response;
}
// 'is_get' => false,
//       'data' => null,
//       'pagination' => [
//         'page' => 1, //当前页码
//         'per_page' => 0, //每页显示的数量
//         'total' => 0, //总共有多少个项目
//         'pages' => 0, //总共有多少页
//         'previous' => null, //上一页
//         'next' => null, //下一页
//       ]
/**
 * @typedef {Object} DataAndPagination 数据和分页
 * @property {Boolean} is_get 是否获取
 * @property {AnswerModel[]|
 * ArticleModel[]|
 * CommentModel[]|
 * FollowModel[]|
 * NotificationModel[]|
 * QuestionModel[]|
 * ReplyModel[]|
 * ReportModel[]|
 * TopicModel[]|
 * UserModel[]|
 * UserGroupModel[]
 * } data 模型数据数组
 * @property {Object} pagination 分页
 * @property {Number} pagination.page 当前页码
 * @property {Number} pagination.per_page 每页显示的数量
 * @property {Number} pagination.total 总共有多少个项目
 * @property {Number} pagination.pages 总共有多少页
 * @property {String} pagination.previous 上一页
 * @property {String} pagination.next 下一页
 */
/**
 * @description 获取用户问题列表
 * @param {String} user_id 用户ID
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @returns {Promise<DataAndPagination>}
 */
export async function GetUserQuestions({
  user_id,
  order,
  page,
  user_token
}) {
  const response = await axios.post('/api/user/questions/get', {
    user_id,
    order,
    page,
    user_token
  });
  return response;
}
/**
 * @description 获取用户回答列表
 * @param {String} user_id 用户ID
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @returns {Promise<DataAndPagination>}
 */
export async function GetUserAnswers({
  user_id,
  order,
  page,
  user_token
}) {
  const response = await axios.post('/api/user/answers/get', {
    user_id,
    order,
    page,
    user_token
  });
  return response;
}
/**
 * @description 获取用户文章列表
 * @param {String} user_id 用户ID
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @returns {Promise<DataAndPagination>}
 */
export async function GetUserArticles({
  user_id,
  order,
  page,
  user_token
}) {
  const response = await axios.post('/api/user/articles/get', {
    user_id,
    order,
    page,
    user_token
  });
  return response;
}
/**
 * @description 用户上传图片
 * @param {String} user_token 用户token
 * @param {String} type 类型 question, answer, article
 * @param {String} image 图片
 * @returns {Promise<{is_upload: Boolean,user: UserModelInfo}>} 
 */
export async function UploadImage({
  user_token,
  type,
  image
}) {
  const img_url = axios.defaults.baseURL !== undefined ? axios.defaults.baseURL : '';
  const response = await axios.post(img_url + '/api/user/upload/image', {
    user_token,
    type,
    image
  });
  return response;
}
/**
 * @description 获取用户通知列表
 * @param {String} user_token 用户token
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {Number} per_page 每页数量
 * @returns {Promise<DataAndPagination>}
 */
export async function GetUserInteractionNotifications({
  user_token,
  order,
  page,
  per_page
}) {
  const response = await axios.post('/api/user/notifications/get', {
    user_token,
    order,
    page,
    per_page
  });
  return response;
}
/**
 * @description 设置通知为删除状态
 * @param {String} user_token 用户token
 * @param {String} notification_id 通知ID
 * @returns {Promise<{is_set: Boolean,notification: NotificationModel}>}
 */
export async function DeleteNotification({
  user_token,
  notification_id
}) {
  const response = await axios.post('/api/user/notification/delete', {
    user_token,
    notification_id
  });
  return response;
}
/**
 * @description 删除用户所有通知
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean}>}
 */
export async function DeleteAllNotifications({
  user_token
}) {
  const response = await axios.post('/api/user/notifications/delete/all', {
    user_token
  });
  return response;
}
/**
 * @description 设置用户语言
 * @param {String} user_token 用户token
 * @param {String} language 语言
 * @returns {Promise<{is_set: Boolean,user: UserModelInfo}>}
 */
export async function SetUserLanguage({
  user_token,
  language
}) {
  const response = await axios.post('/api/user/set/language', {
    user_token,
    language
  });
  return response;
}
/**
 * @description 获取用户列表
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} type 类型
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @param {Boolean} is_admin 是否管理员
 * @returns {Promise<DataAndPagination>}
 */
export async function GetUsers({
  order,
  page,
  type,
  user_token,
  per_page,
  search_keywords,
  search_field,
  is_admin
}) {
  const response = await axios.post('/api/users/get', {
    order,
    page,
    type,
    user_token,
    per_page,
    search_keywords,
    search_field,
    is_admin
  });
  return response;
}
/**
 * @description 设置用户组
 * @param {String} user_token 用户token
 * @param {String} user_group_id 用户组ID
 * @param {Number} old_user_group_id 新用户组ID 使用此参数时 表示将用户组里所有用户迁移到新用户组
 * @param {Array} user_ids 用户ID列表 使用此参数时 表示将用户从当前用户组迁移到新用户组
 * @returns {Promise<{is_set: Boolean}>}
 * */
export async function SetUsersUserGroup({
  user_token,
  user_group_id,
  old_user_group_id,
  user_ids
}) {
  const response = await axios.post('/api/users/user_group/set', {
    user_token,
    user_group_id,
    old_user_group_id,
    user_ids
  });
  return response;
}
/**
 * @description 设置用户禁用时间
 * @param {String} user_token 用户token
 * @param {Array} user_ids 用户ID列表
 * @returns {Promise<{is_delete: Boolean}>}
 */
export async function SetUsersDisableTime({
  user_token,
  user_ids,
  disable_time
}) {
  const response = await axios.post('/api/users/delete', {
    user_token,
    user_ids,
    disable_time
  });
  return response;
}
// ==================== Follow 关注 ====================

/**
 * @description 获取 关注对象 的 N个用户对象的列表 或 获取 用户对象 关注的 N个对象的列表
 * @param {String} modes 模式
 * @param {String} followable_type 类型
 * @param {String} followable_id 关注ID
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @returns {Promise<DataAndPagination>}
 */
export async function GetFollows({
  modes,
  followable_type,
  followable_id,
  page,
  user_token
}) {
  const response = await axios.post('/api/follows/get', {
    modes,
    followable_type,
    followable_id,
    page,
    user_token
  });
  return response;
}

// ==================== Topic 话题 ====================

/**
 * @description 添加话题
 * @param {String} name 名称
 * @param {String} description 描述
 * @param {String} cover 封面 可为空
 * @param {String} user_token 用户token
 * @returns {Promise<{is_add: Boolean,topic: TopicModel}>}
 */
export async function AddTopic({
  name,
  description,
  cover,
  user_token
}) {
  const response = await axios.post('/api/topic/add', {
    name,
    description,
    cover,
    user_token
  });
  return response;
}
/**
 * @description 编辑话题
 * @param {String} topic_id 话题ID
 * @param {String} name 名称
 * @param {String} description 描述
 * @param {String} cover 封面
 * @param {String} user_token 用户token
 * @returns {Promise<{is_edit: Boolean,topic: TopicModel}>}
 */
export async function EditTopic({
  topic_id,
  name,
  description,
  cover,
  user_token
}) {
  const response = await axios.post('/api/topic/edit', {
    topic_id,
    name,
    description,
    cover,
    user_token
  });
  return response;
}
/**
 * @description 获取话题
 * @param {String} topic_id 话题ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,topic: TopicModel}>}
 */
export async function GetTopic({
  topic_id,
  user_token
}) {
  const response = await axios.post('/api/topic/get', {
    topic_id,
    user_token
  });
  return response;
}
/**
 * @description 获取话题列表
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {Boolean} following 是否关注
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @returns {Promise<DataAndPagination>}
 */
export async function GetTopics({
  order,
  page,
  following,
  user_token,
  per_page,
  search_keywords,
  search_field
}) {
  const response = await axios.post('/api/topics/get', {
    order,
    page,
    following,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}
/**
 * @description 删除话题
 * @param {Array} topic_ids 话题ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array,data:Array<TopicModel>}>}
 */
export async function DeleteTopics({
  topic_ids,
  user_token
}) {
  const response = await axios.post('/api/topics/delete', {
    topic_ids,
    user_token
  });
  return response;
}

// ==================== Question 提问 ====================

/**
 * @description 添加问题
 * @param {String} title 标题
 * @param {Array} topics 话题列表
 * @param {String} content_markdown 内容Markdown
 * @param {String} content_rendered 内容HTML
 * @param {String} user_token 用户token
 * @returns {Promise<{is_add: Boolean,question: QuestionModel}>}
 */
export async function AddQuestion({
  title,
  topics,
  content_markdown,
  content_rendered,
  user_token
}) {
  const response = await axios.post('/api/question/add', {
    title,
    topics,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}
/**
 * @description 获取问题
 * @param {String} question_id 问题ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,question: QuestionModel}>}
 */
export async function GetQuestion({
  question_id,
  user_token
}) {
  const response = await axios.post('/api/question/get', {
    question_id,
    user_token
  });
  return response;
}
/**
 * @description 编辑问题
 * @param {String} question_id 问题ID
 * @param {String} title 标题
 * @param {Array} topics 话题列表
 * @param {String} content_markdown 内容Markdown
 * @param {String} content_rendered 内容HTML
 * @param {String} user_token 用户token
 * @returns {Promise<{is_edit: Boolean,question: QuestionModel}>}
 */
export async function EditQuestion({
  question_id,
  title,
  topics,
  content_markdown,
  content_rendered,
  user_token
}) {
  const response = await axios.post('/api/question/edit', {
    question_id,
    title,
    topics,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}
/**
 * @description 获取问题列表
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {Boolean} following 是否关注
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @param {String} specify_topic_id 指定话题ID
 * @returns {Promise<DataAndPagination>}
 */
export async function GetQuestions({
  order,
  page,
  following,
  user_token,
  per_page,
  search_keywords,
  search_field,
  specify_topic_id
}) {
  const response = await axios.post('/api/questions/get', {
    order,
    page,
    following,
    user_token,
    per_page,
    search_keywords,
    search_field,
    specify_topic_id
  });
  return response;
}
/**
 * @description 删除问题
 * @param {Array} question_ids 问题ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array,data:Array<QuestionModel>}>}
 */
export async function DeleteQuestions({
  question_ids,
  user_token
}) {
  const response = await axios.post('/api/questions/delete', {
    question_ids,
    user_token
  });
  return response;
}

// ==================== Article 文章 ====================

/**
 * @description 添加文章
 * @param {String} title 标题
 * @param {Array} topics 话题列表
 * @param {String} content_markdown 内容Markdown
 * @param {String} content_rendered 内容HTML
 * @param {String} user_token 用户token
 * @returns {Promise<{is_add: Boolean,article: ArticleModel}>}
 */
export async function AddArticle({
  title,
  topics,
  content_markdown,
  content_rendered,
  user_token
}) {
  const response = await axios.post('/api/article/add', {
    title,
    topics,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}
/**
 * @description 获取文章
 * @param {String} article_id 文章ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,article: ArticleModel}>}
 */
export async function GetArticle({
  article_id,
  user_token
}) {
  const response = await axios.post('/api/article/get', {
    article_id,
    user_token
  });
  return response;
}
/**
 * @description 编辑文章
 * @param {String} article_id 文章ID
 * @param {String} title 标题
 * @param {Array} topics 话题列表
 * @param {String} content_markdown 内容Markdown
 * @param {String} content_rendered 内容HTML
 * @param {String} user_token 用户token
 * @returns {Promise<{is_edit: Boolean,article: ArticleModel}>}
 */
export async function EditArticle({
  article_id,
  title,
  topics,
  content_markdown,
  content_rendered,
  user_token
}) {
  const response = await axios.post('/api/article/edit', {
    article_id,
    title,
    topics,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}
/**
 * @description 获取文章列表
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {Boolean} following 是否关注
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @param {String} specify_topic_id 指定话题ID
 * @returns {Promise<DataAndPagination>}
 */
export async function GetArticles({
  order,
  page,
  following,
  user_token,
  per_page,
  search_keywords,
  search_field,
  specify_topic_id
}) {
  const response = await axios.post('/api/articles/get', {
    order,
    page,
    following,
    user_token,
    per_page,
    search_keywords,
    search_field,
    specify_topic_id
  });
  return response;
}
/**
 * @description 删除文章
 * @param {Array} article_ids 文章ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array,data:Array<ArticleModel>}>}
 */
export async function DeleteArticles({
  article_ids,
  user_token
}) {
  const response = await axios.post('/api/articles/delete', {
    article_ids,
    user_token
  });
  return response;
}

// ==================== Answer 回答 ====================

/**
 * @description 添加回答
 * @param {String} question_id 问题ID
 * @param {String} content_markdown 内容Markdown
 * @param {String} content_rendered 内容HTML
 * @param {String} user_token 用户token
 * @returns {Promise<{ is_add: boolean, answer: AnswerModel }>} { is_add: 是否添加成功, answer: 回答 }
 */
export async function AddAnswer({
  question_id,
  content_markdown,
  content_rendered,
  user_token
}) {
  const response = await axios.post('/api/answer/add', {
    question_id,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}
/**
 * @description 获取回答
 * @param {String} answer_id 回答ID
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,answer: AnswerModel}>}
 */
export async function GetAnswer({
  answer_id,
  user_token
}) {
  const response = await axios.post('/api/answer/get', {
    answer_id,
    user_token
  });
  return response;
}
/**
 * @description 编辑回答
 * @param {String} answer_id 回答ID
 * @param {String} content_markdown 内容Markdown
 * @param {String} content_rendered 内容HTML
 * @param {String} user_token 用户token
 * @returns {Promise<{is_edit: Boolean,answer: AnswerModel}>}
 */
export async function EditAnswer({
  answer_id,
  content_markdown,
  content_rendered,
  user_token
}) {
  const response = await axios.post('/api/answer/edit', {
    answer_id,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}
/**
 * @description 获取回答列表
 * @param {String} question_id 问题ID
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {Boolean} following 是否关注
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @returns {Promise<DataAndPagination>}
 */
export async function GetAnswers({
  question_id,
  order,
  page,
  following,
  user_token,
  per_page,
  search_keywords,
  search_field
}) {
  const response = await axios.post('/api/answers/get', {
    question_id,
    order,
    page,
    following,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}
/**
 * @description 删除回答
 * @param {Array} answer_ids 回答ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array,data:Array<AnswerModel>}>}
 */
export async function DeleteAnswers({
  answer_ids,
  user_token
}) {
  const response = await axios.post('/api/answers/delete', {
    answer_ids,
    user_token
  });
  return response;
}

// ==================== Comment 评论 ====================

/**
 * @description 添加评论
 * @param {String} commentable_id 评论ID
 * @param {String} commentable_type 评论类型 用户评论类型：article-文章、answer-答案
 * @param {String} content 内容
 * @param {String} user_token 用户token
 * @returns {Promise<{ is_add: boolean, comment: CommentModel }>} { is_add: 是否添加成功, comment: 评论 }
 */
export async function AddComment({
  commentable_id,
  commentable_type,
  content,
  user_token
}) {
  const response = await axios.post('/api/comment/add', {
    commentable_id,
    commentable_type,
    content,
    user_token
  });
  return response;
}
/**
 * @description 编辑评论
 * @param {String} comment_id 评论ID
 * @param {String} content 内容
 * @param {String} user_token 用户token
 * @returns {Promise<{ is_edit: boolean, comment: CommentModel }>} { is_edit: 是否编辑成功, comment: 评论 }
 */
export async function EditComment({
  comment_id,
  content,
  user_token
}) {
  const response = await axios.post('/api/comment/edit', {
    comment_id,
    content,
    user_token
  });
  return response;
}
/**
 * @description 获取评论列表
 * @param {String} commentable_id 评论对象ID 不可以为0
 * @param {String} commentable_type 评论类型 用户评论类型：article-文章、answer-答案
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @returns {Promise<DataAndPagination>}
 */
export async function GetComments({
  commentable_id,
  commentable_type,
  order,
  page,
  user_token,
  per_page,
  search_keywords,
  search_field
}) {
  if (commentable_id == 0) {
    // console.log('commentable_id==0')
    return
  }
  const response = await axios.post('/api/comments/get', {
    commentable_id,
    commentable_type,
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}
/**
 * @description 删除评论
 * @param {Array} comment_ids 评论ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array,data:Array<CommentModel>}>}
 */
export async function DeleteComments({
  comment_ids,
  user_token
}) {
  const response = await axios.post('/api/comments/delete', {
    comment_ids,
    user_token
  });
  return response;
}

// ==================== Reply 回复 ====================

/**
 * @description 添加回复
 * @param {String} replyable_id 回复ID
 * @param {String} replyable_type 回复类型 用户回复类型：comment-评论、reply-回复
 * @param {String} replyable_comment_id 回复评论ID
 * @param {String} content 内容
 * @param {String} user_token 用户token
 * @param {String} replyable_user_id 回复用户ID
 * @returns {Promise<{ is_add: boolean, reply_id: Number, reply: ReplyModel }>} { is_add: 是否添加成功, reply_id: 回复ID, reply: 回复 N
 */
export async function AddReply({
  replyable_id,
  replyable_type,
  replyable_comment_id,
  content,
  user_token,
  replyable_user_id
}) {
  const response = await axios.post('/api/reply/add', {
    replyable_id,
    replyable_type,
    replyable_comment_id,
    content,
    user_token,
    replyable_user_id
  });
  return response;
}
/**
 * @description 编辑回复
 * @param {String} reply_id 回复ID
 * @param {String} content 内容
 * @param {String} user_token 用户token
 * @returns {Promise<{ is_edit: boolean, reply: ReplyModel }>} { is_edit: 是否编辑成功, reply: 回复 }
 */
export async function EditReply({
  reply_id,
  content,
  user_token
}) {
  const response = await axios.post('/api/reply/edit', {
    reply_id,
    content,
    user_token
  });
  return response;
}
/**
 * @description 获取回复列表
 * @param {String} replyable_comment_id 回复评论ID
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @returns {Promise<DataAndPagination>}
 */
export async function GetReplys({
  replyable_comment_id,
  order,
  page,
  user_token,
  per_page,
  search_keywords,
  search_field
}) {
  const response = await axios.post('/api/replys/get', {
    replyable_comment_id,
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}
/**
 * @description 删除回复
 * @param {Array} reply_ids 回复ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array,data:Array<ReplyModel>}>}
 */
export async function DeleteReplys({
  reply_ids,
  user_token
}) {
  const response = await axios.post('/api/replys/delete', {
    reply_ids,
    user_token
  });
  return response;
}
/**
 * @typedef Vote
 * @property {String} votable_id 投票ID
 * @property {String} votable_type 投票类型 用户点赞类型：article-文章、answer-答案、comment-评论、reply-回复
 * @property {Object} up 点赞
 * @property {Number} up.count 点赞数量
 * @property {Number} up.value 点赞值
 * @property {Object} down 点踩
 * @property {Number} down.count 点踩数量
 * @property {Number} down.value 点踩值
 */
/**
 * @description 投票
 * @param {String} user_token 用户token
 * @param {String} votable_id 投票ID
 * @param {String} votable_type 投票类型 用户点赞类型：article-文章、answer-答案、comment-评论、reply-回复
 * @param {String} type 类型
 * @returns {Promise<{is_add_vote: Boolean,is_sub_vote: VoteModel,vote:Vote}>}
 */
export async function Vote({
  user_token,
  votable_id,
  votable_type,
  type
}) {
  const response = await axios.post('/api/vote', {
    user_token,
    votable_id,
    votable_type,
    type
  });
  return response;
}
/**
 * @typedef AdminDataCount
 * @property {Number} user_count 用户数量
 * @property {Number} user_group_count 用户组数量
 * @property {Number} report_count 举报数量
 * @property {Number} topic_count 话题数量
 * @property {Number} question_count 问题数量
 * @property {Number} answer_count 回答数量
 * @property {Number} article_count 文章数量
 * @property {Number} comment_count 评论数量
 * @property {Number} reply_count 回复数量
 */

// ==================== Admin 管理员 ====================

/**
 * @description 管理员获取数据总数
 * @param {String} user_token 用户token
 * @param {String} time_type 时间类型 last_7_days, this_month, last_month, last_30_days, this_year, last_year, last_1_year, 和指定值如：2025
 * @param {String} model_type 模型类型 user、user_group、report、topic、question、answer、article、comment、reply
 * @param {String} start_timestamp 开始时间戳
 * @param {String} end_timestamp 结束时间戳
 * @returns {Promise<{is_get: Boolean,data:AdminDataCount}>}
 */
export async function GetDataCount({
  user_token
}) {
  const response = await axios.post('/api/admin/data/count', {
    user_token,
  });
  return response;
}
/**
 * @typedef BetweenTimestampsData
 * @property {String} date 日期
 * @property {Number} count 数量
 */
/**
 * @description 管理员数据统计
 * @param user_token 用户token
 * @param time_type 时间类型 last_7_days, this_month, last_month, last_30_days, this_year, last_year, last_1_year, 和指定值如：2025
 * @param model_type 模型类型 user、user_group、report、topic、question、answer、article、comment、reply
 * @returns {Promise<{is_get: Boolean,data:Array<BetweenTimestampsData>,data_count:Number}>}
 */
export async function GetDataBetweenTimestamps({
  user_token,
  time_type,
  model_type
}) {
  const response = await axios.post('/api/admin/data/between_timestamps', {
    user_token,
    time_type,
    model_type
  });
  return response;
}
/**
 * @typedef DataBetweenTimestampsAll
 * @property {boolean} is_get 是否获取
 * @property {Object} data 数据对象（包含多个数组）
 * @property {Array<BetweenTimestampsData>} data.user 用户
 * @property {Array<BetweenTimestampsData>} data.user_group 用户组
 * @property {Array<BetweenTimestampsData>} data.report 举报
 * @property {Array<BetweenTimestampsData>} data.topic 话题
 * @property {Array<BetweenTimestampsData>} data.question 问题
 * @property {Array<BetweenTimestampsData>} data.answer 回答
 * @property {Array<BetweenTimestampsData>} data.article 文章
 * @property {Array<BetweenTimestampsData>} data.comment 评论
 * @property {Array<BetweenTimestampsData>} data.reply 回复
 * @property {number} data_count 数据数量
 */
/**
 * @description 管理员数据统计
 * @param user_token 用户token
 * @param time_type 时间类型 last_7_days, this_month, last_month, last_30_days, this_year, last_year, last_1_year, 和指定值如：2025
 * @param model_type 模型类型 user、user_group、report、topic、question、answer、article、comment、reply
 * @returns {Promise<DataBetweenTimestampsAll>}
 */
export async function GetDataBetweenTimestampsAll({
  user_token,
  time_type
}) {
  const response = await axios.post('/api/admin/data/between_timestamps_all', {
    user_token,
    time_type
  });
  return response;
}
/**
 * @typedef ServerInfo
 * @property {String} OS 操作系统
 * @property {String} PHP_VERSION PHP版本
 * @property {String} WEB_SERVER 服务器
 * @property {String} DB_VERSION 数据库版本
 * @property {String} UPLOAD_MAX_FILESIZE 上传最大文件大小
 * @property {String} MAX_EXECUTION_TIME 最大执行时间
 * @property {String} DISK_FREE_SPACE 磁盘剩余空间
 * @property {String} DB_SIZE 数据库大小
 */
/**
 * @description 获取服务器信息
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,data:ServerInfo}>}
 */
export async function GetServerInfo({
  user_token
}) {
  const response = await axios.post('/api/admin/data/server_info', {
    user_token
  });
  return response;
}
/**
 * @description 获取邮件信息
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,data:MailInfo}>}
 */
export async function GetMailInfo({
  user_token
}) {
  const response = await axios.post('/api/admin/data/mail_info/get', {
    user_token
  });
  return response;
}
/**
 * @description 设置邮件信息
 * @param {String} user_token 用户token
 * @param {Object} mail_info 邮件信息
 * @returns {Promise<{is_set: Boolean,data:MailInfo}>}
 */
export async function SetMailInfo({
  user_token,
  mail_info
}) {
  const response = await axios.post('/api/admin/data/mail_info/set', {
    user_token,
    mail_info
  });
  return response;
}
/**
 * @description 获取OAuth信息
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,data:OauthInfo}>}
 */
export async function GetOauthInfo({
  user_token
}) {
  const response = await axios.post('/api/admin/data/oauth_info/get', {
    user_token
  });
  return response;
}
/**
 * @description 设置OAuth信息
 * @param {String} user_token 用户token
 * @param {Object} oauth_info OAuth信息
 * @returns {Promise<{is_set: Boolean,data:OauthInfo}>}
 */
export async function SetOauthInfo({
  user_token,
  oauth_info
}) {
  const response = await axios.post('/api/admin/data/oauth_info/set', {
    user_token,
    oauth_info
  });
  return response;
}

// ==================== Common 通用 ====================

/**
 * @description 获取应用基本信息
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,data:Object}>}
 */
export async function GetAppBaseInfo({
  user_token
}) {
  const response = await axios.post('/api/common/app_base_info/get', {
    user_token
  });
  return response;
}
/**
 * @description 设置应用基本信息
 * @param {String} user_token 用户token
 * @param {Object} app_base_info 应用基本信息
 * @returns {Promise<{is_set: Boolean,data:Object}>}
 */
export async function SetAppBaseInfo({
  user_token,
  app_base_info
}) {
  const response = await axios.post('/api/common/app_base_info/set', {
    user_token,
    app_base_info
  });
  return response;
}
/**
 * @description 获取语言
 * @param {String} val 语言 zh_CN
 * @returns {Promise<Object>} 返回语言包对象内容
 */
export async function GetLanguage(val) {
  const response = await axios.post(`/api/common/language/${val}`);
  return response;
}

// ==================== UserGroup 用户组 ====================

/**
 * @description 添加用户组
 * @param {Object} user_group_data 用户组数据
 * @param {String} user_token 用户token
 * @returns {Promise<{is_add: Boolean,data:UserGroupModel}>}
 */
export async function AddUserGroup({
  user_group_data,
  user_token
}) {
  const response = await axios.post('/api/user_group/add', {
    user_group_data,
    user_token
  });
  return response;
}
/**
 * @description 获取用户组
 * @param {String} user_group_id 用户组id
 * @param {String} user_token 用户token
 * @returns {Promise<{is_get: Boolean,data:UserGroupModel}>}
 */
export async function GetUserGroup({
  user_group_id,
  user_token,
}) {
  const response = await axios.post('/api/user_group/get', {
    user_group_id,
    user_token,
  });
  return response;
}
/**
 * @description 获取用户组列表
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @param {String} user_token 用户token
 * @returns {Promise<DataAndPagination>}
 */
export async function GetUserGroups({
  order,
  page,
  user_token,
  per_page,
  search_keywords,
  search_field
}) {
  const response = await axios.post('/api/user_groups/get', {
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}
/**
 * @description 编辑用户组
 * @param {String} user_group_id 用户组ID
 * @param {Object} user_group_data 用户组数据
 * @param {String} user_token 用户token
 * @returns {Promise<{is_edit: Boolean,data:UserGroupModel}>}
 */
export async function EditUserGroup({
  user_group_id,
  user_group_data,
  user_token
}) {
  const response = await axios.post('/api/user_group/edit', {
    user_group_id,
    user_group_data,
    user_token
  });
  return response;
}
/**
 * @description 删除用户组
 * @param {Array} user_group_ids 用户组ID列表
 * @param {String} user_token 用户token
 * @returns {Promise<{is_delete: Boolean,delete_ids: Array<String>,data:Array<UserGroupModel>}>}
 */
export async function DeleteUserGroups({
  user_group_ids,
  user_token
}) {
  const response = await axios.post('/api/user_groups/delete', {
    user_group_ids,
    user_token
  });
  return response;
}

// ==================== Report 举报 ====================

/**
 * @description 添加举报
 * @param {String} reportable_id 举报ID
 * @param {String} reportable_type 举报类型 用户举报类型：user-用户、topic-话题、question-问题、article-文章、answer-答案、comment-评论、reply-回复
 * @param {String} user_token 用户token
 * @param {String} reason 原因
 * @returns {Promise<{is_add: Boolean,report:ReportModel}>}
 */
export async function AddReport({
  reportable_id,
  reportable_type,
  user_token,
  reason
}) {
  const response = await axios.post('/api/report/add', {
    reportable_id,
    reportable_type,
    user_token,
    reason
  });
  return response;
}
/**
 * @description 获取举报列表
 * @param {String} order 排序方式
 * @param {Number} page 页码
 * @param {String} user_token 用户token
 * @param {Number} per_page 每页数量
 * @param {String} search_keywords 搜索关键词
 * @param {String} search_field 搜索字段
 * @returns {Promise<DataAndPagination>}
 */
export async function GetReports({
  order,
  page,
  user_token,
  per_page,
  search_keywords,
  search_field
}) {
  const response = await axios.post('/api/reports/get', {
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}
// /**
//  * @description 获取语言信息列表
//  * @returns {Promise<{Object}>} 语言包['zh_CN'=>self::t('Message.langInfo.langname'),'en_US'=>self::t('Message.langInfo.langname')]
//  */
// export async function GetLocaleInfoList() {
//   const response = await axios.post('/api/lang/get/locale/info/list');
//   return response;
// }
/**
 * @description 获取安装信息
 * @returns {Promise<{install: Boolean,step:Number}>}
 */
export async function GetInstallInfoJson() {
  const response = await axios.post('/api/install/get_install_info_json')
  return response;
}
/**
 * @description 设置安装配置
 * @param {String} mysql_database 数据库
 * @param {String} mysql_username 用户名
 * @param {String} mysql_password 密码
 * @param {String} mysql_hostname 主机
 * @param {String} mysql_prefix 前缀
 * @returns {Promise<{is_install: Boolean,data: Object}>} data.install: Boolean,data.step: Number
 */
export async function SetInstallConfig({
  mysql_database,
  mysql_username,
  mysql_password,
  mysql_hostname,
  mysql_prefix
}) {
  const response = await axios.post('/api/install/set_config', {
    mysql_database,
    mysql_username,
    mysql_password,
    mysql_hostname,
    mysql_prefix
  });
  return response;
}
//以下为安装时接口
/**
 * @description 测试邮箱
 * @param {String} smtp_host 主机
 * @param {String} smtp_port 端口
 * @param {String} smtp_secure 安全
 * @param {String} smtp_send_name 发送人
 * @param {String} smtp_username 用户名
 * @param {String} smtp_password 密码
 * @param {String} smtp_email 邮箱
 * @returns {Promise<{install: Boolean,data: Object}>} data.install: Boolean,data.step: Number
 */
export async function TestMail({
  smtp_host,
  smtp_port,
  smtp_secure,
  smtp_send_name,
  smtp_username,
  smtp_password,
  smtp_email
}) {
  const response = await axios.post('/api/install/test_mail', {
    smtp_host,
    smtp_port,
    smtp_secure,
    smtp_send_name,
    smtp_username,
    smtp_password,
    smtp_email
  });
  return response;
}
/**
 * @description 设置邮箱
 * @param {String} smtp_host 主机
 * @param {String} smtp_port 端口
 * @param {String} smtp_secure 安全
 * @param {String} smtp_send_name 发送人
 * @param {String} smtp_username 用户名
 * @param {String} smtp_password 密码
 * @returns {Promise<{mail: Boolean}>}
 */
export async function SetMail({
  smtp_host,
  smtp_port,
  smtp_secure,
  smtp_send_name,
  smtp_username,
  smtp_password
}) {
  const response = await axios.post('/api/install/mail/set', {
    smtp_host,
    smtp_port,
    smtp_secure,
    smtp_send_name,
    smtp_username,
    smtp_password
  });
  return response;
}
/**
 * @description 设置网站信息
 * @param {String} site_name 网站名
 * @param {String} default_language 默认语言
 * @returns {Promise<{web: Boolean}>}
 */
export async function SetWebInfo({
  site_name,
  default_language
}) {
  const response = await axios.post('/api/install/set_web_info', {
    site_name,
    default_language
  });
  return response;
}
/**
 * @description 设置网站完成
 * @returns {Promise<{web: Boolean}>}
 */
export async function SetWebChange() {
  const response = await axios.post('/api/install/set_web_change');
  return response;
}

// /**
//  * @description 获取OAuths
//  * @param {String} user_token 用户token
//  * @return {Promise<{is_get: Boolean,oauths: Array}>}
//  */
// export async function GetOauths({
//   user_token
// }) {
//   const response = await axios.post('/api/oauths/get', {
//     user_token
//   });
//   return response;
// }

/**
 * @description 删除OAuth
 * @param {String} oauth_id OAuth ID
 * @param {String} user_token 用户token
 * @return {Promise<{is_delete: Boolean}>}
 */
export async function DeleteOauth({
  oauth_id,
  user_token
}) {
  const response = await axios.post('/api/user/oauth/delete', {
    oauth_id,
    user_token
  });
  return response;
}

/**
 * 获取OAuth链接
 * @param {string} oauth_name OAuth名称 例如 'github' 或 'microsoft' 或 'google' 或 'sso'
 * @return {string} OAuth链接
 * @description 如果路由中包含 localhost，则使用本地地址，否则使用线上地址
 */
export async function GetOauthLink(oauth_name) {

  //鉴定oauth_name是否存在
  if (!['github', 'microsoft', 'google', 'sso'].includes(oauth_name)) {
    return '';
  }

  // 初始化 oauth 对象（如果不存在）
  if (!window.oauth) {
    window.oauth = {
      github: null,
      microsoft: null,
      google: null,
      sso: null,
    };
  }

  // 如果已经缓存了 OAuth 链接，直接返回
  if (window.oauth[oauth_name]) {
    return window.oauth[oauth_name];
  }

  // 从服务器获取 client_id
  const response = await axios.post('/api/option/get/oauth/client_id', {
    oauth_name: oauth_name
  });

  if (!response.data.is_get || !response.data.client_id) {
    return '';
  }
  window.sso_client_main_name = response.data.sso_client_main_name;

  const client_id = response.data.client_id;

  const isLocalhost = window.location.href.indexOf('localhost') !== -1;

  //回调地址
  const redirectUri = isLocalhost
    ? `http://localhost:83/api/oauth/redirect/${oauth_name}`
    : `${window.location.origin}/api/oauth/redirect/${oauth_name}`;

  // console.log('fkymd')
  // 根据不同的 OAuth 服务生成对应的授权 URL
  let oauthUrl;
  switch (oauth_name) {
    case 'github':
      oauthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&scope=user`;
      break;
    case 'microsoft':
      oauthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20User.Read`;
      break;
    case 'google':
      oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;
      break;
    case 'sso':
      // console.log('fuck you')
      // oauthUrl = `http://a.com/api/sso/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;
      oauthUrl = `${response.data.sso_client_main_url}/api/sso/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;
      break;
    default:
      return '';
  }

  // 缓存生成的 URL
  window.oauth[oauth_name] = oauthUrl;
  return oauthUrl;
}

/**
 * 获取用户自定义设置
 * @param {String} token 令牌
 * @param {String} name 自定义设置名称
 * @return {Promise<{is_get: Boolean, data: mixed, error: string|null}>}
 */
export async function GetUserOption({
  user_token,
  name
}) {
  const response = await axios.post('/api/user/option/get', {
    user_token,
    name
  });
  return response;
}

/**
 * 设置用户自定义设置
 * @param {String} token 令牌
 * @param {String} name 自定义设置名称
 * @param {String} value 自定义设置值
 * @return {Promise<{is_set: Boolean, data: mixed, error: string|null}>}
 */
export async function SetUserOption({
  user_token,
  name,
  value
}) {
  const response = await axios.post('/api/user/option/set', {
    user_token,
    name,
    value
  });
  return response;
}

/**
 * 删除用户自定义设置
 * @param {String} token 令牌
 * @param {String} name 自定义设置名称
 * @return {Promise<{is_delete: Boolean, data: mixed, error: string|null}>}
 */
export async function DeleteUserOption({
  user_token,
  name
}) {
  const response = await axios.post('/api/user/option/delete', {
    user_token,
    name
  });
  return response;
}



/**
 * 对象导出所有函数
 */
export const MDF = {
  // AddClarityScript,
  // PostError,
  // AddActivity,
  // RenewalDomain,
  // scrollToTop,
  // loop,
  // scrollHorizontal,
  IsElectron,
  IsMobileApp,
  SwitchClientTheme,
  OnWindowOpen,
  stringToBase64,
  base64ToString,
  GetCookie,
  SetCookie,
  CheckUpdate,
  // ServeUpdateInfo,
  GetBaseUrl,
  GetUserToken,
  SetUserToken,
  RemoveUserToken,
  GetDatas,
  DeleteDatas,
  Get_G_INDEX_TEXT_PLAYERS,
  Get_G_INDEX_TOPICS,
  Get_G_INDEX_QUESTIONS_RECENT,
  Get_G_INDEX_QUESTIONS_POPULAR,
  Get_G_INDEX_ARTICLES_RECENT,
  Get_G_INDEX_ARTICLES_POPULAR,
  Get_G_INDEX_USERS_RECENT,
  Get_G_INDEX_USERS_POPULAR,
  Get_G_TOPICS_RECOMMENDED,
  Get_G_TOPIC,
  Get_G_QUESTIONS_RECENT,
  Get_G_QUESTIONS_POPULAR,
  Get_G_QUESTION,
  Get_G_QUESTION_ANSWERS,
  Get_G_ARTICLES_RECENT,
  Get_G_ARTICLES_POPULAR,
  Get_G_ARTICLE,
  Get_G_ARTICLE_COMMENTS,
  Get_G_USER,
  Get_G_USER_QUESTIONS,
  Get_G_USER_ANSWERS,
  Get_G_USER_ARTICLES,
  Get_G_USERS_RECOMMENDED,
  GetImageCaptcha,
  SetActivationKey,
  GetActivationKey,
  // GetInfoData,
  SetInfoData,
  GetMailData,
  SetMailData,
  GetThemeData,
  GetCurrentTheme,
  SetCurrentTheme,
  GetAllOptions,
  GetOption,
  SetOption,
  // SetThemeColorParamJson,
  // GetThemeColorParamJson,
  // SetThemeTypedParamJson,
  // GetThemeTypedParamJson,
  ResetAvatar,
  ResetCover,
  GetEmailCaptcha,
  AutoLogin,
  Register,
  Login,
  Reset,
  GetUser,
  Follow,
  GetFollowMutualAttentionList,
  EditInfo,
  UploadAvatar,
  UploadCover,
  GetUserQuestions,
  GetUserAnswers,
  GetUserArticles,
  UploadImage,
  GetUserInteractionNotifications,
  SetUserLanguage,
  GetUsers,
  SetUsersUserGroup,
  SetUsersDisableTime,
  GetFollows,
  AddTopic,
  EditTopic,
  GetTopic,
  GetTopics,
  DeleteTopics,
  AddQuestion,
  GetQuestion,
  EditQuestion,
  GetQuestions,
  DeleteQuestions,
  AddArticle,
  GetArticle,
  EditArticle,
  GetArticles,
  DeleteArticles,
  AddAnswer,
  GetAnswer,
  EditAnswer,
  GetAnswers,
  DeleteAnswers,
  AddComment,
  EditComment,
  GetComments,
  DeleteComments,
  AddReply,
  EditReply,
  GetReplys,
  DeleteReplys,
  Vote,
  GetDataCount,
  GetDataBetweenTimestamps,
  GetDataBetweenTimestampsAll,
  GetServerInfo,
  AddUserGroup,
  GetUserGroup,
  GetUserGroups,
  EditUserGroup,
  DeleteUserGroups,
  AddReport,
  GetReports,
  // GetLocaleInfoList,
  GetInstallInfoJson,
  SetInstallConfig,
  TestMail,
  SetMail,
  SetWebInfo,
  SetWebChange,
  GetLanguage
}

//将MDF设置为全局变量
// window.MDF = MDF;
// console.log(window.MDF);
// if(window.MDF!=null){
//   alert('控制台MDF对象已就绪，你可以在控制台中调用对象中的所有方法，脚本引入方式：<script type="module" src="https://mdfdocx.xbedrock.com/global-doc.js"> </script>')
// }
// if(axios!=null){
//   alert('控制台axios对象已就绪，你可以在控制台中调用对象中的所有方法，脚本引入方式：<script type="module" src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"> </script>')
// }