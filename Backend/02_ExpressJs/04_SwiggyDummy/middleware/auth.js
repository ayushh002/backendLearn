const auth = (request, response, next)=>{
    // first authentication code will be written here
    // dummy authentication & then authorization
    const token = "ABCDE";
    const validAdmin = token === "ABCDE" ? 1 : 0;
    if(validAdmin){
        next();
    }
    else{
        response.status(401).send("Unauthorized Access");
    }
}

module.exports = auth;