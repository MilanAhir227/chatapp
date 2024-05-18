async function otpGenrator() {
    // Length of the OTP
    const otpLength = 4;
  
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10); // Generate random digit (0-9)
    }
  
    return otp;
  }
  
  module.exports = otpGenrator 