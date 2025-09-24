import React, { useState, useEffect } from 'react';

// Framer-ready Planning Steps component
export default function PlanningStepsFramer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const totalSteps = 3;

  // Dynamic text for each step
  const stepTexts = [
    "Spark ideas for festive fun",
    "Shape your festive plans", 
    "Start - Shopping!"
  ];

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % totalSteps);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalSteps]);

  const handlePrevious = () => {
    setCurrentStep(prev => prev === 0 ? totalSteps - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentStep(prev => (prev + 1) % totalSteps);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="bg-[#F05959] text-white px-8 py-6 rounded-2xl shadow-lg max-w-md mx-auto">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Planning Steps</h3>
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="text-white/80 hover:text-white transition-colors text-base font-medium"
        >
          {isAutoPlay ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-3 mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleStepClick(index)}
            className={`flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
              index === currentStep 
                ? 'bg-white' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Current Step Display */}
      <div className="mb-4 text-center">
        <div className="text-xl font-semibold mb-2">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="text-lg">
          {stepTexts[currentStep]}
        </div>
      </div>

      {/* Navigation Boxes (No Arrows) */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          className="flex-1 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center transition-colors"
        >
          <span className="text-sm font-medium text-center px-2">
            {stepTexts[currentStep === 0 ? totalSteps - 1 : currentStep - 1]}
          </span>
        </button>
        <button
          onClick={handleNext}
          className="flex-1 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center transition-colors"
        >
          <span className="text-sm font-medium text-center px-2">
            {stepTexts[currentStep === totalSteps - 1 ? 0 : currentStep + 1]}
          </span>
        </button>
      </div>
    </div>
  );
}

// Framer component configuration
PlanningStepsFramer.defaultProps = {
  width: 400,
  height: 280
};