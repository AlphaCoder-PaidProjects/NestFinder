const mongoose=require("mongoose");

const seekerSchema=mongoose.Schema({
    seekerid:{type:String},
    name:{type:String},
    lastname:{type:String},
    email:{type:String,unique:true},
    phonenumber:{type:String},
    password:{type:String},
    address: {
        street: { type: String },
        city: { type: String,default:"Belgaum"},
        state: { type: String,default:"Karnataka" },
        zipcode: { type: String },
    },
    profilepicture:{type:String},
    blocked:{type:Boolean,default:false},
    wishlist: [{ type: String }],
})

seekerSchema.pre('save',function(next){
    if (!this.seekerid) {
        this.seekerid = Math.floor(Date.now());  // Using Unix timestamp for unique ID
    }
    next();
})

const seekers=mongoose.model("seekers",seekerSchema)

module.exports={
    seekers
};