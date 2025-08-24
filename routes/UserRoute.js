import { UrlModel } from "../db.js";
import { express, nanoid, path, fileURLToPath } from "../utils/ImortExport.js";
import { UrlValidation } from "../Validation/UrlValidation.js";

const route = express.Router();

route.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
})

route.post('/short', async (req, res) => {
    const { url } = req.body;

    const result = UrlValidation.safeParse({ url });
    if (!result.success) {
        return res.status(400).json({
            msg: "Validation failed",
            errors: result.error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        })
    }

    try {
        const shortUrl = nanoid(6);

        const response = await UrlModel.create({
            origenalUrl: url,
            sortUrl: shortUrl
        })

        return res.status(200).json({
            msg: "Url shorted!",
            data: response
        })
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Server error" });
    }
});

route.get('/:url', async (req, res) => {
    const { url } = req.params;

    try {
        const exist = await UrlModel.findOne({ sortUrl: url });
        if (!exist) return res.status(401).json({ msg: "Invalid credentials" });

        res.status(200).redirect(exist.origenalUrl);
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Server error" });
    }
})

export default route;