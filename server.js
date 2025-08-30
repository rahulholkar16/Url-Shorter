import route from "./routes/UserRoute.js";
import { express, mongoose, fileURLToPath, path, auth, cookieParser } from "./utils/ImortExport.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// DB Config
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB error:", err.message));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, 'client')));

// ----- Route -----
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'index.html'));
// })

app.use('/api/v1', route);
app.use('/url', route);
app.listen(PORT, () => {
    console.log("🚀 Server start at:", PORT);
})