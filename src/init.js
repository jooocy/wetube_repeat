import "dotenv/config";
import "./db";
import "./models/User";
import app from "./server";

const PORT = 5000;
const handleListener = () => {
  console.log(`✅ Sever listeing on port http://localhost:${PORT} 🎉`);
};

app.listen(PORT, handleListener);
