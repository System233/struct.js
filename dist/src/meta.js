"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetMetaData = exports.GetMetaData = void 0;
var consts_1 = require("./consts");
Object.defineProperty(exports, "META", { enumerable: true, get: function () { return consts_1.META; } });
exports.GetMetaData = (target, meta) => Reflect.get(target, meta);
exports.SetMetaData = (target, meta, value) => Reflect.set(target, meta, value);
