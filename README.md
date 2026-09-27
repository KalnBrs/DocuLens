# DocuLens 📄🔍

**DocuLens** is an AI-powered document intelligence and analytics platform. It extracts structured semantic, linguistic, and structural insights from raw text using Google Gemini 2.5 Pro and presents them through an interactive multi-panel dashboard and real-time document Q&A assistant.

---

## ✨ Features

- **⚡ Instant Document Analysis**: Extracts structured NLP metrics, readability grades, passive voice percentage, lexical density, and reading time.
- **📊 Visual Analytics**: Dynamic charts powered by Material UI X-Charts:
  - Top common words & frequencies
  - Thematic breakdown distribution
  - Sentence length histogram
- **🧠 Semantic Intelligence**:
  - Executive summary and key topic extraction
  - Tone & sentiment classification
  - Named Entity Recognition (NER) for People, Organizations, Locations, and Dates
  - AI-generated contextual exploration questions
- **💬 Context-Aware Document Chat**: Multi-turn conversation interface allowing users to ask questions grounded directly in the analyzed document context.
- **📑 Structural Breakdown**: Highlights document sections, snippets, headings, bullet points, and formatting counts.

---

## 🛠️ Tech Stack

### Frontend (`/DocuLens`)

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Material UI (MUI)](https://mui.com/), [Lucide React Icons](https://lucide.dev/)
- **Data Visualizations**: [@mui/x-charts](https://mui.com/x/react-charts/)

### Backend (`/Backend`)

- **Runtime**: [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- **AI & LLM**: [Google Gen AI SDK](https://github.com/google-gemini/generative-ai-js) (`gemini-2.5-pro`)
- **Utilities**: CORS, Dotenv, Nodemon

---

## 📁 Project Structure

```text
├── Backend/
│   ├── prompt.js               # Structured JSON prompt schema for LLM
│   ├── src/
│   │   ├── app.js              # Express app configuration & middleware
│   │   ├── server.js           # Server entry point (port 8080)
│   │   └── Routes/
│   │       └── gemini.js       # Analysis & multi-turn chat endpoints
│   └── package.json
│
└── DocuLens/
    ├── src/
    │   ├── Dashboard.jsx       # Main analytics dashboard layout
    │   ├── Components/
    │   │   ├── ChatWindow/     # Contextual Q&A chat drawer
    │   │   ├── EntityPanel/    # Named entities & generated questions
    │   │   ├── HomePage/       # Document input and upload landing view
    │   │   ├── StatsPanel/     # Linguistic stats & readability metrics
    │   │   ├── StructurePanel/ # Section breakdown & formatting stats
    │   │   ├── SummaryPanel/   # Key takeaways, tone, and reading time
    │   │   └── VisulizatinPanel/ # MUI data charts and histograms
    │   └── functions/          # Backend API client functions
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

---

### 1. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   _The backend will run on `http://localhost:8080`._

---

### 2. Frontend Setup

1. In a new terminal window, navigate to the frontend directory:

   ```bash
   cd DocuLens
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   _The frontend will start on `http://localhost:5173` (or `http://localhost:5174`)._

---

## 📡 API Endpoints

| Method | Endpoint       | Description                                              |
| ------ | -------------- | -------------------------------------------------------- |
| `POST` | `/gemini/`     | Analyzes input text and returns structured metrics JSON. |
| `POST` | `/gemini/chat` | Contextual multi-turn Q&A for a document session.        |
| `GET`  | `/`            | API Healthcheck.                                         |

---

## 📄 License

This project is licensed under the MIT License.
