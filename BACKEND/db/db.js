import mongoose from "mongoose";
import 'dotenv/config'
function connect() {
    
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        // .then() runs when the promise is successfully resolved asynchronously
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log(err);
    })
}

export default connect;
