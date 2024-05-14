<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from 'vue-router'; 

const showModal = ref(true);
const selectedOption = ref('PRODUCT SCANNER');

const router = useRouter(); 

const selectOption = (option) => {
  selectedOption.value = option;
  if (option === 'RECIPE GENERATOR') {
    router.push('/generator');
  }
//   TODO: Change name from main to product scanner
    if (option === 'PRODUCT SCANNER') {
        router.push('/main'); 
    }
    if (option === 'PROFILE') {
        router.push('/profile'); 
    }
    if (option === 'SETTINGS') {
        router.push('/settings'); 
    }
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

</script>

<template>
    <div>
        <div class="sidebar">
            <div class="nav-options">
                <div class="nav-option" :class="{ 'selected': selectedOption === 'RECIPE GENERATOR' }" @click="selectOption('RECIPE GENERATOR')">
                    <img src="../assets/icons/hat-chef.png" alt="Recipe Icon" class="navlogo">RECIPE GENERATOR
                </div>
                <div class="nav-option" :class="{ 'selected': selectedOption === 'PRODUCT SCANNER' }" @click="selectOption('PRODUCT SCANNER')">
                    <img src="../assets/icons/shopping-cart.png" alt="Scanner Icon" class="navlogo">PRODUCT SCANNER
                </div>
            </div>
            <div class="divider"></div>
            <div class="nav-options">
                <div class="nav-option" :class="{ 'selected': selectedOption === 'PROFILE' }" @click="selectOption('PROFILE')">
                    <img src="../assets/icons/user.png" alt="User Icon" class="navlogo">PROFILE
                </div>
                <div class="nav-option" :class="{ 'selected': selectedOption === 'SETTINGS' }" @click="selectOption('SETTINGS')">
                    <img src="../assets/icons/settings.png" alt="Settings Icon" class="navlogo">SETTINGS
                </div>
            </div>
            <div class="logos">
            <a href="https://ze-ki.de/" target="_blank">
                <img src="../assets/zekilogo.svg" alt="ZEKI" class="logo_zeki">
            </a>
            <a href="https://git.tu-berlin.de/ambient-assisted-living-wise23/kitchen-assistant/chefgpt" target="_blank">
                <img src="../assets/logogitlab.png" alt="Our Git" class="logo_git">
            </a>
        </div>
        </div>
    </div>
</template>


<style>
.sidebar {
    background-color: #f2f2f2;
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.nav-options {
    padding: 10px;
    margin-top: 0em;
}

.nav-option {
    display: flex; 
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    margin-left: 5px;
    cursor: pointer;
}

.divider {
    height: 1px;
    background-color: #ccc;
    margin: 10px;
    margin-top: auto;
}

.logos {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 10px;
    text-decoration: none;
    border: none;
    cursor: pointer;
}


.logo_zeki {
    max-width: 60px;
    max-height: 60px;

}

.logo_git {
    max-width: 40px;
    max-height: 40px;
    margin-right: 20px;
}

.selected {
    border-radius: 5px;
    background-color: #ccc;
}

.navlogo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

</style>