import { Schema, model} from 'mongoose';

const productSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        default: Schema.Types.ObjectId.toString()
    },
    name: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        defult: 10
    }
}, {
    timestamps: true
});

module.exports = model("Product", productSchema)

