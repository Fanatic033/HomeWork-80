import express from "express";
import mySqlDb from "../mySqlDb";
import {Category, CategoryMutation} from "../types";
import {ResultSetHeader} from "mysql2";


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

categoriesRouter.get("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;
        const result = await mySqlDb.getConnection().query("SELECT * FROM categories WHERE id = ?",
            [id]);
        const category = result[0] as Category[];
        if (category.length === 0) {
            return res.status(404).send("No category found.");
        }
        return res.send(category[0]);
    } catch (e) {
        next(e);
    }
})

categoriesRouter.post("/", async (req: express.Request, res: express.Response) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({error: 'Title and description are required!'});
    }


    const category: CategoryMutation = {
        title: req.body.title,
        description: req.body.description,
    }

    const insertResult = await mySqlDb.getConnection().query(
        'INSERT INTO categories (title, description) VALUES (?,?)',
        [category.title, category.description],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mySqlDb.getConnection().query(
        'SELECT * FROM categories WHERE id = ?',
        [resultHeader.insertId]
    );

    const categories = getNewResult[0] as Category[];
    return res.send(categories[0]);
})

export default categoriesRouter;