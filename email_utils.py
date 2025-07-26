import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import config

def send_activation_email(recipient_email: str, token: str):
    sender_email = config.SMTP_USERNAME
    password = config.SMTP_PASSWORD

    message = MIMEMultipart("alternative")
    message["Subject"] = "Activate Your T3 Account"
    message["From"] = sender_email
    message["To"] = recipient_email

    activation_link = f"http://localhost:8001/static/index.html?token={token}"

    text = f"""
    Hi,
    Please activate your T3 account by clicking the following link:
    {activation_link}
    """
    html = f"""
    <html>
        <body>
            <p>Hi,<br>
               Please activate your T3 account by clicking the link below:<br>
               <a href="{activation_link}">Activate Account</a>
            </p>
        </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    try:
        server = smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT)
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, recipient_email, message.as_string())
        server.quit()
        print(f"Activation email sent to {recipient_email}")
    except Exception as e:
        print(f"Error sending email: {e}")