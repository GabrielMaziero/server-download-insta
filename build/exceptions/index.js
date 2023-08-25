"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutException = exports.BadRequest = exports.Exception = void 0;
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    /**
     * @param message
     * @param code
     */
    function Exception(message, code) {
        if (message === void 0) { message = "Instagram Exception"; }
        if (code === void 0) { code = 500; }
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return Exception;
}(Error));
exports.Exception = Exception;
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    /**
     * @param message
     * @param code
     */
    function BadRequest(message, code) {
        if (message === void 0) { message = "Bad Request"; }
        if (code === void 0) { code = 400; }
        return _super.call(this, message, code) || this;
    }
    return BadRequest;
}(Exception));
exports.BadRequest = BadRequest;
var TimeoutException = /** @class */ (function (_super) {
    __extends(TimeoutException, _super);
    /**
     * @param message
     * @param code
     */
    function TimeoutException(message, code) {
        if (message === void 0) { message = "Request timeout, please try again."; }
        if (code === void 0) { code = 408; }
        return _super.call(this, message, code) || this;
    }
    return TimeoutException;
}(Exception));
exports.TimeoutException = TimeoutException;
