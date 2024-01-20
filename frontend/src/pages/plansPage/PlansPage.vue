<template>
  <div class="containerPosts">
    <div v-if="plans.length != 0" class="sortOption">
      <select-elem
        v-model="selected"
        :options="selectOptions"
      />
    </div>
    <PlansList :plans="selected === 'general' ? plans : sortedPlans"/>
    <p v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <p v-if="isError" :style="{margin: '10px', color: 'red'}">Ошибка загрузки, обновите страницу</p>
    <div v-if="totalPages" class="page__wrapper">
      <div 
        v-for="pagePath in totalPages" 
        :key="pagePath"
        class="navigation-pages"
        :class="{
          'carrent-page': page === pagePath
        }"
        @click="changePage(pagePath)"
      >
        {{ pagePath }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import PlansList from '@/features/PlansList/PlansList.vue';
import { usePlansStore } from '@/shered/store/plans';

const postsStore = usePlansStore();
const { isError, isLoading, plans, page, selected, totalPages, selectOptions, sortedPlans } = storeToRefs(postsStore);
const { getPlans } = postsStore;

const changePage = (currentPage: number) => {
  page.value = currentPage;
};

watch(page, () => {
  getPlans();
});

onMounted(() => {
  getPlans()
});
</script>

<style src="./PlansPage.style.scss" lang="scss" scoped></style>