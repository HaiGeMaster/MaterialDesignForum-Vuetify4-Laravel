<template>
  <node-view-wrapper class="code-block">
    <div style="display: flex;">

      <v-icon color="red" style="margin-left: 2px;margin-right: 2px;">mdi-circle</v-icon>

      <v-icon color="orange" style="margin-left: 2px;margin-right: 2px;">mdi-circle</v-icon>

      <v-icon color="green" style="margin-left: 2px;margin-right: 2px;">mdi-circle</v-icon>

      <v-spacer></v-spacer>

      <!-- <v-btn rounded="lg"  @click="copy(node.attrs.language)" 
        v-show="!editor.isEditable"
      >
        <v-icon>
          mdi-content-copy
        </v-icon>
      </v-btn> -->

      <!-- <v-select :items="languages" label="Code language" v-model="selectedLanguage"
        :color="$vuetify.theme.dark ? 'grey darken-2' : ''" dense solo flat :disabled="!editor.isEditable" /> -->

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn rounded="lg"  color="primary" v-bind="props" append-icon="mdi-chevron-down" variant="text">
            {{ selectedLanguage }}
          </v-btn>
        </template>
        <v-list rounded="lg" style="max-height: 320px;overflow: auto;">
          <!-- <v-list-item-group v-model="selectedLanguage"> -->
            <v-list-item v-for="(item, index) in languages" :key="index" @click="selectedLanguage = item" :title="item">
              <!-- <v-list-item-title>{{ item }}</v-list-item-title> -->
            </v-list-item>
          <!-- </v-list-item-group> -->
        </v-list>
      </v-menu>
    </div>
    <pre>
  <code>
    <node-view-content />
  </code>
</pre>
  </node-view-wrapper>
</template>
<script>
// import copy from 'copy-to-clipboard';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    nodeViewProps,
    // the editor instance
    editor: {
      type: Object,
    },
    // the current node
    node: {
      type: Object,
    },
    // an array of decorations
    decorations: {
      type: Array,
    },
    // `true` when there is a `NodeSelection` at the current node view
    selected: {
      type: Boolean,
    },
    // access to the node extension, for example to get options
    extension: {
      type: Object,
    },
    // get the document position of the current node
    getPos: {
      type: Function,
    },
    // update attributes of the current node
    updateAttributes: {
      type: Function,
    },
    // delete the current node
    deleteNode: {
      type: Function,
    },
  },
  data() {
    return {
      // copy,
      languages: this.extension.options.lowlight.listLanguages(),
    }
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language
      },
      set(language) {
        this.updateAttributes({ language })
      },
    },
  },
}
</script>
<style lang="less">
.code-block {
  position: relative;
  border-radius: 10px;
  // border: #303030 dashed 1px;
  // padding-top: 24px;
  // padding-left: 16px;
  // padding-right: 16px;
  // padding-bottom: 2px;
  padding: 16px;
  margin-bottom: 16px;
  // background-color: rgba(247, 247, 249, 0.7);
  //background-color: rgba(247, 247, 249, 0.10);
  background-color: rgb(var(--v-theme-surface-light));
  // background-color: #292b2d;
  // color: white;

  // .theme--dark & {
  //   // background-color: rgba(66, 66, 66, 0.7);
  //   background-color: rgba(66, 66, 66, 0.10);
  //   // border: #ffffff dashed 1px;
  // }

  .v-input {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    // max-width: 130px;
    max-width: 146px;
  }

  .theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
    background: #ffffff !important;
  }

  .theme--dark.v-text-field--solo>.v-input__control>.v-input__slot {
    background: #303030 !important;
  }
}
</style>