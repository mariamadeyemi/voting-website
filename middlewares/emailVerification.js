const nodemailer = require("nodemailer")



 async function emailVerify(email, id){
        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: process.env.Email, // Your email id
                pass: process.env.PASSWORD // Your password
                }
              });
            
               await transporter.sendMail({
                from: process.env.From, 
                to: email,
                subject: "Hello ✔", 
                html: "<a href= 'http://localhost:5000/verify_email?token="+ id + "'>Login</a>" ///verify_email?
              });

            
              
        } catch (error) {
            if (error) throw error
 }  
        
        
    }

      
    module.exports= emailVerify;

