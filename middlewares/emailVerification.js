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
                from: "adeyemijolade@gmail.com", //mahlik.jerick@dropsin.net
                to: email,
                subject: "Hello ✔", 
                html: "<a href= 'http://localhost:5000/verify_email?token="+ id + "'>Login</a>" ///verify_email?
              });

            
              
        } catch (error) {
            if (error) throw error
 }  
        
        
    }

      
    module.exports= emailVerify;

