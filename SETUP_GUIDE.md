# InterviewAce AI - Setup Guide

## ✅ Issues Already Fixed
- Fixed critical typos in components (`disbaled` → `disabled`)
- Resolved TypeScript compilation errors
- Fixed form component type issues
- Installed missing dependencies
- Created environment variables template

## 🚨 Required Steps to Complete Setup

### 1. Configure Environment Variables
Update `.env` file with your actual API keys:

```bash
# Clerk Authentication (Get from: https://clerk.com/)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_clerk_key

# Firebase Configuration (Get from: https://console.firebase.google.com/)
VITE_FIREBASE_API_KEY=your_actual_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Gemini AI API (Get from: https://makersuite.google.com/app/apikey)
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
```

### 2. Fix Microphone Issues

#### Browser Permissions:
1. Open browser settings
2. Navigate to Privacy & Security → Site Settings → Microphone
3. Allow microphone access for your localhost
4. Refresh the page and test again

#### Test in Chrome First:
- Chrome has the best compatibility with speech recognition
- Avoid Firefox/Safari for initial testing

#### HTTPS for Production:
- Local development works on HTTP
- Production deployment MUST use HTTPS for microphone access

### 3. Test the Application

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test Authentication:**
   - Visit the app and try to sign up/sign in
   - Ensure Clerk authentication works

3. **Test Interview Creation:**
   - Create a new mock interview
   - Ensure AI generates questions properly

4. **Test Microphone Recording:**
   - Start a mock interview
   - Click "Record Answer"
   - **Allow microphone permissions**
   - Speak and verify text appears
   - Test "Stop Recording" functionality

### 4. Common Troubleshooting

#### Microphone Not Working:
- Check browser console for errors
- Ensure microphone permissions are granted
- Test in Chrome/Edge browsers
- Check if microphone works in other apps

#### Authentication Issues:
- Verify Clerk publishable key is correct
- Check Clerk dashboard for proper domain configuration

#### AI Not Generating Questions:
- Verify Gemini API key is valid
- Check browser network tab for API errors
- Ensure Firebase is properly configured

#### Build/Runtime Errors:
- Check browser console for JavaScript errors
- Ensure all environment variables are set
- Try clearing browser cache

## 🎯 Expected Behavior After Setup

1. **User Registration/Login** - Should work smoothly
2. **Interview Creation** - AI generates 5 relevant questions
3. **Microphone Recording** - Real-time speech-to-text conversion
4. **Answer Saving** - Stores user answers with AI feedback
5. **Webcam Toggle** - Optional video feed (not recorded)

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📞 If Issues Persist

1. Check browser console for specific error messages
2. Verify all API keys are correct and active
3. Test microphone access in browser settings
4. Ensure proper HTTPS for production deployment