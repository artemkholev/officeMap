<template>
  <div class="containerPosts">
    <div class="sortOption">
      <select-elem
        v-model="selected"
        :options="selectOptions"
      />
    </div>
    <PlansList :plans="selected === 'general' ? plans : sortedPlans"/>
    <p v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <p v-if="isError" :style="{margin: '10px', color: 'red'}">Ошибка: {{ isError }}</p>
    <div class="page__wrapper">
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

const plansStore = usePlansStore();
const { isError, isLoading, page, plans, selected, totalPages, selectOptions, sortedPlans } = storeToRefs(plansStore);
const { getPlans } = plansStore;

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