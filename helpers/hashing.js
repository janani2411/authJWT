const bcrypt = require("bcryptjs"); // import bcrypt
const saltRounds = 10 ; // level of difficutly to generate the value

//INserting password into atabase in hashed format
const hashGenerate = async (plainPassword) => { //user plain password 
    try
    {
        const salt = await bcrypt.genSalt(saltRounds); // rounds to generate salt
        const hash = await bcrypt.hash(plainPassword , salt); // generating hashed password
        return hash;
    }
    catch(error)
    {
        res.send(error);
    }
    
}

//comparing database hashed password and user login password
const hashValidator = async (plainPassword , hashedPassword) => {
    try
    {
        const result = await bcrypt.compare(plainPassword , hashedPassword);
        return result;
    }
    
    catch(error)
    {
        res.send(error);
    }
}

module.exports.hashGenerate = hashGenerate;

module.exports.hashValidator = hashValidator;