import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Gift, 
  Heart, 
  Star, 
  TrendingUp,
  User,
  DollarSign,
  Filter,
  Search,
  Sparkles,
  ShoppingBag,
  Bookmark,
  Share2,
  Brain,
  Zap,
  Target,
  Eye,
  MessageCircle,
  ExternalLink,
  Clock,
  Award,
  Lightbulb
} from 'lucide-react';

interface SmartGiftPlannerProps {
  onNavigate: (page: string) => void;
}

interface GiftSuggestion {
  id: string;
  name: string;
  description: string;
  category: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  recipient: string[];
  interests: string[];
  trending: boolean;
  personalityFit: string[];
  amazonLink?: string;
  imageUrl?: string;
  rating: number;
  reviews: number;
  confidenceScore: number;
  reasoning: string;
  signalIntent: string[];
  preEnjoymentScenario: string;
  shopLinks: { platform: string; url: string; }[];
  ecoFriendly?: boolean;
  handmade?: boolean;
  giftStory: string;
}

const giftDatabase: GiftSuggestion[] = [
  {
    id: '1',
    name: 'Personalized Star Map',
    description: 'Custom star map showing the night sky from a special date and location',
    category: 'Personalized',
    priceRange: '$30-50',
    priceMin: 30,
    priceMax: 50,
    recipient: ['wife', 'husband', 'boyfriend', 'girlfriend', 'mom', 'dad'],
    interests: ['romantic', 'astronomy', 'memories'],
    trending: true,
    personalityFit: ['romantic', 'sentimental', 'thoughtful'],
    rating: 4.8,
    reviews: 2847,
    confidenceScore: 94,
    reasoning: "A celestial love letter that captures a moment in time - this gift whispers 'I treasure our shared memories' in the language of the stars.",
    signalIntent: ['I treasure our memories', 'You are my universe', 'Our love is written in the stars'],
    preEnjoymentScenario: "Picture their face lighting up as they realize this isn't just art - it's the exact sky from your first kiss, your wedding night, or the day you met. They'll trace the constellations with their finger, reliving that perfect moment.",
    shopLinks: [
      { platform: 'Etsy', url: 'https://etsy.com/star-maps' },
      { platform: 'Amazon', url: 'https://amazon.com/star-map' }
    ],
    ecoFriendly: true,
    giftStory: "Every time they look up at the night sky, they'll remember this moment and feel the depth of your connection."
  },
  {
    id: '2',
    name: 'Smart Plant Monitor',
    description: 'App-connected device that monitors soil, light, and water for plants',
    category: 'Tech',
    priceRange: '$25-40',
    priceMin: 25,
    priceMax: 40,
    recipient: ['friend', 'wife', 'husband', 'mom'],
    interests: ['plants', 'gardening', 'technology', 'home'],
    trending: false,
    personalityFit: ['organized', 'tech-savvy', 'nurturing'],
    rating: 4.6,
    reviews: 1523,
    confidenceScore: 87,
    reasoning: "For the person who talks to their plants - this gift says 'I see your nurturing spirit and want to help it flourish, literally.'",
    signalIntent: ['I support your passions', 'I want to help you succeed', 'Your care matters'],
    preEnjoymentScenario: "They'll feel like a plant whisperer, getting notifications that make them smile: 'Your fiddle leaf fig is thirsty!' It transforms plant care from guesswork into a delightful, tech-enhanced ritual.",
    shopLinks: [
      { platform: 'Amazon', url: 'https://amazon.com/plant-monitor' },
      { platform: 'Best Buy', url: 'https://bestbuy.com/plant-tech' }
    ],
    ecoFriendly: true,
    giftStory: "This gift grows with them - literally. Every thriving plant becomes a reminder of your thoughtfulness."
  },
  {
    id: '3',
    name: 'Artisanal Coffee Subscription',
    description: '3-month subscription to small-batch, specialty coffee from around the world',
    category: 'Food & Drink',
    priceRange: '$60-120',
    priceMin: 60,
    priceMax: 120,
    recipient: ['dad', 'boss', 'friend', 'husband', 'boyfriend'],
    interests: ['coffee', 'food', 'discovery'],
    trending: true,
    personalityFit: ['foodie', 'adventurous', 'sophisticated'],
    rating: 4.9,
    reviews: 5672,
    confidenceScore: 91,
    reasoning: "More than caffeine - it's a monthly journey of discovery. This gift says 'I want to expand your world, one perfect cup at a time.'",
    signalIntent: ['I want to expand your horizons', 'You deserve luxury', 'I appreciate your refined taste'],
    preEnjoymentScenario: "Every month, they'll anticipate the arrival like Christmas morning. The first sip of Ethiopian single-origin will transport them to misty highlands, making their ordinary Tuesday feel extraordinary.",
    shopLinks: [
      { platform: 'Blue Bottle', url: 'https://bluebottlecoffee.com/subscription' },
      { platform: 'Counter Culture', url: 'https://counterculturecoffee.com/subscription' }
    ],
    ecoFriendly: true,
    handmade: true,
    giftStory: "Three months of morning rituals transformed into moments of global adventure and sensory delight."
  },
  {
    id: '4',
    name: 'Cozy Reading Sanctuary Kit',
    description: 'Cashmere throw, amber book light, and curated tea collection',
    category: 'Lifestyle',
    priceRange: '$75-120',
    priceMin: 75,
    priceMax: 120,
    recipient: ['mom', 'wife', 'girlfriend', 'teacher', 'friend'],
    interests: ['reading', 'relaxation', 'tea', 'cozy'],
    trending: false,
    personalityFit: ['introverted', 'intellectual', 'homebody'],
    rating: 4.7,
    reviews: 967,
    confidenceScore: 89,
    reasoning: "This isn't just comfort - it's permission to be gloriously selfish with their time. A gift that says 'Your inner world deserves this sanctuary.'",
    signalIntent: ['You deserve to be pampered', 'Your quiet time is sacred', 'I want you to feel cherished'],
    preEnjoymentScenario: "Sunday afternoon, wrapped in impossibly soft cashmere, steam rising from their favorite mug, lost in a story while the world fades away. Pure, unapologetic bliss.",
    shopLinks: [
      { platform: 'Anthropologie', url: 'https://anthropologie.com/reading-kit' },
      { platform: 'Uncommon Goods', url: 'https://uncommongoods.com/cozy-kit' }
    ],
    ecoFriendly: true,
    giftStory: "Every reading session becomes a luxurious escape, a reminder that they deserve these moments of pure indulgence."
  },
  {
    id: '5',
    name: 'Wireless Charging Zen Station',
    description: 'Minimalist charging dock with ambient lighting and digital zen clock',
    category: 'Tech',
    priceRange: '$45-75',
    priceMin: 45,
    priceMax: 75,
    recipient: ['husband', 'boyfriend', 'dad', 'friend', 'boss'],
    interests: ['technology', 'organization', 'minimalism'],
    trending: true,
    personalityFit: ['tech-savvy', 'organized', 'modern'],
    rating: 4.5,
    reviews: 3241,
    confidenceScore: 85,
    reasoning: "Transforms the mundane act of charging into a moment of technological poetry. This gift whispers 'I see your appreciation for elegant solutions.'",
    signalIntent: ['I respect your style', 'I want to simplify your life', 'You deserve beautiful things'],
    preEnjoymentScenario: "Their bedside table becomes a shrine to simplicity. The gentle amber glow creates the perfect ambiance as their phone charges silently, no more tangled cables or harsh LED lights disrupting their evening ritual.",
    shopLinks: [
      { platform: 'Apple', url: 'https://apple.com/charging-station' },
      { platform: 'Best Buy', url: 'https://bestbuy.com/wireless-charging' }
    ],
    giftStory: "Every night becomes a small ceremony of order and beauty, a daily reminder of your thoughtful attention to their lifestyle."
  },
  {
    id: '6',
    name: 'Heirloom Terrarium Ecosystem',
    description: 'Self-sustaining glass garden with rare air plants and crystalline elements',
    category: 'Craft & Nature',
    priceRange: '$55-85',
    priceMin: 55,
    priceMax: 85,
    recipient: ['kids', 'teacher', 'friend', 'mom', 'wife'],
    interests: ['crafts', 'plants', 'nature', 'creativity'],
    trending: false,
    personalityFit: ['creative', 'hands-on', 'nurturing'],
    rating: 4.4,
    reviews: 1876,
    confidenceScore: 82,
    reasoning: "A living meditation that grows more beautiful with time. This gift says 'I believe in your ability to nurture something extraordinary.'",
    signalIntent: ['I see your nurturing spirit', 'You create beauty', 'I want to inspire your creativity'],
    preEnjoymentScenario: "They'll find themselves pausing throughout the day to admire their tiny ecosystem. Friends will ask about it, giving them a chance to share the story of your thoughtfulness and their growing green sanctuary.",
    shopLinks: [
      { platform: 'Terrain', url: 'https://terrain.com/terrarium' },
      { platform: 'Etsy', url: 'https://etsy.com/terrarium-kit' }
    ],
    ecoFriendly: true,
    handmade: true,
    giftStory: "A living reminder that beautiful things grow slowly, with care and attention - just like your relationship."
  }
];

