<template>
    <div class="container minecraft" style="max-width: 800px;margin: auto;">
        <div class="row">
            <div class="col s12">
                <h1>MC</h1>

                <div style="background-color: #BBBBBB;padding: 6px;">
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
                <!-- <div style="background-color: #313233;padding: 6px;">
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
                </div> -->
                <button style="margin: 6px;" class="minecraft" @click="open_minecraft_dialog">介绍</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MC',
    data() {
        return {
            dialog_num: 0
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
// =========================
// 变量定义 (可自定义)
// =========================
@font-face {
    src: url(./ttf/Minecraft_AE.ttf);
    font-family: "Minecraft_AE";
}

// 字体
@minecraft-font: "Minecraft_AE";

// 颜色
@color-light-bg: #C6C6C6;
@color-light-border-top: #F7F7F7;
@color-light-border-left: #F7F7F7;
@color-dark-border-bottom: #646464;
@color-dark-border-right: #646464;
@color-text: #4C4C4C;
@color-hover-bg: #208306;
@color-hover-border-top: #1ACB09;
@color-hover-border-left: #1ACB09;
@color-hover-border-bottom: #0A4809;
@color-hover-border-right: #0A4809;
@color-hover-text: #FFFFFF;
@color-active-bg: #208306;
@color-active-border-top: #0A4809;
@color-active-border-left: #0A4809;
@color-active-border-bottom: #1ACB09;
@color-active-border-right: #1ACB09;
@color-disabled-bg: #757575;
@color-dark-bg: #3A3A3A;
@color-dark-border-top: #414141;
@color-dark-border-left: #414141;
@color-dark-border-bottom: #212121;
@color-dark-border-right: #212121;
@color-dark-text: #FFFFFF;
@color-dark-hover-bg: #004E03;
@color-dark-hover-border-top: #50A154;
@color-dark-hover-border-left: #50A154;
@color-dark-hover-border-bottom: #035606;
@color-dark-hover-border-right: #035606;
@color-dark-active-bg: #208306;
@color-dark-active-border-top: #035606;
@color-dark-active-border-left: #035606;
@color-dark-active-border-bottom: #50A154;
@color-dark-active-border-right: #50A154;

// 尺寸
@button-height: 50px;
@button-width: 300px;
@button-font-size: 16px;
@dialog-max-width: 80vh;
@dialog-max-height: 80vw;

// =========================
// 字体设置
// =========================

.minecraft {
    font-family: @minecraft-font;

    // =========================
    // 按钮样式
    // =========================

    button {
        background-color: @color-light-bg;
        border-top: 1.5px solid @color-light-border-top;
        border-left: 1.5px solid @color-light-border-left;
        border-bottom: 1.5px solid @color-dark-border-bottom;
        border-right: 1.5px solid @color-dark-border-right;
        color: @color-text;
        outline: 1.5px solid #131313;
        vertical-align: middle;
        line-height: 100%;
        height: @button-height;
        width: @button-width;
        font-size: @button-font-size;
        margin-bottom: 5px;
        position: relative;

        &:hover {
            background-color: @color-hover-bg;
            border-top: 1.5px solid @color-hover-border-top;
            border-left: 1.5px solid @color-hover-border-left;
            border-bottom: 1.5px solid @color-hover-border-bottom;
            border-right: 1.5px solid @color-hover-border-right;
            outline: 1.5px solid #FFFFFF;
            color: @color-hover-text;

            &::after,
            &::before {
                display: block;
                content: '';
                position: absolute;
            }

            &::after {
                height: 1.3px;
                width: 1.3px;
                top: -1.3px;
                right: -1.3px;
                background-color: @color-hover-bg;
            }

            &::before {
                height: 1.5px;
                width: 1.5px;
                left: -1.5px;
                bottom: -1.5px;
                background-color: #BFBFBF;
            }
        }

        &:active {
            background-color: @color-active-bg;
            border-top: 1.5px solid @color-active-border-top;
            border-left: 1.5px solid @color-active-border-left;
            border-bottom: 1.5px solid @color-active-border-bottom;
            border-right: 1.5px solid @color-active-border-right;
            outline: 1.5px solid #FFFFFF;
            color: @color-hover-text;
            padding-top: 5px;
        }

        &:disabled {
            background-color: @color-disabled-bg;
            border: none;
            outline: 1.5px solid #131313;
            color: @color-text;
            position: relative;
            padding-top: 0;

            &::after {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 9.75px;
                height: 15px;
                line-height: 12px;
                image-rendering: pixelated;
                content: url(./Minecraft_ui_image/Glyph/ErrorGlyph.png);
            }

            &::before {
                display: none;
            }
        }

        &.dark {
            background-color: @color-dark-bg;
            border-top: 1.5px solid @color-dark-border-top;
            border-left: 1.5px solid @color-dark-border-left;
            border-bottom: 1.5px solid @color-dark-border-bottom;
            border-right: 1.5px solid @color-dark-border-right;
            color: @color-dark-text;
            outline: 1.5px solid #131313;

            &:hover {
                background-color: @color-dark-hover-bg;
                border-top: 1.5px solid @color-dark-hover-border-top;
                border-left: 1.5px solid @color-dark-hover-border-left;
                border-bottom: 1.5px solid @color-dark-hover-border-bottom;
                border-right: 1.5px solid @color-dark-hover-border-right;
                outline: 1.5px solid #FFFFFF;
                color: @color-hover-text;
            }

            &:active {
                background-color: @color-dark-active-bg;
                border-top: 1.5px solid @color-dark-active-border-top;
                border-left: 1.5px solid @color-dark-active-border-left;
                border-bottom: 1.5px solid @color-dark-active-border-bottom;
                border-right: 1.5px solid @color-dark-active-border-right;
                outline: 1.5px solid #FFFFFF;
                color: @color-hover-text;
                padding-top: 5px;
            }

            &::after {
                background-color: #373737;
            }

            &::before {
                background-color: #373737;
            }

            &:hover::before {
                background-color: #007305;
            }

            &:hover::after {
                background-color: #007305;
            }
        }

        // 伪元素定位
        &::before {
            height: 1.5px;
            width: 1.5px;
            left: -1.5px;
            bottom: -1.5px;
            background-color: #BFBFBF;
        }

        &::after {
            height: 1.5px;
            width: 1.5px;
            top: -1.5px;
            right: -1.5px;
            background-color: #BFBFBF;
        }
    }

    // =========================
    // 复选框样式
    // =========================

    label {
        >input[type=checkbox] {
            display: block;
            width: 100%;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            -o-appearance: none;
            outline: none;
            position: relative;
            height: 24px;

            &::after {
                display: inline-block;
                background-image: url(./Minecraft_ui_image/toggle/toggle_off.png);
                image-rendering: pixelated;
                content: '';
                height: 24px;
                width: 45px;
                background-size: 45px;
            }

            &:checked::after {
                background-image: url(./Minecraft_ui_image/toggle/toggle_on.png);
            }

            &:checked:hover::after {
                background-image: url(./Minecraft_ui_image/toggle/toggle_on_hover.png);
            }

            &:hover::after {
                background-image: url(./Minecraft_ui_image/toggle/toggle_off_hover.png);
            }
        }

        >label,
        .minecraft {
            font-family: @minecraft-font;
            display: block;
            margin-bottom: 3px;
            padding-left: 4px;
            font-size: 13px;
        }

        &.dark>label,
        .minecraft.dark {
            color: #FFFFFF;
        }
    }

    // =========================
    // 滑块样式
    // =========================

    label {

        >[type="range"],
        [type="range"].minecraft {
            position: relative;
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
            outline: 0;
            background-color: transparent;
            width: 100%;

            &::before {
                content: "";
                display: block;
                position: absolute;
                background-color: #000;
                width: 2px;
                height: 10px;
                top: 6px;
            }

            &:hover::before {
                background-color: #fff;
            }

            &::-webkit-slider-runnable-track {
                height: 11.5px;
                background: #404040;
                border: 2px solid #000;
            }

            &:hover::-webkit-slider-runnable-track {
                background: #007100;
                border: 2px solid #fff;
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 23px;
                background-image: url(./Minecraft_ui_image/slider-thumb/slider-thumb.jpg);
                image-rendering: pixelated;
                background-size: cover;
                border: 1px solid transparent;
                margin-top: -8px;
            }

            &:hover::-webkit-slider-thumb {
                background-image: url(./Minecraft_ui_image/slider-thumb/slider-thumb_hover.jpg);
                border-image: linear-gradient(#4A8631, #4A8631) 0 fill / 8 15 8 0 / 0px 0px 0 2000px;
            }
        }
    }

    // =========================
    // 对话框样式
    // =========================

    .dialog {
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
}
</style>