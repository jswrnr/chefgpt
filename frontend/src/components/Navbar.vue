<script setup>
import { ref, defineProps } from "vue";
import LoginModal from "./LoginModal.vue";

const showModal = ref(true);

const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <header class="border-b w-full mb-2 absolute top-0 z-50">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <img src="../assets/logochefgpt.png" alt="ChefGPT Logo" class="navlogo_cook">
        <h1 class="uppercase pr-3 mr-3 border-r">ChefGPT</h1>
      </div>
      <div>
        <div></div>
        <div class="options">
          <button class="topnav_button">
          <img src="../assets/icons/interrogation.png" alt="Help Icon" class="topnav-icons"/>
          Help</button>
        <button class="topnav_button">
            <img src="../assets/icons/sign-out-alt.png" alt="Sign Out Icon" class="topnav-icons">
          Logout</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Login Modal -->
  <LoginModal
    v-if="showModal"
    @close="toggleModal"
  />
</template>


<style>
header {
  height: 85px;
}

nav {
  height: 70px;
  display: flex;
  align-items: center;
}

.options {
  display: flex;
  align-items: center;
}

.topnav-icons {
  max-width: 20px;
  max-height: 20px;
  margin-right: 5px;
}

.navlogo_cook {
  max-width: 80px;
  max-height: 80px;
  height: 70px;
  padding: 5px;
  margin: 10px;
}

.topnav_button {
  background-color: transparent;
  color: black;
  border: none;
  text-align: center;
  cursor: pointer;
  max-width: 85px;
}

.topnav_button:hover {
  background-color: #008CBA;
  color: white;
  border-radius: 10px;
}
</style>