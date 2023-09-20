<template>
  <v-card class="mx-auto my-1 px-1">
    <v-list lines="one" class="pa-0">
      <v-list-item class="w-100 pa-1">
        <v-list-item-title>
          <v-chip
            size="small"
            variant="outlined"
            :color="colorMeasure(props.data.measure_id)"
            class="px-3"
          >
            {{ props.data.measure.description }} {{ props.data.equivalent }}
          </v-chip>
        </v-list-item-title>

        <v-list-item-title>
          <v-row>
            <v-col>
              <v-chip
                size="small"
                class="ma-1"
                color="success"
                variant="text"
                style="font-size: 18px; font-weight: 600"
              >
                <v-icon start icon="mdi-currency-usd"></v-icon>
                {{ props.data.price ? props.data.price.toFixed(2) : 0.0 }}
              </v-chip>
            </v-col>
            <v-col>
              <v-chip
                size="small"
                class="ma-1"
                color="pink-accent-3"
                variant="text"
                style="font-size: 18px; font-weight: 600"
              >
                <v-icon start icon="mdi-currency-usd"></v-icon>
                {{ props.data.minprice ? props.data.minprice.toFixed(2) : 0.0 }}
              </v-chip>
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup>
const props = defineProps({ data: Object });

const colorMeasure = (id) => {
  switch (id) {
    case 1:
      return "#039BE5";
    case 2:
      return "#D500F9";
    case 3:
      return "#7B1FA2";
    case 4:
      return "#EF6C00";
    default:
      return "";
  }
};
</script>