const recipientProfiles = {
  'mom': { interests: ['home', 'family', 'cooking', 'reading'], personality: ['nurturing', 'traditional', 'caring'] },
  'dad': { interests: ['tools', 'sports', 'grilling', 'technology'], personality: ['practical', 'traditional', 'provider'] },
  'wife': { interests: ['jewelry', 'wellness', 'home', 'experiences'], personality: ['romantic', 'sophisticated', 'caring'] },
  'husband': { interests: ['technology', 'sports', 'tools', 'experiences'], personality: ['practical', 'adventurous', 'provider'] },
  'boyfriend': { interests: ['gaming', 'technology', 'experiences', 'fitness'], personality: ['fun', 'modern', 'active'] },
  'girlfriend': { interests: ['beauty', 'fashion', 'experiences', 'wellness'], personality: ['romantic', 'trendy', 'social'] },
  'friend': { interests: ['experiences', 'hobbies', 'food', 'entertainment'], personality: ['fun', 'social', 'varied'] },
  'kids': { interests: ['toys', 'games', 'crafts', 'learning'], personality: ['playful', 'curious', 'energetic'] },
  'teacher': { interests: ['books', 'organization', 'coffee', 'classroom'], personality: ['educational', 'organized', 'caring'] },
  'boss': { interests: ['office', 'quality', 'professional', 'food'], personality: ['professional', 'sophisticated', 'busy'] },
  'colleague': { interests: ['office', 'coffee', 'professional', 'neutral'], personality: ['professional', 'friendly', 'appropriate'] },
  'neighbor': { interests: ['home', 'garden', 'community', 'practical'], personality: ['friendly', 'considerate', 'neighborly'] }
};

