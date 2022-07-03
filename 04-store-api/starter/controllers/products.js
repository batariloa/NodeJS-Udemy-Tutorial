const getAllProductsStatic = async(req,res,next)=>{
    
    console.log("damn")
    res.status(200).json({msg:'testing product route'})
}

const getAllProducts = async(req,res)=>{
    
    res.status(200).json({msg:'product route'})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}