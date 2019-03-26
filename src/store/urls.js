/**
 * 
 */

module.exports  = {
    getURL
};


const DEBUG_MODE = true;
const DEV_ROOT  = "http://localhost:5000/"
const DIST_ROOT = "http://hrhelper.ru/"


function getURL(url){
    let _url = DEBUG_MODE?(DEV_ROOT+url):(DIST_ROOT+url);
    console.log("getUrl:",_url);
    return _url;
}