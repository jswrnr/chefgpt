<template>
  <div v-if="loading" class="loading-overlay">
  <div class="loader"></div>
  <div>{{ textResponse }}</div>
</div>
<!-- your existing HTML... -->
  <div v-if="editingProduct" class="modal">
    <div class="modal-content">
      <h2>Edit Product</h2>
      <label for="edit-amount">Amount:</label>
      <input type="number" v-model="editingProduct.count" id="edit-amount">
      <label for="edit-date">Date:</label>
      <input type="date" v-model="editingProduct.date" id="edit-date">
      <div class="modal-buttons">
        <button @click="submitEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showAddForm" class="modal">
    <div class="modal-content">
      <form @submit.prevent="addNewProduct" class="flex flex-col items-center gap-4">
        <input type="text" class="form-input" v-model="newProduct.name" placeholder="New Product Name" style="color: black" />
        <input type="number" class="form-input" v-model="newProduct.count" placeholder="count" style="color:black;" />
        <button type="submit" class="bg-black text-white p-2 rounded">
          Submit
        </button>
        <button @click="showAddForm = false" class="bg-gray-500 text-white p-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  </div>
  <div class="container_table" style="border-radius: 5px;">
    <table class="products_table">
      <thead>
        <th>COUNT</th>
        <th>NAME</th>
        <th>PURCHASE DATE</th>
        <th>EDIT</th>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.count }}</td>
          <td>{{ product.name }}</td>
          <td>{{ new Date(product.date).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Berlin' }).substring(0, 10) }}</td>
          <td class="action_buttons">
            <button @click="editProduct(product)" style="background-color: transparent;">
              <img src="../assets/icons/edit.png" alt="Edit Icon" class="button-icon">
            </button>
            <button @click="deleteProduct(product)" style="background-color: transparent;">
              <img src="../assets/icons/trash.png" alt="Delete Icon" class="button-icon">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="scanner_buttons">
    <button @click="showAddForm = true" style="background-color: #343434;">Add Product</button>
    <button @click="scanProducts">Scan Products</button>
    <button @click="scanReceipt">Scan Receipt</button>
  </div>
</template>

<script>
import DataProvider from "../dataProvider/dataProvider";
import config from "../config";
export default {
  data() {
    return {
      products: [],
      showAddForm: false,
      editingProduct: null,
      newProduct: { name: "", count: 1 },
      dataProvider: new DataProvider(),
      imageData: null,
      // Change URL according to URL needed
      // ZEKI PI URL: 
      backend_address: config.backend_url.replace(':8080', ''),
      loading: false,
      textResponse: 'Loading...',
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
    async scanProducts() {
      this.loading = true;
      try {
        console.log('Scanning products - Entered function');

        const uniqueTime = new Date().getTime();
        const endpoint = this.backend_address + ':5421/get_products'
        const response = await fetch(`${endpoint}?t=${uniqueTime}`);
        const jsonData = await response.json();

        let base64 = jsonData['image'];
        console.log('Scanning products - Sending image to backend with base64:', base64);
        const response2 = await fetch(this.backend_address + ':8080/gpt/recognizeProducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ image: base64,
            date: new Date().toISOString(),        
          })
        });
        console.log('Scanning products - Backend response:', response2);
        const result = await response2.json();
        console.log('Scanning products - Backend response:', result);

      } catch (error) {
        console.error('Error requesting image:', error);
        this.textResponse = 'Couldn\'t add the product. Please try again.';
        await new Promise(resolve => setTimeout(resolve, 4000));
      }  finally {
        this.loading = false;
      }
      console.log('Scanning products - Exiting function')
      this.fetchProducts();
    },
    async scanReceipt() {
      this.loading = true;
      try {
        console.log('Scanning receipt - Entered function');

        const uniqueTime = new Date().getTime();
        const endpoint = this.backend_address + ':5421/get_receipt'
        const response = await fetch(`${endpoint}?t=${uniqueTime}`);
        const jsonData = await response.json();

        let base64 = jsonData['image'];
        console.log('Scanning products - Sending image to backend with base64:', base64);
        const response2 = await fetch(this.backend_address + ':8080/gpt/recognizeReceipt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ image: base64,
            date: new Date().toISOString(),        
          })
        });
        console.log('Scanning receipt - Backend response:', response2);
        const result = await response2.json();
        console.log('Scanning receipt - Backend response:', result);

      } catch (error) {
        console.error('Error requesting image:', error);
        this.textResponse = 'Couldn\'t add the product from receipt. Please try again.';
        await new Promise(resolve => setTimeout(resolve, 4000));
      }  finally {
        this.loading = false;
      }
      console.log('Scanning receipt - Exiting function')
      this.fetchProducts();
    },
  },
  mounted() {
    document.querySelector("#loginModal").style.display = "none";
  },
};
</script>

<style>
.container_table {
  border: 1px solid #ccc;
  min-height: 85%;
  height: 500px;
  overflow: auto;
  overscroll-behavior: none;
}

.products_table {
  width: 100%;
}

thead {
  position: sticky;
  top: 0;
  background-color: #343434;
  height: 65px;
  color: white;
  font-size: 18px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
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

tr {
  border-bottom: 1px solid #ccc;
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
}

.products_table tr:hover {
  background-color: #f5f5f5;
}

td {
  padding-top: 20px;
}

.action_buttons {
  display: flex;
  flex-direction: row;
  padding-top: 0px;
}

.action_buttons button {
  border-radius: 5px;
  width: 30px;
  height: 60px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.button-icon {
  max-width: 20px;
  max-height: 20px;
}

.scanner_buttons {
  margin: 10px 0px;
  display: flex;
  height: 12%;
  justify-content: space-around;
}

.scanner_buttons button {
  padding: 12px;
  /* Increased padding for bigger height */
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 35%;
  background-color: transparent;
  color: white;
  background-color: #343434;
  font-size: 18px;
  /* Increased font size for bigger text */
}

body {
  overflow: hidden;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
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
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
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
