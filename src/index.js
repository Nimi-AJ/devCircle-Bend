import app from "./server.js";
import databaseConnection from './database/index.js';


databaseConnection.getConnect();

// app.listen(port, () => {
//     console.log(`Server connected at http://localhost:${port}`);
// })