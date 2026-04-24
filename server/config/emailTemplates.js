export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<body>
  <h2>Verify your email</h2>
  <p>Your OTP for GlycoVision AI is: <strong>{{otp}}</strong></p>
  <p>For account: {{email}}</p>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<body>
  <h2>Reset your password</h2>
  <p>Your password reset OTP is: <strong>{{otp}}</strong></p>
</body>
</html>
`;