const Pagination = ({
  currentPage,
  hasNextPage,
  goToPreviousPage,
  goToNextPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-5 py-2 rounded-md transition-all duration-300 flex items-center ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-90"
        }`}
        style={{
          backgroundColor: "var(--primary-color)",
          color: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Previous
      </button>

      <div className="flex items-center space-x-2">
        <span
          className="flex items-center justify-center w-10 h-10 rounded-full text-white"
          style={{
            backgroundColor: "var(--secondary-color)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {currentPage}
        </span>
      </div>

      <button
        onClick={goToNextPage}
        disabled={!hasNextPage}
        className={`px-5 py-2 rounded-md transition-all duration-300 flex items-center ${
          !hasNextPage ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
        style={{
          backgroundColor: "var(--primary-color)",
          color: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
