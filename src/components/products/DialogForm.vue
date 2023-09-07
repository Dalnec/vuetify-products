<template>
  <v-card class="">
    <v-card-text class="pa-0">
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
              <v-textarea
                density="compact"
                label="Descripcion"
                v-model="formdata.description"
                required
                :rules="nameRules"
                clearable
                auto-grow
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="px-2">
            <v-switch
              density="compact"
              hide-details
              color="primary"
              v-model="formdata.has_pieces"
              label="Es juego?"
            ></v-switch>
          </div>
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
      </v-form>
    </v-card-text>

    <!-- <pre>{{ JSON.stringify(formdata, 0, 2) }}</pre> -->
  </v-card>
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

const emit = defineEmits(["closeDialog", "showTabs"]);
const props = defineProps({
  data: {
    type: Object,
  },
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
  has_pieces: false,
  prices: [],
});
const formdata = props.data
  ? ref(props.data)
  : ref({ ...defaultformdata.value });

const addPrice = () => {
  formdata.value.prices.push({
    measure_id: 1,
    equivalent: 1,
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

// const capitalize = (data) => {
//   return Object.fromEntries(
//     Object.entries(data).map(([key, value]) => [
//       key,
//       typeof value == "string" ? value.toUpperCase() : value,
//     ])
//   );
// };

// const save = async () => {
//   const { valid } = await formRef.value.validate();
//   if (valid) {
//     let res;
//     loading.value = true;
//     formdata.value = capitalize(formdata.value);
//     if (formdata.value.prices.length > 0) {
//       formdata.value.prices.forEach((e) => {
//         e.equivalent = parseInt(e.equivalent);
//         e.price = parseFloat(e.price);
//         e.minprice = parseFloat(e.minprice);
//       });
//     }
//     res = await axiosInstance.post("products", {
//       ...formdata.value,
//     });
//     clearForm();
//     console.log(res);
//     emit("closeDialog");
//     emit("reload");
//   }
//   setTimeout(() => (loading.value = false), 1000);
// };

const loadfeatures = async (featureType) => {
  const res = await axiosInstance.get(`/${featureType}`);
  return res.data.map((f) => ({ title: f.description, value: f.ID }));
};

// const clearForm = () => {
//   formdata.value = defaultformdata.value;
// };

onUpdated(() => {
  if (props.data) {
    formdata.value = props.data;
  }
});

onMounted(async () => {
  brandsOptions.value = await loadfeatures("brands");
  categoryOptions.value = await loadfeatures("categories");
  measuresOptions.value = await loadfeatures("measures");
});
</script>
