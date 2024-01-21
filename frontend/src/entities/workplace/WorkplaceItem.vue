<template>
  <div class="container-workplace">
    <p class="info">{{ employee }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  employee: {
    type: Number,
    required: true,
  }
})
</script>

<style src="./WorkplaceItem.style.scss" lang="scss" scoped></style>