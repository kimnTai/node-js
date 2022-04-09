"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const options = { versionKey: false };
const roomSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "名稱必填"] },
    price: { type: Number, required: [true, "價格必填"] },
    rating: Number,
    createAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
}, options);
// 開頭字小寫，強制加上 s
const Room = (0, mongoose_1.model)("Room", roomSchema);
exports.default = Room;
