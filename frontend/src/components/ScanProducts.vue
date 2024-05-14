<!-- App.vue -->
<template>
  <div id="scanProducts">
    <button
      @click="scanProducts"
      class="bg-black text-white py-2 px-4 rounded"
      style="background-color: #111827"
    >
      SCAN PRODUCTS
    </button>
    <!-- <div v-if="imageData">
        <img :src="imageData" alt="Bild von Raspberry Pi">
      </div> -->
  </div>
</template>

<script>
import axios from "axios";
import DataProvider from "../dataProvider/dataProvider";
export default {
  data() {
    return {
      imageData: null,
      dataProvider: new DataProvider(),
    };
  },
  // Differences in both methods:
  // scanProducts() does not display the picture and does not check the type of the file
  // Issue: If hitting button again there is no update in the image, actually should retake image then
  methods: {
    async scanProducts() {
      try {
        // IP needs to be the one of the pi in the local network
        const ipLukaHome = "http://192.168.2.111:5421/get_image";
        const ipZEKI = "http://10.42.0.193:5421/get_image";
        // const response = await axios.get(ipZEKI);

        // this.imageData = response.data.image;
        const uniqueTime = new Date().getTime();
        const response1 = await fetch(`${ipZEKI}?t=${uniqueTime}`);
        const imageBlob = await response1.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        this.imageData = imageUrl;
        const backendResponse = this.dataProvider.post("recognizeImage", {
          image: imageUrl,
        });
      } catch (error) {
        console.error("Error requesting image:", error);
      }
    },
    async scanProducts2() {
      try {
        // IP needs to be the one of the pi in the local network
        const ipLukaHome = "http://192.168.2.111:5000/get_image";
        const ipZEKI = "http://10.42.0.193:5000/get_image";
        const response = await axios.get(ipZEKI, {
          responseType: "blob",
          // Set the response type to blob
        });
        // Check if the response is a valid image
        if (response.headers["content-type"].startsWith("image/")) {
          const imageUrl = URL.createObjectURL(response.data);
          this.imageData = imageUrl;
        } else {
          console.error("Invalid image format");
        }
      } catch (error) {
        console.error("Error requesting image:", error);
      }
    },
  },
};
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
#scanProducts {
  text-align: center;
  margin-top: 60px;
}

img {
  max-width: 100%;
  max-height: 400px;
}

button {
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
