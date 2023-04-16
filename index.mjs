import cors from "cors";
import express from "express";
import router from "./src/router.mjs";
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes),
    message: {
        code: 429,
        message: 'Rate limit exceeded'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    onLimitReached: (req,res)=>{
        var ip = req.ip;
        console.log(ip);
    }
})

const app = express();
const PORT = 3456;

const logger=(req,res,next) => {
    console.log(req.originalUrl);
    next();
}

app.use(cors());
app.use(limiter)
app.use(logger);
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: true}));
app.use('/public',express.static('public'));
app.use('/api',router);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})