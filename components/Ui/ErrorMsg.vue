<template>
  <span
    v-if="errorMsg"
    class="text-sm text-red-600 italic capitalize font-semibold max-w-[40ch]"
    >{{ errorMsg }}</span
  >
</template>

<script setup lang="ts">
const { errorMsg } = defineProps<{ errorMsg: string }>();
</script>
