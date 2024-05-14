<template>
    <div class="settings">
        <h1 style="padding: 20px;">To Be Continued...</h1>
        <div class="setting">
            <label for="theme">Theme:</label>
            <select id="theme" v-model="selectedTheme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
        <div class="setting">
            <label for="language">Language:</label>
            <select id="language" v-model="selectedLanguage">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
            </select>
        </div>
        <div class="setting">
            <label for="fontSize">Font Size:</label>
            <input type="range" id="fontSize" v-model="fontSize" min="1" max="9" step="2">
            <span>{{ fontSize }}</span>
        </div>
        <p>For more information on our sources please check out our Git!</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedTheme: 'light',
            selectedLanguage: 'en',
            fontSize: 5
        };
    }
};
</script>

<style scoped>
.settings {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin: 0 auto;
    max-width: 400px;
    margin-top: 20px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

}

.setting {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 10px;
}

label {
    display: block;
    font-weight: bold;
}

select,
input[type="range"] {
    width: 200px;
}

span {
    margin-left: 10px;
}

select {
    text-align-last: center;
}

</style>
