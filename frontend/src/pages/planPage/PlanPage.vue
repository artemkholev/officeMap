<template>
  <div class="post-container">
      <h2 v-if="isLoading">Loading...</h2>
      <div v-else-if="plan" class="info-plan">
        <h1>{{ `План ${ plan?.id } / ` + plan.name}}</h1>
        <div class="contant__plan">
          <img :src="plan.img" alt="фото плана" :width="plan.width" :height="plan.height">
        </div>
        <ul v-if="plan.workplaces.length != 0">
          <li v-for="workplace in plan.workplaces" :key="workplace"></li>
        </ul>
      </div>
      <div v-else>Пост не найден!</div>
      <div v-if="isError">Error!</div>
  </div>
</template>

<script setup lang="ts">
import { usePlansStore } from '@/shered/store/plans'
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';

const plansStore = usePlansStore();

const { author, plan, isError, isLoading } = storeToRefs(plansStore);
const { getPlan, getInfoAboutAuthor } = plansStore;
const show = ref(false);

// const AboutAuthor = () => {
//   getInfoAboutAuthor(plan.value?.userId);
//   show.value = true;
// }

  //  <button-elem v-if="author"
  //           :clName="null"
  //           :title="show ? 'Скрыть' : 'Показать'"
  //           :handler="() => {show = !show}"
  //           :width="'30vw'"
  //           :height="'48px'"
  //           :background="'greenyellow'"
  //           :textColor="null"
  //           :fontSize="null"
  //           :fontWeight="null"
  //           :margin="'24px 0 0 0'"
  //           :borderRadius="'10px'"
  //           :icon="null"
  //       />

onMounted(() => {
  getPlan();
});
</script>

<style src="./PlanPage.style.scss" lang="scss" scoped></style>