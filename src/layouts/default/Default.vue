<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list nav>
          <!-- <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Home"
            value="home"
          ></v-list-item> -->
          <v-list-item
            class="text-h5"
            prepend-icon="mdi-format-list-numbered"
            title="Productos"
            value="home"
            variant="plain"
            color="primary"
            @click="$router.push({ name: 'Home' })"
          ></v-list-item>
          <v-list-item
            class="text-h5"
            prepend-icon="mdi-cart-outline"
            title="Venta"
            value="sale"
            variant="plain"
            color="primary"
            @click="$router.push({ name: 'Sale' })"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-app>
          <v-main>
            <default-bar
              @drawer="
                () => {
                  drawer = !drawer;
                }
              "
            />

            <default-view />
          </v-main>
        </v-app>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

import { ref } from "vue";
const drawer = ref(null);
</script>
