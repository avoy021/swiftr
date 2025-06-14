const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin ? origin : "") !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
export default corsOptions;
