import "../Styles/BookingForm.css";

export default function BookingForm() {
  return (
    <div className="booking-form-section ">
      <h3 className="booking-form-title ">Buy Ticket</h3>
      <div>
        <select className="custom-select" defaultValue="">
          <option value="" disabled>
            From
          </option>
          <option value="amman">Amman</option>
          <option value="zarqa">Zarqa</option>
        </select>

        <select className="custom-select" defaultValue="">
          <option value="" disabled>
            To
          </option>
          <option value="hu">HU</option>
        </select>
        <input type="date" />
        <button>
          <a href="html/SearchBus.html">Search Buses</a>
        </button>
      </div>
    </div>
  );
}
