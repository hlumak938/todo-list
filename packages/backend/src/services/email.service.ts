import nodemailer from 'nodemailer';

export default class EmailService {
	private transporter;
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	sendEmail = async (
		to: string,
		subject: string,
		text: string,
	): Promise<void> => {
		try {
			await this.transporter.sendMail({
				from: process.env.EMAIL_USER,
				to,
				subject,
				text,
			});
			console.log(`Email sent to ${to}`);
		} catch (error) {
			console.error('Error sending email:', error);
			throw new Error('Failed to send email');
		}
	};
}
