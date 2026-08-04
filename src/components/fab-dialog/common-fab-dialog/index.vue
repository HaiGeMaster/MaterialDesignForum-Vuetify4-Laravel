<template>
  <v-expand-transition>
    <v-card rounded="lg"  v-show="vmodel == 'open' ||
        vmodel == 'maximize' ||
        vmodel == 'moderate'
        " :class="[
        'mc-fab-dialog',
        {
          'maximize': !mainStore.getMobile && vmodel == 'maximize',
          'minimize': vmodel == 'minimize',
        }
      ]" 
      ref="card_name_id" :id="name_id" :elevation="vmodel == 'maximize'
        ? (fabDialogStore.getFabDialogName == name_id ? elevation : elevation - 4)
        : (
          vmodel == 'minimize'
            ? (fabDialogStore.getFabDialogName == name_id ? elevation - 4 : elevation - 8)
            : (fabDialogStore.getFabDialogName == name_id ? elevation - 8 : elevation - 16)
        )"  @focus="onFocus()">


        <!-- {
          'text-white': mainStore.getIsDark,
          'text-black': !mainStore.getIsDark,
        } -->
      <div :class="['header']">
        <div ref="header_title" :class="[
        'header-title'
      ]" @dblclick="vmodel == 'moderate' ? EditorStateUpdate('maximize') : EditorStateUpdate('moderate')"
          @click="onFocus()">

          <!-- :color="mainStore.getIsDark ? 'white' : 'black'" -->
          <v-icon v-if="icon.indexOf('mdi-') != -1" >{{ icon }}</v-icon>
          <img v-else :src="icon" :style="{
        'width': '24px',
        'height': '24px',
        'margin-right': '8px',
      }" />
          &nbsp;
          {{
        title.indexOf('Message') == -1
          ?
          title
          :
          $t(title)
      }}
        </div>
        
              <!-- square-rounded-outline border-radius -->
                <!-- vmodel == 'maximize' ? 'mdi-fullscreen-exit' : 'mdi-window-maximize' -->
        <div class="header-actions">

          <!-- <v-btn rounded="lg"  :small="$vuetify.breakpoint.name != 'xs'" text icon :title="$t('Message.Components.Editor.Minimize')"
            @click="vmodel == 'minimize' ? vmodel = 'maximize' : vmodel = 'minimize'">
            <v-icon :color="$vuetify.theme.dark ? 'white' : 'black'">mdi-window-minimize</v-icon>
          </v-btn>

          <v-btn rounded="lg"  :small="$vuetify.breakpoint.name != 'xs'" text icon :title="$t('Message.Components.Editor.Maximize')"
            v-show="$vuetify.breakpoint.name != 'xs'"
            @click="vmodel == 'maximize' ? EditorStateUpdate('moderate') : EditorStateUpdate('maximize')">
            <v-icon :color="$vuetify.theme.dark ? 'white' : 'black'">
              {{

                vmodel == 'maximize' ? 'mdi-square-rounded-outline' : 'mdi-border-radius'
              }}
            </v-icon>
          </v-btn>

          <v-btn rounded="lg"  :small="$vuetify.breakpoint.name != 'xs'" text icon :title="$t('Message.Components.DialogClass.Close')"
            @click="vmodel = 'close'">
            <v-icon :color="$vuetify.theme.dark ? 'white' : 'black'">mdi-close</v-icon>
          </v-btn> -->

          <!-- square-rounded 正方形 -->

          <!-- mdi-brightness-1 圆形 -->

          <v-tooltip bottom :text="$t('Message.Components.Editor.Minimize')">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="green" style="margin-left: 2px;margin-right: 2px;"
                @click="vmodel == 'minimize' ? vmodel = 'maximize' : vmodel = 'minimize'">mdi-circle</v-icon>
            </template>
          </v-tooltip>
          <v-tooltip bottom :text="$t('Message.Components.Editor.Maximize')">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="orange" style="margin-left: 2px;margin-right: 2px;"
                v-show="!mainStore.getMobile"
                @click="vmodel == 'maximize' ? EditorStateUpdate('moderate') : EditorStateUpdate('maximize')">mdi-circle</v-icon>
            </template>
          </v-tooltip><v-tooltip bottom :text="$t('Message.Components.DialogClass.Close')">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="red" style="margin-left: 2px;margin-right: 2px;"
                @click="vmodel = 'close'">mdi-circle</v-icon>
            </template>
          </v-tooltip>
        </div>
      </div>
      <div class="body" @focus="onFocus()">
        <slot></slot>
      </div>
    </v-card>
  </v-expand-transition>
