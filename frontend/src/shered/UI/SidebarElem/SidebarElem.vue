<template>
    <div class="sidebar-backdrop" @click="changeSidebarPanel" v-if="isPanelOpen"></div>
    <transition name="slide">
        <div v-if="isPanelOpen"
                :class="contentClasses">
            <slot></slot>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/shered/store/sidebar';
import { useThemeStore } from '@/shered/store/theme';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';

const sidebarStore = useSidebarStore();
const { isPanelOpen,  changeSidebarPanel  } = sidebarStore;

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const contentClasses = computed(() => {
  return { 'sidebar-panel': true, ['dark-sidebar']: isDarkTheme.value };
});

const isDarkStyle = computed(() => {
  return isDarkTheme.value;
});

defineOptions({
    name: 'sidebar-elem',
})
</script>

<style src="./SidebarElem.style.scss" lang="scss" scoped></style>