<template>
  <AuthFormWrapper>
    <form
      class="flex grow flex-col gap-6 px-8"
      @submit.prevent="onResetPassword"
    >
      <h1 class="mt-auto text-center text-2xl font-bold">Set A New Password</h1>
      <div class="flex flex-col gap-1">
        <input
          ref="passwordInputRef"
          class="rounded-lg border p-2 text-lg outline-none"
          type="password"
          name="newPass"
          placeholder="New Password"
          :required="true"
          autofocus
        />
      </div>
      <UiErrorMsg :error-msg="errorMessage" />
      <div class="mb-12 mt-auto flex justify-center">
        <button type="submit" :disabled="loading">
          <img class="w-[70px]" src="@/assets/images/submit.png" alt="submit" />
        </button>
      </div>
    </form>
  </AuthFormWrapper>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
  auth: {
    unauthenticatedOnly: true,
  },
});

const errorMessage = ref("");
const passwordInputRef = ref<HTMLInputElement>();

const { id, uuid } = useRoute().query;
const loading = ref(false);
async function onResetPassword() {
  loading.value = true;
  try {
    await $fetch("/api/auth/reset-password", {
      method: "POST",
      body: { password: passwordInputRef.value?.value },
      query: { id, uuid },
    });
    await navigateTo("/auth/sign-in");
  } catch (err: { data: NuxtError }) {
    const error = err.data;
    errorMessage.value = error.statusMessage ?? "";
  } finally {
    loading.value = false;
  }
}
</script>
