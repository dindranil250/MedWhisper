import React from 'react';
import { Mic, Clock, FileText, Lock, Zap, Globe } from 'lucide-react';

interface Feature {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    name: 'Advanced Speech Recognition',
    description: 'Industry-leading medical speech recognition with 99% accuracy for medical terminology.',
    icon: <Mic className="h-6 w-6 text-white" />,
  },
  {
    name: 'Real-time Transcription',
    description: 'Instantly convert speech to text during patient consultations with minimal latency.',
    icon: <Clock className="h-6 w-6 text-white" />,
  },
  {
    name: 'Automated Documentation',
    description: 'Generate structured clinical notes and reports directly from your conversations.',
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    name: 'HIPAA Compliant',
    description: 'End-to-end encryption and secure data handling that meets all healthcare privacy standards.',
    icon: <Lock className="h-6 w-6 text-white" />,
  },
  {
    name: 'AI-Powered Insights',
    description: 'Smart suggestions and clinical decision support based on conversation context.',
    icon: <Zap className="h-6 w-6 text-white" />,
  },
  {
    name: 'Multi-language Support',
    description: 'Support for 20+ languages to serve diverse patient populations effectively.',
    icon: <Globe className="h-6 w-6 text-white" />,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for Medical Documentation
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            MedWhisper combines cutting-edge AI with medical expertise to streamline your workflow.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {feature.icon}
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20">
          <div className="lg:mx-auto lg:max-w-3xl lg:text-center">
            <h3 className="text-2xl font-extrabold text-gray-900">
              Trusted by thousands of healthcare professionals
            </h3>
            <p className="mt-4 text-lg text-gray-500">
              Join the growing community of physicians who save hours every day with MedWhisper's AI-powered documentation assistant.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/conversation"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start Free Trial
                </a>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;