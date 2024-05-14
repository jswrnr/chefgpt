<template>
    <div>
      <ul v-if="processedString">
        <li v-for="(value, key) in processedString" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      processedString: {
        type: Object,
        default: null,
      },
    },
  };
  </script>
  