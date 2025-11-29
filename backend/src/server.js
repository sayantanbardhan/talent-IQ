import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();
const __dirname = path.resolve();

app.use("/api/inngest", serve({ client: inngest, functions, signingKey: ENV.INNGEST_SIGNING_KEY }));

//middleware
app.use(express.json());
// credentials: true => server allowes browser to include cookies in requests
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ msg: "Api is up and running" })
});

app.get("/books", (req, res) => {
    res.status(200).json({ msg: "Books is up and running" })
});

//make app ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
};

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log("Server is running on port ", ENV.PORT));
    } catch (error) {
        console.error("Failed to start server", error);
    }
};

startServer();