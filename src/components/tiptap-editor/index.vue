<template>
  <div class="set-editor-content">
    <EditorContent :editor="editor" />
  </div>
</template>
<script>
import 'highlight.js/styles/github.css';
import { all, createLowlight } from 'lowlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import {TextStyle} from '@tiptap/extension-text-style'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

// import Table from '@tiptap/extension-table'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'

import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'

import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'

import CodeBlockComponent from '@/components/md-editor/components/code-block/index.vue'
// import CodeBlockComponent from './code-block/index.vue'

// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {
  GetBaseUrl,
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js'
const lowlight = createLowlight(all)
export default {
  name: 'tiptap-editor',
  props: {
    content: {
      String,
      default: '',
    },
    editable: {
      Boolean,
      default: true,
    }
  },
  components: {
    EditorContent,
  },
  data: () => ({
    editor: null,
    _content: '',
  }),
  mounted() {
  },
  methods: {

  },
  created() {
    // console.log('content', this.content)
    this._content = this.content

    if(IsTauri()||IsMobileApp()){//适配
      //把_content里面的/public/static/替换为 GetBaseUrl() + '/public/static/'
      const regex = '/public/static/';
      const newBaseUrl = GetBaseUrl() + '/public/static/';
      this._content = this._content.replaceAll(regex, newBaseUrl)
      // console.log('this._content', this._content)
    }

    var selfs = this
    this.editor = new Editor({
      extensions: [
        Link.configure({
          openon_click: false,
          autolink: true,
          linkOnPaste: true,
        }),
        Image.configure({
          HTMLAttributes: {
            // class: 'fancybox-image', // 直接添加 class 属性
            'data-fancybox': 'gallery',
          },
        }),
        StarterKit,
        Color,
        TextStyle,
        CodeBlockLowlight.extend({
          addNodeView() {
            return VueNodeViewRenderer(CodeBlockComponent)
          },
        }).configure({ lowlight }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Document,
        Paragraph,
        Text,
        Heading,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Typography,
        Details.configure({
          persist: true,
          HTMLAttributes: {
            class: 'details',
          },
        }),
        DetailsSummary,
        DetailsContent,
      ],
      // content: JSON.parse(selfs.content),//使用JSON存储
      content: selfs._content,
      // content: '',
      onUpdate: ({ editor }) => {
      },
    })
    this.editor.setEditable(this.editable)
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  watch: {
    // content: {
    //   handler(val) {
    //     this.editor.commands.setContent(val)
    //     // console.log('content', val)
    //   },
    //   deep: true,
    // },
    // editable: {
    //   handler(val) {
    //     this.editor.setEditable(val)
    //   },
    //   deep: true,
    // }
    content(val) {
      if (val) {
        this._content = val
        if(IsTauri()||IsMobileApp()){//适配
          //把_content里面的/public/static/替换为 GetBaseUrl() + '/public/static/'// 确保正则表达式正确且全局匹配
          const regex = '/public/static/';
          const newBaseUrl = GetBaseUrl() + '/public/static/';
          // 执行替换
          this._content = this._content.replaceAll(regex, newBaseUrl);
          // console.log('this._content', this._content)
        }
        this.editor.commands.setContent(this._content)
      }
    },
    editable(val) {
      this.editor.setEditable(val)
    },
  },
}
</script>
<style lang="less">
.set-editor-content {
  @import './index.less';

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  pre {
    outline: none;
    box-shadow: none;
    font-family: 'JetBrainsMono', monospace;

    //适配mdui
    // border-radius: 8px;
    // background-color: var(--mdui-color-secondary-container) !important;

    // .language-javascript,
    code {
      background-color: rgba(247, 247, 249, 0) !important;
      padding-left: 6px;
      padding-right: 6px;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>