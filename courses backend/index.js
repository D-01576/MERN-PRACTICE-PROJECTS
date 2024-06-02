const express = require('express');
const app = express();
const router = require("./routes/admin")
const router2 = require("./routes/user");

app.use(express.json());
app.use("/admin", router)
app.use("/user", router2)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});