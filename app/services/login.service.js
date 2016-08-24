"use strict";
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
{
    var LoginService = (function () {
        function LoginService(_http) {
            this._http = _http;
            this.url = 'http://www.symfony-api-rest.local/app_dev.php';
        }
        LoginService.prototype.signup = function (user_to_login) {
            var json = JSON.stringify(user_to_login);
            var params = 'json=' + json;
            var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.url + '/login', params, { headers: headers })
                .map(function (res) { return res.json(); });
        };
        LoginService.prototype.getIdentity = function () {
            var identity = JSON.parse(localStorage.getItem('identity'));
            if (identity != 'undefined') {
                this.identity = identity;
            }
            else {
                this.identity = null;
            }
            return this.identity;
        };
        LoginService.prototype.getToken = function () {
            var token = JSON.parse(localStorage.getItem('token'));
            if (token != 'undefined') {
                this.token = token;
            }
            else {
                this.token = null;
            }
            return this.token;
        };
        return LoginService;
    }());
    exports.LoginService = LoginService;
}
//# sourceMappingURL=login.service.js.map