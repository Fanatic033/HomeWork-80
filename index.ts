import express from "express";
import cors from "cors";
import mySqlDb from "./mySqlDb";
import categoriesRouter from "./routers/categories";
import locationsRouter from "./routers/locations";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categoriesRouter);
app.use('/locations', locationsRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await mySqlDb.init();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

run().catch((err) => {
    console.log(err)
})