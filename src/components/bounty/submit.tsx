import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Paperclip, X, Check } from 'lucide-react';

interface BountySubmissionData {
  bountyId: string;
  solution: string;
  githubLink?: string;
  additionalInfo?: string;
  files: File[];
}

export default function BountySubmitPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bounty, setBounty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<BountySubmissionData>({
    bountyId: id || '',
    solution: '',
    githubLink: '',
    additionalInfo: '',
    files: [],
  });
  
  // Giả lập lấy thông tin bounty
  useEffect(() => {
    const fetchBounty = async () => {
      try {
        // Trong thực tế, gọi API để lấy thông tin bounty
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setBounty({
          id: id,
          title: 'Develop a Smart Contract for Decentralized Voting',
          description: 'We are looking for a developer to create a secure and efficient smart contract for decentralized voting.',
          reward: 5000,
          deadline: '2024-12-31',
          status: 'open',
        });
      } catch (error) {
        console.error('Error fetching bounty:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBounty();
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData(prev => ({ ...prev, files: newFiles }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.solution) {
      alert('Please provide a solution description');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Trong thực tế, gọi API để submit solution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submission data:', formData);
      setSubmitted(true);
      
      // Sau 3 giây, chuyển hướng về trang bounty
      setTimeout(() => {
        navigate('/app/bounty');
      }, 3000);
    } catch (error) {
      console.error('Error submitting solution:', error);
      alert('Failed to submit solution. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  if (!bounty) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bounty Not Found</h2>
          <p className="text-gray-600 mb-6">The bounty you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/app/bounty')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Bounties
          </button>
        </div>
      </div>
    );
  }
  
  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <motion.div 
          className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
          <p className="text-gray-600 mb-6">Your solution has been submitted successfully. We'll review it and get back to you soon.</p>
          <p className="text-sm text-gray-500">Redirecting to bounties page...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/app/bounty')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Bounties
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Submit Solution</h1>
          <p className="text-gray-600">
            You're submitting a solution for: <span className="font-medium">{bounty.title}</span>
          </p>
        </div>
        
        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Solution Description */}
          <div className="space-y-2">
            <label htmlFor="solution" className="block text-lg font-medium">
              Solution Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Describe your solution in detail. Include how it meets the requirements and any challenges you faced."
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          {/* GitHub Link */}
          <div className="space-y-2">
            <label htmlFor="githubLink" className="block text-lg font-medium">
              GitHub Repository Link
            </label>
            <input
              type="url"
              id="githubLink"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/yourusername/your-repo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          {/* Additional Information */}
          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="block text-lg font-medium">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any additional information you'd like to share about your submission"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          {/* File Upload */}
          <div className="space-y-4">
            <label className="block text-lg font-medium">
              Attachments
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="files" className="cursor-pointer">
                <Paperclip className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p className="text-gray-600 mb-1">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500">Upload any relevant files (max 10MB each)</p>
              </label>
            </div>
            
            {/* File List */}
            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Uploaded Files:</h3>
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Paperclip className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/app/bounty')}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Submit Solution
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 