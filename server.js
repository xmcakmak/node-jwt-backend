const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")
require('dotenv').config();

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
	cookieSession({
		name: "resortcode-session",
		keys: ["COOKIE_SECRET"],
		httpOnly: true,
	}),
)

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to resortcode application." })
})

const db = require("./models")
const Role = db.role

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

require("./routes/auth.routes")(app)
require("./routes/user.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})

function initial() {
	Role.create({
		id: 1,
		name: "user",
	})

	Role.create({
		id: 2,
		name: "moderator",
	})

	Role.create({
		id: 3,
		name: "admin",
	})
}
