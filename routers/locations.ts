import express from 'express';
import mySqlDb from "../mySqlDb";
import {Category, LocationMutation, myLocation} from "../types";
import {ResultSetHeader} from "mysql2";

const locationsRouter = express.Router();
locationsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const result = await mySqlDb.getConnection().query("SELECT * FROM location");
        const location = result[0] as myLocation[];
        return res.send(location);
    } catch (e) {
        next(e);
    }
});

locationsRouter.get("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;
        const result = await mySqlDb.getConnection().query("SELECT * FROM location WHERE id = ?",
            [id]);
        const category = result[0] as myLocation[];
        if (category.length === 0) {
            return res.status(404).send("No location found.");
        }
        return res.send(category[0]);
    } catch (e) {
        next(e);
    }
})


locationsRouter.post("/", async (req: express.Request, res: express.Response) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({error: 'Title and description are required!'});
    }


    const location: LocationMutation = {
        title: req.body.title,
        description: req.body.description,
    }

    const insertResult = await mySqlDb.getConnection().query(
        'INSERT INTO location (title, description) VALUES (?,?)',
        [location.title, location.description],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mySqlDb.getConnection().query(
        'SELECT * FROM location WHERE id = ?',
        [resultHeader.insertId]
    );

    const locations = getNewResult[0] as Category[];
    return res.send(locations[0]);
})


export default locationsRouter;