const signalIntents = [
  'I treasure our memories',
  'You deserve to be pampered', 
  'I see your unique style',
  'I want to expand your horizons',
  'I appreciate your hard work',
  'You inspire me',
  'I want to make you laugh',
  'Your passions matter to me',
  'I see your potential',
  'You make life more beautiful'
];

const allInterests = [
  'technology', 'home', 'fashion', 'sports', 'cooking', 'reading', 'wellness', 'travel', 
  'gaming', 'music', 'art', 'fitness', 'crafts', 'food', 'gardening', 'photography',
  'movies', 'books', 'coffee', 'wine', 'outdoor', 'pets', 'cars', 'jewelry'
];

const personalityTraits = [
  'practical', 'romantic', 'adventurous', 'creative', 'tech-savvy', 'organized', 
  'trendy', 'traditional', 'sophisticated', 'fun', 'intellectual', 'nurturing',
  'minimalist', 'maximalist', 'social', 'introverted', 'ambitious', 'relaxed'
];

export function SmartGiftPlanner({ onNavigate }: SmartGiftPlannerProps) {
  const [recipientName, setRecipientName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [age, setAge] = useState(30);
  const [priceRange, setPriceRange] = useState([25, 100]);
  const [interests, setInterests] = useState<string[]>([]);
  const [personality, setPersonality] = useState<string[]>([]);
  const [selectedSignalIntent, setSelectedSignalIntent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<GiftSuggestion[]>([]);
  const [savedGifts, setSavedGifts] = useState<string[]>([]);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [sortBy, setSortBy] = useState('confidence');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedGift, setSelectedGift] = useState<GiftSuggestion | null>(null);

  // Check for search context from intelligent search
  useEffect(() => {
    const context = sessionStorage.getItem('searchContext');
    if (context) {
      const parsed = JSON.parse(context);
      if (parsed.type === 'gift-planning') {
        setSearchQuery(parsed.query);
        if (parsed.recipient) {
          setRecipient(parsed.recipient);
          autoFillProfile(parsed.recipient);
        }
      }
      sessionStorage.removeItem('searchContext');
    }
  }, []);

  const autoFillProfile = (recipientType: string) => {
    const profile = recipientProfiles[recipientType as keyof typeof recipientProfiles];
    if (profile) {
      setInterests(profile.interests);
      setPersonality(profile.personality);
    }
  };

  const startAiAnalysis = () => {
    setAiAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAiAnalyzing(false);
          setShowRecommendations(true);
          generateRecommendations();
          return 100;
        }
        return prev + 8;
      });
    }, 150);
  };

  const generateRecommendations = () => {
    let filtered = giftDatabase.filter(gift => {
      const matchesRecipient = !recipient || gift.recipient.includes(recipient);
      const matchesPrice = gift.priceMin >= priceRange[0] && gift.priceMax <= priceRange[1];
      const matchesInterests = interests.length === 0 || interests.some(interest => 
        gift.interests.includes(interest)
      );
      const matchesPersonality = personality.length === 0 || personality.some(trait =>
        gift.personalityFit.includes(trait)
      );
      const matchesSignal = !selectedSignalIntent || gift.signalIntent.includes(selectedSignalIntent);
      const matchesSearch = !searchQuery || 
        gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRecipient && matchesPrice && matchesInterests && matchesPersonality && matchesSignal && matchesSearch;
    });

    // Apply filters
    if (filterBy === 'trending') {
      filtered = filtered.filter(gift => gift.trending);
    } else if (filterBy === 'eco') {
      filtered = filtered.filter(gift => gift.ecoFriendly);
    } else if (filterBy === 'handmade') {
      filtered = filtered.filter(gift => gift.handmade);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return b.confidenceScore - a.confidenceScore;
        case 'price-low':
          return a.priceMin - b.priceMin;
        case 'price-high':
          return b.priceMax - a.priceMax;
        case 'rating':
          return b.rating - a.rating;
        default:
          return b.confidenceScore - a.confidenceScore;
      }
    });

    setRecommendations(filtered);
  };

  const toggleSaved = (giftId: string) => {
    setSavedGifts(prev => 
      prev.includes(giftId) 
        ? prev.filter(id => id !== giftId)
        : [...prev, giftId]
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const togglePersonality = (trait: string) => {
    setPersonality(prev => 
      prev.includes(trait)
        ? prev.filter(p => p !== trait)
        : [...prev, trait]
    );
  };

  const getAnalysisStageText = () => {
    if (analysisProgress < 20) return "Deciphering the unspoken desires...";
    if (analysisProgress < 40) return "Reading between the lines of personality...";
    if (analysisProgress < 60) return "Mapping emotional resonance patterns...";
    if (analysisProgress < 80) return "Calculating the alchemy of perfect gifting...";
    return "Unlocking gifts that truly connect...";
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header - Christmas Themed */}
      <div className="bg-gradient-to-r from-[#F05959] to-[#E04848] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('christmas')}
              className="text-white hover:bg-white/10 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#F05959]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Unlock the Psychology of Perfect Gifting</h1>
                <p className="opacity-90">Your AI Empathy Engine for Christmas Magic</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold">{showRecommendations ? recommendations.length : '∞'}</div>
              <div className="text-sm opacity-90">Perfect Matches</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">${priceRange[0]}-${priceRange[1]}</div>
              <div className="text-sm opacity-90">Sweet Spot</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{savedGifts.length}</div>
              <div className="text-sm opacity-90">Captured Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{showRecommendations ? Math.round(recommendations.reduce((sum, g) => sum + g.confidenceScore, 0) / recommendations.length) : 0}%</div>
              <div className="text-sm opacity-90">AI Confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {selectedGift ? (
          // Detailed Gift View with Pre-Enjoyment Scenario
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedGift(null)}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-bold">{selectedGift.name}</h2>
              <Badge className="bg-[#F05959] text-white">
                {selectedGift.confidenceScore}% Perfect Match
              </Badge>
              <Button
                variant="ghost"
                onClick={() => toggleSaved(selectedGift.id)}
                className="ml-auto"
              >
                <Bookmark 
                  className={`w-5 h-5 ${savedGifts.includes(selectedGift.id) ? 'fill-current text-[#F05959]' : ''}`} 
                />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Pre-Enjoyment Visualization */}
                <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-[#F05959]/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-5 h-5 text-[#F05959]" />
                    <h3 className="font-bold text-gray-900">Imagine Their Joy</h3>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    {selectedGift.preEnjoymentScenario}
                  </p>
                </Card>

                {/* AI Reasoning */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-[#F05959]" />
                    <h3 className="font-bold text-gray-900">Why This Gift Resonates</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedGift.reasoning}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What This Gift Signals</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedGift.signalIntent.map((signal, index) => (
                          <Badge key={index} variant="outline" className="border-[#F05959] text-[#F05959]">
                            {signal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">The Gift Story</h4>
                      <p className="text-gray-600 text-sm italic">{selectedGift.giftStory}</p>
                    </div>
                  </div>
                </Card>

                {/* Product Details */}
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Product Details</h3>
                  <p className="text-gray-600 mb-4">{selectedGift.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Category</span>
                      <p className="font-medium">{selectedGift.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Price Range</span>
                      <p className="font-medium text-[#F05959]">{selectedGift.priceRange}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="font-medium">{selectedGift.rating}</span>
                        <span className="text-sm text-gray-500">({selectedGift.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Special Features</span>
                      <div className="flex gap-1 mt-1">
                        {selectedGift.trending && <Badge className="text-xs bg-orange-100 text-orange-700">Trending</Badge>}
                        {selectedGift.ecoFriendly && <Badge className="text-xs bg-green-100 text-green-700">Eco-Friendly</Badge>}
                        {selectedGift.handmade && <Badge className="text-xs bg-purple-100 text-purple-700">Handmade</Badge>}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Confidence Score */}
                <Card className="p-4">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#F05959]" />
                    AI Confidence
                  </h4>
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-[#F05959]">{selectedGift.confidenceScore}%</div>
                    <p className="text-sm text-gray-600">Perfect Match Score</p>
                  </div>
                  <Progress value={selectedGift.confidenceScore} className="h-3" />
                </Card>

                {/* Shop Links */}
                <Card className="p-4">
                  <h4 className="font-bold mb-3">Where to Buy</h4>
                  <div className="space-y-2">
                    {selectedGift.shopLinks.map((shop, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-between border-[#F05959] text-[#F05959] hover:bg-[#F05959] hover:text-white"
                        onClick={() => window.open(shop.url, '_blank')}
                      >
                        <span>{shop.platform}</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </Card>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full bg-[#F05959] hover:bg-[#E04848]">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Capture This Perfect Thought
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share This Discovery
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Generate Gift Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="finder" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finder">Gift Genius</TabsTrigger>
              <TabsTrigger value="saved">Captured Ideas ({savedGifts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="finder" className="space-y-6">
              {!showRecommendations ? (
                <>
                  {/* AI Gift Genius Module */}
                  <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-[#F05959]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#F05959] to-[#E04848] rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">AI Gift Genius</h3>
                        <p className="text-sm text-gray-600">Uncover the hidden value and emotional triggers that make a gift unforgettable</p>
                      </div>
                      <Badge className="ml-auto bg-[#F05959] text-white">EMPATHY ENGINE</Badge>
                    </div>

                    {!aiAnalyzing && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-white rounded-lg border border-[#F05959]/10">
                            <Brain className="w-8 h-8 text-[#F05959] mx-auto mb-2" />
                            <h4 className="font-medium text-gray-900">Deciphering the Unspoken</h4>
                            <p className="text-sm text-gray-600">AI reads between the lines of interests & preferences</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg border border-[#F05959]/10">
                            <Target className="w-8 h-8 text-[#F05959] mx-auto mb-2" />
                            <h4 className="font-medium text-gray-900">The Alchemy of Gifting</h4>
                            <p className="text-sm text-gray-600">Transforming data into delightful, deeply personal matches</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg border border-[#F05959]/10">
                            <TrendingUp className="w-8 h-8 text-[#F05959] mx-auto mb-2" />
                            <h4 className="font-medium text-gray-900">Future-Proofing Joy</h4>
                            <p className="text-sm text-gray-600">Anticipating desires before they're even formed</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {aiAnalyzing && (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#F05959] to-[#E04848] rounded-full flex items-center justify-center mx-auto">
                          <Brain className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">AI Empathy Engine Activated...</h4>
                          <Progress value={analysisProgress} className="w-full max-w-sm mx-auto h-3" />
                          <p className="text-sm text-gray-600 mt-2">
                            {getAnalysisStageText()}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Enhanced Gift Finder Form */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#F05959]" />
                      Tell me about this special person
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Name and Basic Info */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-medium mb-2">Their name</label>
                          <Input
                            placeholder="e.g., Sarah, Mom, Best Friend"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="border-[#F05959]/20 focus:border-[#F05959]"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-2">Relationship</label>
                          <Select value={recipient} onValueChange={(value) => {
                            setRecipient(value);
                            autoFillProfile(value);
                          }}>
                            <SelectTrigger className="border-[#F05959]/20 focus:border-[#F05959]">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(recipientProfiles).map(recipientType => (
                                <SelectItem key={recipientType} value={recipientType}>
                                  {recipientType.charAt(0).toUpperCase() + recipientType.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block font-medium mb-2">Age: {age}</label>
                          <Slider
                            value={[age]}
                            onValueChange={(value) => setAge(value[0])}
                            max={100}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <label className="block font-medium mb-2">
                          Gift Budget: ${priceRange[0]} - ${priceRange[1]}
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={300}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Signal Intent */}
                      <div>
                        <label className="block font-medium mb-2">What do you want this gift to say?</label>
                        <Select value={selectedSignalIntent} onValueChange={setSelectedSignalIntent}>
                          <SelectTrigger className="border-[#F05959]/20 focus:border-[#F05959]">
                            <SelectValue placeholder="Choose the message you want to send" />
                          </SelectTrigger>
                          <SelectContent>
                            {signalIntents.map(intent => (
                              <SelectItem key={intent} value={intent}>
                                {intent}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Interests - Enhanced Chips */}
                      <div>
                        <label className="block font-medium mb-2">Their interests & passions</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {allInterests.map(interest => (
                            <Badge
                              key={interest}
                              variant={interests.includes(interest) ? "default" : "outline"}
                              className={`cursor-pointer transition-all ${
                                interests.includes(interest) 
                                  ? 'bg-[#F05959] text-white hover:bg-[#E04848]' 
                                  : 'border-[#F05959]/30 text-[#F05959] hover:bg-[#F05959]/10'
                              }`}
                              onClick={() => toggleInterest(interest)}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Click to select what makes them light up</p>
                      </div>

                      {/* Personality - Enhanced Chips */}
                      <div>
                        <label className="block font-medium mb-2">Their personality essence</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {personalityTraits.map(trait => (
                            <Badge
                              key={trait}
                              variant={personality.includes(trait) ? "default" : "outline"}
                              className={`cursor-pointer transition-all ${
                                personality.includes(trait) 
                                  ? 'bg-[#F05959] text-white hover:bg-[#E04848]' 
                                  : 'border-[#F05959]/30 text-[#F05959] hover:bg-[#F05959]/10'
                              }`}
                              onClick={() => togglePersonality(trait)}
                            >
                              {trait}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Select the traits that define their character</p>
                      </div>

                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Any specific gift ideas or keywords..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 border-[#F05959]/20 focus:border-[#F05959]"
                        />
                      </div>

                      {/* Enhanced CTA */}
                      <div className="text-center pt-4">
                        <Button 
                          onClick={startAiAnalysis}
                          className="bg-gradient-to-r from-[#F05959] to-[#E04848] hover:from-[#E04848] hover:to-[#D03737] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                          disabled={!recipientName || !recipient}
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          Unleash the Gift Genius
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">Decoding the psychology of perfect gifting</p>
                      </div>
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#F05959] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 AI Empathy Unlocked!</h3>
                      <p className="text-gray-600">Discover gifts that resonate on a deeper, more human level</p>
                    </div>
                  </Card>

                  {/* Filters and Sorting */}
                  <Card className="p-4">
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-[#F05959]" />
                        <span className="font-medium">Refine Results:</span>
                      </div>
                      
                      <Select value={filterBy} onValueChange={setFilterBy}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Gifts</SelectItem>
                          <SelectItem value="trending">Trending Now</SelectItem>
                          <SelectItem value="eco">Eco-Friendly</SelectItem>
                          <SelectItem value="handmade">Handmade</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confidence">AI Confidence</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Customer Rating</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button 
                        variant="outline" 
                        onClick={generateRecommendations}
                        className="border-[#F05959] text-[#F05959] hover:bg-[#F05959] hover:text-white"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Refresh Magic
                      </Button>
                    </div>
                  </Card>

                  {/* Enhanced Recommendations */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">
                        {recommendations.length > 0 ? `${recommendations.length} Gifts That Speak Their Language` : 'No matches found'}
                      </h3>
                      {recommendations.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-[#F05959]" />
                          <span className="text-sm text-[#F05959] font-medium">Psychologically Curated</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendations.map((gift) => (
                        <Card key={gift.id} className="p-6 hover:shadow-lg transition-all border border-gray-200 hover:border-[#F05959]/30 cursor-pointer">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Gift className="w-5 h-5 text-[#F05959]" />
                              {gift.trending && (
                                <Badge className="text-xs bg-orange-100 text-orange-700">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {gift.ecoFriendly && (
                                <Badge className="text-xs bg-green-100 text-green-700">🌱 Eco</Badge>
                              )}
                              {gift.handmade && (
                                <Badge className="text-xs bg-purple-100 text-purple-700">✋ Handmade</Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaved(gift.id);
                              }}
                              className="p-1"
                            >
                              <Bookmark 
                                className={`w-4 h-4 ${savedGifts.includes(gift.id) ? 'fill-current text-[#F05959]' : ''}`} 
                              />
                            </Button>
                          </div>

                          <div onClick={() => setSelectedGift(gift)}>
                            {/* Confidence Score Badge */}
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-gray-900">{gift.name}</h4>
                              <Badge className="bg-[#F05959] text-white font-bold">
                                {gift.confidenceScore}%
                              </Badge>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">{gift.description}</p>

                            {/* AI Reasoning Preview */}
                            <div className="bg-gradient-to-r from-[#F05959]/5 to-orange-50 p-3 rounded-lg mb-4">
                              <div className="flex items-start gap-2">
                                <Brain className="w-4 h-4 text-[#F05959] mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700 italic">
                                  {gift.reasoning.length > 100 ? gift.reasoning.substring(0, 100) + '...' : gift.reasoning}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="border-[#F05959]/30">{gift.category}</Badge>
                                <span className="font-bold text-[#F05959]">{gift.priceRange}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-3 h-3 ${i < Math.floor(gift.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {gift.rating} ({gift.reviews.toLocaleString()} reviews)
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button className="flex-1 bg-[#F05959] hover:bg-[#E04848]">
                                <Eye className="w-4 h-4 mr-2" />
                                Explore This Magic
                              </Button>
                              <Button variant="outline" size="sm" className="border-[#F05959] text-[#F05959]">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {recommendations.length > 0 && (
                      <div className="text-center mt-8">
                        <Button 
                          variant="outline" 
                          onClick={() => {setShowRecommendations(false); setAnalysisProgress(0);}}
                          className="text-[#F05959] border-[#F05959] hover:bg-[#F05959] hover:text-white"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Analyze Another Person
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Your Captured Gift Inspirations</h3>
                
                {savedGifts.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No captured inspirations yet. Start exploring to save your perfect discoveries!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedGifts.map(giftId => {
                      const gift = giftDatabase.find(g => g.id === giftId);
                      if (!gift) return null;
                      
                      return (
                        <div 
                          key={gift.id} 
                          className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:shadow-sm hover:border-[#F05959]/30"
                          onClick={() => setSelectedGift(gift)}
                        >
                          <Gift className="w-8 h-8 text-[#F05959]" />
                          <div className="flex-1">
                            <h4 className="font-medium">{gift.name}</h4>
                            <p className="text-sm text-gray-600">{gift.priceRange} • {gift.confidenceScore}% match</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-[#F05959] text-[#F05959]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}