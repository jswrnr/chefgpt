<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>

<template>
  <div class="app">
    <Navbar />
    <div class="main-content">
      <Sidebar />
      <div class="content">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  position: sticky;
  top: 0;
  z-index: 50;
}

body {
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  padding-top: 85px;
}

.content {
  flex: 1;
  overflow: hidden;
}
</style>