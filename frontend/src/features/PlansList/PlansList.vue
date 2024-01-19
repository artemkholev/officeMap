<template>
  <div v-if="plans.length > 0">
    <h3>Cписок планов помещений</h3>
    <div name="bucket-list">
      <PlanItem v-for="plan in plans"
        :post="plan"
        :key="plan.id"
      />
    </div>
  </div>
  <h2 v-else>
    Данных нет
  </h2>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import PlanItem from "@/entities/planItem/PlanItem.vue";
import type { IPlan } from "@/shered/api/plansApi/planApi.types";

defineProps({
  plans: {
    type: Array<IPlan>,
    required: true
  }
})
</script>

<style src="./PlansList.style.scss" lang="scss" scoped></style>@/shered/api/postsApi/planApi.types