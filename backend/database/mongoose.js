const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

class MongoDb {
	uri = `mongodb+srv://hionel:${process.env.MONGO_PASS}@mongotodo-cluster1.kiu7wo6.mongodb.net/ToDoCluster?retryWrites=true&w=majority`;

	db = mongoose.connection;
	constructor() {}

	connect = async () => {
		try {
			mongoose.connect(this.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (error) {
			console.log("Error connecting to mongo:", error);
		}
	};
}

module.exports = MongoDb;
