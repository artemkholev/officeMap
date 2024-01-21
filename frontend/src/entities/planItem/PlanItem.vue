<template>
  <div 
    class="post" 
    @mousedown.left="$router.push({
      name: PathNames.POST,
      params: {
        id: post.id
      },
      query: $route.query
    })"
  >
    <div class="post__info">
      <p>{{ post.id }}</p>
      <div class="post__info-elem">
        <p><strong>Наименование:</strong> {{ post.name }}</p>
        <img :src="post.img" alt="фото плана" width="100" height="100">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PathNames } from '@/shered/constants/route.constants';

defineProps({
  post: {
    type: Object,
    required: true,
  }
})
</script>

<style src="./PlanItem.style.scss" lang="scss" scoped></style>