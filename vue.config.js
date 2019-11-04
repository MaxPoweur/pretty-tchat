const path = require('path');
module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/globals.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': path.join(__dirname, 'src/assets'),
                '@images': path.join(__dirname, 'src/assets/images'),
                '@fonts': path.join(__dirname, 'src/assets/fonts'),
                '@styles': path.join(__dirname, 'src/assets/styles'),
                '@components': path.join(__dirname, 'src/components'),
                '@mixins': path.join(__dirname, 'src/mixins'),
            }
        },
    }
};