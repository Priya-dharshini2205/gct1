import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';



export const EmailDemo = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_07ujrao', 'template_guf3a1y', form.current, 'vgguXfjv1yFTRn47S')
      .then((result) => {
          console.log(result.text);
          console.log("message Sent");
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className='contact-form' style={{width: "400px"}}>
         <form ref={form} onSubmit={sendEmail} style={{display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    fontSize: "16px"}}>
    <label>Contribution Type</label>
    <input type="text" name="contri-type" />
    <label>Email</label>
    <input type="email" name="user_email" />
    <label>Body</label>
    <textarea name="body" />
    <input type="submit" value="Send" />
  </form>

    </div>
   




   
  );
};



