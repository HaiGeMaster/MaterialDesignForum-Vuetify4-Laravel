<template>
    <div class="container" style="max-width: 800px;margin: auto;">
        <h1>MC</h1>

        <!-- <div style="background-color: #BBBBBB;padding: 6px;">
            <h3>亮色样式</h3>
            <button class="minecraft" disabled>我的世界按钮样式</button>
            <button class="minecraft">我的世界按钮样式</button>
            <label class="minecraft">
                <label>我的世界开关样式</label>
                <input type="checkbox">
            </label>
            <label class="minecraft">
                <label>我的世界滑动条样式</label>
                <input type="range" class="minecraft" value="0">
            </label>
            <span class="minecraft">我的世界单独的滑动条样式</span>
            <input type="range" class="minecraft" value="0">
        </div>
        <div style="background-color: #313233;padding: 6px;">
                    <h3 style="color: #FFFFFF;">暗色样式</h3>
                    <button class="minecraft dark">我的世界按钮样式</button>
                    <label class="minecraft dark">
                        <label>我的世界开关样式</label>
                        <input type="checkbox">
                    </label>
                    <label class="minecraft dark">
                        <label>我的世界滑动条样式</label>
                        <input type="range" class="minecraft" value="0">
                    </label>
                    <span class="minecraft dark">我的世界单独的滑动条样式</span>
                    <input type="range" class="minecraft" value="0">
                </div>
        <button style="margin: 6px;" class="minecraft" @click="open_minecraft_dialog">介绍</button> -->

        <div class="minecraft-background" style="margin: 8px;padding: 8px;">
            <Button>按钮</Button>
            <br/>
            <Button disabled>禁用的按钮</Button>
            <br/>
            <Checkbox>复选框</Checkbox>
            <br/>
            <Range>滑动条</Range>
            <br/>
            <NewRange @input="(val) => new_range_value = val.target.value">新的滑动条</NewRange>
            <br/>
            <NewTextField :value="new_range_value" >新的文本框</NewTextField>
            <br/>
            <br/>
            <NewButton>新的按钮</NewButton>
            <br/>
            <br/>
            <NewSwitch>新的开关</NewSwitch>
            <br/>
            <NewDropdown>新的下拉框</NewDropdown>
        </div>
    </div>
</template>

<script>
import Button from './components/button.vue'
import Checkbox from './components/checkbox.vue'
import Range from './components/range.vue'

import NewRange from './components/new/range.vue'
import NewButton from './components/new/button.vue'
import NewTextField from './components/new/text-filed.vue'
import NewSwitch from './components/new/switch.vue'
import NewDropdown from './components/new/dropdown.vue'



