<template>
  <div class="post-container">
      <h2 v-if="isLoading">Loading...</h2>
      <div v-else-if="plan">
        <h1>{{ `План ${ plan?.id }` }}</h1>
        <h2>{{ plan?.title }}</h2>
        <p>{{ plan?.body }}</p>
        <button-elem v-if="!author"
            :clName="null"
            :title="'Об авторе'"
            :handler="AboutAuthor"
            :width="'30vw'"
            :height="'48px'"
            :background="'greenyellow'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'24px 0 0 0'"
            :borderRadius="'10px'"
            :icon="null"
        />
        <div v-else-if="show" class="aboutAuthor" >
          <p>{{ author.username }}</p>
          <p>{{ author.email }}</p>
          <p>{{ author.phone }}</p>
          <p>{{ author.website }}</p>
        </div>
        <button-elem v-if="author"
            :clName="null"
            :title="show ? 'Скрыть' : 'Показать'"
            :handler="() => {show = !show}"
            :width="'30vw'"
            :height="'48px'"
            :background="'greenyellow'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'24px 0 0 0'"
            :borderRadius="'10px'"
            :icon="null"
        />
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

const AboutAuthor = () => {
  getInfoAboutAuthor(plan.value?.userId);
  show.value = true;
}

onMounted(() => {
  getPlan();
});
</script>

<style src="./PlanPage.style.scss" lang="scss" scoped></style>