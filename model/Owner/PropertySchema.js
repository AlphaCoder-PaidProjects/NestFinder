const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    propertyId: { type: String},
    title: { type: String, required: true },
    description: { type: String, required: true },
    rent: { type: Number, required: true },
    deposit: { type: Number, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
    },
    ownerPhone: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    images: [String], // Array to store image paths
    mapLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    datePosted: { type: Date, required: true },
    status: { type: String, enum: ["Available", "Unavailable"], required: true },
});

PropertySchema.pre("save", function (next) {
    if (!this.propertyId) {
        this.propertyId = Math.floor(Date.now() / 1000)+99999;  // Using Unix timestamp for unique ID
    }
    next();
})   

const Property = mongoose.model("Property", PropertySchema);

module.exports = {
    Property
}
