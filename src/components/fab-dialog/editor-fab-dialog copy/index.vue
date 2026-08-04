<template>
  <TemplateFabDialog :model="model" @model="model = $event;" :title="title" :appbar_extended="false" :icon="icon"
    >
    <!-- appbar_density="compact" -->
    <!-- <template v-slot:appbar_append>
      1
    </template> -->
    <!-- <template v-slot:appbar_append>
      <v-btn icon @click="">
        <v-icon>
          mdi-minus
        </v-icon>
        <v-tooltip activator="parent" location="left">{{ 
          $t('Message.Components.Editor.Minimize') 
        }}</v-tooltip>
      </v-btn>
    </template> -->
    <template v-slot:content>
      <!-- <v-card-text style="height: 100vh;"> -->
      <v-card style="height: 100%;" rounded="0">
        <v-card-text style="height: calc(100% - 60px);">
          <!-- hide-details density="comfortable"-->

          <v-text-field v-if="showTitle" autocomplete="off" v-model="mdTitle" color="primary"
            :placeholder="$t('Message.Components.Editor.PleaseEnterATitle')" variant="underlined" :rules="[
              v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
              v => (v || '').length <= 40 || $t('Message.Components.Account.MaxLengthExceeded')
            ]"></v-text-field>

          <TopicSelectDialogV1 v-if="showTopics" :topics="mdTopics" @topics="
            (val) => selectTopicIds = val
          "></TopicSelectDialogV1>



          <div style="overflow: auto;">
            <template v-if="!table_menu" class="editor-toolbar">

              <v-menu offset-y max-width="350" transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <!-- style="margin-right: 8px;" -->
                  <v-btn variant="text" :title="$t('Message.Components.Editor.More')" :size="EditorToolbarBtnSmallRule"
                    v-bind="props" icon>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                    <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.More')
                    }}</v-tooltip>
                  </v-btn>
                </template>

                <!-- 暂时不限制高度  style="max-height: 260px;"-->
                <v-list rounded="lg" density="compact">

                  <v-list-item @click="table_menu = !table_menu">
                    <template v-slot:prepend>
                      <v-icon>mdi-table</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.Table') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="addImage()">
                    <template v-slot:prepend>
                      <v-icon>mdi-image</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.AddImage') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
                    <template v-slot:prepend>
                      <v-icon>mdi-link-variant</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.AddLink') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item :disabled="!editor.isActive('link')" @click="editor.chain().focus().unsetLink().run()">
                    <template v-slot:prepend>
                      <v-icon>mdi-link-variant-off</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.UnsetLink') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().setHorizontalRule().run()">
                    <template v-slot:prepend>
                      <v-icon>mdi-minus</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.HorizontalRule') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().setHardBreak().run()">
                    <template v-slot:prepend>
                      <v-icon>mdi-arrow-down-right</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.HardBreak') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().unsetAllMarks().run()">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-clear</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.ClearMarks') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().clearNodes().run()">
                    <template v-slot:prepend>
                      <v-icon>mdi-close-network-outline</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.ClearNodes') }}
                    </v-list-item-title>
                  </v-list-item>


                  <v-list-item @click="editor.chain().focus().setDetails().run()"
                    :disabled="!editor.can().setDetails()">
                    <template v-slot:prepend>
                      <v-icon>mdi-details</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.SetDetails') }}
                    </v-list-item-title>
                  </v-list-item>


                  <v-list-item @click="editor.chain().focus().unsetDetails().run()"
                    :disabled="!editor.can().unsetDetails()">
                    <template v-slot:prepend>
                      <v-icon>mdi-details</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.UnsetDetails') }}
                    </v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>


              <ColorSelect :button_small="EditorToolbarBtnSmallRule" @color="color => {
                editor.chain().focus().setColor(color).run()
              }" @clear="editor.chain().focus().unsetColor().run()" />

              <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on: on1, attrs: attrs1 }">
          <v-menu offset-y  transition="scale-transition">
            <template v-slot:activator="{ on: on2, attrs: attrs2 }">
              <v-btn  text :title="$t('Message.Components.Editor.HTitleGroup')" v-bind="Object.assign({}, attrs1, attrs2)" v-on="Object.assign({}, on1, on2)"
                :size="EditorToolbarBtnSmallRule" icon>
                <v-icon>mdi-format-header-equal</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </template>
        <span>{{ $t('Message.Components.Editor.HTitleGroup') }}</span>
      </v-tooltip> -->

              <v-menu offset-y max-width="350" transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <!-- style="margin-right: 8px;" -->
                  <v-btn variant="text" v-bind="props" icon :size="EditorToolbarBtnSmallRule">
                    <v-icon>mdi-format-header-equal</v-icon>
                    <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.HTitleGroup')
                    }}</v-tooltip>
                  </v-btn>
                </template>
                <v-list rounded="lg" dense>
                  <v-list-item @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-header-1</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.H1') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-header-2</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.H2') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-header-3</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.H3') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-header-4</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.H4') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-header-5</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.H5') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-header-6</v-icon>
                    </template>
                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.H6') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.BulletList')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.BulletList')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('bulletList') }">
                    <v-icon>mdi-format-list-bulleted</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.OrderedList')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.OrderedList')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('orderedList') }">
                    <v-icon>mdi-format-list-numbered</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on: on1, attrs: attrs1 }">
          <v-menu offset-y  transition="scale-transition">
            <template v-slot:activator="{ on: on2, attrs: attrs2 }">
              <v-btn  text :title="$t('Message.Components.Editor.TextAlign')" v-bind="Object.assign({}, attrs1, attrs2)" v-on="Object.assign({}, on1, on2)"
                :size="EditorToolbarBtnSmallRule" icon>
                <v-icon>mdi-format-align-center</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </template>
        <span>{{ $t('Message.Components.Editor.TextAlign') }}</span>
      </v-tooltip> -->

              <v-menu offset-y max-width="350" transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <!-- style="margin-right: 8px;" -->
                  <v-btn variant="text" v-bind="props" icon :title="$t('Message.Components.Editor.TextAlign')"
                    :size="EditorToolbarBtnSmallRule">
                    <v-icon>mdi-format-align-center</v-icon>
                    <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.Editor.TextAlign')
                    }}</v-tooltip>
                  </v-btn>
                </template>
                <v-list rounded="lg">
                  <v-list-item @click="editor.chain().focus().setTextAlign('left').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-align-left</v-icon>
                    </template>

                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.LeftAlign') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editor.chain().focus().setTextAlign('center').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-align-center</v-icon>
                    </template>

                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.CenterAlign') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editor.chain().focus().setTextAlign('right').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-align-right</v-icon>
                    </template>

                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.RightAlign') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editor.chain().focus().setTextAlign('justify').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-align-vertical-distribute</v-icon>
                    </template>

                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.JustifyAlign') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editor.chain().focus().toggleTextAlign('right').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-align-justify</v-icon>
                    </template>

                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.ToggleRightAlign') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editor.chain().focus().unsetTextAlign().run()">
                    <template v-slot:prepend>
                      <v-icon>mdi-format-align-justify</v-icon>
                    </template>

                    <v-list-item-title>
                      {{ $t('Message.Components.Editor.UnsetAlign') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>



              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.Undo')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Undo')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()">
                    <!-- <v-icon>mdi-undo</v-icon> -->
                    <v-icon>mdi-arrow-u-left-top</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.Redo')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Redo')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()">
                    <!-- <v-icon>mdi-redo</v-icon> -->
                    <v-icon>mdi-arrow-u-right-top</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

            </template>

            <template v-if="table_menu" class="editor-toolbar">

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.ExitTable')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.ExitTable')"
                    :size="EditorToolbarBtnSmallRule" icon @click="table_menu = false" color="primary">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.InsertTable')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.InsertTable')"
                    :size="EditorToolbarBtnSmallRule" icon
                    @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
                    <v-icon>mdi-table-plus</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <!-- <v-tooltip bottom>
        <template v-slot:activator="{ props }">
          <v-btn  variant="text" v-bind="props" :title="$t('Message.Components.Editor.InsertHTMLTable')"
          :size="EditorToolbarBtnSmallRule" icon
          @click="editor.chain().focus().insertContent(tableHTML, { parseOptions: { preserveWhitespace: false } }).run()"
          >
          <v-icon>mdi-table-edit</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('Message.Components.Editor.InsertHTMLTable') }}</span>
      </v-tooltip> -->

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.AddColumnLeft')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.AddColumnLeft')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().addColumnBefore().run()"
                    :disabled="!editor.can().addColumnBefore()">
                    <v-icon>mdi-table-column-plus-before</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.AddColumnRight')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.AddColumnRight')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().addColumnAfter().run()"
                    :disabled="!editor.can().addColumnAfter()">
                    <v-icon>mdi-table-column-plus-after</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>


              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.AddRowAbove')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.AddRowAbove')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().addRowBefore().run()"
                    :disabled="!editor.can().addRowBefore()">
                    <v-icon>mdi-table-row-plus-before</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.AddRowBelow')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.AddRowBelow')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().addRowAfter().run()"
                    :disabled="!editor.can().addRowAfter()">
                    <v-icon>mdi-table-row-plus-after</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.MergeCells')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.MergeCells')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().mergeCells().run()"
                    :disabled="!editor.can().mergeCells()">
                    <v-icon>mdi-table-merge-cells</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.SplitCell')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.SplitCell')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().splitCell().run()"
                    :disabled="!editor.can().splitCell()">
                    <v-icon>mdi-table-split-cell</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="bottom" :text="$t('Message.Components.Editor.MergeOrSplitCell')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.MergeOrSplitCell')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().mergeOrSplit().run()"
                    :disabled="!editor.can().mergeOrSplit()">
                    <v-icon>mdi-table-pivot</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

            </template>
          </div>
          <!-- <v-divider></v-divider> -->
          <EditorContent class="editor-content"
            style="overflow: auto;height: calc(100% - 164px);cursor: text;padding-top: 8px;" :editor="editor" />
          <!-- <v-divider></v-divider> -->
          <div
            style="position: absolute; bottom: 0; left: 0; right: 0;overflow: auto;display: flex;padding: 10px 16px;">
            <template v-if="!table_menu">

              <v-btn rounded="lg" variant="flat" :loading="is_loading" color="primary" @click="OnEditorSubmit()"
                :disabled="ReleaseButtonDisabled
                  ">
                {{ submitText ||
                  $t('Message.Components.Editor.Release')
                }}
              </v-btn>
              <v-spacer></v-spacer>
              <!-- 新增的按钮，已添加tooltip -->
              <v-tooltip location="top" :text="$t('Message.Components.Editor.Bold')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" text :title="$t('Message.Components.Editor.Bold')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('bold') }">
                    <v-icon>mdi-format-bold</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" :text="$t('Message.Components.Editor.Italic')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Italic')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('italic') }">
                    <v-icon>mdi-format-italic</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" :text="$t('Message.Components.Editor.Strike')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Strike')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('strike') }">
                    <v-icon>mdi-format-strikethrough</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" :text="$t('Message.Components.Editor.Code')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Code')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('code') }">
                    <v-icon>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" :text="$t('Message.Components.Editor.Paragraph')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Paragraph')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('paragraph') }">
                    <v-icon>mdi-format-paragraph</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" :text="$t('Message.Components.Editor.CodeBlock')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.CodeBlock')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'v-item--active v-btn--active': editor.isActive('codeBlock') }">
                    <v-icon>mdi-code-braces</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" :text="$t('Message.Components.Editor.Blockquote')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Blockquote')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleBlockquote().run()">
                    <v-icon>mdi-format-quote-close</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <!-- <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-btn  variant="text" v-bind="props" :title="$t('Message.Components.Editor.ClearMarks')"
          :size="EditorToolbarBtnSmallRule" icon
          @click="editor.chain().focus().unsetAllMarks().run()">
          <v-icon>mdi-format-clear</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('Message.Components.Editor.ClearMarks') }}</span>
      </v-tooltip>
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-btn  variant="text" v-bind="props" :title="$t('Message.Components.Editor.ClearNodes')"
          :size="EditorToolbarBtnSmallRule" icon
          @click="editor.chain().focus().clearNodes().run()">
          <v-icon>mdi-close-network-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('Message.Components.Editor.ClearNodes') }}</span>
      </v-tooltip> -->

              <v-tooltip location="top" :text="$t('Message.Components.Editor.Delete')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.Delete')"
                    @click="DeleteContentFromLocal" :size="EditorToolbarBtnSmallRule" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </template>

            <template v-if="table_menu">

              <v-spacer></v-spacer>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.ToggleHeaderColumn')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.ToggleHeaderColumn')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleHeaderColumn().run()"
                    :disabled="!editor.can().toggleHeaderColumn()">
                    <v-icon>mdi-table-column-width</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.ToggleHeaderRow')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.ToggleHeaderRow')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleHeaderRow().run()"
                    :disabled="!editor.can().toggleHeaderRow()">
                    <v-icon>mdi-table-row-height</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.ToggleHeaderCell')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.ToggleHeaderCell')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().toggleHeaderCell().run()"
                    :disabled="!editor.can().toggleHeaderCell()">
                    <v-icon>mdi-table-settings</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <!-- <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-btn  variant="text" v-bind="props" :title="$t('Message.Components.Editor.SetCellProperties')"
          :size="EditorToolbarBtnSmallRule" icon
          @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"
          :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')"
          >
          <v-icon>mdi-table-cog</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('Message.Components.Editor.SetCellProperties') }}</span>
      </v-tooltip>

      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-btn  variant="text" v-bind="props" :title="$t('Message.Components.Editor.FixTable')"
          :size="EditorToolbarBtnSmallRule" icon
          @click="editor.chain().focus().fixTables().run()"
          :disabled="!editor.can().fixTables()"
          >
          <v-icon>mdi-table-alert</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('Message.Components.Editor.FixTable') }}</span>
      </v-tooltip> -->

              <v-tooltip location="top" :text="$t('Message.Components.Editor.MoveToNextCell')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.MoveToNextCell')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().goToNextCell().run()"
                    :disabled="!editor.can().goToNextCell()">
                    <v-icon>mdi-table-arrow-right</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.MoveToPreviousCell')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.MoveToPreviousCell')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().goToPreviousCell().run()"
                    :disabled="!editor.can().goToPreviousCell()">
                    <v-icon>mdi-table-arrow-left</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.DeleteColumn')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.DeleteColumn')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().deleteColumn().run()"
                    :disabled="!editor.can().deleteColumn()">
                    <v-icon>mdi-table-column-remove</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.DeleteRow')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.DeleteRow')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().deleteRow().run()"
                    :disabled="!editor.can().deleteRow()">
                    <v-icon>mdi-table-row-remove</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top" :text="$t('Message.Components.Editor.DeleteTable')">
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" :title="$t('Message.Components.Editor.DeleteTable')"
                    :size="EditorToolbarBtnSmallRule" icon @click="editor.chain().focus().deleteTable().run()"
                    :disabled="!editor.can().deleteTable()">
                    <v-icon>mdi-table-remove</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

            </template>
          </div>
        </v-card-text>
      </v-card>
      <!-- </v-card-text> -->
    </template>
    <!-- <template v-slot:bottom>
    </template> -->
  </TemplateFabDialog>
