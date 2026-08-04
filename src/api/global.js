import axios from 'axios';
import cookies from 'vue-cookies';
import { getCurrentWindow } from "@tauri-apps/api/window";
// import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

// const MainCheckServer = 'aHR0cDovL2xvY2FsaG9zdDo4My9hcGkvYw==';//http://localhost:83/api/c
// const MainCheckServer = 'aHR0cHM6Ly9tZGYueGJlZHJvY2suY29tL2FwaS9j';//https://demo.xbedrock.com/api/c

// 自动检测运行环境（无需手动修改）
const Is_Tauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
const Is_Electron = typeof window !== 'undefined' && 'electronAPI' in window
const Is_MobileApp = typeof window !== 'undefined' && 'mobileAppAPI' in window

console.log('当前环境', process.env.NODE_ENV);
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
console.log('axios.defaults.baseURL', axios.defaults.baseURL);
console.log('window.location.href', window.location.href);

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
  return null;
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
  return null;
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

// ==================== 以下为杂项 ====================

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

// ==================== Admin 管理员 ====================

/**
 * GetDataCount
 * @param {*} user_token
 */
export async function GetDataCount({ user_token }) {
  const response = await axios.post(`/api/admin/data/count`, {
    user_token
  });
  return response;
}

/**
 * GetDataBetweenTimestamps
 * @param {*} user_token
 * @param {*} time_type
 * @param {*} model_type
 */
export async function GetDataBetweenTimestamps({ user_token, time_type, model_type }) {
  const response = await axios.post(`/api/admin/data/between_timestamps`, {
    user_token,
    time_type,
    model_type
  });
  return response;
}

/**
 * GetDataBetweenTimestampsAll
 * @param {*} user_token
 * @param {*} time_type
 */
export async function GetDataBetweenTimestampsAll({ user_token, time_type }) {
  const response = await axios.post(`/api/admin/data/between_timestamps_all`, {
    user_token,
    time_type
  });
  return response;
}

/**
 * GetServerInfo
 * @param {*} user_token
 */
export async function GetServerInfo({ user_token }) {
  const response = await axios.post(`/api/admin/data/server_info`, {
    user_token
  });
  return response;
}

/**
 * GetMailConfig
 * @param {*} user_token
 */
export async function GetMailConfig({ user_token }) {
  const response = await axios.post(`/api/admin/data/mail_info/get`, {
    user_token
  });
  return response;
}

/**
 * SetMailConfig
 * @param {*} user_token
 * @param {*} mail_info
 */
export async function SetMailConfig({ user_token, mail_info }) {
  const response = await axios.post(`/api/admin/data/mail_info/set`, {
    user_token,
    mail_info
  });
  return response;
}

/**
 * GetOauthConfig
 * @param {*} user_token
 */
export async function GetOauthConfig({ user_token }) {
  const response = await axios.post(`/api/admin/data/oauth_info/get`, {
    user_token
  });
  return response;
}

/**
 * SetOauthConfig
 * @param {*} user_token
 * @param {*} oauth_info
 */
export async function SetOauthConfig({ user_token, oauth_info }) {
  const response = await axios.post(`/api/admin/data/oauth_info/set`, {
    user_token,
    oauth_info
  });
  return response;
}

// ==================== Common 通用 ====================

/**
 * GetAppBaseInfo
 * @param {*} user_token
 */
export async function GetAppBaseInfo({ user_token }) {
  const response = await axios.post(`/api/common/app_base_info/get`, {
    user_token
  });
  return response;
}

/**
 * SetAppBaseInfo
 * @param {*} user_token
 * @param {*} app_base_info
 */
export async function SetAppBaseInfo({ user_token, app_base_info }) {
  const response = await axios.post(`/api/common/app_base_info/set`, {
    user_token,
    app_base_info
  });
  return response;
}

/**
 * GetLanguage
 * @param {string} val - 路由参数
 */
export async function GetLanguage( val ) {
  const response = await axios.post(`/api/common/language/${val}`);
  return response;
}

/**
 * checkUpdate
 * @param {*} user_token
 */
export async function checkUpdate({ user_token }) {
  const response = await axios.post(`/api/update/check`, {
    user_token
  });
  return response;
}

// ==================== Answer 回答 ====================

