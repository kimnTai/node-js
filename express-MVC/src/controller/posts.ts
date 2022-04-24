import { Request, Response } from "express";
import Posts from "../model/post";

class PostsController {
    /**
     * @description 取得所有資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    async getPosts(req: Request, res: Response): Promise<void> {
        const result = await Posts.find();
        res.status(200).json({ status: "success", result });
    }

    /**
     * @description 新增單筆資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    async createPosts(req: Request, res: Response): Promise<void> {
        const { content, type, name } = req.body;
        try {
            const result = await Posts.create({ content, type, name });
            res.status(200).json({ status: "success", result });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    /**
     * @description 刪除所有資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    async deleteAll(req: Request, res: Response): Promise<void> {
        await Posts.deleteMany({});
        res.status(200).json({ status: "success", message: "刪除成功" });
    }

    /**
     * @description 編輯單筆資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    async editPosts(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { content, type, name } = req.body;
        try {
            await Posts.findByIdAndUpdate(id, { content, type, name });
            const result = await Posts.findById(id);
            res.status(200).json({ status: "success", result });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    /**
     * @description 刪除單筆資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    async deleteById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deleteResult = await Posts.findByIdAndDelete(id);
        if (deleteResult) {
            res.status(200).json({ status: "success", message: "刪除成功" });
        } else {
            res.status(400).json({ status: "error", message: "無此 id" });
        }
    }
}

export default new PostsController();
