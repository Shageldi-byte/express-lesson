import express from "express";
import router from "./src/router.mjs";

const app = express();
const PORT = 3456;
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: true}));
app.use('/public',express.static('public'));
app.use('/api',router);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})