
export class ExtractKeywords {
    public apiKey: string;
    public apiServer: string;

    constructor() {
        this.apiServer = 'http://api.cortical.io/rest/';
        this.apiKey = '7314a190-3fd4-11ea-8f72-af685da1b20e';
    }

    public getKeywords(text, callbacks) {
        if (typeof callbacks == 'function') {
            callbacks = this.wrapAsSuccessCallback(callbacks);
        }
        return this.getKeywordsForText(text, callbacks);
    };

    private getKeywordsForText (params, callbacks) {
        if (typeof params == 'string') {
            params = {body: params}
        } else if (typeof params.text != 'undefined') {
            params.body = params.text;
            delete params.text;
        }
        if (typeof callbacks == 'function') {
            callbacks = this.wrapAsSuccessCallback(callbacks);
        }
        return this.post("text/keywords", params, callbacks);
    };

    private sendRequest(url, type, params, callbacks) {
        // Prepend API server to request URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        url = proxyurl + this.apiServer + url;

        if (params == null || typeof params == 'undefined') {
            params = {};
        }

        // Create request
        var httpRequest = new XMLHttpRequest();
        var isAsync = (typeof callbacks != 'undefined' && typeof callbacks.success == 'function');
        httpRequest.open(type, url, isAsync);

        // Set request header depending on endpoint being called
        if (url.indexOf("/image") >= 0 && url.indexOf("bulk") == -1) {
            httpRequest.setRequestHeader("Accept", "image/png");
        } else {
            httpRequest.setRequestHeader("Accept", "application/json");
        }
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.setRequestHeader("api-key", this.apiKey);
        httpRequest.setRequestHeader("api-client", "js_1.0");

        if (isAsync) {
            // Send asynchronous request and call configured callback functions on success/error
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    if (httpRequest.responseURL.indexOf("/rest/image") == -1 || httpRequest.responseURL.indexOf("/rest/image/bulk") >= 0) {
                        callbacks.success(JSON.parse(httpRequest.responseText));
                    } else {
                        callbacks.success((httpRequest.responseText));
                    }
                } else if (httpRequest.readyState == 4 && httpRequest.status != 200 && typeof callbacks.error == 'function') {
                    callbacks.error(httpRequest.responseText);
                }
            };
            httpRequest.send(params);
        } else {
            // Send synchronous request and return response
            httpRequest.send(params);
            if (httpRequest.responseURL.indexOf("/rest/image") == -1 || httpRequest.responseURL.indexOf("/rest/image/bulk") >= 0) {
                return JSON.parse(httpRequest.responseText);
            } else {
                return httpRequest.responseText;
            }
        }
    }

    private post(url, params, callbacks) {
        // Add default retina_name parameter if needed
        if (params && typeof params.retina_name == 'undefined') {
            params.retina_name = "en_associative";
        }

        url = this.constructUrl(url, params);
        return this.sendRequest(url, "POST", JSON.stringify(params.body), callbacks);
    }

    private constructUrl(url, params) {
        // Append params to URL
        var first = true;
        for (var key in params) {
            if (key == 'body') {
                continue;
            }
            if (first) {
                url = url + "?";
                first = false;
            } else {
                url = url + "&";
            }
            if (params.hasOwnProperty(key)) {
                var name = key;
                var value = params[key];
                url = url + name + "=" + value
            }
        }
        return url;
    }

    private wrapAsSuccessCallback(callback) {
        return {success: callback};
    }
}