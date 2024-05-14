<template>
    <div class="container text-center">
        <h1 style="font-family: 'Playfair Display', serif;">List of Products</h1>

        <div id="productList">
            <!-- Table to display products -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Product items will be dynamically added here -->
                    <tr v-for="product in products" :key="product.name">
                        <td v-if="product.quantity > 0"><button v-if="product.selected" @click="addQuantity(product)" type="submit" class="btn btn-success btn-plus">+</button>  {{product.quantity}}  <button v-if="product.selected" @click="deductQuantity(product)" type="submit" class="btn btn-danger btn-minus">-</button></td>
                        <td v-if="product.quantity > 0">{{product.name}}</td>
                        <td v-if="product.quantity > 0"><input type="checkbox" id="selectCheckbox" v-model="product.selected"></td>
                    </tr>
                </tbody>
            </table>

            <!-- Add Button -->
            <button class="btn btn-success btn-add" @click="showAddBox()">Add</button>

            <!-- Delete Button -->
            <button class="btn btn-danger btn-delete" @click="deleteProduct()">Delete selected</button>

            <!-- Generate Recipe Button -->
            <button class="btn btn-primary btn-generate">Generate recipe</button>

            <!-- Add Box -->
            <div class="addBox" style="display: none">
                <form class="row g-3" @submit.prevent>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="Quantity" aria-label="Quantity" v-model="quantity" required>
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" v-model="name" required>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary mb-3" @click="addProductToList(quantity, name)">Submit</button>
                            <button type="submit" class="btn btn-danger mb-3" @click="closeAddBox()">Close</button>
                        </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
    data() {
        return {
        products: [
            {
            name: "Apfel",
            quantity: 2,
            selected: false
            },
            {
            name: "Banane",
            quantity: 1,
            selected: false
            }
        ]
        }
    },
    methods: {
        showAddBox() {
            document.querySelector('.container .addBox').style.display = "block"
        },
        closeAddBox() {
            document.querySelector('.container .addBox').style.display = "none"
        },
        addProductToList(quantity, name) {
            if (quantity && name) {
                const gefundenesProdukt = this.products.find(product => product.name.toLowerCase() === name.toLowerCase());
                if (gefundenesProdukt) {
                    gefundenesProdukt.quantity += quantity
                } else {
                    this.products.push({
                    quantity: quantity,
                    name: name,
                    selected: false
                    })
                }
                document.querySelector('.container .addBox').style.display = "none";
                this.quantity = '';
                this.name = '';
            } else {
                alert('Please fill in both Quantity and Name fields.');
            }
        },
        deleteProduct() {
            this.products = this.products.filter((product) => !product.selected)
        },
        addQuantity(product) {
            product.quantity += 1
        },
        deductQuantity(product) {
            if (product.quantity) {
                product.quantity -= 1
            }
        }
    },
    }
</script>
  
<style>
    .container {
        margin-top: 3vw;
    }

    #productList {
        margin-top: 2vw;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 2vw;
        background-color: #ffffff;
    }

    .addBox {
        display: none;
        margin-top: 2vw;
    }

    .form-control {
        background-color: white;
    }

    .btn-generate {
        margin-top: 1vw;
    }

    .btn-add,
    .btn-delete {
        margin-top: 1vw;
        margin-right: 0.5vw;
    }

    #selectCheckbox {
        -ms-transform: scale(2); /* IE */
        -moz-transform: scale(2); /* FF */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -o-transform: scale(2); /* Opera */
        transform: scale(2);
        padding: 1vw;
    }

    @media screen and (max-width: 768px) {
        .container {
            margin-top: 5%;
        }
    }

</style>