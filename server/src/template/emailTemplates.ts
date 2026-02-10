export const welcomeEmailTemplate = (name: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AI Job Portal</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                                🎉 Welcome to AI Job Portal!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px;">
                                Hi ${name},
                            </h2>
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Thank you for joining <strong>AI Job Portal</strong>! We're excited to have you on board.
                            </p>
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Your account has been successfully created. You can now:
                            </p>
                            
                            <!-- Features List -->
                            <table role="presentation" style="width: 100%; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 10px 0;">
                                        <span style="color: #667eea; font-size: 18px; margin-right: 10px;">✓</span>
                                        <span style="color: #666666; font-size: 15px;">Browse thousands of job opportunities</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0;">
                                        <span style="color: #667eea; font-size: 18px; margin-right: 10px;">✓</span>
                                        <span style="color: #666666; font-size: 15px;">Apply to jobs with one click</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0;">
                                        <span style="color: #667eea; font-size: 18px; margin-right: 10px;">✓</span>
                                        <span style="color: #666666; font-size: 15px;">Get personalized job recommendations</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0;">
                                        <span style="color: #667eea; font-size: 18px; margin-right: 10px;">✓</span>
                                        <span style="color: #666666; font-size: 15px;">Track your applications</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table role="presentation" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
                                           style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                                  color: #ffffff; 
                                                  padding: 15px 40px; 
                                                  text-decoration: none; 
                                                  border-radius: 5px; 
                                                  font-size: 16px; 
                                                  font-weight: bold;
                                                  display: inline-block;">
                                            Get Started Now
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0 0 0; color: #666666; font-size: 15px; line-height: 1.6;">
                                If you have any questions, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                                © ${new Date().getFullYear()} AI Job Portal. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                You're receiving this email because you signed up for AI Job Portal.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

export const passwordResetEmailTemplate = (name: string, otp: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                                🔐 Password Reset Request
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px;">
                                Hi ${name},
                            </h2>
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password for your AI Job Portal account.
                            </p>
                            <p style="margin: 0 0 25px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Use the OTP below to reset your password:
                            </p>
                            
                            <!-- OTP Box -->
                            <table role="presentation" style="width: 100%; margin: 30px 0;">
                                <tr>
                                    <td align="center" style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border: 2px dashed #f5576c;">
                                        <div style="font-size: 36px; font-weight: bold; color: #f5576c; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                            ${otp}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Warning Box -->
                            <table role="presentation" style="width: 100%; margin: 25px 0; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                                <tr>
                                    <td style="padding: 15px;">
                                        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                                            <strong>⚠️ Important:</strong> This OTP will expire in <strong>2 minutes</strong>. 
                                            For security reasons, do not share this code with anyone.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 25px 0 0 0; color: #666666; font-size: 15px; line-height: 1.6;">
                                If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                                © ${new Date().getFullYear()} AI Job Portal. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                This is an automated security email from AI Job Portal.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};