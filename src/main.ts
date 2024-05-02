import {app} from "./app/web";
import {logger} from "./app/logging";
import cors from "cors";

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Izinkan metode HTTP yang diizinkan, termasuk OPTIONS untuk permintaan preflight
    next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type']
}));

app.listen(3001, () => {
    logger.info("App started on port 3000");
})