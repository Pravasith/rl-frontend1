const withSass = require("@zeit/next-sass")

// module.exports = {
//     exportPathMap: function () {
//         return {
//             '/': { page: '/' },
//             '/vendor/dashboard': { page: '/vendor-main-dashboard' },
//             // '/p/hello-nextjs': {page: '/post', query: { title: 'Hello Next.js' } },
//             // '/p/learn-nextjs': { page: '/post', query: { title: 'Learn Next.js is awesome' } },
//             // '/p/deploy-nextjs': { page: '/post', query: { title: 'Deploy apps with Zeit' } },
//             // '/p/exporting-pages': { page: '/post', query: { title: 'Learn to Export HTML Pages' } }
//         }
//     }, 
    
// }

const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')


module.exports =  withSass(
    {
        webpack(config) {
          config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
      
          return config
        }
    }
    // {
    //     exportPathMap: function () {
    //         return {
    //             '/': { page: '/' },
    //             '/vendor/dashboard': { page: '/vendor-main-dashboard' },
    //             '/home': { page: '/home' },
    //             '/log-in': { page: '/log-in' },
    //             '/register': { page: '/register' },

    //             '/vendor/add-product': { page: '/vendor-add-product-details' }
                
    //         }
    //     }, 
        
    // }
)
