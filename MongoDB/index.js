// 新增單筆
db.rooms.insertOne({ rating: 4.5, price: 1000, name: "標準單人房" });
// 新增多筆
db.rooms.insertMany([
    { rating: 4.5, name: "標準單人", price: 1000 },
    { rating: 4.5, name: "豪華雙人", price: 1500 },
]);
// 更新單筆
db.rooms.updateOne({ _id: ObjectId("622c9284ba881a774f72b25e") }, { $set: { name: "標準單人房升級版", rating: 4.3 } });
// 更新多筆
db.rooms.updateMany({ rating: 4.5 }, { $set: { rating: 0 } });

// 更新資料 - 清掉所有欄位，只保留新增這筆
db.rooms.replaceOne({ name: "標準單人" }, { name: "標準單人防昇級版" });

// 刪除單筆
db.rooms.deleteOne({ _id: ObjectId("622c9284ba881a774f72b25e") });
// 刪除多筆
db.rooms.deleteMany({ name: "標準單人防昇級版" });

// 尋找單筆
db.rooms.findOne({ price: 1500 });
// 尋找多筆
db.rooms.find({ price: 1500 });
db.posts.find({ type: "group" });

// 資料篩選 - 1500 以下
db.rooms.find({ price: { $lte: 1500 } });
// 多條件 - 價格小於等於 1500、評價大於等於 4.7
db.rooms.find({ price: { $lte: 1500 }, rating: { $gte: 4.7 } });

// 關鍵字搜尋 - 可以放正則表達式
db.rooms.find({ name: /豪華/ });

// 尋找資料 - find 保護欄位
db.rooms.find({ name: /豪華/ }, { _id: 0 });
// 尋找資料 - 尋找陣列裡的值
db.rooms.find({ payment: { $in: ["信用卡"] } });

// 1. 搜尋 name 欄位為 “Ray Xu” 的 document 列表
db.posts.find({ name: "Ray Xu" });
// 2. 新增一筆 document，請全部欄位皆填寫
db.posts.insertOne({
    name: "貼文姓名",
    image: "貼文圖片",
    likes: "按讚數",
    content: "貼文內容",
    comments: "留言數",
    createdAt: "發文時間",
    type: ["粉絲", "社團"],
    tags: "貼文標籤",
});
// 3. 新增多筆 document，請全部欄位皆填寫
db.posts.insertMany([
    {
        name: "貼文姓名",
        image: "貼文圖片",
        likes: "按讚數",
        content: "貼文內容",
        comments: "留言數",
        createdAt: "發文時間",
        type: ["粉絲", "社團"],
        tags: "貼文標籤",
    },
    {
        name: "貼文姓名",
        image: "貼文圖片",
        likes: "按讚數",
        content: "貼文內容",
        comments: "留言數",
        createdAt: "發文時間",
        type: ["粉絲", "社團"],
        tags: "貼文標籤",
    },
]);
// 4. 修改一筆 document，filter 條件請用 _id 指定其中一筆資料，content 欄位調整為測試資料
db.posts.updateOne({ _id: ObjectId("625ad1647650705ec8fe6faf") }, { $set: { content: "測試資料" } });
// 5. 修改多筆 name 欄位為 "Ray Xu" 的 document 列表，content 欄位都調整為哈哈你看看你
db.posts.updateMany({ name: " Ray Xu" }, { $set: { content: "哈哈你看看你" } });
// 6. 刪除一筆 document，filter 條件請用 `_id` 任意指定其中一筆資料
db.posts.deleteOne({ _id: ObjectId("625ad1647650705ec8fe6faf") });
// 7. 刪除多筆 document，filter 條件請用 type 為 group 的值，刪除所有社團貼文
db.posts.deleteMany({ type: "group" });
// 8. 刪除多筆 document，filter 條件為以下條件
db.posts.deleteMany({ name: "Ray Xu", likes: { $lte: 500 } });
// 9. 查詢全部 posts 的 document 列表
db.posts.find();
// 10. 關鍵字搜尋 name 裡面含有 o 的 document 列表
db.posts.find({ name: /o/ });
// 11. 查詢 name 欄位為 "Ray Xu" ，filter 篩選出介於 500~1000(含) 個讚
db.posts.find({ name: "Ray Xu", likes: { $gte: 500, $lte: 1000 } });
// 12. 查詢 comments 有超過 500(含)以上的 document 列表
db.posts.find({ tags: { $gte: 500 } });
// 13. 查詢 tags 欄位，有 謎因 或(or) 幹話 的 document 列表
db.posts.find({ $or: [{ tags: "謎因" }, { tags: "幹話" }] });
// 14. 查詢 tags 欄位，有 幹話 的 document 列表，需隱藏 _id 欄位
db.posts.find({ tags: "幹話" }, { _id: 0 });
// 15. 請嘗試用 Mongo Shell 指令刪除全部 Documents
db.posts.deleteMany({});
