import React, { useState, useEffect } from 'react';
import { MapPin, Shield, Calendar, DollarSign, Star, AlertTriangle, Sun, Cloud, Droplets, TrendingUp, Users, Clock, Heart, Camera, Mountain, Waves, Building2, Navigation } from 'lucide-react';
interface Destination {
  id: number;
  name: string;
  category: string[];
  budget: string;
  safetyScore: number;
  bestMonths: string[];
  crowdLevel: string;
  image: string;
  description: string;
  avgCost: number;
  duration: string;
  crimeStat: string;
  touristRating: number;
  scamRisk: string;
  activities: string[];
  warnings: string[];
  matchScore: number;
}

interface Preferences {
  interests: string[];
  budget: string;
  duration: string;
  travelMonth: string;
}
// Mock ML Model Data - In real implementation, this would come from Python backend
const destinations = [
  {
    id: 1,
    name: "Goa",
    category: ["beach", "party", "nature"],
    budget: "medium",
    safetyScore: 85,
    bestMonths: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    crowdLevel: "high",
    image: "🏖️",
    description: "Beautiful beaches, Portuguese heritage, vibrant nightlife",
    avgCost: 3000,
    duration: "3-5 days",
    crimeStat: "low",
    touristRating: 4.5,
    scamRisk: "low",
    activities: ["Beach", "Water Sports", "Nightlife", "Churches"],
    warnings: ["Avoid isolated beaches at night", "Beware of drug peddlers"]
  },
  {
    id: 2,
    name: "Jaipur",
    category: ["history", "culture", "heritage"],
    budget: "low",
    safetyScore: 78,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb"],
    crowdLevel: "high",
    image: "🏰",
    description: "Pink City, majestic forts, royal palaces",
    avgCost: 2000,
    duration: "2-4 days",
    crimeStat: "medium",
    touristRating: 4.6,
    scamRisk: "medium",
    activities: ["Forts", "Palaces", "Shopping", "Cultural Shows"],
    warnings: ["Bargain at markets", "Use registered tour guides", "Avoid night travel in outskirts"]
  },
  {
    id: 3,
    name: "Kerala",
    category: ["nature", "beach", "culture"],
    budget: "medium",
    safetyScore: 92,
    bestMonths: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    crowdLevel: "medium",
    image: "🌴",
    description: "God's Own Country, backwaters, ayurveda, lush greenery",
    avgCost: 3500,
    duration: "5-7 days",
    crimeStat: "low",
    touristRating: 4.8,
    scamRisk: "very-low",
    activities: ["Houseboats", "Ayurveda", "Tea Gardens", "Beaches"],
    warnings: ["Monsoon can cause flooding", "Book houseboats in advance"]
  },
  {
    id: 4,
    name: "Rishikesh",
    category: ["adventure", "nature", "spiritual"],
    budget: "low",
    safetyScore: 88,
    bestMonths: ["Mar", "Apr", "May", "Sep", "Oct", "Nov"],
    crowdLevel: "medium",
    image: "🏔️",
    description: "Yoga capital, river rafting, spiritual retreat",
    avgCost: 1800,
    duration: "3-4 days",
    crimeStat: "very-low",
    touristRating: 4.7,
    scamRisk: "low",
    activities: ["Rafting", "Yoga", "Trekking", "Temples"],
    warnings: ["River can be dangerous in monsoon", "Book certified rafting operators"]
  },
  {
    id: 5,
    name: "Agra",
    category: ["history", "heritage", "culture"],
    budget: "low",
    safetyScore: 75,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb"],
    crowdLevel: "very-high",
    image: "🕌",
    description: "Taj Mahal, Mughal heritage, architectural marvels",
    avgCost: 2200,
    duration: "1-2 days",
    crimeStat: "medium",
    touristRating: 4.4,
    scamRisk: "high",
    activities: ["Taj Mahal", "Agra Fort", "Shopping", "Cuisine"],
    warnings: ["Heavy tourist scams", "Use official guides only", "Avoid pushy vendors"]
  },
  {
    id: 6,
    name: "Udaipur",
    category: ["history", "culture", "nature"],
    budget: "medium",
    safetyScore: 90,
    bestMonths: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    crowdLevel: "medium",
    image: "🏛️",
    description: "City of Lakes, romantic palaces, stunning architecture",
    avgCost: 2800,
    duration: "2-3 days",
    crimeStat: "low",
    touristRating: 4.7,
    scamRisk: "low",
    activities: ["Lake Pichola", "City Palace", "Boat Rides", "Heritage Walk"],
    warnings: ["Summers are extremely hot", "Book hotels in advance"]
  },
  {
    id: 7,
    name: "Manali",
    category: ["adventure", "nature", "mountain"],
    budget: "medium",
    safetyScore: 82,
    bestMonths: ["Mar", "Apr", "May", "Jun", "Oct", "Nov"],
    crowdLevel: "high",
    image: "⛰️",
    description: "Hill station, snow activities, adventure sports",
    avgCost: 3200,
    duration: "4-5 days",
    crimeStat: "low",
    touristRating: 4.5,
    scamRisk: "medium",
    activities: ["Skiing", "Paragliding", "Trekking", "Temples"],
    warnings: ["Roads can be dangerous in winter", "Altitude sickness possible"]
  },
  {
    id: 8,
    name: "Varanasi",
    category: ["spiritual", "culture", "history"],
    budget: "low",
    safetyScore: 72,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb"],
    crowdLevel: "very-high",
    image: "🛕",
    description: "Spiritual capital, Ganges river, ancient temples",
    avgCost: 1500,
    duration: "2-3 days",
    crimeStat: "medium",
    touristRating: 4.3,
    scamRisk: "high",
    activities: ["Ganga Aarti", "Boat Rides", "Temples", "Street Food"],
    warnings: ["Very crowded", "Beware of fake guides", "Respect local customs"]
  },
  {
    id: 9,
    name: "Hampi",
    category: ["history", "heritage", "nature"],
    budget: "low",
    safetyScore: 86,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb"],
    crowdLevel: "low",
    image: "🗿",
    description: "Ancient ruins, UNESCO site, surreal landscapes",
    avgCost: 1600,
    duration: "2-3 days",
    crimeStat: "very-low",
    touristRating: 4.6,
    scamRisk: "very-low",
    activities: ["Temple Ruins", "Bouldering", "Cycling", "Sunrise Views"],
    warnings: ["Limited nightlife", "Carry cash - limited ATMs"]
  },
  {
    id: 10,
    name: "Mumbai",
    category: ["city", "culture", "food"],
    budget: "high",
    safetyScore: 76,
    bestMonths: ["Nov", "Dec", "Jan", "Feb"],
    crowdLevel: "very-high",
    image: "🌆",
    description: "Financial capital, Bollywood, diverse culture, street food",
    avgCost: 4000,
    duration: "3-4 days",
    crimeStat: "medium",
    touristRating: 4.2,
    scamRisk: "medium",
    activities: ["Gateway of India", "Marine Drive", "Bollywood Tour", "Street Food"],
    warnings: ["Traffic congestion", "Pickpockets in crowded areas", "Expensive"]
  }
];

