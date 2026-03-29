import { sendEmail } from "../utils/emailService";

function buildEmailContent(status:string,data:{
  applicantName: string;
  jobTitle:      string;
  companyName:   string;
  notes?:        string;
}):{subject:string;html:string} | null {
  if( status === 'shortlisted'){
    return {
      subject: `Your application has been shortlisted — ${data.jobTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2 style="color:#2563eb;">Badhai ho, ${data.applicantName}!</h2>
          <p>Aapki application <strong>${data.jobTitle}</strong> ke liye
             <strong>${data.companyName}</strong> ne shortlist ki hai.</p>
          ${data.notes ? `<p><strong>Note:</strong> ${data.notes}</p>` : ''}
        </div>`,
    };
  }
  if (status === 'hired') {
    return {
      subject: `Congratulations! Aap hire ho gaye — ${data.jobTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2 style="color:#16a34a;">Congratulations, ${data.applicantName}!</h2>
          <p>Aapko <strong>${data.companyName}</strong> mein
             <strong>${data.jobTitle}</strong> ke liye hire kiya gaya hai.</p>
          ${data.notes ? `<p><strong>Note:</strong> ${data.notes}</p>` : ''}
        </div>`,
    };
  }

  if (status === 'rejected') {
    return {
      subject: `Application update — ${data.jobTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2 style="color:#dc2626;">Dear ${data.applicantName},</h2>
          <p>Aapki <strong>${data.jobTitle}</strong> ke liye application
             is baar aage nahi badh saki.</p>
          ${data.notes ? `<p><strong>Feedback:</strong> ${data.notes}</p>` : ''}
        </div>`,
    };
  }

  return null; // 'applied' pe koi email nahi
}

export async function sendApplicationStatusNotification(data: {
  status:      string;
  seekerEmail: string;
  seekerName:  string;
  jobTitle:    string;
  companyName: string;
  notes?:      string;
}): Promise<void> {
  const content = buildEmailContent(data.status,{
    applicantName:data.seekerName,
    jobTitle:data.jobTitle,
    companyName:data.companyName,
    notes:data.notes
  })
   if (!content) return;

  await sendEmail(data.seekerEmail, content.subject, content.html);
}

