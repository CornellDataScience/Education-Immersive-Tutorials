const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path_to_favicon = "src/assets/cds-logo.png";

const base_url = process.env.NODE_ENV == "production" ?
    "https://dylantsai.github.io/bookish-journey"
    : "http://0.0.0.0:8000"

// matches webconfig.ts! If you change this, change webconfig.ts
function make_path(match, templateOrAsset, project, fileNameWithExtension) {
    if (templateOrAsset == "asset") {
        return `${base_url}/assets/${project}/${fileNameWithExtension}`;
    }
    // make and return url
    if (fileNameWithExtension == "index.html") {
        let project_urlPiece = project == "main" ? "" : project = "/" + project + ".html";
        return `${base_url}${project_urlPiece}`;
    }
    if (fileNameWithExtension.endsWith(".html")) {
        return `${base_url}/${fileNameWithExtension}`;
    }
    return `${base_url}/templates/${project}/${fileNameWithExtension}`;
}

function transform_md(content) {
    return content.toString().replace(/{{[\s]+([^\s]+)[\s]+([^\s]+)[\s]+([^\s]+)[\s]+}}/g, make_path);
}

const config = {
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin([
            {
                // copy favicon
                from: __dirname + "/" + path_to_favicon,
                to: __dirname + '/dist/favicon.ico'
            },
            {
                // copy main html file
                from: __dirname + '/src/templates/*.html',
                to: __dirname + '/dist/[name].html',
            },
            {
                // copy main md files 
                from: __dirname + '/src/templates/**/*.md',
                to: __dirname + '/dist/templates/main/[name].[ext]',
                ignore: ["*.html"],
                transform(content, path) {
                    return transform_md(content);
                }
            },
            {
                // copy main assets
                from: __dirname + '/src/assets', to: __dirname + '/dist/assets/main'
            },
            {
                // copy project index.html
                from: "src/projects/*/templates/index.html",
                to: __dirname + '/dist/[1].html',
                test: /src\/projects\/(.+)\/templates\/index.html/
            },
            {
                // copy other project html
                from: "src/projects/*/templates/**/*.html",
                to: __dirname + '/dist/[1]/[name].html',
                test: /src\/projects\/(.+)\/templates/
            },
            {
                // copy project md files
                from: "src/projects/*/templates/**/*.md",
                to: __dirname + '/dist/templates/[1]/[name].[ext]',
                test: /src\/projects\/(.+)\/templates/,
                ignore: ["*.html"],
                transform(content, path) {
                    return transform_md(content)
                }
            },
            {
                // copy project assets
                from: "src/projects/*/assets/**/*.*",
                to: __dirname + '/dist/assets/[1]/[name].[ext]',
                test: /src\/projects\/(.+)\/assets/
            }
        ])
    ],
    entry: {
        index: __dirname + '/src/ts/app.tsx',
        networkAnalysis: __dirname + '/src/projects/networkAnalysis/ts/app.tsx',
        SVM: __dirname + '/src/projects/SVM/ts/app.tsx',
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'js/[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
        alias: {
            "@Main": __dirname + '/src/',
            "@Projects": __dirname + '/src/projects'
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-modules-typescript-loader" },
                    { loader: "css-loader", options: { modules: true } }
                ]
            },
            {
                test: /\.(png|jpg)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ],
            }
        ]
    },
};
module.exports = config;
