import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
from jinja2 import Environment, FileSystemLoader
from ..config import settings
import logging
import os

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_username = settings.SMTP_USERNAME
        self.smtp_password = settings.SMTP_PASSWORD
        self.from_email = settings.SMTP_FROM_EMAIL
        self.from_name = settings.SMTP_FROM_NAME
        
        # Setup Jinja2 for email templates
        template_dir = os.path.join(os.path.dirname(__file__), "..", "templates", "emails")
        self.env = Environment(loader=FileSystemLoader(template_dir))
    
    async def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None
    ) -> bool:
        """Send an email using configured SMTP server"""
        if not all([self.smtp_host, self.smtp_username, self.smtp_password]):
            logger.warning("SMTP not configured, skipping email send")
            return False
            
        try:
            message = MIMEMultipart("alternative")
            message["From"] = f"{self.from_name} <{self.from_email}>"
            message["To"] = to_email
            message["Subject"] = subject
            
            if text_content:
                message.attach(MIMEText(text_content, "plain"))
            message.attach(MIMEText(html_content, "html"))
            
            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_username,
                password=self.smtp_password,
                use_tls=True
            )
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {e}")
            return False
    
    async def send_order_confirmation(
        self,
        to_email: str,
        order_data: dict
    ) -> bool:
        """Send order confirmation email"""
        subject = f"Order Confirmation - #{order_data['order_number']}"
        
        # For now, use simple HTML
        html_content = f"""
        <h2>Mahalo for your order!</h2>
        <p>Your order #{order_data['order_number']} has been confirmed.</p>
        <p>Total: ${order_data['total_price']}</p>
        <p>We'll send you tracking information once your order ships.</p>
        <p>Aloha,<br>Chyler's Hawaiian Beef Chips</p>
        """
        
        return await self.send_email(to_email, subject, html_content)
    
    async def send_password_reset(
        self,
        to_email: str,
        reset_token: str
    ) -> bool:
        """Send password reset email"""
        subject = "Password Reset Request - Chyler's Hawaiian Beef Chips"
        
        reset_link = f"https://chylers.com/reset-password?token={reset_token}"
        
        html_content = f"""
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="{reset_link}">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Aloha,<br>Chyler's Hawaiian Beef Chips</p>
        """
        
        return await self.send_email(to_email, subject, html_content)
    
    async def send_contact_inquiry_notification(
        self,
        inquiry_data: dict
    ) -> bool:
        """Send notification about new contact inquiry to admin"""
        subject = f"New Contact Inquiry - {inquiry_data['inquiry_type']}"
        
        html_content = f"""
        <h2>New Contact Inquiry</h2>
        <p><strong>From:</strong> {inquiry_data['name']} ({inquiry_data['email']})</p>
        <p><strong>Phone:</strong> {inquiry_data.get('phone', 'Not provided')}</p>
        <p><strong>Type:</strong> {inquiry_data['inquiry_type']}</p>
        <p><strong>Subject:</strong> {inquiry_data.get('subject', 'No subject')}</p>
        <p><strong>Message:</strong></p>
        <p>{inquiry_data['message']}</p>
        """
        
        return await self.send_email(
            settings.BUSINESS_EMAIL,
            subject,
            html_content
        )


email_service = EmailService()


# Convenience functions
async def send_order_confirmation_email(to_email: str, order_data: dict) -> bool:
    return await email_service.send_order_confirmation(to_email, order_data)


async def send_password_reset_email(to_email: str, reset_token: str) -> bool:
    return await email_service.send_password_reset(to_email, reset_token)


async def send_contact_inquiry_notification(inquiry_data: dict) -> bool:
    return await email_service.send_contact_inquiry_notification(inquiry_data)