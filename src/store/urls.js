/*
module.exports  = {
    getURL
};
*/

const DEBUG_MODE = true
const DEV_ROOT  = "http://localhost:5000/"
const DIST_ROOT = "http://130.193.55.125:5000/"

export function getURL(url){
    let _url = DEBUG_MODE?(DEV_ROOT+url):(DIST_ROOT+url)
    return _url
}