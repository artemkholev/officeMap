<template>
  <div class="post-container">
      <h2 v-if="isLoading">Loading...</h2>
      <div v-else-if="plan" class="info-plan">
        <h1>{{ `План ${ plan?.id } / ` + plan.name}}</h1>
        <div 
          class="contant__plan" 
          :style="{height: (plan.height + 4 + 40) + 'px', width: (plan.width + 4 + 40) + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center'}"
        >
          <img 
            :src="plan.img" 
            alt="фото плана"
          >
          <div 
            v-if="plan.workplaces.length != 0"
            class="workplaces"
          >
            <WorkplaceItem 
              @mousedown.left="$router.push({
                name: PathNames.WORKPLACE,
                params: {
                  id_w: workplace.id
                },
                query: $route.query
              })"
              v-for="workplace in plan.workplaces" :key="workplace.id"
              :style="{left: (workplace.x) + 'px', bottom: (workplace.y) + 'px', position: 'absolute',  cursor: 'pointer'}"
              :employee="workplace.employee"
            />
          </div>
        </div>
        <button-elem
          :clName="null"
          :title="'добавить рабочее место'"
          :handler="() => null"
          :width="'30vw'"
          :height="'48px'"
          :background="'greenyellow'"
          :textColor="null"
          :fontSize="null"
          :fontWeight="null"
          :margin="'50px'"
          :borderRadius="'10px'"
          :icon="null"
        />
      </div>
      <div v-else>План не найден!</div>
      <div v-if="isError">Error!</div>
  </div>
</template>

<script setup lang="ts">
import { PathNames } from '@/shered/constants/route.constants';
import { usePlansStore } from '@/shered/store/plans'
import { storeToRefs } from 'pinia';
import WorkplaceItem from '@/entities/workplace/WorkplaceItem.vue';
import { onMounted, ref } from 'vue';

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