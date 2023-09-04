<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Productos </v-app-bar-title>

    <v-btn
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

  <DialogForm
    :openDialog="openDialog"
    @closeDialog="
      () => {
        openDialog = false;
        appStore.productDialog();
      }
    "
  />
</template>

<script setup>
import { useAppStore } from "../../store/app";
import { ref } from "vue";
import DialogForm from "../../components/products/DialogForm";
import router from "@/router";

defineEmits(["drawer"]);
const openDialog = ref(false);
const appStore = useAppStore();
</script>
