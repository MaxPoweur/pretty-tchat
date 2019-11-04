<template>
    <div id="topbar">
        <div id="theme-options">
            <div v-for="theme in themes" :key="theme.name">
                <div class="theme-option box-shadow"
                    v-if="theme.name!=currentTheme"
                    :style="{backgroundColor:theme['--primary-color'], color: theme['--primary-color-reverse'], borderColor: theme['--primary-color-reverse']}"
                    @click="setTheme(theme.name)"
                >
                    {{theme.name}}
                </div>
            </div>
        </div>
        <!-- <h1 v-if="logged" id="username">{{username}}</h1> -->
        <div id="menu">
            <span id="logout" v-if="logged" @click="logout"><i class="fas fa-power-off"></i></span>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
// import ThemeMixin from '@mixins/ThemeMixin.js';
export default {
    computed: {
        ...mapGetters([
            'username',
            'logged'
        ])
    },
    methods: {
        ...mapMutations([
            'logout'
        ])
    },
    updated() {
        console.log('update')
    }
}
</script>

<style scoped lang="scss">
    #topbar {
        // position: fixed;
        // bottom: 0;
        // background-color: var(--thirth-color);
        // opacity: 0.9;
        transition: 1s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--secondary-color);
        height: $topbarHeight;
        // width: 100%;
        padding:0 50px;
        h1#username {
            font-family: 'Montserrat'; // TODO : Display only when font loads ?
            font-size: 50px;
        }
        #theme-options {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .theme-option {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                font-weight: bold;
                margin-right: 15px;
                width: $themeOptionLength;
                height: $themeOptionLength;
                border-radius: 50px;
                cursor: pointer;
                transition: 0.15s;
                &:hover {
                    opacity: 0.90;
                    margin-bottom: 10px;
                }
            }
        }
        #menu {
            height: 100%;
            display: flex;
            align-items: center;
            #logout {
                font-size: 60px;
                cursor: pointer;
                transition: color 1s, transform .25s;
                &:hover {
                    color: var(--secondary-color-hover);
                    transform: rotate(360deg);
                }
            }
        }
    }
</style>