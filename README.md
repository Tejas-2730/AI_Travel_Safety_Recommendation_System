# 🇮🇳 Smart Travel India - AI Travel & Safety Recommendation System

An AI-powered travel recommendation system for Indian destinations with real-time safety analysis.

## Features

- **AI Recommendations**: Content-based filtering algorithm that matches your preferences with destinations
- **Safety Prediction**: Safety scores based on crime statistics and tourist reviews
- **Smart Planning**: Best time to visit, budget planning, and crowd predictions
- **10 Destinations**: Goa, Jaipur, Kerala, Rishikesh, Agra, Udaipur, Manali, Varanasi, Hampi, Mumbai

## How the AI Algorithm Works

The recommendation engine uses weighted scoring:
- **Interest Matching (40%)**: Matches user interests with destination categories
- **Budget Alignment (25%)**: Aligns user budget with destination costs
- **Seasonal Optimization (20%)**: Prioritizes destinations best suited for travel month
- **Safety Scoring (15%)**: Weights destinations by safety scores

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Project Structure

```
src/
  App.tsx          # Main application component
  index.tsx        # React entry point
  index.css        # Global styles with Tailwind
public/
  index.html       # HTML template
```

## Usage

1. Click "Start Planning Your Trip"
2. Select your interests (beach, history, nature, etc.)
3. Choose your budget range
4. Select trip duration and travel month
5. Click "Get AI Recommendations"
6. Browse personalized results with safety scores
7. Click "View Full Details" for comprehensive destination info

## Safety Features

Each destination includes:
- Overall safety score (0-100)
- Crime statistics (very-low / low / medium / high)
- Scam risk assessment
- Crowd level predictions
- Specific safety warnings and tips

## License

MIT License - feel free to use and modify for your projects.