/**
 * AddAnswer
 * @param {*} question_id
 * @param {*} content_markdown
 * @param {*} content_rendered
 * @param {*} user_token
 */
export async function AddAnswer({ question_id, content_markdown, content_rendered, user_token }) {
  const response = await axios.post(`/api/answer/add`, {
    question_id,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}

/**
 * EditAnswer
 * @param {*} answer_id
 * @param {*} content_markdown
 * @param {*} content_rendered
 * @param {*} user_token
 */
export async function EditAnswer({ answer_id, content_markdown, content_rendered, user_token }) {
  const response = await axios.post(`/api/answer/edit`, {
    answer_id,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}

/**
 * GetAnswer
 * @param {*} answer_id
 * @param {*} user_token
 */
export async function GetAnswer({ answer_id, user_token }) {
  const response = await axios.post(`/api/answer/get`, {
    answer_id,
    user_token
  });
  return response;
}

/**
 * DeleteAnswers
 * @param {*} answer_ids
 * @param {*} user_token
 */
export async function DeleteAnswers({ answer_ids, user_token }) {
  const response = await axios.post(`/api/answers/delete`, {
    answer_ids,
    user_token
  });
  return response;
}

/**
 * GetAnswers
 * @param {*} question_id
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 */
export async function GetAnswers({ question_id, order, page, user_token, per_page = 20, search_keywords = '', search_field = [] }) {
  const response = await axios.post(`/api/answers/get`, {
    question_id,
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}

// ==================== Article 文章 ====================

/**
 * AddArticle
 * @param {*} title
 * @param {*} topics
 * @param {*} content_markdown
 * @param {*} content_rendered
 * @param {*} user_token
 */
export async function AddArticle({ title, topics, content_markdown, content_rendered, user_token }) {
  const response = await axios.post(`/api/article/add`, {
    title,
    topics,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}

/**
 * EditArticle
 * @param {*} article_id
 * @param {*} title
 * @param {*} topics
 * @param {*} content_markdown
 * @param {*} content_rendered
 * @param {*} user_token
 */
export async function EditArticle({ article_id, title, topics, content_markdown, content_rendered, user_token }) {
  const response = await axios.post(`/api/article/edit`, {
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
 * GetArticle
 * @param {*} article_id
 * @param {*} user_token
 */
export async function GetArticle({ article_id, user_token }) {
  const response = await axios.post(`/api/article/get`, {
    article_id,
    user_token
  });
  return response;
}

/**
 * DeleteArticles
 * @param {*} article_ids
 * @param {*} user_token
 */
export async function DeleteArticles({ article_ids, user_token }) {
  const response = await axios.post(`/api/articles/delete`, {
    article_ids,
    user_token
  });
  return response;
}

/**
 * GetArticles
 * @param {*} order
 * @param {*} page
 * @param {*} following = false
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 * @param {*} specify_topic_id = ''
 */
export async function GetArticles({ order, page, following = false, user_token, per_page = 20, search_keywords = '', search_field = [], specify_topic_id = '' }) {
  const response = await axios.post(`/api/articles/get`, {
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

// ==================== Comment 评论 ====================

/**
 * AddComment
 * @param {*} commentable_id
 * @param {*} commentable_type
 * @param {*} content
 * @param {*} user_token
 */
export async function AddComment({ commentable_id, commentable_type, content, user_token }) {
  const response = await axios.post(`/api/comment/add`, {
    commentable_id,
    commentable_type,
    content,
    user_token
  });
  return response;
}

/**
 * EditComment
 * @param {*} comment_id
 * @param {*} content
 * @param {*} user_token
 */
export async function EditComment({ comment_id, content, user_token }) {
  const response = await axios.post(`/api/comment/edit`, {
    comment_id,
    content,
    user_token
  });
  return response;
}

/**
 * DeleteComments
 * @param {*} comment_ids
 * @param {*} user_token
 */
export async function DeleteComments({ comment_ids, user_token }) {
  const response = await axios.post(`/api/comments/delete`, {
    comment_ids,
    user_token
  });
  return response;
}

/**
 * GetComments
 * @param {*} commentable_id
 * @param {*} commentable_type
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 */
export async function GetComments({ commentable_id, commentable_type, order, page, user_token, per_page = 20, search_keywords = '', search_field = [] }) {
  const response = await axios.post(`/api/comments/get`, {
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

// ==================== Follow 关注 ====================

/**
 * GetFollows
 * @param {*} modes
 * @param {*} followable_type
 * @param {*} followable_id
 * @param {*} page = 1
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} is_admin = false
 */
export async function GetFollows({ modes, followable_type, followable_id, page = 1, user_token, per_page = 20, is_admin = false }) {
  const response = await axios.post(`/api/follows/get`, {
    modes,
    followable_type,
    followable_id,
    page,
    user_token,
    per_page,
    is_admin
  });
  return response;
}

// ==================== Question 提问 ====================

/**
 * AddQuestion
 * @param {*} title
 * @param {*} topics
 * @param {*} content_markdown
 * @param {*} content_rendered
 * @param {*} user_token
 */
export async function AddQuestion({ title, topics, content_markdown, content_rendered, user_token }) {
  const response = await axios.post(`/api/question/add`, {
    title,
    topics,
    content_markdown,
    content_rendered,
    user_token
  });
  return response;
}

/**
 * EditQuestion
 * @param {*} question_id
 * @param {*} title
 * @param {*} topics
 * @param {*} content_markdown
 * @param {*} content_rendered
 * @param {*} user_token
 */
export async function EditQuestion({ question_id, title, topics, content_markdown, content_rendered, user_token }) {
  const response = await axios.post(`/api/question/edit`, {
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
 * GetQuestion
 * @param {*} question_id
 * @param {*} user_token
 */
export async function GetQuestion({ question_id, user_token }) {
  const response = await axios.post(`/api/question/get`, {
    question_id,
    user_token
  });
  return response;
}

/**
 * DeleteQuestions
 * @param {*} question_ids
 * @param {*} user_token
 */
export async function DeleteQuestions({ question_ids, user_token }) {
  const response = await axios.post(`/api/questions/delete`, {
    question_ids,
    user_token
  });
  return response;
}

/**
 * GetQuestions
 * @param {*} order
 * @param {*} page
 * @param {*} following = false
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 * @param {*} specify_topic_id = ''
 */
export async function GetQuestions({ order, page, following = false, user_token, per_page = 20, search_keywords = '', search_field = [], specify_topic_id = '' }) {
  const response = await axios.post(`/api/questions/get`, {
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

// ==================== Reply 回复 ====================

/**
 * AddReply
 * @param {*} replyable_id
 * @param {*} replyable_type
 * @param {*} replyable_comment_id
 * @param {*} content
 * @param {*} user_token
 * @param {*} replyable_user_id = 0
 */
export async function AddReply({ replyable_id, replyable_type, replyable_comment_id, content, user_token, replyable_user_id = 0 }) {
  const response = await axios.post(`/api/reply/add`, {
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
 * EditReply
 * @param {*} reply_id
 * @param {*} content
 * @param {*} user_token
 */
export async function EditReply({ reply_id, content, user_token }) {
  const response = await axios.post(`/api/reply/edit`, {
    reply_id,
    content,
    user_token
  });
  return response;
}

/**
 * DeleteReplys
 * @param {*} reply_ids
 * @param {*} user_token
 */
export async function DeleteReplys({ reply_ids, user_token }) {
  const response = await axios.post(`/api/replys/delete`, {
    reply_ids,
    user_token
  });
  return response;
}
/**
 * GetReplys
 * @param {*} replyable_comment_id
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 */
export async function GetReplys({ replyable_comment_id, order, page, user_token, per_page = 20, search_keywords = '', search_field = [] }) {
  const response = await axios.post(`/api/replys/get`, {
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

// ==================== Report 举报 ====================

/**
 * AddReport
 * @param {*} reportable_id
 * @param {*} reportable_type
 * @param {*} user_token
 * @param {*} reason
 */
export async function AddReport({ reportable_id, reportable_type, user_token, reason }) {
  const response = await axios.post(`/api/report/add`, {
    reportable_id,
    reportable_type,
    user_token,
    reason
  });
  return response;
}

/**
 * GetReports
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 */
export async function GetReports({ order, page, user_token, per_page = 20, search_keywords = '', search_field = [] }) {
  const response = await axios.post(`/api/reports/get`, {
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}

// ==================== Topic 话题 ====================

/**
 * AddTopic
 * @param {*} name
 * @param {*} description
 * @param {*} cover = ''
 * @param {*} user_token
 */
export async function AddTopic({ name, description, cover = '', user_token }) {
  const response = await axios.post(`/api/topic/add`, {
    name,
    description,
    cover,
    user_token
  });
  return response;
}

/**
 * EditTopic
 * @param {*} topic_id
 * @param {*} name
 * @param {*} description
 * @param {*} cover = ''
 * @param {*} user_token
 */
export async function EditTopic({ topic_id, name, description, cover = '', user_token }) {
  const response = await axios.post(`/api/topic/edit`, {
    topic_id,
    name,
    description,
    cover,
    user_token
  });
  return response;
}

/**
 * GetTopic
 * @param {*} topic_id
 * @param {*} user_token
 */
export async function GetTopic({ topic_id, user_token }) {
  const response = await axios.post(`/api/topic/get`, {
    topic_id,
    user_token
  });
  return response;
}

/**
 * DeleteTopics
 * @param {*} topic_ids
 * @param {*} user_token
 */
export async function DeleteTopics({ topic_ids, user_token }) {
  const response = await axios.post(`/api/topics/delete`, {
    topic_ids,
    user_token
  });
  return response;
}

/**
 * GetTopics
 * @param {*} order
 * @param {*} page
 * @param {*} following = false
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 */
export async function GetTopics({ order, page, following = false, user_token, per_page = 20, search_keywords = '', search_field = [] }) {
  const response = await axios.post(`/api/topics/get`, {
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

// ==================== UserGroup 用户组 ====================

/**
 * AddUserGroup
 * @param {*} user_group_data
 * @param {*} user_token
 */
export async function AddUserGroup({ user_group_data, user_token }) {
  const response = await axios.post(`/api/user_group/add`, {
    user_group_data,
    user_token
  });
  return response;
}

/**
 * EditUserGroup
 * @param {*} user_group_id
 * @param {*} user_group_data
 * @param {*} user_token
 */
export async function EditUserGroup({ user_group_id, user_group_data, user_token }) {
  const response = await axios.post(`/api/user_group/edit`, {
    user_group_id,
    user_group_data,
    user_token
  });
  return response;
}

/**
 * GetUserGroup
 * @param {*} user_group_id
 * @param {*} user_token
 */
export async function GetUserGroup({ user_group_id, user_token }) {
  const response = await axios.post(`/api/user_group/get`, {
    user_group_id,
    user_token
  });
  return response;
}

/**
 * DeleteUserGroups
 * @param {*} user_group_ids
 * @param {*} user_token
 */
export async function DeleteUserGroups({ user_group_ids, user_token }) {
  const response = await axios.post(`/api/user_groups/delete`, {
    user_group_ids,
    user_token
  });
  return response;
}

/**
 * GetUserGroups
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 */
export async function GetUserGroups({ order, page, user_token, per_page = 20, search_keywords = '', search_field = [] }) {
  const response = await axios.post(`/api/user_groups/get`, {
    order,
    page,
    user_token,
    per_page,
    search_keywords,
    search_field
  });
  return response;
}

// ==================== User 用户 ====================

/**
 * GetUserOauthBindings
 * @param {*} user_token
 */
export async function GetUserOauthBindings({ user_token }) {
  const response = await axios.post(`/api/user/oauths/get`, {
    user_token
  });
  return response;
}

/**
 * DeleteOauth
 * @param {*} user_token
 * @param {*} oauth_id
 */
export async function DeleteOauth({ user_token, oauth_id }) {
  const response = await axios.post(`/api/user/oauth/delete`, {
    user_token,
    oauth_id
  });
  return response;
}

/**
 * GetUserAnswers
 * @param {*} user_id
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 */
export async function GetUserAnswers({ user_id, order, page, user_token, per_page = 20 }) {
  const response = await axios.post(`/api/user/answers/get`, {
    user_id,
    order,
    page,
    user_token,
    per_page
  });
  return response;
}

/**
 * GetUserArticles
 * @param {*} user_id
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 */
export async function GetUserArticles({ user_id, order, page, user_token, per_page = 20 }) {
  const response = await axios.post(`/api/user/articles/get`, {
    user_id,
    order,
    page,
    user_token,
    per_page
  });
  return response;
}

/**
 * Auto_Login
 * @param {*} user_token
 */
export async function Auto_Login({ user_token }) {
  const response = await axios.post(`/api/user/auto_login`, {
    user_token
  });
  return response;
}

/**
 * ResetAvatar
 * @param {*} user_id
 * @param {*} user_token
 */
export async function ResetAvatar({ user_id, user_token }) {
  const response = await axios.post(`/api/user/avatar/reset`, {
    user_id,
    user_token
  });
  return response;
}

/**
 * UploadAvatar
 * @param {*} user_token
 * @param {*} avatar
 */
export async function UploadAvatar({ user_token, avatar }) {
  const response = await axios.post(`/api/user/avatar/upload`, {
    user_token,
    avatar
  });
  return response;
}

/**
 * ResetCover
 * @param {*} user_id
 * @param {*} user_token
 */
export async function ResetCover({ user_id, user_token }) {
  const response = await axios.post(`/api/user/cover/reset`, {
    user_id,
    user_token
  });
  return response;
}

/**
 * UploadCover
 * @param {*} user_token
 * @param {*} cover
 */
export async function UploadCover({ user_token, cover }) {
  const response = await axios.post(`/api/user/cover/upload`, {
    user_token,
    cover
  });
  return response;
}

/**
 * EditInfo
 * @param {*} email
 * @param {*} username
 * @param {*} user_group_id
 * @param {*} headline
 * @param {*} blog
 * @param {*} company
 * @param {*} location
 * @param {*} bio
 * @param {*} user_token
 * @param {*} edit_target_user_id
 */
export async function EditInfo({ email, username, user_group_id, headline, blog, company, location, bio, user_token, edit_target_user_id }) {
  const response = await axios.post(`/api/user/editinfo`, {
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
 * GetEmailCaptcha
 * @param {*} email
 * @param {*} lang = ''
 */
export async function GetEmailCaptcha({ email, lang = '' }) {
  email = stringToBase64(email);
  lang = stringToBase64(lang);
  const response = await axios.post(`/api/user/email_captcha`, {
    email,
    lang
  });
  return response;
}

/**
 * Follow
 * @param {*} user_token
 * @param {*} followable_type
 * @param {*} followable_id
 */
export async function Follow({ user_token, followable_type, followable_id }) {
  const response = await axios.post(`/api/user/follow`, {
    user_token,
    followable_type,
    followable_id
  });
  return response;
}

/**
 * GetFollowMutualAttentionList
 * @param {*} user_token
 * @param {*} page = 1
 * @param {*} per_page = 20
 */
export async function GetFollowMutualAttentionList({ user_token, page = 1, per_page = 20 }) {
  const response = await axios.post(`/api/user/follow/contacts`, {
    user_token,
    page,
    per_page
  });
  return response;
}

/**
 * GetUser
 * @param {*} user_id
 * @param {*} user_token
 * @param {*} is_admin = false
 */
export async function GetUser({ user_id, user_token, is_admin = false }) {
  const response = await axios.post(`/api/user/get`, {
    user_id,
    user_token,
    is_admin
  });
  return response;
}

/**
 * Login
 * @param {*} username_or_email
 * @param {*} password
 * @param {*} image_captcha = ''
 * @param {*} captcha_key = ''
 */
export async function Login({ username_or_email, password, image_captcha = ''}) {
  password = stringToBase64(password);
  image_captcha = image_captcha ? stringToBase64(image_captcha) : '';
  const response = await axios.post(`/api/user/login`, {
    username_or_email,
    password,
    image_captcha
  });
  return response;
}

/**
 * DeleteNotification
 * @param {*} user_token
 * @param {*} notification_id
 */
export async function DeleteNotification({ user_token, notification_id }) {
  const response = await axios.post(`/api/user/notification/delete`, {
    user_token,
    notification_id
  });
  return response;
}

/**
 * DeleteAllNotifications
 * @param {*} user_token
 */
export async function DeleteAllNotifications({ user_token }) {
  const response = await axios.post(`/api/user/notifications/delete/all`, {
    user_token
  });
  return response;
}

/**
 * GetUserInteractionNotifications
 * @param {*} user_token
 * @param {*} order
 * @param {*} page
 * @param {*} per_page = 20
 */
export async function GetUserInteractionNotifications({ user_token, order, page, per_page = 20 }) {
  const response = await axios.post(`/api/user/notifications/get`, {
    user_token,
    order,
    page,
    per_page
  });
  return response;
}

/**
 * DeleteUserOption
 * @param {*} user_token
 * @param {*} name
 */
export async function DeleteUserOption({ user_token, name }) {
  const response = await axios.post(`/api/user/option/delete`, {
    user_token,
    name
  });
  return response;
}

/**
 * GetUserOption
 * @param {*} user_token
 * @param {*} name
 */
export async function GetUserOption({ user_token, name }) {
  const response = await axios.post(`/api/user/option/get`, {
    user_token,
    name
  });
  return response;
}

/**
 * SetUserOption
 * @param {*} user_token
 * @param {*} name
 * @param {*} value = []
 */
export async function SetUserOption({ user_token, name, value = [] }) {
  const response = await axios.post(`/api/user/option/set`, {
    user_token,
    name,
    value
  });
  return response;
}

/**
 * GetUserQuestions
 * @param {*} user_id
 * @param {*} order
 * @param {*} page
 * @param {*} user_token
 * @param {*} per_page = 20
 */
export async function GetUserQuestions({ user_id, order, page, user_token, per_page = 20 }) {
  const response = await axios.post(`/api/user/questions/get`, {
    user_id,
    order,
    page,
    user_token,
    per_page
  });
  return response;
}

/**
 * AddUser
 * @param {*} email
 * @param {*} password
 * @param {*} email_captcha
 * @param {*} username = ''
 * @param {*} language = ''
 */
export async function AddUser({ email, password, email_captcha, username = '', language = '' }) {
  email = stringToBase64(email);
  password = stringToBase64(password);
  email_captcha = stringToBase64(email_captcha);
  const response = await axios.post(`/api/user/register`, {
    email,
    password,
    email_captcha,
    username,
    language
  });
  return response;
}

/**
 * Reset
 * @param {*} email
 * @param {*} password
 * @param {*} email_captcha
 */
export async function Reset({ email, password, email_captcha }) {
  email = stringToBase64(email);
  password = stringToBase64(password);
  email_captcha = stringToBase64(email_captcha);
  const response = await axios.post(`/api/user/reset`, {
    email,
    password,
    email_captcha
  });
  return response;
}

/**
 * SetUserLanguage
 * @param {*} user_token
 * @param {*} lang
 */
export async function SetUserLanguage({ user_token, lang }) {
  const response = await axios.post(`/api/user/set/language`, {
    user_token,
    lang
  });
  return response;
}

/**
 * UploadImage
 * @param {*} user_token
 * @param {*} type
 * @param {*} image
 */
export async function UploadImage({ user_token, type, image }) {
  const response = await axios.post(`/api/user/upload/image`, {
    user_token,
    type,
    file: image
  });
  return response;
}

/**
 * SetUsersDisableTime
 * @param {*} user_token
 * @param {*} user_ids
 * @param {*} disable_time = 0
 */
export async function SetUsersDisableTime({ user_token, user_ids, disable_time = 0 }) {
  const response = await axios.post(`/api/users/delete`, {
    user_token,
    user_ids,
    disable_time
  });
  return response;
}

/**
 * GetUsers
 * @param {*} order
 * @param {*} page = 1
 * @param {*} type = 'recommended'
 * @param {*} user_token
 * @param {*} per_page = 20
 * @param {*} search_keywords = ''
 * @param {*} search_field = []
 * @param {*} is_admin = false
 */
export async function GetUsers({ order, page = 1, type = 'recommended', user_token, per_page = 20, search_keywords = '', search_field = [], is_admin = false }) {
  const response = await axios.post(`/api/users/get`, {
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
 * SetUsersUserGroup
 * @param {*} user_token
 * @param {*} user_group_id
 * @param {*} old_user_group_id
 * @param {*} user_ids
 */
export async function SetUsersUserGroup({ user_token, user_group_id, old_user_group_id, user_ids }) {
  const response = await axios.post(`/api/users/user_group/set`, {
    user_token,
    user_group_id,
    old_user_group_id,
    user_ids
  });
  return response;
}

// ==================== Vote 投票 ====================

/**
 * Vote
 * @param {*} user_token
 * @param {*} votable_id
 * @param {*} votable_type
 * @param {*} type
 */
export async function Vote({ user_token, votable_id, votable_type, type }) {
  const response = await axios.post(`/api/vote`, {
    user_token,
    votable_id,
    votable_type,
    type
  });
  return response;
}
