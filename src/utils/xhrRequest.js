export default function xhrRequest (opts) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(opts.method, opts.url, true, opts.params);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      if (opts.headers) {
        Object.keys(opts.headers).forEach(function (key) {
          console.log(`${key} : ${opts.headers[key]}`)
          xhr.setRequestHeader(key, opts.headers[key]);
        });
      }
      var params = opts.params;
      
      // We'll need to stringify if we've been given an object
      // If we have a string, this is skipped.
      /*
      if (params && typeof params === 'object') {
        params = Object.keys(params).map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
      }
      */
      console.log('xhr.params',params)
      xhr.send(null);
    });
  }
  