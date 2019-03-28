// Below is the Webpack config Mongoose uses for testing
let path = require('path');
let root = path.resolve(__dirname);
// const node_modules = path.join(root, '..', '..', 'node_modules');

module.exports = {
    name: "browser",
    target: "web",
    node: {
        // Replace these Node.js native modules with empty objects, Mongoose's
        // browser library does not use them.
        // See https://webpack.js.org/configuration/node/
        dns: 'empty',
        fs: 'empty',
        'module': 'empty',
        net: 'empty',
        tls: 'empty'
    },
    mode: "development",
    entry: {
        browser: [
            path.join(root, 'src/index')
            // path.join(node_modules, 'es6-symbol', 'index.js'),
        ]
    },
    output: {
        filename: "index.js",
        path: root,
        libraryTarget: "commonjs2",
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.ts[x]?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        "@babel/preset-typescript"
                    ],
                    plugins: [
                        // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        ["@babel/plugin-proposal-class-properties", { loose: true }]
                    ]
                }
            }
        }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}