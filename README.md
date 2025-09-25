<div align="center">
  <img src="public/assets/svg/colored-logo.svg" alt="InterviewAce AI Logo" width="120" height="120">
  
  # InterviewAce AI
  
  **Ace Your Interviews with AI-Powered Practice**
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Firebase](https://img.shields.io/badge/Firebase-ffaa00?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## 🌟 About InterviewAce AI

InterviewAce AI is a cutting-edge web application designed to help job seekers master technical interviews through AI-powered practice sessions. Our platform generates personalized interview questions based on your job role, experience, and tech stack, then evaluates your responses using advanced AI to provide actionable feedback.

### 🎯 Key Features

- **AI-Powered Question Generation**: Get personalized interview questions tailored to your role and experience
- **Speech-to-Text Practice**: Practice answering questions aloud with real-time transcription
- **AI Performance Evaluation**: Receive detailed feedback and ratings (1-10) on your answers
- **Webcam Integration**: Optional video recording during practice sessions
- **Progress Tracking**: Save and review your interview performance over time
- **Comprehensive Feedback**: Detailed analysis comparing your answers to ideal responses

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Google Generative AI API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mimo-to/interviewace-ai.git
   cd interviewace-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://reactjs.org/)** - Frontend library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Declarative routing
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Services
- **[Firebase](https://firebase.google.com/)** - Backend as a Service (Firestore, Authentication)
- **[Google Generative AI (Gemini)](https://ai.google/)** - AI-powered question generation and evaluation
- **[Clerk](https://clerk.dev/)** - Authentication and user management

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Vitest](https://vitest.dev/)** - Unit testing (if used)

## 📁 Project Structure

```
interviewace-ai/
├── public/
│   ├── assets/
│   │   ├── img/
│   │   └── svg/
│   └── ...
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── ...           # Feature-specific components
│   ├── config/           # Configuration files
│   ├── layouts/          # Page layouts
│   ├── routes/           # Page components
│   ├── scripts/          # AI integration
│   ├── types/            # TypeScript types
│   ├── lib/              # Utility functions
│   ├── provider/         # React context providers
│   ├── handlers/         # Event handlers
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── ...
```

## 🎮 How It Works

1. **Create Interview**: Specify your job role, experience, and tech stack
2. **AI Question Generation**: Our AI generates 5 relevant interview questions
3. **Practice Session**: Answer questions using your voice with optional webcam
4. **AI Evaluation**: Receive detailed feedback comparing your answers to ideal responses
5. **Performance Tracking**: Save results and track improvement over time

### Core Components

- **FormMockInterview**: Create/edit mock interviews with job details
- **QuestionSection**: Tabbed interface for navigating interview questions
- **RecordAnswer**: Speech-to-text recording with AI evaluation
- **Feedback**: Detailed performance analysis and ratings

## 🔐 Authentication

InterviewAce AI uses Clerk for authentication, providing:
- Email/Password signup and login
- OAuth with Google, GitHub, and other providers
- Protected routes for interview data
- User-specific data isolation

## 🗄️ Data Management

All interview data is stored in Firebase Firestore:
- User profiles and authentication
- Interview questions and metadata
- User answers and AI feedback
- Performance tracking and analytics

## 🤖 AI Integration

### Question Generation
Uses Google's Gemini model to generate relevant interview questions based on:
- Job role/position
- Years of experience
- Tech stack requirements
- Job description

### Answer Evaluation
AI evaluates user responses by:
- Comparing answers to ideal responses
- Providing a rating (1-10) based on quality
- Offering specific feedback for improvement
- Identifying strengths and weaknesses

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching support
- **Accessibility**: WCAG compliant components
- **Smooth Animations**: Enhanced user experience
- **Real-time Feedback**: Instant transcription and evaluation

## 🚢 Deployment

### Firebase Hosting

The application is configured for Firebase Hosting:
```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

### Environment Configuration

Ensure all environment variables are set in your deployment environment:
- Google Generative AI API key
- Firebase configuration
- Clerk authentication keys

## 🤝 Contributing

We welcome contributions to InterviewAce AI! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google/) for powering our AI features
- [Firebase](https://firebase.google.com/) for backend services
- [Clerk](https://clerk.dev/) for authentication
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the amazing development experience

## 📧 Contact

**Rounak Hati** - rounakhati18@gmail.com

Project Link: [https://github.com/mimo-to/interviewace-ai](https://github.com/mimo-to/interviewace-ai)

---


