<template>
  <v-menu v-model="table_menu" :close-on-content-click="false" :close-on-click="false" :nudge-width="200" offset-x>

    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded="lg"  text title="表格" v-bind="attrs" v-on="on" :small="$vuetify.breakpoint.name == 'xs' || vmodel != 'maximize'"
        icon>
        <v-icon>mdi-table</v-icon>
      </v-btn>
    </template>

    <v-card>
      <div class="button-group">
        <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
          插入表格
        </button>
        <button
          @click="editor.chain().focus().insertContent(tableHTML, { parseOptions: { preserveWhitespace: false } }).run()">
          插入HTML表格
        </button>
        <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
          在左侧添加列
        </button>
        <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
          在右侧添加列
        </button>
        <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
          删除列
        </button>
        <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
          在上方添加行
        </button>
        <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
          在下方添加行
        </button>
        <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
          删除行
        </button>
        <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
          删除表格
        </button>
        <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
          合并单元格
        </button>
        <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
          拆分单元格
        </button>
        <button @click="editor.chain().focus().toggleHeaderColumn().run()"
          :disabled="!editor.can().toggleHeaderColumn()">
          切换标题列
        </button>
        <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
          切换标题行
        </button>
        <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
          切换标题单元格
        </button>
        <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
          合并或拆分
        </button>
        <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"
          :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
          设置单元格属性
        </button>
        <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
          修复表格
        </button>
        <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">
          移至下一单元格
        </button>
        <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">
          移至上一单元格
        </button>
      </div>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'table-menu',
  data: () => ({
    table_menu: false,
  }),
}
</script>