<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Productos </v-app-bar-title>

    <v-btn
      v-if="userStore.user.role == 'admin'"
      icon
      @click="
        () => {
          openDialog = true;
        }
      "
    >
      <v-icon>mdi-playlist-plus</v-icon>
    </v-btn>

    <v-btn icon @click="router.go()">
      <!-- <v-icon>mdi-dots-vertical</v-icon> -->
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-app-bar>

  <TabsForm
    :openDialog="openDialog"
    @closeDialog="
      () => {
        openDialog = false;
      }
    "
    @reload="
      () => {
        appStore.productDialog();
      }
    "
    :data="{ ...data }"
  />
</template>

<script setup>
import { useAppStore } from "../../store/app";
import { ref } from "vue";
import router from "@/router";
import TabsForm from "@/components/products/TabsForm.vue";
import { useUserStore } from "@/store/auth";
const userStore = useUserStore();

console.log(userStore.user.role);

defineEmits(["drawer"]);
const openDialog = ref(false);
const appStore = useAppStore();
const data = {
  code: "",
  description: "",
  category_id: undefined,
  brand_id: undefined,
  price: undefined,
  minprice: undefined,
  user_id: 1,
  prices: [
    {
      measure_id: 1,
      equivalent: 1,
      price: undefined,
      minprice: undefined,
    },
  ],
};
</script>
