<template>
  <AuthFormWrapper>
    <form class="flex grow flex-col gap-6 px-8" @submit.prevent="onVerify">
      <h1 class="mt-auto text-center text-2xl font-bold">
        Verify Your Account
      </h1>
      <div class="flex flex-col gap-1">
        <input
          ref="codeInputRef"
          class="rounded-lg border p-2 text-lg outline-none"
          type="text"
          name="code"
          placeholder="Verification Code"
          :required="true"
          autofocus
        />
        <UiErrorMsg :error-msg="errorMessage" />
      </div>
      <div class="mb-12 mt-auto flex justify-center">
        <button :disabled="loading" type="submit">
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
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
  },
});

const errorMessage = ref("");
const codeInputRef = ref<HTMLInputElement>();
const loading = ref(false);
async function onVerify() {
  loading.value = true;
  try {
    await $fetch("/api/auth/verify-user", {
      method: "POST",
      body: {
        id: useRoute().params.id,
        code: codeInputRef.value?.value,
      },
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
