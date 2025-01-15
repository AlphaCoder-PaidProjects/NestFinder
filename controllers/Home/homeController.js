const {Property}=require("../../model/Owner/PropertySchema")

const getHome= async(req, res) => {
    try {
        const approvedproperties=await Property.find({approved:true,status:"Available"})

        res.render("home",{
            approvedproperties:approvedproperties
        })
    } catch (error) {
        console.log(error)
    }
}



const getAboutUs=(req,res)=>{
    res.render("aboutus")
}

const getViewDetails=(req,res)=>{
    res.render("viewdetails")
}

const postSearchProperties = async (req, res) => {
    try {
        // console.log("Request Body:", req.body);
        const { criteria, searchvalue } = req.body;
        let query = { approved: true, status: "Available" };

        if (criteria === "city") {
            // Ensure the search value has enough length
            if (searchvalue.length >= 4) {
                const firstTwo = searchvalue.slice(0, 2);  // First two letters
                const lastTwo = searchvalue.slice(-2);     // Last two letters
                query["address.city"] = new RegExp(`^${firstTwo}.*${lastTwo}$`, 'i'); 
            } else {
                query["address.city"] = new RegExp(`^${searchvalue}`, 'i'); 
            }
        } else if (criteria === "rent") {
            query.rent = { $lte: parseFloat(searchvalue) }; // Ensure rent is compared numerically
        } else if (criteria === "rooms") {
            query.bedrooms = parseInt(searchvalue); // Ensure numeric comparison for rooms
        } 

        const approvedProperties = await Property.find(query);
        // console.log("approvedProperties:", approvedProperties);
        res.render("home", {
            approvedproperties: approvedProperties
        });

    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).send("An error occurred while fetching properties.");
    }
};

module.exports={
    getHome,
    getAboutUs,
    getViewDetails,
    postSearchProperties
}