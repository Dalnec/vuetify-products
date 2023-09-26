import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "",
      role: "",
      email: "",
    },
    isAuthenticated: false,
    token: "",
  }),
  actions: {
    initializeStore() {
      if (!this.isAuthenticated) {
        localStorage.setItem("isAuthenticated", this.isAuthenticated);
      }
    },
    login(data) {
      this.saveTokens(data.token);
      this.saveUserInfo({ id: data.ID, role: data.role, email: data.email });
      this.saveAuthentication();
    },
    saveTokens(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    saveUserInfo(user) {
      // localStorage.setItem("perms", JSON.stringify(user.user_permissions));
      // delete user.user_permissions;
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    saveAuthentication() {
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", String(this.isAuthenticated));
    },
    checkAuthentication() {
      if (
        localStorage.getItem("isAuthenticated") &&
        localStorage.getItem("isAuthenticated") == "true"
      ) {
        this.isAuthenticated = true;
        // this.user.user_permissions = JSON.parse(localStorage.getItem("perms"));
      } else {
        this.logout();
      }
    },
    async checkToken() {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("isAuthenticated") &&
        localStorage.getItem("isAuthenticated") == "true"
      ) {
        return true
      } else {
        return false;
      }
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.setItem("isAuthenticated", this.isAuthenticated);
    },
    hasPermission(permission) {
      if (this.user.is_superuser) {
        return true;
      }
      return this.user.user_permissions.some((perm) => perm === permission);
    },
  },
});
