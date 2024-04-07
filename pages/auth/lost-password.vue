<template>
  <AuthFormWrapper>
    <form
      class="flex grow flex-col gap-6 px-6"
      @submit.prevent="onRequestResetPassword"
    >
      <div class="mt-auto flex flex-col gap-6">
        <h1 class="text-center text-2xl font-bold">Forget Password</h1>
        <div class="flex flex-col gap-1">
          <input
            ref="emailInputRef"
            class="rounded-lg border p-2 text-lg outline-none"
            type="email"
            name="code"
            placeholder="Email..."
            :required="true"
            autofocus
          />
          <p class="text-sm font-semibold italic text-green-500">
            {{ message }}
          </p>
          <UiErrorMsg :error-msg="errorMessage" />
        </div>
      </div>
      <div class="mb-12 mt-auto flex items-center justify-between">
        <NuxtLink to="/auth/sign-in" class="font-semibold">Login</NuxtLink>
        <button
          class="mx-auto translate-x-[-20px]"
          type="submit"
          :disabled="loading"
        >
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
  pageTransition: {
    mode: "out-in",
    name: "lostPass",
  },
  middleware: [
    "auth",
    (to, from) => {
      if (
        from.meta.pageTransition &&
        typeof from.meta.pageTransition !== "boolean"
      )
        from.meta.pageTransition.name = "signUp";
    },
  ],
  auth: {
    unauthenticatedOnly: true,
  },
});

const errorMessage = ref("");
const emailInputRef = ref<HTMLInputElement>();
const loading = ref(false);
const message = ref("");
async function onRequestResetPassword(event: Event) {
  loading.value = true;
  try {
    await $fetch("/api/auth/forget-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { email: emailInputRef.value?.value },
    });
    message.value = "A reset password link has been sent to your email";
  } catch (err: { data: NuxtError }) {
    const error = err.data;
    errorMessage.value = error.statusMessage ?? "";
  } finally {
    loading.value = false;
    if (emailInputRef.value?.value) emailInputRef.value.value = "";
  }
}
</script>