</template>
<script>
import TemplateFabDialog from '@/components/fab-dialog/template-fab-dialog/index.vue'
import TopicSelectDialogV1 from '@/components/fab-dialog/editor-fab-dialog/topic-select-dialog-v1.vue'


import 'highlight.js/styles/github.css';
import { all, createLowlight } from 'lowlight'
import { Placeholder } from '@tiptap/extensions'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

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
import Mention from '@tiptap/extension-mention'
import suggestion from '@/components/md-editor/components/mention/suggestion.js'

import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'
// import { DragHandle } from '@tiptap/extension-drag-handle-vue-2'
// import NodeRange from '@tiptap/extension-node-range'

import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes } from '@tiptap/core'

import ColorSelect from '@/components/md-editor/components/color-select/index.vue'
import CodeBlockComponent from '@/components/md-editor/components/code-block/index.vue'

import {
  AddQuestion,
  AddArticle,
  AddAnswer,
  EditQuestion,
  EditArticle,
  EditAnswer,
  UploadImage,
  GetBaseUrl,
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js'

const lowlight = createLowlight(all)
import { useFabDialogStore } from '@/stores/fab-dialog.js';
import { useDialogStore } from '@/stores/dialog.js';
import { useMainStore } from '@/stores/main';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalDataStore } from '@/stores/local-data'
export default {
  components: {
    TemplateFabDialog,
    TopicSelectDialogV1,
    // Empty
    EditorContent,
    // TopicSelectorDialog,
    // FabDialog,
    // TableMenu,
    ColorSelect,
    // DragHandle,
  },
  data() {
    return {
      items: [
        { symbol: '🍎', name: 'Apple' },
        { symbol: '🍌', name: 'Banana' },
        { symbol: '🍇', name: 'Grapes' },
        { symbol: '🍉', name: 'Watermelon' },
        { symbol: '🍓', name: 'Strawberry' },
        { symbol: '🥝', name: 'Kiwi' },
      ],
      selected: [],
      fabDialogStore: useFabDialogStore(),
      dialogStore: useDialogStore(),
      mainStore: useMainStore(),
      snackbarStore: useSnackbarStore(),
      localDataStore: useLocalDataStore(),
      // model: 'maximize',

      title: '',
      icon: 'mdi-pencil-outline',
      showTitle: true,
      showTopics: true,
      submitText: '',

      editType: 'article',//article,question,answer
      editMode: 'new',//new,edit
      editItem: null,
      editItemId: 0,//编辑的id，question_id,article_id,answer_id

      answerToQuestionId: 0,//回答的问题id

      mdTitle: '',
      mdTopics: [],
      mdContent: '',

      selectTopicIds: [],

      editor: null,
      // topic_selector_dialog: false,
      is_loading: false,
      image_is_loading: false,
      table_menu: false,
      tableHTML: `
      <table style="width:100%">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>`,
    }
  },
  computed: {
    model: {
      get() {
        const data = this.fabDialogStore.getNewEditorFabDialog
        this.title = data.title
        this.icon = data.icon
        this.showTitle = data.showTitle
        this.showTopics = data.showTopics
        this.submitText = data.submitText
        this.editType = data.editType
        this.editMode = data.editMode
        this.editItem = data.editItem
        this.editItemId = data.editItemId
        this.answerToQuestionId = data.answerToQuestionId
        this.mdTitle = data.mdTitle
        this.mdTopics = data.mdTopics
        this.mdContent = data.mdContent
        return data.model
      },
      set(val) {
        this.fabDialogStore.setNewEditorFabDialog({ model: val })
      }
    },
    placeholderText(newVal, oldVal) {
      return this.$t('Message.Components.Editor.PleaseAbideByTheLawsAndRegulationsOfYourLocationWhenPostingContent')
    },
    ReleaseButtonDisabled() {
      const editor_content = this.editor.getText()
      switch (this.editType) {
        case 'article':
          return this.mdTitle == '' || editor_content == '' || this.selectTopicIds.length == 0 || this.mdTitle.length > 40
        case 'question':
          return this.mdTitle == '' || editor_content == '' || this.selectTopicIds.length == 0 || this.mdTitle.length > 40
        case 'answer':
          return editor_content == ''
      }
    },
    EditorToolbarBtnSmallRule() {
      return (this.mainStore.getMobile) ? 'x-small' : 'small'
    },
  },
  watch: {
    mdContent(newVal, oldVal) {
      this.editor.commands.setContent(newVal)
    },
    mdTopics(newVal, oldVal) {
      // console.log(newVal)
    },
    selectTopicIds(newVal, oldVal) {
      // console.log(newVal)
    },
    model(newVal, oldVal) {
      if (!newVal) {
        if (this.editMode == 'new') {
          this.SaveAsDraftAndClose()
        }
      }
    },
    '$route'(newVal, oldVal) {
      // this.editor.commands.blur()
      // this.editor.commands.focus()
      this.model = false
    },
    '$i18n.locale'(newVal, oldVal) {
      // this.editor.commands.blur()
      // this.editor.commands.focus()
      // this.editor.destroy()
      // this.created()
      if (this.editor) {
        this.editor.destroy()
        this.editor = null
        this.createEditor()
      }
    },
  },
  mounted() {
  },
  created() {
    this.createEditor()
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    createEditor() {
      const _this = this
      this.editor = new Editor({
        extensions: [
          Placeholder.configure({
            // Use a placeholder:
            // placeholder: this.$t('Message.Components.Editor.PleaseAbideByTheLawsAndRegulationsOfYourLocationWhenPostingContent')
            placeholder: _this.placeholderText,
            // Use different placeholders depending on the node type:
            // placeholder: ({ node }) => {
            //   if (node.type.name === 'heading') {
            //     return 'What’s the title?'
            //   }

            //   return 'Can you add some further context?'
            // },
          }),
          Link.configure({
            openon_click: false,
            autolink: true,
            linkOnPaste: true,
          }),
          Image,
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
          Mention.configure({
            // suggestions: [
            //   {
            //     char: '@',
            //     // Other options of the Suggestion utility
            //   },
            //   {
            //     char: '#',
            //     // Other options of the Suggestion utility
            //   },
            // ],
            HTMLAttributes: {
              class: 'mention',
            },
            renderHTML({ options, node }) {
              // return [
              //   'a',
              //   mergeAttributes({ href:` /users/${node.attrs.id.user_id}` }, options.HTMLAttributes),
              //   `${node.attrs.label ?? node.attrs.id.username}`,
              //   // `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
              // ]

              //可以从此处记录回调保存用户为数组，发布内容成功后再通知被@的用户

              if (node.attrs.id.type == 'user') {
                return [
                  'a',
                  mergeAttributes({ href: ` /users/${node.attrs.id.data.user_id}` }, options.HTMLAttributes),
                  `@${node.attrs.id.data.username}`,
                ]

                // <v-chip></v-chip>

                // return [
                //   'v-chip',
                //   mergeAttributes({ href:` /users/${node.attrs.id.data.user_id}` }, options.HTMLAttributes),
                //   `@${node.attrs.id.data.username}`,
                // ]
              } else if (node.attrs.id.type == 'topic') {
                return [
                  'a',
                  mergeAttributes({ href: ` /topics/${node.attrs.id.data.topic_id}` }, options.HTMLAttributes),
                  `#${node.attrs.id.data.name}`,
                ]
              }
            },
            suggestions: suggestion,
          }),
          // NodeRange.configure({
          //   // allow to select only on depth 0
          //   // depth: 0,
          //   key: null,
          // }),
          // DragHandle.configure({
          //   render: () => {
          //     const element = document.createElement('div')

          //     // Use as a hook for CSS to insert an icon
          //     element.classList.add('custom-drag-handle')

          //     return element
          //   },
          // })
        ],
        content: this.md_content,
        onUpdate: ({ editor }) => {
          this.SaveContentToLocal()
        },
      });
    },
    /**
     * 上传单张图片
     */
    async uploadSingleImage(file) {
      try {
        // 1. 读取文件为 Base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        await new Promise(resolve => reader.onload = resolve) // 等待读取完成

        const base64data = reader.result.split(',')[1]

        // 2. 调用上传接口
        const response = await UploadImage({
          user_token: this.$G_GetUserToken(),
          type: this.edit_type,
          image: base64data,
        })

        // 3. 返回上传结果
        if (response.data.is_upload) {
          return { success: true, url: response.data.upload_url }
        } else {
          return { success: false, error: '上传失败' }
        }
      } catch (error) {
        console.error('单张图片上传失败:', error)
        return { success: false, error: error.message }
      }
    },
    /**
     * 颜色选择器
     */
    colorHandler(color) {
      this.editor.commands.setColor(color)
    },
    /**
     * 添加图片
     */
    async addImage() {
      // 创建文件选择器
      const input = document.createElement('input');
      input.type = 'file';
      // input.accept = 'image/png'; // 可以根据需要更改文件类型限制
      // input.accept = 'image/png,image/jpg,image/jpeg,image/gif'; // 可以根据需要更改文件类型限制
      input.accept = 'image/png,image/jpg,image/jpeg'; // 可以根据需要更改文件类型限制
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // 使用 FileReader 读取文件数据并转换为 base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {

          this.image_is_loading = true

          const base64data = reader.result.split(',')[1]; // 获取 base64 格式的图片数据

          try {
            // 使用 Axios 发送 POST 请求上传图片
            const response = await UploadImage({
              user_token: this.$G_GetUserToken(),
              type: this.edit_type,
              image: base64data, // 直接发送 base64 数据
            });

            // console.log('Upload image response:', response.data);

            // //只捕获从{到}的内容
            // const ress = response.data.match(/\{([^}]+)\}/g)
            // console.log('ress',ress)
            // //转换为json对象
            // const res = JSON.parse(ress[0])
            // console.log('res',res)

            // 如果成功获取到链接，则插入到编辑器中
            if (response.data.is_upload) {
              this.editor.chain().focus().setImage({ src: this.$G_ImgHandle(response.data.upload_url) }).run();
              this.image_is_loading = false
            } else {
              alert('Failed to upload image or get image URL');
              this.image_is_loading = false
            }
          } catch (error) {
            // console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
            this.image_is_loading = false
          }
        };
        reader.onerror = error => {
          // console.error('Error reading file:', error);
          alert('Error reading file. Please try again.');
          this.image_is_loading = false
        };
      };

      // 模拟点击文件选择器
      input.click();
    },
    /**
     * 设置链接
     */
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      if (url === null) {
        return
      }
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()
        return
      }
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
    /**
     * 保存草稿并关闭
     */
    SaveAsDraftAndClose() {
      if (this.editor.getText() != '') {
        this.SaveContentToLocal()
      } else {
        this.model = false;
      }
    },
    /**
     * 保存内容到本地缓存
     */
    SaveContentToLocal() {
      if (this.editor.getText() != '') {
        var editor_type = this.edit_type
        var json = JSON.stringify(this.editor.getJSON())
        if (editor_type == 'article') {
          this.localDataStore.setArticleCache(json)
        } else if (editor_type == 'question') {
          this.localDataStore.setQuestionCache(json)
        } else if (editor_type == 'answer') {
          this.localDataStore.setAnswerCache(json)
        }
      }
    },
    /**
     * 删除本地缓存内容
     */
    DeleteContentFromLocal() {
      var editor_type = this.edit_type
      if (editor_type == 'article') {
        this.localDataStore.setArticleCache(null)
      } else if (editor_type == 'question') {
        this.localDataStore.setQuestionCache(null)
      } else if (editor_type == 'answer') {
        this.localDataStore.setAnswerCache(null)
      }
      this.model = false
    },


    async OnEditorSubmit() {
      this.is_loading = true
      const question_id = this.answerToQuestionId
      const title = this.mdTitle
      let topics = this.selectTopicIds
      //如果topics里面的数组元素是对象,则需要单独提取topic_id
      if (topics.length > 0 && topics[0].topic_id) {
        topics = topics.map(item => item.topic_id)
      }
      // const content_markdown = this.editor.getText()
      // const content_rendered = this.editor.getHTML()
      //进行转义
      const content_markdown = encodeURIComponent(this.editor.getText())
      let content_rendered = this.editor.getHTML()//encodeURIComponent(this.editor.getHTML())


      // console.log('content_rendered1', content_rendered)
      if (IsTauri() || IsMobileApp()) {//适配
        //把_content里面的 GetBaseUrl() + '/public/static/' 替换为 /public/static/
        const regex = '/public/static/';
        const newBaseUrl = GetBaseUrl() + '/public/static/';
        // 执行替换
        content_rendered = content_rendered.replaceAll(newBaseUrl, regex)
        // console.log('content_rendered2', content_rendered)
      }
      content_rendered = encodeURIComponent(content_rendered)
      // console.log('content_rendered3', content_rendered)


      // const content_rendered = this.editor.getJSON()//使用JSON存储
      const user_token = this.$G_GetUserToken()
      // this.is_loading = false//防止卡死
      if (this.editMode == 'new') {
        switch (this.editType) {
          case 'article':
            this.AddArticle(title, topics, content_markdown, content_rendered, user_token)
            break
          case 'question':
            this.AddQuestion(title, topics, content_markdown, content_rendered, user_token)
            break
          case 'answer':
            this.AddAnswer(question_id, content_markdown, content_rendered, user_token)
            break
        }
      } else if (this.editMode == 'edit') {
        // this.is_loading = false//防止卡死
        switch (this.editType) {
          case 'article':
            this.EditArticle(this.editItemId, title, topics, content_markdown, content_rendered, user_token)
            break
          case 'question':
            this.EditQuestion(this.editItemId, title, topics, content_markdown, content_rendered, user_token)
            break
          case 'answer':
            this.EditAnswer(this.editItemId, content_markdown, content_rendered, user_token)
            break
        }
      }
    },
    async AddArticle(title, topics, content_markdown, content_rendered, user_token) {
      const response = await AddArticle({
        title: title,
        topics: topics,
        content_markdown: content_markdown,
        content_rendered: content_rendered,
        user_token: user_token,
      })
      if (response.data.is_add == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Created') : this.$t('Message.Components.Snackbar.YouArticleHasBeenCreated'), color: 'success' })
        this.is_loading = false
        this.$emit('add_article', response.data.article)
        this.model = false
      } else {
        this.is_loading = false
      }
    },
    async AddQuestion(title, topics, content_markdown, content_rendered, user_token) {
      const response = await AddQuestion({
        title: title,
        topics: topics,
        content_markdown: content_markdown,
        content_rendered: content_rendered,
        user_token: user_token,
      })
      if (response.data.is_add == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Created') : this.$t('Message.Components.Snackbar.YouQuestionHasBeenCreated'), color: 'success' })
        this.is_loading = false
        this.$emit('add_question', response.data.question)
        this.model = false
      } else {
        this.is_loading = false
      }
    },
    async AddAnswer(question_id, content_markdown, content_rendered, user_token) {
      const response = await AddAnswer({
        question_id: question_id,
        content_markdown: content_markdown,
        content_rendered: content_rendered,
        user_token: user_token,
      })
      if (response.data.is_add == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Created') : this.$t('Message.Components.Snackbar.YouAnswerHasBeenCreated'), color: 'success' })
        this.is_loading = false
        this.$emit('add_answer', response.data.answer)
        this.model = false
      } else {
        this.is_loading = false
      }
    },
    async EditArticle(article_id, title, topics, content_markdown, content_rendered, user_token) {
      const response = await EditArticle({
        article_id: article_id,
        title: title,
        topics: topics,
        content_markdown: content_markdown,
        content_rendered: content_rendered,
        user_token: user_token,
      })
      if (response.data.is_edit == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Edited') : this.$t('Message.Components.Snackbar.YouArticleHasBeenEdited'), color: 'success' })
        this.is_loading = false
        this.$emit('edit_article', response.data.article)
        this.model = false
      } else {
        this.is_loading = false
      }
    },
    async EditQuestion(question_id, title, topics, content_markdown, content_rendered, user_token) {
      const response = await EditQuestion({
        question_id: question_id,
        title: title,
        topics: topics,
        content_markdown: content_markdown,
        content_rendered: content_rendered,
        user_token: user_token,
      })
      if (response.data.is_edit == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Edited') : this.$t('Message.Components.Snackbar.YouQuestionHasBeenEdited'), color: 'success' })
        this.is_loading = false
        this.$emit('edit_question', response.data.question)
        this.model = false
      } else {
        this.is_loading = false
      }
    },
    async EditAnswer(answer_id, content_markdown, content_rendered, user_token) {
      const response = await EditAnswer({
        answer_id: answer_id,
        content_markdown: content_markdown,
        content_rendered: content_rendered,
        user_token: user_token,
      })
      if (response.data.is_edit == true) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Edited') : this.$t('Message.Components.Snackbar.YouAnswerHasBeenEdited'), color: 'success' })
        this.is_loading = false
        this.$emit('edit_answer', response.data.answer)
        this.model = false
      } else {
        this.is_loading = false
      }
    },
  },
}
</script>
<style lang="less">
/* */
@import '../../../vendor/variable.less';
@import '../../tiptap-editor/index.less';

