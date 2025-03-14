import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BountySubmitPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/app/bounty')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Bounties
        </button>
        
        <h1 className="text-3xl font-bold mb-6">Submit Solution for Bounty #{id}</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p>Form sẽ được hiển thị ở đây</p>
        </div>
      </div>
    </div>
  );
} 