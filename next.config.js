const withSass = require("@zeit/next-sass")
module.exports =  withSass()

// const withSass = require('@zeit/next-sass');

// const commonsChunkConfig = (config, test = /\.css$/) => {
//     config.plugins = config.plugins.map(plugin => {
//         if (
//             plugin.constructor.name === 'CommonsChunkPlugin' &&
//             // disable filenameTemplate checks here because they never match
//             // (plugin.filenameTemplate === 'commons.js' ||
//             //     plugin.filenameTemplate === 'main.js')
//             // do check for minChunks though, because this has to (should?) exist
//             plugin.minChunks != null
//         ) {
//             const defaultMinChunks = plugin.minChunks;
//             plugin.minChunks = (module, count) => {
//                 if (module.resource && module.resource.match(test)) {
//                     return true;
//                 }
//                 return defaultMinChunks(module, count);
//             };
//         }
//         return plugin;
//     });
//     return config;
// };

// module.exports = withSass({
//     // cssModules: true,
//     // webpack: config => {
//     //     config = commonsChunkConfig(config, /\.(sass|scss|css)$/);
//     //     return config;
//     // },
// });