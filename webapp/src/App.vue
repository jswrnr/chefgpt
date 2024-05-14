<template>
    <div id="app">
        <header>
            <NavigationBar></NavigationBar>
            <ProductList></ProductList>
            <RequestImage></RequestImage>
        </header>
    </div>
</template>

<script>
    import NavigationBar from './components/NavigationBar.vue'
    import ProductList from './components/ProductList.vue'
    import RequestImage from './components/RequestImage.vue'

    export default {
        components: {
            NavigationBar,
            ProductList,
            RequestImage
        }
    }
</script>

<style>
    body {
        background-color: #f0f0f0;
    }
</style>