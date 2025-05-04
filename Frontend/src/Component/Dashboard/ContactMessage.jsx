import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { MessageSquare, Search, Mail, AlertCircle, Menu } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/dashboard/contact-messages?page=${currentPage}&limit=${itemsPerPage}`
        );
        setMessages(response.data);
        // Check if there are more messages for the next page
        setHasNextPage(response.data.length === itemsPerPage);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchMessages();
  }, [currentPage]);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Table headers configuration for both table and cards
  const tableHeaders = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "message",
      label: "Message",
      render: (message) =>
        message.message.length > 50
          ? `${message.message.substring(0, 50)}...`
          : message.message,
    },
    { key: "actions", label: "Action" },
  ];

  // Render action buttons for both table and cards
  const renderActions = (message) => {
    return (
      <button
        onClick={() => handleReply(message)}
        className="flex items-center py-2 px-4 rounded text-white transition-colors"
        style={{ backgroundColor: "var(--secondary-color)" }}
      >
        <Mail className="mr-2" size={16} />
        Reply
      </button>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile sidebar toggle */}
      <div
        className="md:hidden p-4 flex items-center"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <button onClick={toggleSidebar} className="text-white p-2 rounded-md">
          <Menu size={24} />
        </button>
        <h1 className="text-xl text-white font-bold ml-2">Dashboard</h1>
      </div>

      {/* Sidebar for mobile (conditional) */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block md:static fixed inset-0 z-20 bg-black bg-opacity-50 md:bg-opacity-0`}
      >
        <div className="w-64 md:w-auto md:relative h-full">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      <div
        className="dashboard-content p-4 md:p-8 flex-1 overflow-auto"
        style={{ backgroundColor: "var(--third-color)" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            <span className="flex items-center">
              <MessageSquare className="mr-2" />
              Contact Messages
            </span>
          </h1>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr style={{ backgroundColor: "var(--primary-color)" }}>
                    {tableHeaders.map((header, index) => (
                      <th key={index} className="p-4 text-white text-left">
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((message) => (
                    <tr
                      key={message.contactId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 whitespace-nowrap">{message.name}</td>
                      <td className="p-4 whitespace-nowrap">{message.email}</td>
                      <td className="p-4">
                        {message.message.length > 50
                          ? `${message.message.substring(0, 50)}...`
                          : message.message}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {renderActions(message)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (visible only on mobile) - Integrated directly in page */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMessages.map((message, index) => (
                <div
                  key={message.contactId}
                  className="bg-white rounded-lg shadow-md p-4 mb-4 border-t-4 border-[var(--secondary-color)] hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Header with index */}
                  <div className="mb-3 flex justify-between items-center">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--third-color)] text-[var(--primary-color)]">
                      Message #{index + 1}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-[var(--primary-color)] uppercase tracking-wider">
                      Name
                    </p>
                    <p className="font-medium text-gray-900 mt-1">
                      {message.name}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-[var(--primary-color)] uppercase tracking-wider">
                      Email
                    </p>
                    <p className="font-medium text-gray-900 mt-1 break-all">
                      {message.email}
                    </p>
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-[var(--primary-color)] uppercase tracking-wider">
                      Message
                    </p>
                    <p className="text-gray-700 mt-1 text-sm">
                      {message.message.length > 50
                        ? `${message.message.substring(0, 50)}...`
                        : message.message}
                    </p>
                  </div>

                  {/* Action button */}
                  <div className="mt-4 pt-3 border-t border-[var(--third-color)]">
                    {renderActions(message)}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <AlertCircle
              size={48}
              className="mx-auto mb-4"
              style={{ color: "var(--primary-color)" }}
            />
            <p className="text-xl">No messages found</p>
          </div>
        )}

        {/* Responsive Pagination */}
        <div className="mt-4">
          {(hasNextPage || currentPage > 1) && (
            <Pagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          )}
        </div>

        {/* Responsive Modal */}
        {selectedMessage && (
          <div
            className="fixed inset-0 flex items-center justify-center transition-opacity duration-300 z-50"
            style={{
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
              className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 transition-transform duration-300"
              style={{
                zIndex: 1100,
                transform: modalVisible ? "scale(1)" : "scale(0.95)",
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

              <div className="p-4 md:p-6 bg-white">
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

              <div className="px-4 md:px-6 py-3 bg-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 rounded-b-lg">
                <button
                  onClick={closeModal}
                  className="py-2 px-4 rounded border border-gray-300 hover:bg-gray-200 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  className="py-2 px-4 rounded text-white w-full sm:w-auto mb-2 sm:mb-0"
                  style={{ backgroundColor: "var(--secondary-color)" }}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default ContactMessages;
