
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
        secondaryColor() {
            return this.currentTheme['--secondary-color'];
        },
    },
    mounted() {
        this.setTheme(this.currentTheme);
    },
    methods: {
        setTheme(theme) {
            this.$store.commit('setTheme', {theme});
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
        }
    }
};

export default mixin;