</template>
<script>
import { useFabDialogStore } from '@/stores/fab-dialog';
import { useMainStore } from '@/stores/main';
export default {
  name: 'common-fab-dialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: 'close',
    },
    icon: {
      type: String,
      default: 'mdi-message-text',
    },
    name_id: {
      type: String,
      default: '',
    },
    route_update_close: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  data: () => ({
    fabDialogStore: useFabDialogStore(),
    mainStore: useMainStore(),
    vmodel: 'close',
    elevation: 20,
  }),
  mounted() {
    const headerTitle = this.$refs.header_title;
    var selfs = this;
    headerTitle.addEventListener('touchstart', function (event) {
      if (selfs.mainStore.getMobile) {
        return
      }
      event.preventDefault();
      const initialX = event.touches[0].clientX;
      const initialY = event.touches[0].clientY;
      const fab_dialog = document.getElementById(selfs.name_id);
      const fab_dialogRect = fab_dialog.getBoundingClientRect();
      const initialEditorX = fab_dialogRect.left;
      const initialEditorY = fab_dialogRect.top;
      document.addEventListener('touchmove', touchMoveHandler);
      document.addEventListener('touchend', touchEndHandler);
      function touchMoveHandler(event) {
        selfs.onFocus()
        const deltaX = event.touches[0].clientX - initialX;
        const deltaY = event.touches[0].clientY - initialY;
        fab_dialog.style.left = `${initialEditorX + deltaX}px`;
        fab_dialog.style.top = `${initialEditorY + deltaY}px`;
      }
      function touchEndHandler() {
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
      }
    });
    headerTitle.addEventListener('mousedown', function (event) {
      event.preventDefault();
      const initialX = event.clientX;
      const initialY = event.clientY;
      const fab_dialog = document.getElementById(selfs.name_id);
      const fab_dialogRect = fab_dialog.getBoundingClientRect();
      const initialEditorX = fab_dialogRect.left;
      const initialEditorY = fab_dialogRect.top;
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      function mouseMoveHandler(event) {
        selfs.onFocus()
        if (selfs.mainStore.getMobile) {
          fab_dialog.style.left = '0px';
          fab_dialog.style.top = '0px';
          return
        }
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        fab_dialog.style.left = `${initialEditorX + deltaX}px`;
        fab_dialog.style.top = `${initialEditorY + deltaY}px`;
      }
      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      }
    });
  },
  methods: {
    onFocus() {
      this.fabDialogStore.setFabDialogName(this.name_id)
      const card_name_id = document.getElementById(this.name_id);
      // const v_application_wrap = document.getElementsByClassName('v-application--wrap')[0];
      const v_application_wrap = document.getElementsByClassName('v-layout')[0];
      v_application_wrap.appendChild(card_name_id);
    },
    ResetEditorPos() {
      if (
        this.vmodel == 'minimize' ||
        this.vmodel == 'close'
      ) {
        return
      }
      const fab_dialog = document.getElementById(this.name_id);
      fab_dialog.style.left = '0px';
      fab_dialog.style.top = '0px';
    },
    EditorStateUpdate(v) {
      if (v == 'moderate') {
        this.vmodel = 'close'
        setTimeout(() => {
          this.vmodel = 'moderate'
        }, 700);
      } else if (v == 'maximize') {
        this.vmodel = 'close'
        setTimeout(() => {
          this.vmodel = 'maximize'
        }, 500);
      }
    },
  },
  watch: {
    model(v) {
      this.vmodel = v
      this.fabDialogStore.setFabDialogName(this.name_id)
    },
    vmodel(v) {
      this.$emit('model', v)
    },
    '$route'(to, from) {
      if (this.route_update_close) {
        this.vmodel = 'close'
      }
    },
    'mainStore.getMobile': {
      handler: function (val, oldVal) {
        if (val) {
          this.ResetEditorPos()
        }
      },
      immediate: true,
    },
    ReturnFabDialogGetFabDialogName(val) {
      if (val == this.name_id) {
        this.elevation = 24
      } else {
        this.elevation = 8
      }
    },
  },
  computed: {
    ReturnFabDialogGetFabDialogName() {
      return this.fabDialogStore.getFabDialogName
    },
  },
}
</script>
<style lang="less">
/* */ @import '../../../vendor/variable.less';
.mc-fab-dialog {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1007;
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 608px;
  overflow: hidden;
  // border-radius: 8px 8px 0 0;
  .header {
    display: flex;
    align-items: center;
    height: 40px;
    user-select: none;
  }
  .header-title {
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    padding-left: 16px;
    // color: #fff;

    color:rgb(var(--v-theme-on-surface));
    
    // color: #000000;

    // .v-theme--dark & {
    //   color: #fff;
    // }
  }
  .header-title:hover {
    cursor: move;
  }
  .header-actions {
    padding-right: 8px;
    padding-left: 8px;
  }
  &.maximize:not(.minimize) {
    right: calc(~'(100% - 736px)/2');
    bottom: 4vh;
    width: 100%;
    max-width: 736px;
    height: 92vh;
    @media (max-width: 736px) {
      right: 0;
      bottom: 0;
      height: 100vh;
    }
  }
  &.minimize {
    width: 260px;
    height: 40px;
  }
  .body {
    flex: 1;
    overflow: hidden;
  }
  @media (max-width: @screen-xs-max) {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    &.minimize {
      width: 100%;
      height: 56px;
    }
    .header {
      height: 56px;
    }
    .header-actions {
      i {
        padding: 8px;
        font-size: 20px;
        &:nth-child(2) {
          display: none;
        }
      }
    }
    .icon-maximize {
      display: none;
    }
  }
}
</style>