import mongoose from "mongoose";

interface IPost {
    name: string;
    tags: string;
    type: string;
    image: string;
    createAt: Date;
    content: string;
    likes: number;
    comments: number;
}

const postSchema = new mongoose.Schema<IPost>(
    {
        name: { type: String, required: [true, "貼文姓名未填寫"] },
        tags: [{ type: String, required: [true, "貼文標籤 tags 未填寫"] }],
        type: { type: String, enum: ["group", "person"], required: [true, "貼文類型 type 未填寫"] },
        image: { type: String, default: "" },
        createAt: { type: Date, default: Date.now, select: false },
        content: { type: String, required: [true, "content 未填寫"] },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    },
    { versionKey: false }
);

const Posts = mongoose.model("post", postSchema);

export default Posts;
