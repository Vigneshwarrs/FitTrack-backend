const mongoose = require('mongoose');

module.exports = () => {
    try{
        mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log("Mongodb Connected.."))
        .catch(err => console.log(`Mongodb error: ${err}`));
    }catch(error) {
        console.log(error);
    }
}