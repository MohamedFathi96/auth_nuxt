<template>
  <div class="flex gap-7 rounded-2xl bg-black p-8">
    <div class="img-container">
      <img
        class="h-[500px] sm:min-w-[350px]"
        src="@/assets/images/canvas002.webp"
        alt="websites"
      />
    </div>
    <div class="flex min-h-[500px] rounded-3xl bg-white sm:min-w-[350px]">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 735px) {
  .img-container {
    display: none;
  }
}
</style>
