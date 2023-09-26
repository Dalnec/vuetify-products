<template>
  <div class="d-flex flex-column mb-6 bg-grey-lighten-5">
    <v-card class="ma-1">
      <v-text-field
        :autofocus="true"
        clearable
        :loading="loading"
        density="compact"
        variant="solo"
        label="Buscar Productos"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="loadData"
        v-model="params.description"
        @update:modelValue="
          () => {
            if (params.description) {
              params.description = params.description.toUpperCase();
            }
            loadData();
          }
        "
      ></v-text-field>
    </v-card>
    <CardProduct
      v-for="(x, i) in data"
      :key="i"
      :data="x"
      @openDialog="
        (data) => {
          openDialog = true;
          dataDialog = { ...data };
          // console.log(dataDialog);
        }
      "
    />
  </div>
  <TabsForm
    :openDialog="openDialog"
    @closeDialog="
      () => {
        openDialog = false;
        dataDialog = {};
      }
    "
    @reload="loadData"
    :data="dataDialog"
  />
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core";
import { useAppStore } from "../store/app.js";
import CardProduct from "../components/CardProduct.vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { axiosInstance } from "./api";
import TabsForm from "./products/TabsForm.vue";

const appStore = useAppStore();
const loading = ref(false);
const openDialog = ref(false);
const params = ref({
  description: "",
});
const data = ref([]);
const dataDialog = ref({});

const loadData = useDebounceFn(async () => {
  loading.value = true;
  data.value = [];
  const res = await axiosInstance.get(`/products`, {
    params: { ...params.value },
  });
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  console.log(res.data);
  data.value = res.data;
}, 450);

onMounted(async () => {
  appStore.productDialog = loadData;
  // await loadData();
});
</script>
<style>
input {
  text-transform: uppercase;
}
</style>
