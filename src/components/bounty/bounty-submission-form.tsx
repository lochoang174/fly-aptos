import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Minus, Calendar, DollarSign } from 'lucide-react';

interface BountySubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: BountyFormData) => void;
}

export interface BountyFormData {
  title: string;
  description: string;
  reward: number;
  deadline: string;
  tags: string[];
  requirements: string[];
}

const BountySubmissionForm: React.FC<BountySubmissionFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<BountyFormData>({
    title: '',
    description: '',
    reward: 0,
    deadline: '',
    tags: [''],
    requirements: [''],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BountyFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Xóa lỗi khi người dùng sửa
    if (errors[name as keyof BountyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const addTag = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = [...formData.tags];
      newTags.splice(index, 1);
      setFormData((prev) => ({ ...prev, tags: newTags }));
    }
  };

  const addRequirement = () => {
    setFormData((prev) => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newRequirements = [...formData.requirements];
      newRequirements.splice(index, 1);
      setFormData((prev) => ({ ...prev, requirements: newRequirements }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BountyFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.reward <= 0) {
      newErrors.reward = 'Reward must be greater than 0';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate <= today) {
        newErrors.deadline = 'Deadline must be in the future';
      }
    }
    
    const emptyTags = formData.tags.some(tag => !tag.trim());
    if (emptyTags) {
      newErrors.tags = 'All tags must be filled';
    }
    
    const emptyRequirements = formData.requirements.some(req => !req.trim());
    if (emptyRequirements) {
      newErrors.requirements = 'All requirements must be filled';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Trong thực tế, bạn sẽ gọi API để lưu dữ liệu
      await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập API call
      
      // Gọi callback onSubmit
      onSubmit(formData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        reward: 0,
        deadline: '',
        tags: [''],
        requirements: [''],
      });
      
      // Đóng form
      onClose();
    } catch (error) {
      console.error('Error submitting bounty:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const modalVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: { y: '100%', opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div 
        className="relative bg-white rounded-2xl w-full max-w-4xl mx-4 shadow-2xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Create New Bounty</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-lg font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a clear, descriptive title for your bounty"
              className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-lg font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the bounty, including goals and expected deliverables"
              rows={6}
              className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          
          {/* Reward and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reward */}
            <div className="space-y-2">
              <label htmlFor="reward" className="block text-lg font-medium">
                Reward (USDC) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  id="reward"
                  name="reward"
                  value={formData.reward}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  placeholder="1000"
                  className={`w-full p-3 pl-10 border ${errors.reward ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                />
              </div>
              {errors.reward && <p className="text-red-500 text-sm">{errors.reward}</p>}
            </div>
            
            {/* Deadline */}
            <div className="space-y-2">
              <label htmlFor="deadline" className="block text-lg font-medium">
                Deadline <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border ${errors.deadline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                />
              </div>
              {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-lg font-medium">
                Tags <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addTag}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Tag
              </button>
            </div>
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            
            <div className="space-y-3">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder="e.g., Smart Contract, UI/UX, Documentation"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-lg font-medium">
                Requirements <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Requirement
              </button>
            </div>
            {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
            
            <div className="space-y-3">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="e.g., Experience with Solidity, Knowledge of UI/UX principles"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
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
                    Create Bounty
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BountySubmissionForm; 