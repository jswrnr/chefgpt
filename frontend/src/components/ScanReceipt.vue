<template>
    <div id="requestReceipt ">
      <button @click="scanReceipt" class="bg-black text-white py-2 px-4 rounded" style="background-color: #111827;">SCAN RECEIPT</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        processedString: null,
      };
    },
    methods: {
        async scanReceipt() {
        try {
          // IP needs to be the one of the pi in the local network
          const ipLukaHome = 'http://192.168.2.111:5421/get_receipt';
          const ipZEKI = 'http://10.42.0.193:5421/get_receipt';
          // const response = await axios.get(ipZEKI);

          // this.imageData = response.data.image;
          const uniqueTime = new Date().getTime();
          const response = await fetch(`${ipZEKI}?t=${uniqueTime}`);
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          this.imageData = imageUrl;
        } catch (error) {
          console.error('Error requesting image:', error);
        }
      },
  }
};
</script>

<style>
</style>  