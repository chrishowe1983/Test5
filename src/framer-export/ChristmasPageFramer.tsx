import React, { useState } from 'react';
import { ArrowLeft, Home, Gift, Clock, DollarSign, Lightbulb, Calendar, ShoppingCart, Settings } from 'lucide-react';

// Simplified Framer-compatible version
export default function ChristmasPageFramer() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="h-full w-full flex relative overflow-hidden bg-white">
      {/* Left Sidebar - Coral Background */}
      <div className="w-80 bg-[#F05959] text-white p-6 flex flex-col relative">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-[#F05959]" />
          </div>
          <span className="text-xl font-bold">Listmas</span>
        </div>

        {/* Main Header */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-1 h-16 bg-white rounded-full"></div>
            <div>
              <h1 className="text-3xl font-bold">Holiday Magic</h1>
              <p className="text-lg text-white/90 italic">Awaits Your Perfect Planning</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 mb-8">
          {/* Days Until Christmas */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Days Until Christmas</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>

          {/* Budget Used */}
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Budget Used</p>
              <p className="text-2xl font-bold">67%</p>
            </div>
          </div>

          {/* Gifts Planned */}
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-sm text-white/80">Gifts Planned</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>

        {/* Navigation - Bottom */}
        <div className="mt-auto space-y-3">
          <button className="text-white hover:bg-white/10 w-full justify-start px-4 py-2 rounded-lg flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feel Excited
          </button>
          <button className="text-white hover:bg-white/10 w-full justify-start px-4 py-2 rounded-lg flex items-center transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 relative">
        {/* Header with Spark → Shape → Start */}
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span>Spark</span>
              <span>→</span>
              <span>Shape</span>
              <span>→</span>
              <span>Start</span>
            </div>
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Three Cards Section */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Spark New Ideas Card */}
            <div 
              className={`p-6 bg-white border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedCard === 'spark' ? 'border-[#F05959] shadow-lg scale-105' : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => setSelectedCard(selectedCard === 'spark' ? null : 'spark')}
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Spark New Ideas</h3>
              </div>
              
              <div className="mb-4 w-full h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                <Gift className="w-12 h-12 text-[#F05959]" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Browse for new traditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Get new craft-spiration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Give me gift inspiration</span>
                </div>
              </div>
            </div>

            {/* Shape Festive Plans Card */}
            <div 
              className={`p-6 bg-white border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedCard === 'shape' ? 'border-[#F05959] shadow-lg scale-105' : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => setSelectedCard(selectedCard === 'shape' ? null : 'shape')}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Shape Festive Plans</h3>
              </div>
              
              <div className="mb-4 w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <Calendar className="w-12 h-12 text-green-600" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Schedule your to do list</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Christmas food list</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Generate your christmas gift list</span>
                </div>
              </div>
            </div>

            {/* Start Christmas Shopping Card */}
            <div 
              className={`p-6 bg-white border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedCard === 'start' ? 'border-[#F05959] shadow-lg scale-105' : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => setSelectedCard(selectedCard === 'start' ? null : 'start')}
            >
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Start Christmas Shopping</h3>
              </div>
              
              <div className="mb-4 w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-blue-600" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Start festive shopping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Festive budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F05959] rounded-full"></div>
                  <span className="text-[#F05959]">Thank you notes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Required Framer component properties
ChristmasPageFramer.defaultProps = {
  width: 1200,
  height: 800
};