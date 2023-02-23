const nodemailer = require("nodemailer")



 async function emailVerify(email, id){
        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'favourorungbemi310@gmail.com', // Your email id
                pass: 'errrxqfdnbfghsok' // Your password
                }
              });
            
               await transporter.sendMail({
                from: "adeyemijolade@gmail.com", 
                to: email,
                subject: "MMTF", 
                html: "<div><h1>Click the link to verify your email</h1><p><a href= 'http://localhost:5000/verify_email?token="+ id + "'>Verify</a></p></div>" ///verify_email?
              });

            
              
        } catch (error) {
            if (error) throw error
 }  
        
        
    }

      
    module.exports= emailVerify;

