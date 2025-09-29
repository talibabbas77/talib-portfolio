# Email Configuration Setup Guide

## Step 1: Create .env.local file
Create a file named `.env.local` in your project root directory (same level as package.json) with the following content:

```
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=talibali303@gmail.com

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
```

## Step 2: Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this app password in EMAIL_PASS (not your regular Gmail password)

## Step 3: Update Email Addresses
- Replace `your-email@gmail.com` with your actual Gmail address
- Replace `your-app-password` with the generated app password
- Update `EMAIL_TO` if you want notifications sent to a different email

## Step 4: Test the Contact Form
1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check both your email and the sender's email for the beautiful templates

## Features Implemented:
✅ Functional contact form with API integration
✅ Beautiful HTML email templates
✅ Automatic confirmation email to sender
✅ Notification email to you
✅ Error handling and validation
✅ Responsive design maintained
✅ Professional email styling with gradients and animations

The contact form is now fully functional and will send beautiful, customized emails!
