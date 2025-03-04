# MediWhisper

MediWhisper is a real-time AI-powered clinical decision support system that transcribes doctor-patient conversations, generates SOAP notes, provides differential diagnoses, and suggests clinical pathways.

## Tech Stack

### Frontend (UI/UX)
- **TypeScript** + **React**
- **Vite** (for fast development)
- **Tailwind CSS** (for styling)

### Backend
- **Node.js** + **Express.js**

### Database
- **MongoDB**

### AI Model
- **Gemini-2.0-Flash** (Used for generating AI-based responses)

### Speech-to-Text
- **webkitSpeechRecognition** (Used for real-time transcription)

### Containerization & Deployment
- **Docker** (Containerized backend and frontend)
- **Google Cloud Server** (Deployed infrastructure)

## Features
- Real-time speech-to-text transcription
- AI-powered clinical decision support
- SOAP note generation
- Differential diagnosis suggestions
- Secure and scalable backend

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or later)
- **MongoDB** (Local or cloud instance)
- **Docker** (Optional for containerized setup)
- **Git**

### Installation

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd project-root
   ```

2. **Setup Environment Variables**
   - Create a `.env` file in the root directory and add the required environment variables:
     ```env
     MONGO_URI=<your-mongodb-uri>
     GEMINI_API_KEY=<your-api-key>
     PORT=5000
     ```

3. **Install Dependencies**
   ```sh
   npm install
   ```

4. **Run the Application**
   ```sh
   # Start backend server
   node server.js

   # Start frontend server
   cd src
   npm run dev
   ```

5. **Testing API Endpoints**
   - Use **Postman** or **cURL** to test API endpoints.
   - API documentation available via Swagger/OpenAPI .

### Dockerized Setup (Optional)

1. **Build and Run Using Docker**
   ```sh
   docker-compose up --build
   ```

2. **Stop the Containers**
   ```sh
   docker-compose down
   ```

## Deployment
- Hosted on **Google Cloud Server**
- **Frontend URL:** [Link](https://med-whisper-frontend-280871509489.us-central1.run.app)
- **Backend URL:** [Link](https://med-whisper-backend-280871509489.us-central1.run.app)
## Demo
- **Demo Video:** [Link](https://drive.google.com/file/d/1AJa0k4L4KGXBaFphukb21_kGVvsjp59q/view?usp=sharing)
  
  
