<template>
  <div>
    <v-sheet class="h-screen d-flex align-center justify-center" height="100%">
      <v-card class="pa-12" elevation="10" width="400" rounded="lg">
        <v-img
          :width="400"
          aspect-ratio="16/9"
          cover
          src="@/assets/logo_.png"
        ></v-img>
        <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="formdata.email"
          clearable
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Contraseña
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ovidaste tu contraseña?</a
          >
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formdata.password"
          clearable
        ></v-text-field>

        <v-btn
          :disabled="loading"
          :loading="loading"
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          @click="login"
        >
          Iniciar Sesión
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Registrate! <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
      <v-snackbar v-model="snackbar" color="red-accent-3" variant="tonal">
        {{ message }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-sheet>
  </div>
</template>

<script setup>
import { axiosInstance } from "@/components/api";
import { useUserStore } from "@/store/auth";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
userStore.initializeStore();
const visible = ref(false);
const loading = ref(false);
const snackbar = ref(false);
const message = ref("");
const defaultformdata = ref({
  email: undefined,
  password: undefined,
});
const formdata = ref({ ...defaultformdata.value });

const login = async () => {
  loading.value = true;
  await axiosInstance
    .post("signin", {
      ...formdata.value,
    })
    .then(async (res) => {
      if (res.status == 200) {
        const { data } = res;
        let is_admin = data.role;
        // localStorage.setItem("user", JSON.stringify(data));
        // localStorage.setItem("jwt", data.token);
        userStore.login(data);
        if (localStorage.getItem("token") != null) {
          // this.$emit("loggedIn");
          if (route.params.nextUrl != null) {
            router.push(route.params.nextUrl);
          } else {
            if (is_admin == "admin") {
              router.push("products");
            } else {
              router.push("sale");
            }
          }
        }
      }
    })
    .then(() => {
      setTimeout(() => (loading.value = false), 1000);
    })
    .catch((err) => {
      // Handle error
      console.log(err);
      if (err.response.status == 404) {
        snackbar.value = true;
        message.value = err.response.data.message;
        setTimeout(() => (loading.value = false), 400);
      }
    });
};
</script>
