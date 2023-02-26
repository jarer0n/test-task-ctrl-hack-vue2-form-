<template>
    <div id="app">
        <MyForm />
        <div style="margin-top: 15px; border: 3px solid teal"></div>
        <div style="margin: 15px auto; text-align: center">VUEX</div>
        <MyFormVuex />
    </div>
</template>

<script>
import MyForm from '@/components/MyForm.vue';
import MyFormVuex from '@/components/MyFormVuex.vue';
export default {
    name: 'App',
    components: {
        MyForm,
        MyFormVuex,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 1200px;
    margin: 0 auto;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
