import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { MessageSquare, Search, Mail, AlertCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/dashboard/contact-messages?page=${currentPage}&limit=${itemsPerPage}`
        ); // Pagination added here
        setMessages(response.data);
        // Check if there are more messages for the next page
        setHasNextPage(response.data.length === itemsPerPage);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchMessages();
  }, [currentPage]); // Refetch data when the page changes

  const handleReply = (message) => {
    setSelectedMessage(message);
    setTimeout(() => {
      setModalVisible(true);
    }, 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedMessage(null);
    }, 300);
  };

  const submitReply = async () => {
    try {
      const replyMessage = document.getElementById("replyText").value;
      if (!replyMessage) {
        toast.warning("Please enter your reply.");
        return;
      }
      await axios.post("http://localhost:4000/dashboard/admin/reply-message", {
        email: selectedMessage.email,
        replyMessage,
      });
      toast.success(`Reply sent to ${selectedMessage.email}`);
      closeModal();
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="dashboard-content p-8 flex-1 overflow-auto"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            <span className="flex items-center">
              <MessageSquare className="mr-2" />
              Contact Messages
            </span>
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {filteredMessages.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--primary-color)" }}>
                  <th className="p-4 text-white text-left">Name</th>
                  <th className="p-4 text-white text-left">Email</th>
                  <th className="p-4 text-white text-left">Message</th>
                  <th className="p-4 text-white text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr
                    key={message.contactId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">{message.name}</td>
                    <td className="p-4">{message.email}</td>
                    <td className="p-4">
                      {message.message.length > 50
                        ? `${message.message.substring(0, 50)}...`
                        : message.message}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleReply(message)}
                        className="flex items-center py-2 px-4 rounded text-white transition-colors"
                        style={{ backgroundColor: "var(--secondary-color)" }}
                      >
                        <Mail className="mr-2" size={16} />
                        Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <AlertCircle
              size={48}
              className="mx-auto mb-4"
              style={{ color: "var(--primary-color)" }}
            />
            <p className="text-xl">No messages found</p>
          </div>
        )}

        {/* Replace the pagination with the new component */}
        {(hasNextPage || currentPage > 1) && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}

        {/* Reply Modal with overlay, zoom effect, and higher z-index */}
        {selectedMessage && (
          <div
            className="fixed inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{
              zIndex: 1000,
              opacity: modalVisible ? 1 : 0,
            }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              onClick={closeModal}
            ></div>

            {/* Modal Content with Zoom Effect */}
            <div
              className="relative bg-white rounded-lg shadow-lg w-full max-w-lg transition-transform duration-300"
              style={{
                zIndex: 1100,
                transform: modalVisible ? "scale(1.05)" : "scale(0.95)",
              }}
            >
              <div
                className="p-4 border-b"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
              >
                <h3 className="text-lg font-medium">
                  Reply to {selectedMessage.name}
                </h3>
              </div>

              <div className="p-6 bg-white">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Original Message:
                  </label>
                  <p className="p-3 bg-gray-100 rounded">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Your Reply:
                  </label>
                  <textarea
                    id="replyText"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                  ></textarea>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-100 flex justify-end rounded-b-lg">
                <button
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 rounded border border-gray-300 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: "var(--secondary-color)" }}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactMessages;
