export default function Contact() {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="text-center p-6 bg-gray-800 text-white">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p>We're here to help with all your transportation service inquiries</p>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row min-h-[600px]">
        {/* Contact Info */}
        <div className="sm:flex-1 p-6 flex flex-col justify-center">
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl text-red-600 font-semibold mb-2">
              Working Hours
            </h3>
            <p>Sunday to Thursday</p>
            <p>8:00 AM - 4:00 PM</p>
          </div>

          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl text-red-600 font-semibold mb-2">
              Contact Information
            </h3>
            <p>Phone: +962-5-3903333</p>
            <p>Email: huniv@hu.edu.jo</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl text-red-600 font-semibold mb-2">Address</h3>
            <p>The Hashemite University</p>
            <p>Zarqa, Jordan</p>
          </div>
        </div>

        {/* Map */}
        <div className="sm:flex-1 mt-6 sm:mt-0">
          <iframe
            className="w-full h-96 sm:h-full border border-[#1f2937]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.755871138239!2d36.18331018483494!3d32.102883081180764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b73d1eb51be21%3A0xc4daca834a1e6988!2z2KfZhNis2KfZhdi52Kkg2KfZhNmH2KfYtNmF2YrYqQ!5e0!3m2!1sar!2sjo!4v1739862400973!5m2!1sar!2sjo"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
