"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFromAPI = exports.fetchAsUser = exports.fetchAsGuest = void 0;
var instagram_1 = require("../../configs/instagram");
var exceptions_1 = require("../../exceptions");
var utils_1 = require("../utils");
var isValidCookie = function (cookieString) {
    var cookiesToCheck = [
        "mid",
        "ig_did",
        "ig_nrcb",
        "datr",
        "csrftoken",
        "rur",
        "ds_user_id",
        "sessionid",
    ];
    for (var _i = 0, cookiesToCheck_1 = cookiesToCheck; _i < cookiesToCheck_1.length; _i++) {
        var cookie = cookiesToCheck_1[_i];
        if (!cookieString.includes(cookie)) {
            console.log("Invalid authentication cookie");
            return false;
        }
    }
    return true;
};
var formatGuestJson = function (json) {
    var _a, _b, _c, _d;
    if (!json.is_video) {
        throw new exceptions_1.BadRequest("This post does not contain a video", 400);
    }
    var videoJson = {
        username: json.owner.username,
        width: json.dimensions.width.toString(),
        height: json.dimensions.height.toString(),
        caption: (_d = (_c = (_b = (_a = json.edge_media_to_caption) === null || _a === void 0 ? void 0 : _a.edges[0]) === null || _b === void 0 ? void 0 : _b.node) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "No caption",
        downloadUrl: json.video_url,
        thumbnailUrl: json.thumbnail_src,
    };
    return videoJson;
};
var fetchAsGuest = function (_a) {
    var postUrl = _a.postUrl, timeout = _a.timeout;
    return __awaiter(void 0, void 0, void 0, function () {
        var headers, apiUrl, response, json, postJson, formattedJson;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    headers = (0, utils_1.getHeaders)();
                    apiUrl = postUrl + "/?__a=1&__d=dis";
                    return [4 /*yield*/, (0, utils_1.axiosFetch)({ url: apiUrl, headers: headers, timeout: timeout })];
                case 1:
                    response = _b.sent();
                    if (!response) {
                        return [2 /*return*/, null];
                    }
                    if (response.statusText !== "OK") {
                        console.error("Bad response from API Guest");
                        return [2 /*return*/, null];
                    }
                    json = response.data;
                    if (json.require_login) {
                        console.error("Guest graphql got rate limited by Instagram API");
                        return [2 /*return*/, null];
                    }
                    if (!json.graphql) {
                        console.error("Instagram Guest API response has been modified");
                        return [2 /*return*/, null];
                    }
                    postJson = json.graphql.shortcode_media;
                    formattedJson = formatGuestJson(postJson);
                    return [2 /*return*/, formattedJson];
            }
        });
    });
};
exports.fetchAsGuest = fetchAsGuest;
var fetchAsUser = function (_a) {
    var postUrl = _a.postUrl, timeout = _a.timeout;
    return __awaiter(void 0, void 0, void 0, function () {
        var isValidAuthCookie, headers, apiUrl, response, json, postJson, formattedJson;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isValidAuthCookie = isValidCookie(instagram_1.authCookie);
                    if (!isValidAuthCookie)
                        return [2 /*return*/, null];
                    headers = (0, utils_1.getHeaders)(instagram_1.authCookie);
                    apiUrl = postUrl + "/?__a=1&__d=dis";
                    return [4 /*yield*/, (0, utils_1.axiosFetch)({
                            url: apiUrl,
                            headers: headers,
                            timeout: timeout,
                        })];
                case 1:
                    response = _b.sent();
                    if (!response) {
                        return [2 /*return*/, null];
                    }
                    if (response.statusText !== "OK") {
                        return [2 /*return*/, null];
                    }
                    json = response.data;
                    if (json.require_login) {
                        console.error("sessionId has been expired, it should be updated");
                        return [2 /*return*/, null];
                    }
                    if (json.graphql) {
                        console.error("Instagram User API returned Guest response");
                        return [2 /*return*/, null];
                    }
                    if (!json.items) {
                        console.error("Instagram User API response has been modified");
                        return [2 /*return*/, null];
                    }
                    if (json.items.length === 0) {
                        return [2 /*return*/, null];
                    }
                    postJson = json.items[0];
                    formattedJson = formatUserJson(postJson);
                    return [2 /*return*/, formattedJson];
            }
        });
    });
};
exports.fetchAsUser = fetchAsUser;
var formatUserJson = function (json) {
    var _a, _b, _c, _d;
    if (!json.video_versions) {
        throw new exceptions_1.BadRequest("This post does not contain a video", 400);
    }
    var video = json.video_versions.filter(function (vid) {
        return vid.url.includes("video_dashinit");
    })[0];
    if (!video)
        video = json.video_versions[0];
    if (!video) {
        throw new exceptions_1.BadRequest("This post does not contain any download links", 400);
    }
    var thumbnail = json.image_versions2.candidates[0];
    var videoJson = {
        username: json.user.username,
        width: (_a = video.width) === null || _a === void 0 ? void 0 : _a.toString(),
        height: (_b = video.height) === null || _b === void 0 ? void 0 : _b.toString(),
        caption: (_d = (_c = json.caption) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "No caption",
        downloadUrl: video.url,
        thumbnailUrl: thumbnail.url,
    };
    return videoJson;
};
var fetchFromAPI = function (_a) {
    var postUrl = _a.postUrl, timeout = _a.timeout;
    return __awaiter(void 0, void 0, void 0, function () {
        var jsonAsGuest, jsonAsUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.fetchAsGuest)({ postUrl: postUrl, timeout: timeout })];
                case 1:
                    jsonAsGuest = _b.sent();
                    if (jsonAsGuest)
                        return [2 /*return*/, jsonAsGuest];
                    return [4 /*yield*/, (0, exports.fetchAsUser)({ postUrl: postUrl, timeout: timeout })];
                case 2:
                    jsonAsUser = _b.sent();
                    if (jsonAsUser)
                        return [2 /*return*/, jsonAsUser];
                    return [2 /*return*/, null];
            }
        });
    });
};
exports.fetchFromAPI = fetchFromAPI;
