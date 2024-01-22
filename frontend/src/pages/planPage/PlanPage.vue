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
          :handler="handlerButtonShowDialog"
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

      <dialog-window v-model:show="dialogVisible">
        <div>
          <h1>Добавить рабочее место</h1>
            <input-elem
              v-model="workplaceInfo.employee"
              :typeInput="'text'"
              :placeholderInput="'employee'"
            />
            <input-elem
              v-model="workplaceInfo.x"
              :typeInput="'text'"
              :placeholderInput="'X'"
            />
            <input-elem
              v-model="workplaceInfo.y"
              :typeInput="'text'"
              :placeholderInput="'Y'"
            />
          <button-elem
            :clName="null"
            :title="'Отправить'"
            :handler="send"
            :width="'30vw'"
            :height="'48px'"
            :background="'#70C05B'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'24px 0 0 0'"
            :borderRadius="'10px'"
            :icon="null"
          />
        </div>
      </dialog-window>
  </div>
</template>

<script setup lang="ts">
import { PathNames } from '@/shered/constants/route.constants';
import { usePlansStore } from '@/shered/store/plans'
import { storeToRefs } from 'pinia';
import WorkplaceItem from '@/entities/workplace/WorkplaceItem.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { useWorkplacesStore } from '@/shered/store/workplaces';
import { useRoute } from 'vue-router';

const route = useRoute();
const plansStore = usePlansStore();
const { plan, isError, isLoading } = storeToRefs(plansStore);
const { getPlan } = plansStore;

const planName = plan.value?.name || '';
const planId = route.params.id;
const workplaceInfo = reactive({
  x: null,
  y: null,
  plan: planId,
  employee: null,
});

const workplaceForm = computed(() => {
  return {
    x: workplaceInfo.x,
    y: workplaceInfo.y,
    plan: workplaceInfo.plan,
    employee: workplaceInfo.employee
  };
});


const workplace = useWorkplacesStore();
const { addWorkplace } = workplace;

const dialogVisible = ref(false);
const handlerButtonShowDialog = () => {
  dialogVisible.value = true;
}

const send = async () => {
  await addWorkplace(workplaceForm.value);
  getPlan();
  workplaceInfo.x = null;
  workplaceInfo.y = null;
  workplaceInfo.employee = null;
  dialogVisible.value = false;
}

onMounted(() => {
  getPlan();
});
</script>

<style src="./PlanPage.style.scss" lang="scss" scoped></style>