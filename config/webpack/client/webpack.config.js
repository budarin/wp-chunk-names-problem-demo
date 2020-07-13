const path = require('path');
const webpack = require('webpack');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

const babelConfig = require('../../babel/client.babel.config');
const cacheDir = path.resolve('node_modules/.cache');
const getThreadLoader = (name) => ({
    loader: 'thread-loader',
    options: {
        name,
    },
});
const includePaths = [path.resolve('./src/common'), path.resolve('./src/client')];

module.exports = {
    name: 'client_dev',
    mode: 'development',
    watch: true,
    cache: false,
    target: 'web',
    profile: false,
    bail: true,
    devtool: 'eval-source-map', // 'cheap-module-eval-source-map'
    entry: {
        client: ['react-hot-loader/patch', './src/client/index.tsx'],
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve('./dist/client'),
        hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: ['node_modules', 'src'],
        alias: { 'react-dom': '@hot-loader/react-dom' },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx|json)$/,
                include: includePaths,
                exclude: /node_modules/,
                use: [
                    getThreadLoader('client-dev'),
                    {
                        loader: 'babel-loader',
                        options: Object.assign({}, babelConfig, {
                            babelrc: false,
                            cacheDirectory: path.resolve(cacheDir, 'client'),
                        }),
                    },
                ],
            },

            {
                test: /\.css$/,
                include: includePaths,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(cacheDir, 'dev-client-css'),
                        },
                    },
                    getThreadLoader('client-css'),
                    {
                        loader: 'css-modules-typescript-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[folder].[name].[local]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new webpack.DefinePlugin({
            __PROD__: false,
            __SERVER__: false,
            __CLIENT__: true,
        }),
        new UnusedFilesWebpackPlugin({
            failOnUnused: false,
            patterns: ['/src/client/**/*.*', '/src/common/**/*.*'],
            globOptions: {
                ignore: ['node_modules/**/*', 'src/**/__tests__/*.*', 'src/**/*.test.ts'],
            },
        }),
        // @ts-ignore
        new DuplicatesPlugin({
            emitErrors: false,
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules|lazyComponentBabelPlugin\.js/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
        }),
    ],
};
