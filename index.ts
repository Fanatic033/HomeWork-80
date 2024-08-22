import express from "express";
import cors from "cors";
import mySqlDb from "./mySqlDb";
import categoriesRouter from "./routers/categories";
import locationsRouter from "./routers/locations";

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())
app.use('/categories', categoriesRouter)
app.use('/locations', locationsRouter)

const run = async () => {
    await mySqlDb.init();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

run().catch((err) => {
    console.log(err)
})