export default {
    name: 'MC',
    components: {
        Button,
        Checkbox,
        Range,
        NewRange,
        NewButton,
        NewTextField,
        NewSwitch,
        NewDropdown
    },
    data() {
        return {
            dialog_num: 0,
            new_range_value: 0,
            new_text_value: ''
        }
    },
    methods: {
        open_minecraft_dialog(conf = {
            title: '对话框标题',
            content: '对话框内容',
            isHTML: false,
            ok_btn_text: '确定',
            cancel_btn_text: '取消',
            on_ok: null,
            on_cancel: null,
            close_btn: true
        }) {
            var dialog = document.createElement("div");
            dialog.classList.add("minecraft");
            dialog.classList.add("dialog");
            dialog.id = "minecraft_dialog___unique_data_6794316513467873548946757875345182739975__number_" + this.dialog_num;
            this.dialog_num++;
            var svg = document.createElement("svg");
            svg.innerHTML = "<svg viewbox=\"0 0 300 250\" xmlns=\"http://www.w3.org/2000/svg\">\n	<!-- 整体 -->\n	<g>\n		<!-- 全部边框 -->\n		<g>\n			<!-- 四边 -->\n			<g>\n				<!-- 上 -->\n				<rect x=\"3\" y=\"0\" width=\"294\" height=\"1\" />\n				<!-- 下 -->\n				<rect x=\"3\" y=\"249\" width=\"294\" height=\"1\" />\n				<!-- 左 -->\n				<rect x=\"0\" y=\"3\" width=\"1\" height=\"244\" />\n				<!-- 右 -->\n				<rect x=\"299\" y=\"3\" width=\"1\" height=\"244\" />\n			</g>\n			<!-- 四角 -->\n			<g>\n				<!-- 左上 -->\n				<g>\n					<rect x=\"1\" y=\"2\" width=\"1\" height=\"1\" />\n					<rect x=\"2\" y=\"1\" width=\"1\" height=\"1\" />\n					<rect x=\"3\" y=\"0\" width=\"1\" height=\"1\" />\n				</g>\n				<!-- 左下 -->\n				<g>\n					<rect x=\"1\" y=\"247\" width=\"1\" height=\"1\" />\n					<rect x=\"2\" y=\"248\" width=\"1\" height=\"1\" />\n					<rect x=\"3\" y=\"249\" width=\"1\" height=\"1\" />\n				</g>\n				<!-- 右下 -->\n				<g>\n					<rect x=\"298\" y=\"247\" width=\"1\" height=\"1\" />\n					<rect x=\"297\" y=\"248\" width=\"1\" height=\"1\" />\n					<rect x=\"296\" y=\"249\" width=\"1\" height=\"1\" />\n				</g>\n				<!-- 右上 -->\n				<g>\n					<rect x=\"297\" y=\"1\" width=\"1\" height=\"1\" />\n					<rect x=\"298\" y=\"2\" width=\"1\" height=\"1\" />\n					<rect x=\"299\" y=\"3\" width=\"1\" height=\"1\" />\n				</g>\n			</g>\n		</g>\n		<!-- 背景 -->\n		<g>\n			<rect x=\"3\" y=\"1\" width=\"294\" height=\"248\" fill=\"#DDDDDD\" />\n			<rect x=\"2\" y=\"2\" width=\"1\" height=\"246\" fill=\"#DDDDDD\" />\n			<rect x=\"1\" y=\"3\" width=\"1\" height=\"244\" fill=\"#DDDDDD\" />\n			<rect x=\"297\" y=\"2\" width=\"1\" height=\"246\" fill=\"#DDDDDD\" />\n			<rect x=\"298\" y=\"3\" width=\"1\" height=\"244\" fill=\"#DDDDDD\" />\n		</g>\n		<!-- 内边 -->\n		<g>\n			<!-- 左 -->\n			<rect x=\"1\" y=\"3\" width=\"2\" height=\"244\" fill=\"#FFFFFF\" />\n			<!-- 上 -->\n			<rect x=\"2\" y=\"2\" width=\"2\" height=\"2\" fill=\"#FFFFFF\" />\n			<!-- 左上 -->\n			<rect x=\"3\" y=\"1\" width=\"294\" height=\"2\" fill=\"#FFFFFF\" />\n			<!-- 右上 -->\n			<rect x=\"297\" y=\"2\" width=\"1\" height=\"1\" fill=\"#C6C6C6\" />\n			<!-- 右 -->\n			<rect x=\"297\" y=\"3\" width=\"2\" height=\"244\" fill=\"#555555\" />\n			<!-- 右下 -->\n			<rect x=\"296\" y=\"246\" width=\"2\" height=\"2\" fill=\"#555555\" />\n			<!-- 下 -->\n			<rect x=\"3\" y=\"247\" width=\"294\" height=\"2\" fill=\"#555555\" />\n			<!-- 左下 -->\n			<rect x=\"2\" y=\"247\" width=\"1\" height=\"1\" fill=\"#555555\" />\n		</g>\n		<!-- 内容框 -->\n		<g>\n			<!-- 内容 -->\n			<rect x=\"6\" y=\"30\" width=\"288\" height=\"120\" fill=\"#090909\" />\n			<!-- 边框 -->\n			<rect x=\"6\" y=\"30\" width=\"288\" height=\"1\" fill=\"#393939\" />\n			<rect x=\"6\" y=\"30\" width=\"1\" height=\"120\" fill=\"#393939\" />\n			<rect x=\"6\" y=\"149\" width=\"288\" height=\"1\" fill=\"#FFFFFF\" />\n			<rect x=\"293\" y=\"30\" width=\"1\" height=\"120\" fill=\"#FFFFFF\" />\n			<rect x=\"6\" y=\"149\" width=\"1\" height=\"1\" fill=\"#6B6B6B\" />\n			<rect x=\"293\" y=\"30\" width=\"1\" height=\"1\" fill=\"#6B6B6B\" />\n		</g>\n	</g>\n</svg>";
            dialog.appendChild(svg);
            var title = document.createElement("div");
            title.classList.add("minecraft");
            title.classList.add("dialog_title");
            title.innerText = ((conf || {}).title || "");
            dialog.appendChild(title);
            var content = document.createElement("div");
            content.classList.add("minecraft");
            content.classList.add("dialog_content");
            content[
                function () {
                    if (conf.isHTML) {
                        return "innerHTML";
                    } else {
                        return "innerText";
                    }
                }()
            ] = ((conf || {}).content || "");
            dialog.appendChild(content);
            dialog.close = function () {
                this.remove();
            }
            if (conf.close_btn) {
                var close_btn = document.createElement("div");
                close_btn.classList.add("close");
                close_btn.onclick = function () {
                    // close("#" + dialog.id);
                    this.parentNode.close();
                }
                dialog.appendChild(close_btn);
            }
            var ok_btn = document.createElement("button");
            ok_btn.classList.add("minecraft");
            ok_btn.innerText = (conf.ok_btn_text || "确定");
            ok_btn.onclick = function () {
                (conf.on_ok || function (dialog) {
                    dialog.close();
                })(this.parentNode);
            }
            dialog.appendChild(ok_btn);
            var cancel_btn = document.createElement("button");
            cancel_btn.classList.add("minecraft");
            cancel_btn.innerText = (conf.cancel_btn_text || "取消");
            cancel_btn.onclick = function () {
                (conf.on_cancel || function (dialog) {
                    dialog.close();
                })(this.parentNode);
            }
            dialog.appendChild(cancel_btn);
            document.documentElement.appendChild(dialog);
        }
    }
}
</script>

