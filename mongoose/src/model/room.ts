import { Schema, model, SchemaOptions } from "mongoose";

interface IRoom {
    name: string;
    price: number;
    rating: number;
    createAt: Date;
}

const options: SchemaOptions = { versionKey: false };
const roomSchema = new Schema<IRoom>(
    {
        name: { type: String, required: [true, "名稱必填"] },
        price: { type: Number, required: [true, "價格必填"] },
        rating: Number,
        createAt: {
            type: Date,
            default: Date.now,
            select: false,
        },
    },
    options
);
// 開頭字小寫，強制加上 s
const Room = model<IRoom>("Room", roomSchema);

export default Room;
