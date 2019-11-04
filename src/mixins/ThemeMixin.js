
import themes from '@styles/themes';
const nameKey = 'name';

const mixin = {
    data() {
        return {
            themes
        };
    },
    computed: {
        currentTheme() {
            let currentTheme = this.$store.state.theme;
            return currentTheme==null ? themes[0] : currentTheme;
        },
        currentThemeObject() {
            return this.getTheme(this.currentTheme);
        },
        primaryColor() {
            return this.currentThemeObject['--secondary-color'];
        },
    },
    created() {
        this.setTheme(this.currentTheme);
        this.themeUpdateEventListener();
    },
    methods: {
        setTheme(name) {
            if(!this.themeExists(name)) {
                return;
            }
            let theme = this.getTheme(name);
            this.$store.commit('setTheme', {name});
            for (const [key, value] of Object.entries(theme)) {
                if(key==nameKey) {
                    continue;
                }
                this.setCssPropery(key, value);
            }
        },
        getTheme(name) {
            let result = themes.find(theme=>theme.name==name);
            if(typeof result === 'undefined') {
                return null;
            }
            return result;
        },
        themeExists(name) {
            return this.getTheme(name) != null;
        },
        setCssPropery(key, value) {
            let root = document.documentElement;
            root.style.setProperty(key, value);
        },
        themeUpdateEventListener() {
            document.onkeydown = event => {
                if (event.keyCode == 96 && event.altKey) {
                    this.setTheme('default');
                } else if (event.keyCode == 97 && event.altKey) {
                    this.setTheme('theme1');
                } else if (event.keyCode == 98 && event.altKey) {
                    this.setTheme('theme2');
                }
            };
        }
    }
};

export default mixin;