/*
module.exports  = {
    getURL
};
*/

const DEBUG_MODE = false
const DEV_ROOT  = "http://localhost:5000/"
const DIST_ROOT = "https://api.hrhelper.ru/" 

export function getURL(url){
    let _url = DEBUG_MODE?(DEV_ROOT+url):(DIST_ROOT+url)
    return _url
}