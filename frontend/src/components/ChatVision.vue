<template>
  <div class="w-full text-center bg-white overflow-y-scroll pt-4">
    <div class="mt-12">
      <h1 class="font-serif text-3xl">List of Ingredients</h1>
      
      <div class="mt-8 border border-gray-300 rounded p-8 bg-white">
        <!-- Table to display products -->
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="p-2 border-b w-1/10">count</th>
              <th class="p-2 border-b w-4/10">Name</th>
              <th class="p-2 border-b w-4/10">Purchase date</th>
              <th class="p-2 border-b w-1/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="p-2 border-b">{{ product.count }}</td>
              <td class="p-2 border-b">{{ product.name }}</td>
              <td class="p-2 border-b">{{ product.date }}</td>
              <td class="p-2 border-b flex justify-start gap-2">
                <button
                  @click="editProduct(product)"
                  class="bg-white-500 text-black p-1 rounded"
                  style="background-color: #111827; color: white"
                >
                  Edit
                </button>
                <!-- TODO: Call to Database -->
                <button
                  @click="deleteProduct(product)"
                  class="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Edit Product Form -->
        <div v-if="editingProduct" class="mt-4">
          <!-- TODO: Call to Database -->
          <form
            @submit.prevent="submitEdit"
            class="flex flex-col items-center gap-4"
          >
            <input
              type="text"
              class="form-input"
              v-model="editingProduct.name"
              placeholder="Product Name"
            />
            <input
              type="number"
              class="form-input"
              v-model="editingProduct.count"
              placeholder="count"
            />
            <input
              type="date"
              class="form-input"
              v-model="editingProduct.date"
            />
            <!-- TODO: Call to Database -->
            <button type="submit" class="bg-green-500 text-white p-2 rounded">
              Save Changes
            </button>
            <button
              @click="cancelEdit"
              class="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showAddForm" class="mt-4">
    <form
      @submit.prevent="addNewProduct"
      class="flex flex-col items-center gap-4"
    >
      <input
        type="text"
        class="form-input"
        v-model="newProduct.name"
        placeholder="New Product Name"
      />
      <input
        type="number"
        class="form-input"
        v-model="newProduct.count"
        placeholder="count"
      />
      <button type="submit" class="bg-black text-white p-2 rounded">
        Submit
      </button>
      <button
        @click="showAddForm = false"
        class="bg-gray-500 text-white p-2 rounded"
      >
        Cancel
      </button>
    </form>
  </div>
  <div v-if="!showAddForm" class="mt-4 flex justify-center gap-4">
    <button
      @click="showAddForm = true"
      class="bg-black text-white py-2 px-4 rounded"
      style="background-color: #111827"
    >
      Add Product
    </button>
    <!-- TODO: Call to Database -->
    <button
      class="bg-black text-white py-2 px-4 rounded"
      style="background-color: #111827"
    >
      Let's cook!
    </button>
  </div>
</template>

<script>
import DataProvider from "../dataProvider/dataProvider";
export default {
  data() {
    return {
      products: [],
      showAddForm: false,
      editingProduct: null,
      newProduct: { name: "", count: 1 },
      dataProvider: new DataProvider(),
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.products = await this.dataProvider.get("items");
    },
    async addNewProduct() {
      if (this.newProduct.name.trim() && this.newProduct.count > 0) {
        const res = await this.dataProvider.post("items", {
          name: this.newProduct.name,
          count: this.newProduct.count,
        });
        this.fetchProducts();
        this.newProduct = { name: "", count: null };
        this.showAddForm = false;
      } else {
        alert("Please enter a valid name and count.");
      }
    },

    editProduct(product) {
      this.editingProduct = { ...product };
    },
    async submitEdit() {
      console.log(this.editingProduct);
      // If the edited count is 0, remove the product
      if (this.editingProduct.count === 0) {
        await this.dataProvider.delete(`items/${this.editingProduct.id}`);
      } else {
        // Otherwise, update the product
        await this.dataProvider.put(
          `items/${this.editingProduct.id}`,
          this.editingProduct
        );
      }
      this.editingProduct = null;
      this.originalProductName = "";
      this.fetchProducts();
    },
    cancelEdit() {
      this.editingProduct = null;
    },
    async deleteProduct(product) {
      await this.dataProvider.delete(`items/${product.id}`);
      this.fetchProducts();
    },
  },
  mounted() {
    document.querySelector("#loginModal").style.display = "none";
  },
};
</script>
