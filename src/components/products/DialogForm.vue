<template>
  <v-row justify="center" class="d-none">
    <v-dialog v-model="props.openDialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>
      <v-card class="py-2">
        <v-card-title>
          <span class="text-h5">Nuevo Producto</span>
        </v-card-title>
        <v-card-text class="pa-1">
          <v-form ref="formRef">
            <v-container>
              <v-row class="pa-2">
                <v-col cols="12" sm="6" md="4" class="pa-1">
                  <v-text-field
                    label="Código"
                    v-model="formdata.code"
                    hint="Opcional"
                    persistent-hint
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3" md="4" class="pa-md-1 pa-0 pr-1">
                  <v-select
                    :items="brandsOptions"
                    label="Marca"
                    v-model="formdata.brand"
                    required
                    clearable
                    append-inner-icon="mdi-plus-thick"
                    @click:append-inner="
                      () => {
                        openfeatureDialog = true;
                        featureType = 'brands';
                      }
                    "
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="3" md="4" class="pa-md-1 pa-0 ps-1">
                  <v-select
                    :items="categoryOptions"
                    label="Categoria"
                    v-model="formdata.category"
                    required
                    clearable
                    append-inner-icon="mdi-plus-thick"
                    @click:append-inner="
                      () => {
                        openfeatureDialog = true;
                        featureType = 'categories';
                      }
                    "
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" class="pa-1">
                  <v-text-field
                    label="Descripcion"
                    v-model="formdata.description"
                    required
                    :rules="nameRules"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="pa-1">
                  <v-text-field
                    label="Precio (x menor)"
                    v-model="formdata.price"
                    required
                    :rules="pricesRules"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="pa-1">
                  <v-text-field
                    label="Precio (x mayor)"
                    v-model="formdata.minprice"
                    required
                    :rules="pricesRules"
                    clearable
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
              </v-row>
            </v-container>
            <v-divider></v-divider>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            variant="text"
            @click="
              () => {
                formdata = defaultformdata;
                $emit('closeDialog');
              }
            "
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="elevated"
            @click="save"
            :loading="loading"
          >
            Guardar
          </v-btn>
        </v-card-actions>
        <!-- <pre>{{ JSON.stringify(formdata, 0, 2) }}</pre> -->
      </v-card>
    </v-dialog>
  </v-row>
  <DialogFormFeature
    :openfeatureDialog="openfeatureDialog"
    @closeDialog="
      async () => {
        openfeatureDialog = !openfeatureDialog;
        brandsOptions = await loadfeatures('brands');
        categoryOptions = await loadfeatures('categories');
      }
    "
    :featureType="featureType"
  />
</template>
<script setup>
import { axiosInstance } from "../api/index";
import DialogFormFeature from "./DialogFormFeature.vue";
import { ref } from "vue";
import { onMounted } from "vue";

const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  openDialog: Boolean,
});

const loading = ref(false);
const featureType = ref("");
const openfeatureDialog = ref(false);
const formRef = ref();
const brandsOptions = ref([]);
const categoryOptions = ref([]);
const defaultformdata = ref({
  code: "",
  description: "",
  category: undefined,
  brand: undefined,
  price: undefined,
  minprice: undefined,
});
const formdata = ref({ ...defaultformdata.value });

const pricesRules = [
  (v) => !!v || "Precio es requerido",
  (v) => /^\d+(\.\d+)?$/.test(v) || "Solo numeros",
  (v) =>
    (v && v.toString().split(".")[0].length <= 5) ||
    "No mas de 5 digitos antes del punto decimal",
  (v) =>
    (v && v.toString().split(".").length < 2) ||
    (v && v.toString().split(".")[1].length <= 2) ||
    "No mas de 2 digitos despues del punto decimal",
];

const nameRules = [
  (value) => {
    if (value) return true;
    return "Descripcion es requerido.";
  },
];

const save = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    loading.value = true;

    alert("Form is valid");
  }
  setTimeout(() => (loading.value = false), 2000);
};

const loadfeatures = async (featureType) => {
  const res = await axiosInstance.get(`/${featureType}`);
  return res.data.map((f) => ({ title: f.description, value: f.ID }));
};

onMounted(async () => {
  brandsOptions.value = await loadfeatures("brands");
  categoryOptions.value = await loadfeatures("categories");
});
</script>
