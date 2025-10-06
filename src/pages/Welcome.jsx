import { motion } from "framer-motion";
import { FaUserGraduate, FaHandshake, FaComments, FaRocket } from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBD786] to-[#F7797D] p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#FFF5E9] rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center border border-[#F9B384]"
      >
        <h1 className="text-4xl font-extrabold text-[#E87722] mb-2">
          Welcome to <span className="text-[#4E342E]">Skinder</span> 🚀
        </h1>
        <p className="text-[#4E342E]/80 mb-8 italic">
          Connect. Collaborate. Create.
        </p>

        <div className="space-y-6 text-left">
          <div className="flex items-start space-x-3">
            <FaUserGraduate className="text-[#E87722] text-2xl flex-shrink-0" />
            <p className="text-[#4E342E]">
              <span className="font-semibold">Show your true skills:</span> Build a profile that reflects your strengths and interests.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <FaHandshake className="text-[#F9B384] text-2xl flex-shrink-0" />
            <p className="text-[#4E342E]">
              <span className="font-semibold">Match with purpose:</span> Find collaborators who complement your abilities for projects or learning.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <FaComments className="text-[#F7797D] text-2xl flex-shrink-0" />
            <p className="text-[#4E342E]">
              <span className="font-semibold">Collaborate respectfully:</span> Communicate politely, value contributions, and maintain a positive space.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <FaRocket className="text-[#E87722] text-2xl flex-shrink-0" />
            <p className="text-[#4E342E]">
              <span className="font-semibold">Build, grow, achieve:</span> Turn connections into meaningful opportunities and growth.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-3 rounded-full text-white font-semibold text-lg 
          bg-gradient-to-r from-[#E87722] to-[#F7797D] shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
