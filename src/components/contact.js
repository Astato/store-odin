const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="contact-wrapper">
      <form id="contact-form" onSubmit={handleSubmit}>
        <h2>Contact us</h2>
        <label>Full Name: </label>
        <input type="text"></input>
        <label>Email:</label>
        <input type="email"></input>
        <label>Confirm Email:</label>
        <input type="email"></input>
        <label>Tel:</label>
        <input type="tel"></input>
        <label>How can we help you?</label>
        <textarea></textarea>
        <button type="submit">Send</button>
      </form>
      <div>
        <p>Fashion Trends</p>
        <p>123 Main Street, Cityville</p>
        <p>+1(555)789-0123</p>
        <p>Monday to Friday:</p>
        <p>9:00AM to 6:00 PM</p>
        <p>Weekends</p>
        <p>10:00 AM to 4:00 PM </p>
      </div>
    </div>
  );
};

export default Contact;
