import mongoose, { Document, Schema, trusted } from 'mongoose';

export interface IProduct extends Document {
    name: string,
    price: number,
    stock: number,
    category: mongoose.Types.ObjectId
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true
})

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)