#mc-editor {
  .body {
    flex: 1;
    padding: 0 16px;
    overflow: hidden;

    .submit {
      min-width: 76px;
      margin-right: 10px;
    }
  }

  .editor-title {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    font-size: 16px;
    line-height: 34px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    outline: none;

    .theme--dark & {
      border-color: rgba(255, 255, 255, .12);
    }
  }

  .editor-topics {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);

    .theme--dark & {
      border-color: rgba(255, 255, 255, .12);
    }

    .placeholder,
    .chip-wrapper {
      display: flex;
      flex: 1;
      align-items: center;
      height: 100%;
      user-select: none;
    }

    .placeholder {

      color: rgb(var(--v-theme-on-surface));

      // color: rgba(0, 0, 0, .42);
      cursor: pointer;

      // .theme--dark & {
      //   color: rgba(255, 255, 255, .42);
      // }
    }
  }

  .editor-toolbar {
    overflow-x: hidden;
    display: flex;
    align-items: center;
    padding: 12px 0;
    box-shadow: inset 0 1px 0 0 rgba(100, 121, 143, 0.122);

    .theme--dark & {
      .editor-toolbar-menu-active {
        background-color: #565656 !important;
      }

      i {
        color: #fff;
      }
    }
  }

  .editor-content {
    height: calc(~'100% - 112px');
    padding: 10px 0;

    &::before {
      .theme--dark & {
        color: rgba(255, 255, 255, .42);
      }
    }

    // img {
    //   // max-width: 100%;
    //   max-width: 97%;
    //   margin: 8px;
    //   height: auto;
    //   border-radius: 8px;

    //   &.ProseMirror-selectednode {
    //     outline: 3px solid var(--v-light-accent);
    //     .theme--dark & {
    //     outline: 3px solid var(--v-dark-accent);
    //     }
    //   }
    // }
    // code {
    //   background-color: rgba(223, 223, 223, 0.5);
    //   .theme--dark & {
    //     background-color: rgba(66, 66, 66, 0.7);
    //   }
    // }
    // pre {
    //   outline: none;
    //   box-shadow: none;
    //   font-family: 'JetBrainsMono', monospace;
    //   code {
    //     background-color: rgba(247, 247, 249, 0) !important;
    //     padding-left: 6px;
    //     padding-right: 6px;
    //     background: none;
    //     font-size: 0.8rem;
    //   }
    //   .hljs-comment,
    //   .hljs-quote {
    //     color: #616161;
    //   }
    //   .hljs-variable,
    //   .hljs-template-variable,
    //   .hljs-attribute,
    //   .hljs-tag,
    //   .hljs-name,
    //   .hljs-regexp,
    //   .hljs-link,
    //   .hljs-name,
    //   .hljs-selector-id,
    //   .hljs-selector-class {
    //     color: #F98181;
    //   }
    //   .hljs-number,
    //   .hljs-meta,
    //   .hljs-built_in,
    //   .hljs-builtin-name,
    //   .hljs-literal,
    //   .hljs-type,
    //   .hljs-params {
    //     color: #FBBC88;
    //   }
    //   .hljs-string,
    //   .hljs-symbol,
    //   .hljs-bullet {
    //     color: #B9F18D;
    //   }
    //   .hljs-keyword,
    //   .hljs-selector-tag {
    //     color: #70CFF8;
    //   }
    //   .hljs-emphasis {
    //     font-style: italic;
    //   }
    //   .hljs-strong {
    //     font-weight: 700;
    //   }
    // }

  }

  &.with-title,
  &.with-topics {
    .editor-content {
      height: calc(~'100% - 208px');
    }
  }

  &.with-title.with-topics {
    .editor-content {
      height: calc(~'100% - 230px');
    }
  }

  &.with-title.with-topics.maximize {
    .editor-content {
      height: calc(~'100% - 240px');
    }
  }

  &.rounded-xxl.maximize {
    .editor-content {
      height: calc(~'100% - 124px');
    }
  }

  .editor-toolbar-menu-italic,
  .editor-toolbar-menu-code,
  .editor-toolbar-menu-ol,
  .editor-toolbar-menu-ul {
    display: none;
  }

  .editor-toolbar-menu {
    width: 36px;
    min-width: 36px;
    height: 36px;
    line-height: 36px;

    i {
      font-size: 22px;
    }
  }
}
</style>
