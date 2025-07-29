import React from 'react';
import { Check, Crown, Star, Zap } from 'lucide-react';

interface SubscriptionPlansProps {
  currentSubscription: 'free' | 'basic' | 'premium';
  onSubscriptionChange: (plan: 'free' | 'basic' | 'premium') => void;
}

export function SubscriptionPlans({ currentSubscription, onSubscriptionChange }: SubscriptionPlansProps) {
  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      price: '$0',
      period: 'forever',
      icon: <Star className="h-6 w-6" />,
      color: 'gray',
      features: [
        'Limited movie selection',
        '480p streaming quality',
        'Ads between content',
        'Watch on 1 device',
        'Basic customer support'
      ]
    },
    {
      id: 'basic' as const,
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      icon: <Zap className="h-6 w-6" />,
      color: 'blue',
      features: [
        'Full movie library access',
        '720p HD streaming',
        'No ads',
        'Watch on 2 devices',
        'Email customer support',
        'Download for offline viewing'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '$15.99',
      period: 'month',
      icon: <Crown className="h-6 w-6" />,
      color: 'yellow',
      popular: true,
      features: [
        'Everything in Basic',
        '4K Ultra HD streaming',
        'HDR and Dolby Atmos',
        'Watch on 4 devices',
        'Priority customer support',
        'Early access to new releases',
        'Exclusive premium content'
      ]
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      gray: {
        border: isSelected ? 'border-gray-400' : 'border-gray-700',
        bg: isSelected ? 'bg-gray-800' : 'bg-gray-800/50',
        button: 'bg-gray-600 hover:bg-gray-700',
        icon: 'text-gray-400'
      },
      blue: {
        border: isSelected ? 'border-blue-400' : 'border-gray-700',
        bg: isSelected ? 'bg-blue-900/30' : 'bg-gray-800/50',
        button: 'bg-blue-600 hover:bg-blue-700',
        icon: 'text-blue-400'
      },
      yellow: {
        border: isSelected ? 'border-yellow-400' : 'border-gray-700',
        bg: isSelected ? 'bg-yellow-900/30' : 'bg-gray-800/50',
        button: 'bg-yellow-600 hover:bg-yellow-700',
        icon: 'text-yellow-400'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-400">
          Unlock unlimited entertainment with our flexible subscription options
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isSelected = currentSubscription === plan.id;
          const colorClasses = getColorClasses(plan.color, isSelected);

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-8 transition-all duration-300 hover:scale-105 ${colorClasses.border} ${colorClasses.bg}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 mb-4 ${colorClasses.icon}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-1">
                  {plan.price}
                  {plan.period !== 'forever' && (
                    <span className="text-lg text-gray-400">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSubscriptionChange(plan.id)}
                disabled={isSelected}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isSelected
                    ? 'bg-green-600 text-white cursor-default'
                    : `${colorClasses.button} text-white`
                }`}
              >
                {isSelected ? 'Current Plan' : `Choose ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-4">
          All plans include a 30-day money-back guarantee
        </p>
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
          <span>✓ Cancel anytime</span>
          <span>✓ No hidden fees</span>
          <span>✓ Secure payments</span>
          <span>✓ 24/7 support</span>
        </div>
      </div>
    </div>
  );
}