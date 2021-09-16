import { Uploads } from "../../entities/Uploads";
import * as express from "express";
const router = express.Router();

import { SupportPreview } from "@sharex-server/common";

import user from "./user";
router.use("/user", user);

import statistics from "./statistics";
router.use("/statistics", statistics);

import latest from "./latest";
router.use("/latest", latest);

import settings from "./settings";
router.use("/settings", settings);

import auth from "./auth";
router.use("/auth", auth);

import keys from "./keys";
router.use("/keys", keys);

router.get("/file/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });

        if (!upload) return res.status(404).json({ message: "file not found" });

        if (upload.type === "image")
            return res.status(404).json({ message: "file not found" });

        return res.json(upload!);
    } catch (error) {
        return next(error);
    }
});

router.get("/file/:slug/preview", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });

        if (!upload) return res.status(404).json({ message: "file not found" });

        if (SupportPreview(upload.stats.extension)) {
            return res.send("coming soon");
        } else {
            return res
                .status(422)
                .json({ message: "format not supported for preview" });
        }
    } catch (error) {
        return next(error);
    }
});

export default router;
