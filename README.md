# 🍃 BrewBuddy - AI-Powered Tea Brewing Guide

A modern React application that provides personalized tea brewing recommendations using AI. Built as a learning experiment and hosted publicly on GitHub.

## 🌟 Features

- **AI-Powered Recommendations**: Get personalized tea brewing advice using OpenAI's GPT-4
- **Interactive Chat Interface**: Clean, responsive chat UI with real-time messaging
- **Comprehensive Tea Knowledge**: Expert guidance on water temperature, steeping times, and brewing techniques
- **Markdown Support**: Rich formatting for detailed brewing instructions
- **Dual Deployment**: Supports both Node.js development server and PHP production deployment
- **Modern UI**: Beautiful gradient design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown support

### Backend
- **Node.js + Express** - Development server with API proxy
- **PHP** - Production deployment proxy for cPanel hosting
- **OpenAI API** - GPT-4 integration for tea expertise

### Development Tools
- **Concurrently** - Run multiple npm scripts simultaneously
- **PostCSS + Autoprefixer** - CSS processing
- **PM2** - Process management for production

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/MegladonCodes/brewbuddy.git
cd brew-buddy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
PORT=5000
```

### 4. Development Server
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
npm start          # Frontend only (port 3000)
npm run server     # Backend only (port 5000)
```

### 5. Production Build
```bash
npm run build
npm run start:prod
```

## 🏗️ Project Structure

```
brew-buddy/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   ├── manifest.json      # PWA manifest
│   └── teacup.png         # App icon
├── src/
│   ├── App.jsx            # Main React component
│   ├── index.js           # React entry point
│   ├── index.css          # Global styles with Tailwind
│   └── server.js          # Express development server
├── build/                 # Production build output
├── ecosystem.config.js    # PM2 configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Tailwind CSS
The app uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.

### PM2 Configuration
Production process management is configured in `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'brew-buddy',
    script: 'src/server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

## 🌐 Deployment

### Development
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/chat`

## 💡 Usage

1. **Start a Conversation**: The AI greets you with a welcome message
2. **Describe Your Tea**: Tell the AI about your tea type, preferences, or ask for recommendations
3. **Get Expert Advice**: Receive detailed brewing instructions including:
   - Optimal water temperature (Fahrenheit and Celsius)
   - Recommended steeping time
   - Tea-to-water ratios
   - Water quality tips
   - Flavor enhancement techniques
   - Common mistakes to avoid

### Example Queries
- "I have a green tea, I like bold flavors"
- "What's the best way to brew oolong tea?"
- "How do I make the perfect cup of Earl Grey?"
- "I'm new to tea, what should I start with?"

## 🤖 AI System Prompt

The application uses a specialized system prompt that positions the AI as an expert tea brewing specialist, ensuring responses include:
- Tea type identification and characteristics
- Optimal water temperatures
- Steeping times
- Tea amounts
- Water quality recommendations
- Flavor enhancement tips
- Common brewing mistakes to avoid

## 🧪 Learning Objectives

This project demonstrates:
- Modern React development with hooks
- AI API integration
- Responsive UI design with Tailwind CSS
- Dual deployment strategies (Node.js + PHP)
- Real-time chat interfaces
- Markdown rendering
- Environment-based configuration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your own tea brewing tips

## 📞 Contact

Created as a learning experiment. Feel free to reach out with questions or feedback!

---

*Happy brewing! 🍃*
