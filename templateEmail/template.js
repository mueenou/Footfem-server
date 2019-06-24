module.exports = {
    mailFormat: (firstName, lastName, email, message) => {
        let emailFormat = `<link href='https://fonts.googleapis.com/css?family=Oswald|Raleway&display=swap' rel='stylesheet">
  <div style="margin: 0px; padding: 0px; background:#FBFBFB;">
    <div style="text-align: center">
        <img src="cid:logo-FootFem" alt="logo-footfem-emailing" style="width: 100px;">
        <h2 style="font-family: 'Oswald'; margin: 0px;font-weight: 300;text-transform: uppercase;font-size: 25px;">FootFem - World Cup Edition</h2>
    </div>
      <hr style="border: 0.5px solid #282B62">
       <div>
       <h2 style="font-family: 'Oswald'; font-weight: 300; color: #282B62">Sender Information</h2>
        <p style="font-family: 'Oswald'; color:#282B62; margin:0px">Firstname : <span style="font-family: 'Raleway'; color:#212121;">${firstName}</span></p>
        <p style="font-family: 'Oswald'; color:#282B62; margin:0px">Lastname : <span style="font-family: 'Raleway'; color:#212121;">${lastName}</span></p>
        <p style="font-family: 'Oswald'; color:#282B62; margin:0px">Email from : <span style="font-family: 'Raleway'; color:#212121;">${email}</span></p>
    </div>
    <hr style="border: 0.5px solid #282B62">
    <h3 style="font-family: 'Oswald'; font-weight: 300; color: #282B62">Message :</h3>
    <p style="font-family: 'Raleway'; color: #212121;">${message}</p>
</div>`;
        return emailFormat;
    }
}
