<template>
  <div class="flex h-screen flex-col">
    <nav
      class="flex justify-between bg-blue-700 px-[30px] py-[20px] text-lg font-semibold text-white"
    >
      <span>Welcome</span>
      <nuxt-link to="/auth/sign-in">SignIn/Up</nuxt-link>
    </nav>

    <div class="flex grow items-center justify-center">
      <h1 class="text-[2.5rem] font-semibold italic">
        Home Page You Are Not Authenticated...
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
});
</script>

<style scoped></style>
