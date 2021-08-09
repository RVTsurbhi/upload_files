// exports.generate4DigitCode = function() {
//     return Math.floor(1000 + Math.random() * 9000);
// };

const generateCode = ()=>{
    try{
        let code =  Math.floor(1000 + Math.random() * 9000);
        return code;
    }catch(err){
        return err;
    }
}

module.exports = {
    generateCode
}