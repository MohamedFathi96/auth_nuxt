<template>
  <AuthFormWrapper>
    <form
      class="flex grow flex-col px-8"
      @submit.prevent="signInWithCredentials"
    >
      <div class="mt-auto flex flex-col gap-6 text-lg">
        <input
          class="p-3 outline-none"
          type="text"
          name="email"
          placeholder="email"
          v-model="email"
          :required="true"
        />
        <input
          class="p-3 outline-none"
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
          :required="true"
        />
        <div class="mt-auto flex items-center gap-1">
          <input
            type="checkbox"
            class="aspect-square w-[14px] rounded-sm border border-sky-900"
            name="rememberMe"
            id="remember-me"
          />
          <label for="remember-me" class="text-gray-500">Remember Me</label>
        </div>
        <UiErrorMsg :error-msg="errorMessage" />
      </div>
      <div
        class="mb-12 mt-auto flex items-center justify-between gap-4 font-semibold"
      >
        <NuxtLink to="/auth/sign-up">Register</NuxtLink>
        <button type="submit">
          <img class="w-[70px]" src="@/assets/images/submit.png" alt="submit" />
        </button>
        <NuxtLink to="/auth/lost-password">Lost P/W?</NuxtLink>
      </div>
    </form>
  </AuthFormWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  pageTransition: {
    mode: "out-in",
  },
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
  },
});
const email = ref("");
const password = ref("");
const { signIn, data } = useAuth();
const errorMessage = ref("");

async function signInWithCredentials() {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  try {
    const user = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (user?.error)
      throw {
        message:
          user.error === "CredentialsSignin"
            ? "username or password is incorrect"
            : "Something Went Wron!!!",
      };

    navigateTo("/");
  } catch (error: { messgae: string }) {
    errorMessage.value = error.message;
    email.value = "";
    password.value = "";
  }
}
</script>
