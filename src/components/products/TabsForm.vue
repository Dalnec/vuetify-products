<template>
  <v-row justify="center" class="d-none">
    <v-dialog
      v-model="props.openDialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar density="compact">
          <v-btn
            icon
            dark
            @click="
              () => {
                clearForm();
                $emit('closeDialog');
              }
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ formdata.ID ? "Editar" : "Nuevo" }} Producto
          </v-toolbar-title>

          <!-- <v-spacer></v-spacer> -->
          <!-- <v-toolbar-items>
              <v-btn variant="text" @click=""> Save </v-btn>
            </v-toolbar-items> -->
          <template v-if="formdata.has_pieces" v-slot:extension>
            <v-tabs v-model="tab" density="compact" fixed-tabs>
              <v-tab value="one">General</v-tab>
              <v-tab value="two">Sub-Productos</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <!-- <v-tabs v-if="showTabs" v-model="tab" density="compact" fixed-tabs>
          <v-tab value="one">General</v-tab>
          <v-tab value="two">Sub-Productos</v-tab>
        </v-tabs> -->

        <v-card-text class="pa-0">
          <v-window v-model="tab">
            <v-window-item value="one">
              <DialogForm :data="formdata" />
            </v-window-item>

            <v-window-item v-if="formdata.has_pieces" value="two">
              <v-card class="">
                <v-card-text class="pa-0">
                  <v-container>
                    <div
                      class="text-body-1 font-weight-bold mb-4 d-flex align-center justify-space-between"
                    >
                      PIEZAS
                      <v-btn
                        size="small"
                        variant="outlined"
                        color="deep-purple-accent-3"
                        prepend-icon="mdi-plus"
                        @click="addProduct"
                      >
                        Agregar
                      </v-btn>
                    </div>
                    <v-form ref="formRef">
                      <SubProductForm
                        v-for="(subProduct, i) in subProducts"
                        :key="i"
                        :data="subProduct"
                        :index="i"
                        @removeSubProduct="
                          (p) => {
                            subProducts.splice(p, 1);
                          }
                        "
                      />
                    </v-form>
                    <pre>{{ JSON.stringify(subProducts, 0, 2) }}</pre>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="px-5">
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            variant="text"
            @click="
              () => {
                clearForm();
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
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { axiosInstance } from "../api/index";
import { onMounted, ref } from "vue";
import DialogForm from "./DialogForm.vue";
import SubProductForm from "./SubProductForm.vue";

const emit = defineEmits(["closeDialog", "reload"]);
const props = defineProps({
  openDialog: Boolean,
  data: {
    type: Object,
  },
});

const loading = ref(false);
const formRef = ref();

const tab = ref(null);

// const measuresOptions = ref([]);
const subProducts = ref([]);
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
  ? ref({ ...props.data })
  : ref({ ...defaultformdata.value });

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
        e.equivalent = parseInt(e.equivalent);
        e.price = parseFloat(e.price);
        e.minprice = parseFloat(e.minprice);
      });
    }
    res = await axiosInstance.post("products", {
      ...formdata.value,
    });
    clearForm();
    console.log(res);
    emit("closeDialog");
    emit("reload");
  }
  setTimeout(() => (loading.value = false), 1000);
};
const clearForm = () => {
  formdata.value = defaultformdata.value;
  subProducts.value = [];
};
const addProduct = () => {
  subProducts.value.push({
    measure_id: 1,
    equivalent: 1,
    price: undefined,
    minprice: undefined,
  });
};

// const loadfeatures = async (featureType) => {
//   const res = await axiosInstance.get(`/${featureType}`);
//   return res.data.map((f) => ({ title: f.description, value: f.ID }));
// };

onMounted(async () => {
  // measuresOptions.value = await loadfeatures("measures");
});
</script>
