<template>
  <AuthFormWrapper>
    <form
      class="flex grow flex-col px-8"
      ref="formRef"
      @submit.prevent="handleRegister"
    >
      <div class="mt-auto flex flex-col gap-6 text-lg">
        <input
          class="px-1 py-3 outline-none"
          type="text"
          name="username"
          placeholder="username"
          :required="true"
        />
        <input
          class="px-1 py-3 outline-none"
          type="password"
          name="password"
          placeholder="password"
          :required="true"
        />
        <input
          class="px-1 py-3 outline-none"
          type="password"
          name="confirm"
          placeholder="confirm password"
          :required="true"
        />
        <input
          class="px-1 py-3 outline-none"
          type="email"
          name="email"
          placeholder="email address"
          :required="true"
        />
        <UiErrorMsg :error-msg="errorMessage" />
      </div>
      <div
        class="bg-red-7d00 mb-12 mt-auto flex items-center justify-between font-semibold"
      >
        <button
          :disabled="loading"
          class="mx-auto translate-x-[17px]"
          type="submit"
        >
          <img class="w-[70px]" src="@/assets/images/submit.png" alt="submit" />
        </button>
        <NuxtLink to="/auth/sign-in">Login</NuxtLink>
      </div>
    </form>
  </AuthFormWrapper>
</template>

<script setup lang="ts">
import type { NuxtError } from "nuxt/app";

definePageMeta({
  layout: "auth",
  pageTransition: {
    mode: "out-in",
    name: "signUp",
  },
  middleware: [
    "auth",
    (to, from) => {
      if (
        from.meta.pageTransition &&
        typeof from.meta.pageTransition !== "boolean"
      )
        from.meta.pageTransition.name = "lostPass";
    },
  ],
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard/categories",
  },
});

const formRef = ref<HTMLFormElement>();
const loading = ref(false);
const errorMessage = ref("");

async function handleRegister() {
  const formData = new FormData(formRef.value);
  loading.value = true;
  try {
    if (formData.get("password") !== formData.get("confirm"))
      throw {
        data: {
          statusMessage: "password and confirm password do not match",
        },
      };

    const userId = await $fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
      },
    });
    await navigateTo(`/auth/account-verification/${userId}`);
  } catch (err: { data: NuxtError }) {
    const error = err.data;
    errorMessage.value = error.statusMessage;
  } finally {
    loading.value = false;
    formRef.value?.reset();
  }
}
</script>
