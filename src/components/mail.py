from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Email Configuration (Replace these with actual values)
EMAIL_ADDRESS = "pavithraganapathy08@gmail.com"  # Use your Gmail
EMAIL_PASSWORD = "mfhlrjjrvhbdbfxc"  # Use the App Password, NOT your real password

@app.route("/send-confirmation", methods=["POST"])
def send_confirmation():
    try:
        data = request.json
        print("Received Data:", data)  # Debugging

        recipient_email = data.get("email")
        if not recipient_email:
            return jsonify({"message": "No recipient email provided"}), 400
        
        # Construct the email
        subject = "Team Registration Successful 🎉"
        body = f"""
        Hello {data.get("teamLead")},  

        Thank you for registering your team "{data.get("teamName")}" with us!  
        Here are your details:
        - Team Lead: {data.get("teamLead")}
        - Team Members: {data.get("teamMembers")}
        - Contact: {data.get("contact")}
        - College: {data.get("college")}
        
        We will reach out to you with further details soon.  

        Best Regards,  
        Event Team
        """

        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = recipient_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        # Sending the email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, recipient_email, msg.as_string())

        print("✅ Email sent successfully!")
        return jsonify({"message": "Email sent successfully!"}), 200

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"message": "Failed to send email", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)