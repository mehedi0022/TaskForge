export const thankYouEmail = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #111827; margin: 0; padding: 0; }
        .wrapper { background-color: #111827; padding: 40px 10px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
        .top-bar { height: 6px; background: linear-gradient(90deg, #f59e0b, #ef4444); }
        .header { padding: 40px 30px; text-align: left; }
        .content { padding: 0 30px 40px 30px; line-height: 1.6; color: #374151; font-size: 16px; }
        .name-highlight { color: #111827; font-weight: 800; }
        .button-container { margin: 30px 0; }
        .button { background-color: #111827; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px; letter-spacing: 0.5px; }
        .footer { background-color: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        h1 { margin: 0 0 20px 0; font-size: 28px; color: #111827; letter-spacing: -0.5px; }
        .logo-text { font-weight: 900; text-transform: uppercase; color: #f59e0b; margin-bottom: 10px; display: block; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="top-bar"></div>
          <div class="header">
            <span class="logo-text">Task Forge</span>
            <h1>Time to start building.</h1>
          </div>
          <div class="content">
            <p>Welcome to the team, <span class="name-highlight">${name}</span>.</p>
            <p>You’ve officially joined Task Forge. We’ve built this platform for people who don't just manage tasks—they master them. Your workspace is ready and waiting for your first project.</p>
            
            <div class="button-container">
              <a href="https://taskforge.com/login" class="button">ENTER THE FORGE</a>
            </div>

            <p>Need a hand getting set up? Just reply to this email and a human from our team will jump in.</p>
            <p>Best,<br/><strong>The Task Forge Team</strong></p>
          </div>
          <div class="footer">
            Sent with &hearts; from the Task Forge HQ<br/>
            &copy; 2026 Task Forge Inc. | <a href="#" style="color: #6b7280;">Privacy Policy</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const passwordResetEmail = (name, resetLink) => {
  return `
    <html>
        <body>
            <h1>Password Reset Request</h1>
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the link below to set a new password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,<br/>Task Forge Team</p>
        </body>
    </html>
    `;
};

export const passwordChangeConfirmationEmail = (name) => {
  return `
    <html>
        <body>
            <h1>Password Changed Successfully</h1>
            <p>Hi ${name},</p>
            <p>Your password has been changed successfully. If you did not make this change, please contact our support team immediately.</p>
            <p>Best regards,<br/>Task Forge Team</p>
        </body>
    </html>
    `;
};

export const accountVerificationEmail = (name, verificationLink) => {
  return `
    <html>
        <body>
            <h1>Account Verification</h1>
            <p>Hi ${name},</p>
            <p>Please click the link below to verify your account:</p>
            <a href="${verificationLink}">Verify Account</a>
            <p>If you did not request an account verification, please ignore this email.</p>
            <p>Best regards,<br/>Task Forge Team</p>
        </body>
    </html>
    `;
};
