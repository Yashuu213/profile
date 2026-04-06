// Email Service for Contact Form
// This would typically be integrated with an email service provider

class EmailService {
    constructor() {
        // In a real implementation, you would configure your email service here
        // For example: EmailJS, SendGrid, AWS SES, etc.
        this.emailConfig = {
            serviceId: 'your-email-service-id',
            templateId: 'your-template-id',
            userId: 'your-user-id',
            toEmail: 'yashsharma.td@gmail.com' // Your email address
        };
    }

    // Format the email content
    formatEmailContent(formData) {
        const {
            fullName,
            email,
            phone,
            company,
            projectType,
            projectDescription,
            budget,
            timeline,
            additionalInfo,
            contactMethod,
            bestTime
        } = formData;

        return `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${fullName} (${email})</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            
            <h3>Project Details:</h3>
            <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            
            <h3>Project Description:</h3>
            <p>${projectDescription}</p>
            
            <h3>Additional Information:</h3>
            <p>${additionalInfo || 'No additional information provided'}</p>
            
            <h3>Contact Preferences:</h3>
            <p><strong>Preferred Method:</strong> ${contactMethod || 'Not specified'}</p>
            <p><strong>Best Time:</strong> ${bestTime || 'Not specified'}</p>
            
            <hr>
            <p><em>This email was sent from the portfolio website contact form.</em></p>
            <p><em>Timestamp: ${new Date().toLocaleString()}</em></p>
        `;
    }

    // Send email using EmailJS (example implementation)
    async sendEmailWithEmailJS(formData) {
        try {
            // This would use EmailJS in a real implementation
            // For demo purposes, we'll simulate the email sending
            
            console.log('📧 Email Service: Preparing to send email');
            console.log('📧 Form Data:', formData);
            
            const emailContent = this.formatEmailContent(formData);
            
            // Simulate email sending delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real implementation, you would call EmailJS like this:
            /*
            const response = await emailjs.send(
                this.emailConfig.serviceId,
                this.emailConfig.templateId,
                {
                    to_email: this.emailConfig.toEmail,
                    from_name: formData.fullName,
                    from_email: formData.email,
                    message: emailContent,
                    subject: `New Contact Form Submission from ${formData.fullName}`
                },
                this.emailConfig.userId
            );
            */
            
            console.log('📧 Email Service: Email sent successfully');
            
            // Simulate successful response
            return {
                success: true,
                messageId: 'simulated-message-id-' + Date.now(),
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            console.error('📧 Email Service: Error sending email:', error);
            throw new Error('Failed to send email: ' + error.message);
        }
    }

    // Alternative: Send email using a backend API endpoint
    async sendEmailWithAPI(formData) {
        try {
            console.log('📧 Email Service: Sending via API');
            
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: this.emailConfig.toEmail,
                    subject: `New Contact Form Submission from ${formData.fullName}`,
                    html: this.formatEmailContent(formData),
                    from: formData.email,
                    name: formData.fullName
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const result = await response.json();
            return result;
            
        } catch (error) {
            console.error('📧 Email Service: API error:', error);
            throw new Error('Failed to send email via API: ' + error.message);
        }
    }

    // Send email using a simple mailto fallback (for basic implementation)
    sendEmailWithMailto(formData) {
        const subject = `New Contact Form Submission from ${formData.fullName}`;
        const body = `
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

Project Type: ${formData.projectType || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Project Description:
${formData.projectDescription}

Additional Information:
${formData.additionalInfo || 'No additional information'}

Contact Preferences:
Method: ${formData.contactMethod || 'Not specified'}
Best Time: ${formData.bestTime || 'Not specified'}
        `.trim();

        // Open mailto link
        window.location.href = `mailto:${this.emailConfig.toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        return {
            success: true,
            method: 'mailto',
            message: 'Opening default email client'
        };
    }

    // Main send email function that chooses the best method
    async sendEmail(formData) {
        console.log('📧 Email Service: Starting email sending process');
        
        try {
            // Validate form data
            if (!formData.fullName || !formData.email || !formData.projectDescription) {
                throw new Error('Required fields are missing');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error('Invalid email format');
            }

            // Choose sending method based on availability
            if (typeof emailjs !== 'undefined') {
                // Use EmailJS if available
                return await this.sendEmailWithEmailJS(formData);
            } else if (window.location.hostname !== 'localhost') {
                // Try API method if not on localhost
                try {
                    return await this.sendEmailWithAPI(formData);
                } catch (apiError) {
                    // Fallback to mailto if API fails
                    console.log('📧 Email Service: API failed, falling back to mailto');
                    return this.sendEmailWithMailto(formData);
                }
            } else {
                // Use mailto as fallback
                console.log('📧 Email Service: Using mailto fallback');
                return this.sendEmailWithMailto(formData);
            }
            
        } catch (error) {
            console.error('📧 Email Service: Error in sendEmail:', error);
            throw error;
        }
    }

    // Log email activity (for debugging)
    logEmailActivity(formData, result) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            formData: {
                fullName: formData.fullName,
                email: formData.email,
                projectType: formData.projectType,
                budget: formData.budget,
                timeline: formData.timeline
            },
            result: result
        };

        console.log('📧 Email Activity Log:', logEntry);
        
        // In a real implementation, you might want to store this log
        // For example, in localStorage or send to an analytics service
        try {
            const logs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
            logs.push(logEntry);
            localStorage.setItem('emailLogs', JSON.stringify(logs));
        } catch (error) {
            console.error('📧 Email Service: Failed to log activity:', error);
        }
    }
}

// Create global instance
window.emailService = new EmailService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
}