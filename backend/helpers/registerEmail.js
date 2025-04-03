export function registerEmail(name, email) {
    return (`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to PharmaCare Management System</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2a7fba;
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-bottom: 5px solid #1a5f8b;
        }
        .logo {
            max-width: 180px;
            margin-bottom: 15px;
        }
        .content {
            padding: 30px;
        }
        .welcome-text {
            font-size: 18px;
            margin-bottom: 25px;
            color: #444;
        }
        .features {
            margin: 25px 0;
            border-top: 1px solid #e1e5eb;
            border-bottom: 1px solid #e1e5eb;
            padding: 20px 0;
        }
        .feature {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .feature-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            color: #2a7fba;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #2a7fba;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background-color: #f0f4f8;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .contact-info {
            margin-top: 15px;
        }
        .social-icons {
            margin: 15px 0;
        }
        .social-icon {
            margin: 0 5px;
            color: #2a7fba;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Sethsiri Pharmacy</h1>
        </div>
        
        <div class="content">
            <p class="welcome-text">Dear ${name},</p>
            
            <p>Thank you for registering with Sethsiri Pharmacy - your comprehensive solution for pharmacy inventory management, patient records, and prescription processing.</p>
            
            <p>Your account has been successfully created </p>
           
            <p>For security purposes, we recommend changing your password after your first login.</p>
            
            <p>If you have any questions or need assistance, our support team is available 24/7.</p>
            
            <p>Welcome aboard!</p>
            
            <p>Best regards,<br>
            Sethsiri Pharmacy Team</p>
        </div>
        
        <div class="footer">
            <div class="contact-info">
                <p>Sethsiri Pharmacy</p>
                <p> No: 10, Nkumbura Road, Pujapitiya, Kandy, Sri Lanka</p>
                <p>Phone: 077-3971302 | Email: sethsiripharmacypro@gmail.com</p>
            </div>
            
            <p>© 2025 Sethsiri Pharmacy. All rights reserved.</p>
            
            <p style="font-size: 11px; color: #999;">
                This email was sent to ${email} because you registered for a Sethsiri Pharmacy account.
                <br>If you didn't create this account, please contact us immediately.
            </p>
        </div>
    </div>
</body>
</html>
`);
}