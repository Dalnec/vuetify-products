<template>
  <v-row justify="center" class="d-none">
    <v-dialog v-model="props.openDialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>
      <v-card class="py-2">
        <v-card-title>
          <span class="text-h5"
            >{{ formdata.ID ? "Editar" : "Nuevo" }} Producto</span
          >
        </v-card-title>
        <v-card-text class="pa-1">
          <v-form ref="formRef">
            <v-container>
              <v-row class="pa-2">
                <v-col cols="12" sm="6" md="4" class="pa-1">
                  <v-text-field
                    density="compact"
                    label="Código"
                    v-model="formdata.code"
                    hint="Opcional"
                    persistent-hint
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="4" class="pa-md-1 pa-0 pr-1">
                  <v-select
                    density="compact"
                    :items="brandsOptions"
                    label="Marca"
                    v-model="formdata.brand_id"
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
                <v-col cols="12" sm="3" md="4" class="pa-md-1 pa-0 ps-1">
                  <v-select
                    density="compact"
                    :items="categoryOptions"
                    label="Categoria"
                    v-model="formdata.category_id"
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
                    density="compact"
                    label="Descripcion"
                    v-model="formdata.description"
                    required
                    :rules="nameRules"
                    clearable
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" class="pa-1">
                  <v-text-field
                    density="compact"
                    type="number"
                    label="Precio (x menor)"
                    v-model="formdata.price"
                    required
                    :rules="pricesRules"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="pa-1">
                  <v-text-field
                    density="compact"
                    type="number"
                    label="Precio (x mayor)"
                    v-model="formdata.minprice"
                    required
                    :rules="pricesRules"
                    clearable
                  ></v-text-field>
                </v-col> -->
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
              <div
                class="text-body-1 font-weight-bold mb-4 d-flex align-center justify-space-between"
              >
                PRECIOS
                <v-btn
                  size="small"
                  variant="outlined"
                  color="deep-purple-accent-3"
                  prepend-icon="mdi-plus"
                  @click="addPrice"
                >
                  Agregar
                </v-btn>
              </div>

              <PricesForm
                v-for="(price, index) in formdata.prices"
                :key="index"
                :index="index"
                :data="price"
                :measuresOptions="measuresOptions"
                @remove-price="
                  () => {
                    formdata.prices.splice(index, 1);
                  }
                "
                @openDialogFeature="
                  (f) => {
                    openfeatureDialog = f.open;
                    featureType = f.type;
                  }
                "
              />
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
        <pre>{{ JSON.stringify(formdata, 0, 2) }}</pre>
      </v-card>
    </v-dialog>
  </v-row>
  <DialogFormFeature
    :openfeatureDialog="openfeatureDialog"
    @closeDialog="
      async (f) => {
        openfeatureDialog = !openfeatureDialog;
        switch (featureType) {
          case 'brands':
            brandsOptions = await loadfeatures('brands');
            formdata.brand_id = f.ID;
            break;
          case 'categories':
            categoryOptions = await loadfeatures('categories');
            formdata.category_id = f.ID;
            break;
          case 'measures':
            measuresOptions = await loadfeatures('measures');
            // enviar x props index y id para actualizar unit measure
            // formdata.measure_id = f.ID;
            break;
          default:
            break;
        }
      }
    "
    :featureType="featureType"
  />
</template>
<script setup>
import { axiosInstance } from "../api/index";
import DialogFormFeature from "./DialogFormFeature.vue";
import { ref } from "vue";
import { onMounted, onUpdated } from "vue";
import PricesForm from "./PricesForm.vue";

const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  openDialog: Boolean,
  data: Object,
});

const loading = ref(false);
const featureType = ref("");
const openfeatureDialog = ref(false);
const formRef = ref();
const brandsOptions = ref([]);
const categoryOptions = ref([]);
const measuresOptions = ref([]);
const defaultformdata = ref({
  code: "",
  description: "",
  category_id: undefined,
  brand_id: undefined,
  price: undefined,
  minprice: undefined,
  user_id: 1,
  prices: [],
});
const formdata = props.data
  ? ref({ ...props.data })
  : ref({ ...defaultformdata.value });

const addPrice = () => {
  formdata.value.prices.push({
    measure_id: 1,
    price: undefined,
    minprice: undefined,
  });
};

const nameRules = [
  (value) => {
    if (value) return true;
    return "Descripcion es requerido.";
  },
];

const capitalize = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value == "string" ? value.toUpperCase() : value,
    ])
  );
};

const save = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    let res;
    loading.value = true;
    formdata.value = capitalize(formdata.value);
    if (formdata.value.prices.length > 0) {
      formdata.value.prices.forEach((e) => {
        e.price = parseFloat(e.price);
        e.minprice = parseFloat(e.minprice);
      });
    }
    console.log("formdata.value", formdata.value);
    res = await axiosInstance.post("products", {
      ...formdata.value,
    });
    formdata.value = defaultformdata.value;
    console.log(res);
    emit("closeDialog");
  }
  setTimeout(() => (loading.value = false), 1000);
};

const loadfeatures = async (featureType) => {
  const res = await axiosInstance.get(`/${featureType}`);
  return res.data.map((f) => ({ title: f.description, value: f.ID }));
};

onUpdated(() => {
  if (props.data) {
    formdata.value = props.data;
  }
});

onMounted(async () => {
  brandsOptions.value = await loadfeatures("brands");
  categoryOptions.value = await loadfeatures("categories");
  measuresOptions.value = await loadfeatures("measures");
  console.log(measuresOptions.value);
});
</script>
