from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

# Serve static HTML
@app.route("/")
def home():
    return send_from_directory(".", "enhanced-index.html")


# Contact Form API
@app.route("/send-message", methods=["POST"])
def send_message():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    full_message = f"""
New message from your website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
"""

    try:
        msg = MIMEText(full_message)
        msg["Subject"] = "🚨 New Message from Portfolio Contact Form"
        msg["From"] = "yashsharma1247@gmail.com"
        msg["To"] = "yashsharma1247@gmail.com"

        # Gmail SMTP
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login("yashsharma1247@gmail.com", "tyyr tnym qqmf lehk")  # <-- put your Gmail App Password
        server.send_message(msg)
        server.quit()e

        return jsonify({"message": "Message sent successfully!"})

    except Exception as e:
        return jsonify({"message": "Email failed!", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
