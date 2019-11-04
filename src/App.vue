<template>
    <div id="app">
        <TopBar />
        <LoginForm v-if="!logged" />
        <Tchat v-if="logged" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '@components/LoginForm';
import TopBar from '@components/TopBar';
import Tchat from '@components/Tchat';

export default {
    name: "app",
    components: {
        LoginForm,
        TopBar,
        Tchat
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'username',
            'logged'
        ])
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background-color: var(--primary-color);
    transition: background-color 1s;
    // justify-content: center;
    // align-items: center;
    #app {
        position: fixed;
        width: 100%;
        height:100%;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        color: var(--primary-color-reverse);
        display: flex;
        flex-direction: column;
    }
    ::selection {
        color: var(--secondary-color-reverse);background: var(--secondary-color);
    }
}
</style>
