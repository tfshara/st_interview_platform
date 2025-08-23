# AcePrep - AI-Powered Interview Platform

AcePrep is a full-stack web application designed to help users practice for interviews. It conducts realistic, voice-based mock interviews using AI and provides real-time, actionable feedback on the user's performance, including metrics on fluency, technical accuracy, and confidence.

**Live Demo:** [https://st-interview-platform.vercel.app/](https://st-interview-platform.vercel.app/) 

## 🚀 Built With

- **Frontend:** [Next.js 14](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **AI & Voice:** [VAPI AI](https://www.vapi.ai/)
- **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Deployment:** [Vercel](https://vercel.com/) (Frontend), [Render/Railway](https://render.com/)

## ✨ Key Features

-   **Realistic AI Interviews:** Engage in voice-based conversations with an AI interviewer.
-   **Real-Time Feedback:** Get immediate analysis on your answers, including scores for fluency, technical knowledge, and confidence.
-   **Performance Analytics:** View detailed metrics and trends over time on a personalized dashboard.
-   **Secure Authentication:** User sign-in and session management handled securely with Firebase Auth.
-   **Modern & Responsive UI:** A clean, intuitive interface built with Tailwind CSS and shadcn/ui components that works on both desktop and mobile.

## 📦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/fishara/st_interview_platform.git
    cd st_interview_platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Variables**
    Create a `.env.local` file in the root directory and add the necessary environment variables:
    ```bash
    # Firebase Config (from your Firebase project settings)
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    ...

    # VAPI API Key
    NEXT_PUBLIC_VAPI_API_KEY=your_vapi_secret_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## 🧠 What I Learned & Challenges Overcome

Building AcePrep was a significant full-stack learning experience. Here are some key takeaways:
-   **Full-Stack Integration:** Seamlessly connecting a Next.js frontend to a Node.js backend and external APIs (VAPI, Firebase).
-   **State Management:** Handling complex application state for live audio sessions and real-time feedback data.
-   **Security Practices:** Implementing secure authentication and ensuring sensitive API keys are stored properly environment variables.
-   **AI Integration:** Working with a cutting-edge AI voice API to create a dynamic and interactive user experience.
-   **Deployment:** Configuring and deploying both the frontend and backend services to production environments (Vercel/Render).

## 📝 Future Enhancements

-   [ ] Support for different interview types (e.g., Behavioral, System Design).
-   [ ] More granular feedback reports with transcribed answers and improvement tips.
-   [ ] Peer-to-peer mock interview matching system.

## 👨‍💻 Developer

**Shara Trikha**
- Email: trikhashara@gmail.com
- LinkedIn: [https://www.linkedin.com/in/shara-trikha-549745246/](https://www.linkedin.com/in/shara-trikha-549745246/)

---

**⭐ Star this repo if you found it helpful!**
