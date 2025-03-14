import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  Award,
  Clock,
  Users,
  DollarSign,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import BountySubmissionForm, { BountyFormData } from "./bounty-submission-form";
import { useContract } from "../../hooks/use-contract";

// Định nghĩa kiểu dữ liệu cho Bounty
export interface BountyType {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  participants: number;
  status: "open" | "closed" | "in-progress";
  tags: string[];
  createdBy: string;
  requirements: string[];
  submissionLink?: string;
}
export interface IBounty {
  bounty_id: string; // Unique identifier for the bounty
  cancelled: boolean; // Indicates if the bounty is cancelled
  creator: string; // Address of the bounty creator
  dataRef: string; // Reference to external data (IPFS hash or other)
  distributed: boolean; // Indicates if the reward has been distributed
  expiredAt: string; // Expiration time (in seconds or timestamp)
  minOfParticipants: string; // Minimum number of participants required
  participants: string[]; // List of participant addresses
  rewardAmount: string; // Total reward amount (in smallest denomination)
}
export interface IDetailBounty {
  title: string;
  description: string;
  requirements: string[];
  tags: string[];
  allPostData: {
    [key: string]: string[];
  };
}
interface BountyCardProps {
  bounty: IDetailBounty;
  onClick: (bounty: IDetailBounty) => void;
}

interface BountyModalProps {
  bounty: IDetailBounty | null;
  isOpen: boolean;
  onClose: () => void;
}

// Component Card hiển thị thông tin ngắn gọn của Bounty
const BountyCard: React.FC<BountyCardProps> = ({ bounty, onClick }) => {
  // Tính toán thời gian còn lại
  const calculateTimeLeft = () => {
    const difference =
      new Date(bounty.deadline).getTime() - new Date().getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : "Expired";
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => onClick(bounty)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status Badge */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${"bg-green-100 text-green-800"}`}
        >
          {/* {bounty.status.toUpperCase()} */}
          open
        </span>
        <span className="text-sm text-gray-500 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {calculateTimeLeft()}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2 line-clamp-2">{bounty.title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">{bounty.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {bounty.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
          >
            {tag}
          </span>
        ))}
        {bounty.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
            +{bounty.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center text-blue-600 font-medium">
          <DollarSign className="w-5 h-5 mr-1" />
          100 Aptos
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Users className="w-4 h-4 mr-1" />
          32 participants
        </div>
      </div>
    </motion.div>
  );
};

// Component Modal hiển thị thông tin chi tiết của Bounty
const BountyModal: React.FC<BountyModalProps> = ({
  bounty,
  isOpen,
  onClose,
}) => {
  if (!bounty) return null;

  // Animation variants
  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: "100%", opacity: 0 },
  };

  // Border animation
  const borderVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-end justify-center">
          <motion.div
            className="relative bg-white rounded-t-3xl w-full max-w-4xl mx-4 mt-[200px] shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Animated Border */}
            <div className="absolute -top-1 left-0 w-full h-full pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,0 L100,0 L100,100 L0,100 L0,0"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="0.5"
                  variants={borderVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${"bg-green-100 text-green-800"}`}
                  >
                    open
                  </span>
                  {/* <span className="text-sm text-gray-500">
                    Created by {bounty.createdBy}
                  </span> */}
                </div>
                <h2 className="text-3xl font-bold">{bounty.title}</h2>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {bounty.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {bounty.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {bounty.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Reward */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-blue-600" />
                      Reward
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      1000 Aptos
                    </p>
                  </div>

                  {/* Deadline */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-600" />
                      Deadline
                    </h3>
                    {/* <p className="text-lg font-medium">
                      {new Date(bounty.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p> */}
                  </div>

                  {/* Participants */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gray-600" />
                      Participants
                    </h3>
                    <p className="text-lg font-medium">32</p>
                  </div>

                  {/* Apply Button */}
                  {
                    <Link
                      to={`/app/bounty/submit/${bounty.description}`}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      Apply for Bounty
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  }
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Component chính quản lý danh sách Bounty
const BountyList: React.FC = () => {
  const [bounties, setBounties] = useState<IDetailBounty[]>([]);
  const [selectedBounty, setSelectedBounty] = useState<IDetailBounty | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [bounties, setBounties] = useState<IBounty[]>([])
  const { getAllBounties } = useContract();
  useEffect(() => {
    fetchBounties();
  }, []);
  const fetchBounties = async () => {
    try {
      const data = await getAllBounties<IBounty[]>();

      // Use Promise.all to wait for all async operations
      const temp: IDetailBounty[] = await Promise.all(
        data.map(async (e) => {
          const da = await getPinataData(e.bounty_id);
          return da;
        })
      );

      setBounties(temp);
    } catch (error) {
      console.error("Error fetching bounties:", error);
    } finally {
      setLoading(false);
    }
  };
  const getPinataData = async (cid: string): Promise<IDetailBounty> => {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log("Data from IPFS:", data);
      return data as IDetailBounty;
    } catch (error) {
      console.error("IPFS Error:", error.message);
      throw error;
    }
  };
  // Giả lập dữ liệu
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu
    // setTimeout(() => {
    //   setBounties(mockBounties);
    //   setLoading(false);
    // }, 1000); // Giả lập thời gian tải
  }, []);

  const handleOpenModal = (bounty: IDetailBounty) => {
    setSelectedBounty(bounty);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmitBounty = (formData: BountyFormData) => {
    // Tạo bounty mới với ID ngẫu nhiên và các giá trị mặc định
    // const newBounty: IDetailBounty = {
    //   // id: `bounty-${Date.now()}`,
    //   title: formData.title,
    //   description: formData.description,
    //   // reward: formData.reward,
    //   // deadline: formData.deadline,
    //   // participants: 0, // Mặc định là 0
    //   // status: 'open', // Mặc định là open
    //   tags: formData.tags,
    //   // createdBy: 'Current User', // Trong thực tế, lấy từ user đang đăng nhập
    //   requirements: formData.requirements,
    //   allPostData:[d:"dk"]
    //   // submissionLink: '#'
    // };
    // // Thêm bounty mới vào danh sách
    // setBounties([newBounty, ...bounties]);
    // // Hiển thị thông báo thành công (có thể thêm toast notification ở đây)
    // console.log('Bounty created successfully:', newBounty);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Bounties</h1>
          <p className="text-gray-600">
            Discover and contribute to exciting projects
          </p>
        </div>

        {/* Nút tạo bounty mới */}
        <button
          onClick={handleOpenForm}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Bounty
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.map((bounty) => (
            <BountyCard
              key={bounty.description}
              bounty={bounty}
              onClick={handleOpenModal}
            />
          ))}
        </div>
      )}

      <BountyModal
        bounty={selectedBounty}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Form tạo bounty mới */}
      <BountySubmissionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitBounty}
      />
    </div>
  );
};

export default BountyList;
