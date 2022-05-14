import sgMail from '@sendgrid/mail'

sgMail.setApiKey("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")
export const sendMail = async (options) => {
    try {
        const data = {
            to: options.to,
            from: 'kodchallenge@gmail.com',
            subject: options.subject,
            html: options.html
        };
 
        return sgMail.send(data);
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
}