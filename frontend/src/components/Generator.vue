<template>
    <div class="lower_buttons">
    <input type="text" v-model="generationOptions" placeholder=" e.g. Italian">
    <button @click="generateRecipe">GENERATE</button>
  </div>
  <div v-if="loading" class="loading-overlay">
    <div class="loader"></div>
    <div>{{ textResponse }}</div>
  </div>
  <div class="recipe" v-if="loaded">
    <h1>{{ selectedRecipe.name }}</h1>
    <div class="recipe_detail">
    <p>Servings: {{ selectedRecipe.servings }}</p>
    <p>Difficulty: {{ selectedRecipe.difficulty }}</p>
    <p>Time: {{ selectedRecipe.total_time }}</p>
    </div>
    <div>
      <h2>Instructions</h2>
    <ol>
      <li class="instruction_element" v-for="(instruction, index) in selectedRecipe.instructions" :key="index">
        {{ index + 1 }}. {{ instruction }}
      </li>
      <li>
        <br>
      </li>
    </ol>
    </div>
  </div>
  <div v-else class="placeholder_generator">
    <p style="font-weight: 200; font-style: italic;">What should we cook today?</p>
  </div>
</template>

<script>
import DataProvider from '../dataProvider/dataProvider';
export default {
  data() {
    return {
      backend_address: 'http://10.42.0.242',
      showGenerateButton: true,
      loading: false,
      showOptions: true,
      showRecipes: true,
      showRecipeDetails: true,
      generationOptions: '',
      recipes: [],
      selectedRecipe: null,
      products: [],
      dataProvider: new DataProvider(),
      loaded: false,
    };
  },
  methods: {
    async fetchProducts() {
      this.products = await this.dataProvider.get("items");
    },
    async generateRecipe(options) {
      this.loading = true;
      this.showOptions = false;
      this.loading = true;
      this.showGenerateButton = false;
      this.showRecipes = true;
      const endpoint_backend = this.backend_address + ':8080/gpt/getRecipes';
      this.fetchProducts().then(async () => {
        console.log(this.products);
        const response = await fetch(endpoint_backend, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ products: this.products, generationOptions: this.generationOptions })
        });
        const data = await response.json();
        // Populate the table with the response data
        this.selectedRecipe = data;
        console.log(data);
        this.loading = false;
        this.loaded = true;
      });
    },

    viewRecipe(recipeId) {
      // Set this.selectedRecipe based on recipeId
      this.showRecipes = false;
      this.showRecipeDetails = true;
    },
    goBackOverview() {
      this.showRecipes = true;
      this.showRecipeDetails = false;
    },
    goBackGeneration() {
      this.showGenerateButton = true;
      this.showRecipes = false;
      this.showOptions = true;
      this.showRecipeDetails = false;
    },
    openChat() {
      // Open chat window logic
    }
  }
};
</script>

<style>

.instruction_element{
  margin: 10px 0px;

}

.placeholder_generator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 24px;
}

.lower_buttons input::placeholder {
  font-style: italic;
  font-size: 21px;
}

.generator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading-screen {
  /* Loading screen styles */
}

.generate-button-container {
  margin-bottom: 20px;
}

.generate-button {
  padding: 10px;
  border-radius: 5px;
}

.options-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.text-input {
  flex: 1;
  padding: 5px;
  border-radius: 5px;
}

.confirm-button {
  padding: 10px;
  border-radius: 5px;
}

.recipe-list {
  text-align: center;
  margin-bottom: 20px;
}

.recipe-list ul {
  list-style-type: none;
  padding: 0;
}

.recipe-list li {
  margin-bottom: 10px;
  cursor: pointer;
}

.recipe-details {
  text-align: center;
  margin-bottom: 20px;
}

.back-button {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.ingredients-list ul,
.recipe-steps ol {
  padding-left: 20px;
}

.ingredients-list h3,
.recipe-steps h3 {
  margin-bottom: 5px;
}

.chat_button_container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
}

.chat_button {
  border-radius: 100px;
  height: 85px;
  width: 85px;
  font-size: 18px;
  background-color: #f3f3f3;
  align-items: center;
  justify-content: center;
  
}


.products_table {
  width: 100%;
}

thead1 {
  position: sticky;
  top: 0;
  background-color: #343434;
  height: 65px;
  color: white;
  font-size: 18px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
}

tbody td,
th {
  font-weight: 400;
}

th {
  padding-top: 19px;
}

tbody {
  text-align: center;
}

tr1 {
  border-bottom: 1px solid #ccc;
  display: grid;
  grid-template-columns: 1fr;
}

.products_table tr1:hover {
  background-color: transparent !important;
}

td {
  padding-top: 20px;
}

.tables-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.container_table {
  border: 1px solid #ccc;
  min-height: 85%;
  overflow: auto;
  height: 500px;
  overscroll-behavior: none;
  flex: 1;
  /* This makes each table flex items, adjusting their widths to fit */
  margin: 10px;
  /* Adds some space between tables */
  border-radius: 5px;
}

.loading-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #baffc9;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;

}

.lower_buttons {
  position: fixed;
  left: 460px;
  display: flex;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.lower_buttons input {
  padding: 12px;
  /* Increased padding for bigger height */
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor:text;
  display: flex;
  margin: 15px;
  background-color: transparent;
  color: #343434;
  background-color: #f3f3f3;
  font-size: 24px;
}

.lower_buttons button {
  display: flex;
  padding: 12px;
  /* Increased padding for bigger height */
  border-radius: 5px;
  border: none;
  height: 75px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  background-color: #343434;
  font-size: 24px;
}

.recipe {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: auto;
  overscroll-behavior: none;
}

.recipe_detail{
  margin: 10px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
  width: 55%;
  flex-direction: row;
}


/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