<style lang="less" scoped>
@import "global.less";





// =========================
// 对话框样式
// =========================

div.minecraft.dialog {
    height: 80vh;
    width: 80vw;
    position: fixed;
    z-index: 10000;
    // background-image: ... (原base64已注释，如需可恢复)
    image-rendering: pixelated;

    >svg {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: contain;
        top: 0;
        left: 0;
    }

    // 媒体查询
    @media (orientation: landscape) {
        top: 10vh;
        left: calc((100vw - (80vh / 5 * 6)) / 2);
        max-width: calc(80vh / 5 * 6);
    }

    @media (orientation: portrait) {
        top: calc((100vh - (80vw / 6 * 5)) / 2);
        left: 10vw;
        max-height: calc(80vw / 6 * 5);
    }

    // > div.minecraft.dialog:before { ... } // 遮罩层已注释

    >div.minecraft.dialog_content {
        position: absolute;
        left: calc(100% / 300 * 7);
        top: calc(100% / 200 * 25);
        width: calc(100% / 300 * 274);
        height: calc(100% / 200 * 94);
        color: #FFF;
        margin: 3px;
        overflow: auto;

        pre {
            width: 100%;
            overflow-x: auto;
        }
    }

    >div.minecraft.dialog_title {
        position: absolute;
        left: calc(100% / 300 * 7);
        top: calc(100% / 200 * 7);
    }

    >button {
        position: absolute;
        width: calc(100% / 300 * 288);
        height: calc(100% / 200 * 32.5);

        &:nth-of-type(1) {
            left: calc(100% / 300 * 6);
            top: calc(100% / 200 * 125);
        }

        &:nth-of-type(2) {
            left: calc(100% / 300 * 6);
            top: calc(100% / 200 * 162.5);
        }
    }

    >div.close {
        right: calc(100% / 300 * 5);
        top: calc(100% / 200 * 5);
        position: absolute;
        width: calc(100% / 300 * 17);
        height: calc(100% / 200 * 15);
        background-image: url('./Minecraft_ui_image/other/x/X.png');
        background-size: cover;

        &:hover {
            background-image: url('./Minecraft_ui_image/other/x/XHover.png');
        }

        &:active {
            background-image: url('./Minecraft_ui_image/other/x/XPress.png');
        }
    }
}
</style>