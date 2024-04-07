<template>
  <div class="flex h-screen flex-col">
    <nav
      class="flex justify-between bg-blue-700 px-[30px] py-[20px] text-lg font-semibold text-white"
    >
      <span>Welcome</span>
      <button @click="sighOutHandler" type="button">Sign Out</button>
    </nav>

    <div class="flex grow items-center justify-center">
      <h1 class="text-[2.5rem] font-semibold italic">
        {{ isAdmin ? "Admin Dashboard" : "User Dashboard" }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { signOut, data } = useAuth();
const isAdmin = ref(data.value?.user?.role === "ADMIN");
const sighOutHandler = async () => await signOut();
</script>

<style scoped></style>
