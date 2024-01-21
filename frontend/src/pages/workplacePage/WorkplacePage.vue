<template>
  <div class="workplace">
    <h1> {{'Рабочее место ' + workplace?.id }}</h1>
    <div class="workplace__info-elem">
      <p><strong>Работник:</strong> {{ workplace?.employee }}</p>
      <p><strong>Принадлежит плану №</strong> {{ workplace?.plan }}</p>
      <p><strong>X:</strong> {{ workplace?.x }}</p>
      <p><strong>Y:</strong> {{ workplace?.y }}</p>
    </div>
    <button-elem
      :clName="null"
      :title="'удалить рабочее место'"
      :handler="removeWorkplace"
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
</template>

<script setup lang="ts">
import { useWorkplacesStore } from '@/shered/store/workplaces';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';


const workplacesStore = useWorkplacesStore();

const { workplace } = storeToRefs(workplacesStore);
const { getWorkplace, removeWorkplace } = workplacesStore;

onMounted(() => {
  getWorkplace();
});
</script>

<style src="./WorkplacePage.style.scss" lang="scss" scoped></style>