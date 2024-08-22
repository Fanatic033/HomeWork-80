import express, {Router} from "express";
import mySqlDb from "../mySqlDb";
import {Category} from "../types";


const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req: express.Request, res: express.Response, next) => {
    try {
        const result = await mySqlDb.getConnection().query("SELECT * FROM categories");
        const categories = result[0] as Category[];
        return res.send(categories);
    } catch (e) {
        next(e);
    }
})

export default categoriesRouter;