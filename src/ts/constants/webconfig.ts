import { Project, isAProject } from './crossProjectInfo'

let base_url = process.env.NODE_ENV == "production" ?
  "https://dylantsai.github.io/bookish-journey"
  : "http://0.0.0.0:8000"


export function make_template_path(project: Project, assetNameWithExtension: string): string;
export function make_template_path(project: Project): string;
export function make_template_path(templateNameWithExtension: string): string;
export function make_template_path(): string;
/**
 * matches webpack.config.js! If you change this, change webpack.config.js
 */
export function make_template_path(p1?: Project | string, p2?: string): string {
  let project = ""; // represents "main"
  let templateNameWithExtension = "index.html";
  // parse and process params
  if (p1 !== undefined) {
    if (!isAProject(p1)) {
      templateNameWithExtension = p1;
    } else {
      console.log("p1:")
      console.log(p1)
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
      project_urlPiece += ".html"
    }
    console.log(project_urlPiece)
    return `${base_url}${project_urlPiece}`
  }
  if (template_urlPiece.endsWith(".html")) {
    return `${base_url}${template_urlPiece}`
  }
  if (project_urlPiece == "") {
    project_urlPiece = "/main"
  }
  return `${base_url}/templates${project_urlPiece}${template_urlPiece}`;
}


export function make_asset_path(project: Project, assetNameWithExtension: string): string;
export function make_asset_path(assetNameWithExtension: string): string;
/**
 * matches webpack.config.js! If you change this, change webpack.config.js
 */
export function make_asset_path(p1: Project | string, p2?: string): string {
  let project;
  let assetNameWithExtension;
  if (isAProject(p1)) {
    project = p1;
    assetNameWithExtension = p2;
  } else {
    project = Project.main;
    assetNameWithExtension = p1;
  }
  return `${base_url}/assets/${project}/${assetNameWithExtension}`
}


let info1998_links = {
  homepage: "https://cornelldatascience.github.io/info1998"
}


type cfgT = {
  /**
   * The homepage URL for Immersive Tutorials.
   */
  base_url: string,
  /**
   * Pass in the [project] and the [template] that you want to get a link to.
   * Either or both can be omitted, but if you supply both arguments,
   * then be sure to pass in [project] first and [template] second.
   * @param project - a member of [Project] in [crossProjectInfo.ts]. Defaults
   * to "main".
   * @param template - the name of the html or md file, including its extension.
   * Defaults to "index.html".
   */
  template_link: typeof make_template_path,
  /**
   * Pass in the [project] and the [asset] that you want to get a link to.
   * Either can be omitted, but if you supply both arguments,
   * then be sure to pass in [project] first and [asset] second.
   * @param project - a member of [Project] in [crossProjectInfo.ts]. Defaults
   * to "main".
   * @param template - the name of the html or md file, including its extension.
   * Defaults to "index.html".
   */
  asset_link: typeof make_asset_path,
  /**
   * Links to the info1998 website
   */
  info1998_links: typeof info1998_links
}

let cfg: cfgT = {
  base_url: base_url,
  template_link: make_template_path,
  asset_link: make_asset_path,
  info1998_links: info1998_links
}

export default cfg;