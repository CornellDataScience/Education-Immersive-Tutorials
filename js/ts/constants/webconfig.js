"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crossProjectInfo_1 = require("./crossProjectInfo");
let base_url = process.env.NODE_ENV == "production"
    ? "https://cornelldatascience.github.io/Education-Immersive-Tutorials"
    : "http://0.0.0.0:8000";
/**
 * matches webpack.config.js! If you change this, change webpack.config.js
 */
function make_template_path(p1, p2) {
    let project = ""; // represents "main"
    let templateNameWithExtension = "index.html";
    // parse and process params
    if (p1 !== undefined) {
        if (!crossProjectInfo_1.isAProject(p1)) {
            templateNameWithExtension = p1;
        }
        else {
            console.log("p1:");
            console.log(p1);
            project = p1 == "main" ? "" : p1;
            if (p2 !== undefined) {
                templateNameWithExtension = p2;
            }
        }
    }
    // make and return url
    let project_urlPiece = project == "" ? "" : "/" + project;
    let template_urlPiece = "/" + templateNameWithExtension;
    if (template_urlPiece == "/index.html") {
        if (project_urlPiece !== "") {
            project_urlPiece += ".html";
        }
        console.log(project_urlPiece);
        return `${base_url}${project_urlPiece}`;
    }
    if (template_urlPiece.endsWith(".html")) {
        return `${base_url}${template_urlPiece}`;
    }
    if (project_urlPiece == "") {
        project_urlPiece = "/main";
    }
    return `${base_url}/templates${project_urlPiece}${template_urlPiece}`;
}
exports.make_template_path = make_template_path;
/**
 * matches webpack.config.js! If you change this, change webpack.config.js
 */
function make_asset_path(p1, p2) {
    let project;
    let assetNameWithExtension;
    if (crossProjectInfo_1.isAProject(p1)) {
        project = p1;
        assetNameWithExtension = p2;
    }
    else {
        project = crossProjectInfo_1.Project.main;
        assetNameWithExtension = p1;
    }
    return `${base_url}/assets/${project}/${assetNameWithExtension}`;
}
exports.make_asset_path = make_asset_path;
let info1998_links = {
    homepage: "https://cornelldatascience.github.io/info1998"
};
let cfg = {
    base_url: base_url,
    template_link: make_template_path,
    asset_link: make_asset_path,
    info1998_links: info1998_links
};
exports.default = cfg;
//# sourceMappingURL=webconfig.js.map