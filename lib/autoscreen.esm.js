var AutoScreenEnum;
(function (AutoScreenEnum) {
    AutoScreenEnum["FIT"] = "fit";
    AutoScreenEnum["SCROLL_Y"] = "scrollY";
    AutoScreenEnum["SCROLL_X"] = "scrollX";
    AutoScreenEnum["FULL"] = "full";
})(AutoScreenEnum || (AutoScreenEnum = {}));

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function throttle(func, wait, options) {
    var timeout, context, args;
    var previous = 0;
    if (!options)
        options = {};
    var later = function () {
        previous = (options === null || options === void 0 ? void 0 : options.leading) === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    var throttled = function () {
        var rests = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rests[_i] = arguments[_i];
        }
        var now = new Date().getTime();
        if (!previous && (options === null || options === void 0 ? void 0 : options.leading) === false)
            previous = now;
        var remaining = wait - (now - previous);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        context = this;
        args = rests;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && (options === null || options === void 0 ? void 0 : options.trailing)) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
function debounce(func, wait) {
    var timeoutId;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            func.apply(_this, args);
        }, wait);
    };
}
function classNamePrefix(prefix) {
    return __awaiter(this, void 0, void 0, function () {
        var url, fs, path, fileURLToPath, _a, dirnameFn, resolve, _b, existsSync, copyFileSync, readFileSync, writeFileSync, dirname, stylePath, originPath, rPath, content, reg, newContent;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (typeof process === 'undefined' || Object.prototype.toString.call(process) !== '[object process]') {
                        console.warn('classNamePrefix: process is not defined');
                        return [2 /*return*/];
                    }
                    if (!prefix || typeof prefix !== 'string')
                        return [2 /*return*/];
                    url = 'url';
                    fs = 'fs';
                    path = 'path';
                    return [4 /*yield*/, import(url)];
                case 1:
                    fileURLToPath = (_c.sent()).fileURLToPath;
                    return [4 /*yield*/, import(path)];
                case 2:
                    _a = _c.sent(), dirnameFn = _a.dirname, resolve = _a.resolve;
                    return [4 /*yield*/, import(fs)];
                case 3:
                    _b = _c.sent(), existsSync = _b.existsSync, copyFileSync = _b.copyFileSync, readFileSync = _b.readFileSync, writeFileSync = _b.writeFileSync;
                    dirname = dirnameFn(fileURLToPath(import.meta.url));
                    stylePath = resolve(dirname, './style.css');
                    originPath = resolve(dirname, './style-origin.css');
                    rPath = stylePath;
                    if (existsSync(originPath))
                        rPath = originPath;
                    else
                        copyFileSync(stylePath, originPath);
                    content = readFileSync(rPath, { encoding: 'utf-8' });
                    reg = /fit-screen/g;
                    newContent = content.replace(reg, prefix);
                    writeFileSync(stylePath, newContent, { encoding: 'utf-8' });
                    return [2 /*return*/];
            }
        });
    });
}

