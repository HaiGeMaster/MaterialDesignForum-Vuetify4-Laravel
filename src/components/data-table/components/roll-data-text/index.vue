<template>
    <v-tooltip location="top" :text="text">
        <template v-slot:activator="{ props }">
            <div 
                ref="container"
                class="scrolling-text" 
                :class="{ 'scroll-animation': shouldScroll }"
                :style="{ width: width + 'px' }"
                v-bind="props"
            >
                <div class="text-content">{{ text }}</div>
            </div>
        </template>
    </v-tooltip>
</template>

<script>
export default {
    name: 'roll-data-text',
    props: {
        text: {
            type: String,
            default: ''
        },
        scrolling: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            shouldScroll: false
        }
    },
    mounted() {
        this.checkOverflow();
    },
    watch: {
        text() {
            this.checkOverflow();
        },
        width() {
            this.checkOverflow();
        },
        scrolling() {
            this.checkOverflow();
        }
    },
    methods: {
        checkOverflow() {
            if (!this.$refs.container) return;
            
            const container = this.$refs.container;
            const content = container.querySelector('.text-content');
            
            if (content) {
                this.shouldScroll = this.scrolling && content.offsetWidth > container.offsetWidth;
            }
        }
    }
}
</script>

<style scoped>
.scrolling-text {
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    display: inline-block;
}

.text-content {
    display: inline-block;
    white-space: nowrap;
}

.scroll-animation .text-content {
    animation: scroll 10s linear infinite;
}

.scrolling-text:hover .text-content {
    animation-play-state: paused;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    10% {
        transform: translateX(0);
    }
    90% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>