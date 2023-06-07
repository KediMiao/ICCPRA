import React, { useState } from "react";

function TermsConditions({ value, onChange, onTermsOpen }) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleTermsOpen = () => {
    setIsTermsOpen(true);
    onTermsOpen && onTermsOpen();
  };

  const handleTermsClose = () => {
    setIsTermsOpen(false);
  };

  return (
    <div>
      <label>
        Agree to terms and conditions *
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={value.agreeToTerms}
          onChange={onChange}
          required
        />
        <a href="#" onClick={handleTermsOpen}>
          View terms and conditions
        </a>
      </label>

      {isTermsOpen && (
        <div className="modal modal-open">
          <div className="modal-content">
            <h2>Terms and Conditions</h2>
            {/* Replace this with your actual terms and conditions */}
            <p>terms and conditions...</p>
            <button onClick={handleTermsClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TermsConditions;
