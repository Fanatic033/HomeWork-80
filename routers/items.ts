import express from "express";
import mySqlDb from "../mySqlDb";
import {Item, ItemMutation} from "../types";
import {ResultSetHeader} from "mysql2";
const itemsRouter = express.Router();


itemsRouter.get("/", async (req, res) => {
    const result = await mySqlDb.getConnection().query(
        'SELECT * FROM items',
    )
    const items = result[0] as Item[];
    return res.send(items);
})

itemsRouter.get("/:id", async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const result = await mySqlDb.getConnection().query(
        'SELECT * FROM items WHERE id = ?',
        [id]
    );
    const items = result[0] as Item[];
    if (items.length === 0) {
        return res.status(404).send("No such item");
    }
    return res.send(items[0]);
})

itemsRouter.post("/", async (req: express.Request, res: express.Response) => {
    if (!req.body.title) {
        return res.status(400).send({error: 'Title are required!'});
    }

    const item: ItemMutation = {
        category_id: parseInt(req.body.category_id),
        location_id: parseInt(req.body.location_id),
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    }

    const insertResult = await mySqlDb.getConnection().query(
        'INSERT INTO items (category_id,location_id,title,description,image) VALUES (?,?,?,?,?)',
        [item.category_id, item.location_id, item.title, item.description, item.image],
    )
    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mySqlDb.getConnection().query(
        'SELECT * FROM items WHERE id = ?',
        [resultHeader.insertId]
    );
    const products = getNewResult[0] as Item[];
    return res.send(products);
})


itemsRouter.delete("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;

        const result = await mySqlDb.getConnection().query(
            'DELETE FROM items WHERE id = ?',
            [id]
        );

        const resultHeader = result[0] as ResultSetHeader;
        if (resultHeader.affectedRows === 0) {
            return res.status(404).send('No item found.');
        }

        return res.send();
    } catch (e) {
        next(e);
    }
})

export default itemsRouter;