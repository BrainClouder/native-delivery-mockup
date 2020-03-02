const path = require('path');

module.exports = {

    module: {
        rules: [
            {
                test: /\.js$/,
                include: /node_modules\/react-native-/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                        ],
                    }
                },
                query: { cacheDirectory: true }
            }
        ]
    }
}