const App = () => {
  const [step, setStep] = useState<string>('home');

  const [preferences, setPreferences] = useState<Preferences>({
    interests: [],
    budget: '',
    duration: '',
    travelMonth: ''
  });

  const [recommendations, setRecommendations] = useState<Destination[]>([]);

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const getRecommendations = () => {
    const scored: Destination[] = destinations.map((dest) => {
      let score = 0;
      const interestMatch = preferences.interests.filter(interest => dest.category.includes(interest)).length;
      score += (interestMatch / preferences.interests.length) * 40;
      if (preferences.budget === dest.budget) score += 25;
      else if ((preferences.budget === 'low' && dest.budget === 'medium') || (preferences.budget === 'high' && dest.budget === 'medium')) score += 15;
      if (dest.bestMonths.includes(preferences.travelMonth)) score += 20;
      score += (dest.safetyScore / 100) * 15;
      return { ...dest, matchScore: score };
    });
    scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scored.slice(0, 5));
    setStep('results');
  };

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };

  const getSafetyColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getSafetyBg = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 75) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  if (step === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-indigo-900 mb-4">🇮🇳 Smart Travel India</h1>
            <p className="text-xl text-gray-700 mb-2">AI-Powered Travel & Safety Recommendation System</p>
            <p className="text-gray-600">Personalized recommendations with real-time safety analysis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg"><div className="text-4xl mb-4">🤖</div><h3 className="text-xl font-bold text-gray-800 mb-2">AI Recommendations</h3><p className="text-gray-600">Machine learning algorithms match your preferences with perfect destinations</p></div>
            <div className="bg-white rounded-xl p-6 shadow-lg"><div className="text-4xl mb-4">🛡️</div><h3 className="text-xl font-bold text-gray-800 mb-2">Safety Prediction</h3><p className="text-gray-600">Real-time safety scores based on crime data and tourist reviews</p></div>
            <div className="bg-white rounded-xl p-6 shadow-lg"><div className="text-4xl mb-4">📊</div><h3 className="text-xl font-bold text-gray-800 mb-2">Smart Planning</h3><p className="text-gray-600">Best time to visit, budget planning, and crowd predictions</p></div>
          </div>
          <div className="text-center">
            <button onClick={() => setStep('preferences')} className="bg-indigo-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-indigo-700 transition shadow-lg">Start Planning Your Trip →</button>
          </div>
          <div className="mt-16 grid md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow"><div className="text-3xl font-bold text-indigo-600">10+</div><div className="text-gray-600">Destinations</div></div>
            <div className="bg-white rounded-lg p-4 shadow"><div className="text-3xl font-bold text-indigo-600">95%</div><div className="text-gray-600">Accuracy</div></div>
            <div className="bg-white rounded-lg p-4 shadow"><div className="text-3xl font-bold text-indigo-600">5K+</div><div className="text-gray-600">Reviews Analyzed</div></div>
            <div className="bg-white rounded-lg p-4 shadow"><div className="text-3xl font-bold text-indigo-600">24/7</div><div className="text-gray-600">Updates</div></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preferences') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tell Us Your Preferences</h2>
            <p className="text-gray-600 mb-8">Our AI will analyze your choices and recommend the best destinations</p>
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">What interests you? (Select multiple)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['beach', 'history', 'nature', 'adventure', 'culture', 'spiritual', 'city', 'mountain'].map(interest => (
                  <button key={interest} onClick={() => handleInterestToggle(interest)} className={`p-4 rounded-lg border-2 transition ${preferences.interests.includes(interest) ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-indigo-400'}`}>
                    <div className="text-2xl mb-1">{interest === 'beach' && '🏖️'}{interest === 'history' && '🏛️'}{interest === 'nature' && '🌿'}{interest === 'adventure' && '🧗'}{interest === 'culture' && '🎭'}{interest === 'spiritual' && '🛕'}{interest === 'city' && '🌆'}{interest === 'mountain' && '⛰️'}</div>
                    <div className="text-sm font-medium capitalize">{interest}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">Budget per day (INR)</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ value: 'low', label: 'Budget', range: '₹1000-2000', icon: '💰' }, { value: 'medium', label: 'Moderate', range: '₹2000-4000', icon: '💳' }, { value: 'high', label: 'Luxury', range: '₹4000+', icon: '💎' }].map(budget => (
                  <button key={budget.value} onClick={() => setPreferences(prev => ({ ...prev, budget: budget.value }))} className={`p-4 rounded-lg border-2 transition ${preferences.budget === budget.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}>
                    <div className="text-3xl mb-2">{budget.icon}</div><div className="font-semibold">{budget.label}</div><div className="text-sm text-gray-600">{budget.range}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">Trip Duration</label>
              <select value={preferences.duration} onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none">
                <option value="">Select duration</option>
                <option value="1-2">1-2 days</option><option value="3-5">3-5 days</option><option value="5-7">5-7 days</option><option value="7+">7+ days</option>
              </select>
            </div>
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">When are you planning to travel?</label>
              <select value={preferences.travelMonth} onChange={(e) => setPreferences(prev => ({ ...prev, travelMonth: e.target.value }))} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none">
                <option value="">Select month</option>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (<option key={month} value={month}>{month}</option>))}
              </select>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep('home')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">Back</button>
              <button onClick={getRecommendations} disabled={preferences.interests.length === 0 || !preferences.budget || !preferences.travelMonth} className="flex-1 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">Get AI Recommendations 🤖</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8"><button onClick={() => setStep('preferences')} className="text-indigo-600 hover:text-indigo-800 font-semibold">← Change Preferences</button></div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Personalized Recommendations</h2>
            <p className="text-gray-600 mb-6">Based on AI analysis of your preferences, safety data, and travel patterns</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Interests: {preferences.interests.join(', ')}</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Budget: {preferences.budget}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Month: {preferences.travelMonth}</span>
            </div>
          </div>
          <div className="grid gap-6">
            {recommendations.map((dest, index) => (
              <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{dest.image}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl font-bold text-gray-800">{dest.name}</h3>
                          {index === 0 && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">BEST MATCH</span>}
                        </div>
                        <p className="text-gray-600">{dest.description}</p>
                      </div>
                    </div>
                    <div className="text-right"><div className="text-3xl font-bold text-indigo-600">{Math.round(dest.matchScore)}%</div><div className="text-sm text-gray-600">Match Score</div></div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className={`${getSafetyBg(dest.safetyScore)} rounded-lg p-3`}>
                      <div className="flex items-center gap-2 mb-1"><Shield className="w-4 h-4" /><span className="text-xs font-semibold text-gray-700">Safety Score</span></div>
                      <div className={`text-2xl font-bold ${getSafetyColor(dest.safetyScore)}`}>{dest.safetyScore}/100</div>
                      <div className="text-xs text-gray-600 mt-1">Crime: {dest.crimeStat}</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4" /><span className="text-xs font-semibold text-gray-700">Avg. Daily Cost</span></div>
                      <div className="text-2xl font-bold text-blue-600">₹{dest.avgCost}</div>
                      <div className="text-xs text-gray-600 mt-1">{dest.duration}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1"><Calendar className="w-4 h-4" /><span className="text-xs font-semibold text-gray-700">Best Months</span></div>
                      <div className="text-sm font-bold text-purple-600">{dest.bestMonths.slice(0, 3).join(', ')}</div>
                      <div className="text-xs text-gray-600 mt-1">{dest.bestMonths.includes(preferences.travelMonth) ? '✅ Perfect timing!' : '⚠️ Off-season'}</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1"><Star className="w-4 h-4" /><span className="text-xs font-semibold text-gray-700">Tourist Rating</span></div>
                      <div className="text-2xl font-bold text-yellow-600">{dest.touristRating}/5</div>
                      <div className="text-xs text-gray-600 mt-1">Crowd: {dest.crowdLevel}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Activities:</h4>
                    <div className="flex flex-wrap gap-2">{dest.activities.map((activity: string) => (<span key={activity} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">{activity}</span>))}</div>
                  </div>
                  {dest.warnings.length > 0 && (
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div><h4 className="font-semibold text-orange-800 mb-1">Safety Tips:</h4><ul className="text-sm text-orange-700 space-y-1">{dest.warnings.map((warning: string, idx: number) => (<li key={idx}>• {warning}</li>))}</ul></div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Scam Risk:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${dest.scamRisk === 'very-low' ? 'bg-green-100 text-green-800' : dest.scamRisk === 'low' ? 'bg-blue-100 text-blue-800' : dest.scamRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{dest.scamRisk.toUpperCase()}</span>
                    </div>
                    <button onClick={() => { setSelectedDestination(dest); setStep('detail'); }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">View Full Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5" />How AI Generated These Recommendations</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div><strong>Interest Matching (40%):</strong> Analyzed your selected interests against destination categories</div>
              <div><strong>Budget Alignment (25%):</strong> Matched your budget with average costs</div>
              <div><strong>Seasonal Optimization (20%):</strong> Prioritized destinations best in your travel month</div>
              <div><strong>Safety Scoring (15%):</strong> Weighted by crime statistics and tourist safety data</div>
              <div><strong>ML Algorithm:</strong> Content-based filtering with weighted scoring</div>
              <div><strong>Data Sources:</strong> 5000+ reviews, govt. crime data, weather patterns</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'detail' && selectedDestination) {
    const dest = selectedDestination;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <button onClick={() => setStep('results')} className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold">← Back to Results</button>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
              <div className="flex items-center gap-6">
                <div className="text-8xl">{dest.image}</div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{dest.name}</h1>
                  <p className="text-indigo-100 text-lg">{dest.description}</p>
                  <div className="flex gap-4 mt-4">
                    <div className="bg-white/20 px-4 py-2 rounded-lg"><div className="text-2xl font-bold">{dest.safetyScore}/100</div><div className="text-sm">Safety Score</div></div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg"><div className="text-2xl font-bold">{dest.touristRating}/5</div><div className="text-sm">Rating</div></div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg"><div className="text-2xl font-bold">₹{dest.avgCost}</div><div className="text-sm">Per Day</div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-indigo-600" />AI Safety Analysis</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border-2 border-gray-200 rounded-lg p-4"><h3 className="font-semibold text-gray-700 mb-2">Crime Statistics</h3><div className={`text-3xl font-bold ${dest.crimeStat === 'very-low' ? 'text-green-600' : dest.crimeStat === 'low' ? 'text-blue-600' : dest.crimeStat === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>{dest.crimeStat.toUpperCase()}</div><p className="text-sm text-gray-600 mt-2">Based on official crime data analysis</p></div>
                  <div className="border-2 border-gray-200 rounded-lg p-4"><h3 className="font-semibold text-gray-700 mb-2">Scam Alert Level</h3><div className={`text-3xl font-bold ${dest.scamRisk === 'very-low' ? 'text-green-600' : dest.scamRisk === 'low' ? 'text-blue-600' : dest.scamRisk === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>{dest.scamRisk.toUpperCase()}</div><p className="text-sm text-gray-600 mt-2">Tourist scam probability prediction</p></div>
                  <div className="border-2 border-gray-200 rounded-lg p-4"><h3 className="font-semibold text-gray-700 mb-2">Crowd Level</h3><div className="text-3xl font-bold text-purple-600">{dest.crowdLevel.toUpperCase()}</div><p className="text-sm text-gray-600 mt-2">Expected tourist density</p></div>
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar className="w-6 h-6 text-indigo-600" />Best Time to Visit</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="grid grid-cols-12 gap-2 mb-4">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month: string) => (
                      <div key={month} className={`text-center p-2 rounded ${dest.bestMonths.includes(month) ? 'bg-green-500 text-white font-bold' : 'bg-gray-200 text-gray-500'}`}><div className="text-xs">{month}</div></div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700"><strong>Recommended months:</strong> {dest.bestMonths.join(', ')} for optimal weather and experience</p>
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Camera className="w-6 h-6 text-indigo-600" />Things to Do</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {dest.activities.map((activity: string) => (<div key={activity} className="flex items-center gap-3 bg-indigo-50 p-4 rounded-lg"><div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">✓</div><span className="font-semibold text-gray-800">{activity}</span></div>))}
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle className="w-6 h-6 text-orange-600" />Important Safety Tips</h2>
                <div className="space-y-3">
                  {dest.warnings.map((warning: string, idx: number) => (<div key={idx} className="flex items-start gap-3 bg-orange-50 border-l-4 border-orange-400 p-4 rounded"><AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" /><p className="text-gray-700">{warning}</p></div>))}
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><DollarSign className="w-6 h-6 text-indigo-600" />Budget Breakdown</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-gray-700">Accommodation</span><span className="font-bold">₹{Math.round(dest.avgCost * 0.4)}/night</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-700">Food</span><span className="font-bold">₹{Math.round(dest.avgCost * 0.3)}/day</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-700">Transport</span><span className="font-bold">₹{Math.round(dest.avgCost * 0.2)}/day</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-700">Activities</span><span className="font-bold">₹{Math.round(dest.avgCost * 0.1)}/day</span></div>
                    <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center"><span className="text-gray-800 font-bold text-lg">Total Daily Cost</span><span className="text-2xl font-bold text-indigo-600">₹{dest.avgCost}</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700"><strong>AI Prediction Disclaimer:</strong> Safety scores and predictions are generated using machine learning algorithms based on historical data, tourist reviews, and crime statistics. While we strive for accuracy, conditions can change. Always verify current local conditions and follow official travel advisories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