// * 屏幕缩放适配（两边留白）
var useAutoScreen = function (options) { return createCalcRateFn(options); };
// * 屏幕缩放适配（两边留白）
var useAutoScale = function (options) { return createCalcRateFn(__assign(__assign({}, options), { mode: AutoScreenEnum.FIT })); };
// *  X轴撑满，Y轴滚动条
var useScrollYScale = function (options) { return createCalcRateFn(__assign(__assign({}, options), { mode: AutoScreenEnum.SCROLL_Y })); };
// *  Y轴撑满，X轴滚动条
var useScrollXScale = function (options) { return createCalcRateFn(__assign(__assign({}, options), { mode: AutoScreenEnum.SCROLL_X })); };
// * 变形内容，宽高铺满
var useFullScale = function (options) { return createCalcRateFn(__assign(__assign({}, options), { mode: AutoScreenEnum.FULL })); };
// * 计算缩放比例函数
function createCalcRateFn(options) {
    var 
    // * 画布尺寸（px）
    _a = options.width, 
    // * 画布尺寸（px）
    width = _a === void 0 ? 1920 : _a, _b = options.height, height = _b === void 0 ? 1080 : _b, el = options.el, mode = options.mode, _c = options.executeMode, executeMode = _c === void 0 ? 'throttle' : _c, _d = options.waitTime, waitTime = _d === void 0 ? 200 : _d, beforeCalculate = options.beforeCalculate, afterCalculate = options.afterCalculate;
    // * 默认缩放值
    var scale = {
        widthRatio: 1,
        heightRatio: 1,
    };
    // * 需保持的比例
    var baseProportion = parseFloat((width / height).toFixed(5));
    var calcRate = function () {
        if (beforeCalculate) {
            var flag = beforeCalculate(scale);
            if (flag === false)
                return;
        }
        if (el) {
            switch (mode) {
                case AutoScreenEnum.FIT:
                    {
                        // 当前屏幕宽高比
                        var currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5));
                        // 比例越大，则越宽，基准值采用高度，计算出宽度
                        // 反之，则越高，基准值采用宽度，计算出高度
                        scale = currentRate > baseProportion
                            ? calcRateByHeight(width, height, baseProportion)
                            : calcRateByWidth(width, height, baseProportion);
                    }
                    break;
                case AutoScreenEnum.SCROLL_X:
                    scale = calcRateByHeight(width, height, baseProportion);
                    break;
                case AutoScreenEnum.SCROLL_Y:
                    scale = calcRateByWidth(width, height, baseProportion);
                    break;
                case AutoScreenEnum.FULL:
                    scale = calcRateByStretch(width, height);
                    break;
            }
            el.style.transform = "scale(".concat(scale.widthRatio, ", ").concat(scale.heightRatio, ")");
            if (afterCalculate)
                afterCalculate(scale);
        }
        else {
            console.error("必须指定一个元素！");
        }
    };
    var tFn = function () { };
    switch (executeMode) {
        case 'none':
            tFn = calcRate;
            break;
        case 'debounce':
            tFn = debounce(function () { calcRate(); }, waitTime);
            break;
        case 'throttle':
            tFn = throttle(function () { calcRate(); }, waitTime, { trailing: true });
            break;
        default:
            tFn = throttle(function () { calcRate(); }, waitTime, { trailing: true });
            break;
    }
    // * 改变窗口大小重新绘制
    var resize = function () {
        window.addEventListener('resize', tFn);
    };
    // * 改变窗口大小重新绘制
    var unResize = function () {
        window.removeEventListener('resize', tFn);
    };
    return {
        calcRate: calcRate,
        resize: resize,
        unResize: unResize,
    };
}
// * 以宽度为基准
function calcRateByWidth(baseWidth, baseHeight, baseProportion) {
    // 表示更高
    var heightRatio = parseFloat(((window.innerWidth / baseProportion) / baseHeight).toFixed(5));
    var widthRatio = parseFloat((window.innerWidth / baseWidth).toFixed(5));
    return { widthRatio: widthRatio, heightRatio: heightRatio };
}
// * 以高度为基准
function calcRateByHeight(baseWidth, baseHeight, baseProportion) {
    // 表示更宽
    var widthRatio = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5));
    var heightRatio = parseFloat((window.innerHeight / baseHeight).toFixed(5));
    return { widthRatio: widthRatio, heightRatio: heightRatio };
}
// * 拉伸
function calcRateByStretch(baseWidth, baseHeight) {
    // 表示更高
    var widthRatio = parseFloat((window.innerWidth / baseWidth).toFixed(5));
    var heightRatio = parseFloat((window.innerHeight / baseHeight).toFixed(5));
    return { widthRatio: widthRatio, heightRatio: heightRatio };
}

export { AutoScreenEnum, classNamePrefix, useAutoScale, useAutoScreen, useFullScale, useScrollXScale, useScrollYScale };
