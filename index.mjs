import TurkmenAutocomplete from "turkmen-autocomplete";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import router from "./src/router.mjs";
import { Server } from "socket.io";

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
// app.use(limiter)
app.use(logger);
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: true}));
app.use('/public',express.static('public'));
app.use('/api',router);

const server = app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
    console.log(new TurkmenAutocomplete().getWords())
});

const socketIo = new Server(server, {
  cors: {
    origin: '*', // Allow any origin for testing purposes. This should be changed on production.
  },
});

socketIo.on('connection', (socket) => {
  console.log('New connection created', socket.id);
//   console.log(socket);



  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('onMail',(data)=>{
    console.log(data);
    
  })


});

export {socketIo};


