const BASE_URL = process.env.BASE_URL;

export const adminTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>New Enquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#00339E;padding:20px;text-align:center;color:#ffffff;">
                <h1 style="margin:0;font-size:22px;">
                  Vlax Tach - It Services
                </h1>
                <p style="margin:5px 0 0;font-size:13px;">
                  New Website Contact Enquiry
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin-top:0;color:#00339E;">Enquiry Details</h2>
                
                <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="font-weight:bold;border-bottom:1px solid #ddd;">Name</td>
                    <td style="border-bottom:1px solid #ddd;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border-bottom:1px solid #ddd;">Mobile</td>
                    <td style="border-bottom:1px solid #ddd;">${data.number}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border-bottom:1px solid #ddd;">Email</td>
                    <td style="border-bottom:1px solid #ddd;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border-bottom:1px solid #ddd;">Subject</td>
                    <td style="border-bottom:1px solid #ddd;">${data.subject || "-"}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;">Message</td>
                    <td>${data.description || "-"}</td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;color:#777;">
                © ${new Date().getFullYear()} Vlax Tach - It Services. All Rights Reserved.
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

export const userTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Thank You</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#00339E;padding:20px;text-align:center;color:#ffffff;">
                <h1 style="margin:0;font-size:22px;">
                  Vlax Tach - It Services
                </h1>
                <p style="margin:5px 0 0;font-size:13px;">
                  Thank You For Contacting Us
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin-top:0;color:#00339E;">Hi ${data.name},</h2>
                
                <p style="font-size:14px;color:#333;line-height:1.6;">
                  Thank you for reaching out to us.  
                  We have received your enquiry and our team will get back to you shortly.
                </p>

                <p style="font-size:14px;color:#333;line-height:1.6;">
                  If your enquiry is urgent, please feel free to contact us directly.
                </p>

                <br/>

                <a href="https://www.vlaxtech.com/" 
                   style="background:#00339E;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:4px;font-size:14px;">
                  Visit Our Website
                </a>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;color:#777;">
                © ${new Date().getFullYear()} Vlax Tach - It Services.  
                This is an automated email. Please do not reply.
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

export const adminJobEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Job Application</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.05);">

<tr>
<td style="background:#0d6efd;padding:25px;text-align:center;color:#ffffff;">
<h2 style="margin:0;">🚀 New Job Application Received</h2>
</td>
</tr>

<tr>
<td style="padding:30px;">

<p style="font-size:16px;color:#333;">A new candidate has applied for a position.</p>

<table width="100%" cellpadding="8" cellspacing="0" style="margin-top:20px;border-collapse:collapse;">
<tr style="background:#f1f3f7;">
<td><strong>Name</strong></td>
<td>${data.name}</td>
</tr>

<tr>
<td><strong>Email</strong></td>
<td>${data.email}</td>
</tr>

<tr style="background:#f1f3f7;">
<td><strong>Mobile</strong></td>
<td>${data.number}</td>
</tr>

<tr>
<td><strong>Position Applied</strong></td>
<td>${data.subject}</td>
</tr>

<tr style="background:#f1f3f7;">
<td><strong>Applied On</strong></td>
<td>${new Date().toLocaleString()}</td>
</tr>
</table>

<p style="margin-top:25px;font-size:14px;color:#666;">
📎 Candidate resume is attached with this email.
</p>

</td>
</tr>

<tr>
<td style="background:#f8f9fa;padding:20px;text-align:center;font-size:13px;color:#777;">
© ${new Date().getFullYear()} Vlax Tach - It Services. All Rights Reserved.
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

export const userJobEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Application Received</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.05);">

<tr>
<td style="background:#198754;padding:25px;text-align:center;color:#ffffff;">
<h2 style="margin:0;">🎉 Application Successfully Submitted</h2>
</td>
</tr>

<tr>
<td style="padding:30px;">

<p style="font-size:16px;color:#333;">
Hello <strong>${data.name}</strong>,
</p>

<p style="font-size:15px;color:#555;line-height:1.6;">
Thank you for applying for the position of 
<strong>${data.subject}</strong>.  
We have successfully received your application and resume.
</p>

<p style="font-size:15px;color:#555;line-height:1.6;">
Our HR team will carefully review your profile and contact you if your qualifications match our requirements.
</p>

<div style="margin-top:25px;padding:15px;background:#f1f3f7;border-radius:6px;">
<strong>Application Details:</strong><br/>
Position: ${data.subject}<br/>
Email: ${data.email}<br/>
Mobile: ${data.number}
</div>

<p style="margin-top:30px;font-size:14px;color:#777;">
If you have any questions, feel free to reply to this email.
</p>

<p style="margin-top:20px;">
Best Regards,<br/>
<strong>HR Team</strong>
</p>

</td>
</tr>

<tr>
<td style="background:#f8f9fa;padding:20px;text-align:center;font-size:13px;color:#777;">
 © ${new Date().getFullYear()} Vlax Tach - It Services.   All Rights Reserved.
                This is an automated email. Please do not reply.
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
