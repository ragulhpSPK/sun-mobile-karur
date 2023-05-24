const mongoose = require("mongoose")

const topProductsSchema = new mongoose.Schema({
    image: {
        type:Array,
    },
    productId: {
        type: String,
    },
    ProductTitle: {
        type:String,
    },
}, { timestamps: true })


module.exports=mongoose?.models?.topProducts||mongoose.model("topProducts", topProductsSchema);