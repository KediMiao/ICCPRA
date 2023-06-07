function FeedBackInput({ value, onChange }) {
  return (
    <div>
      <label>
        How did you hear about us? *
        <div className="form-note">Your feedback is very important to us </div>
        <select
          name="channel"
          value={value.channel}
          onChange={onChange}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="Redcross">Redcross</option>
          <option value="Googlesearch">Google Search</option>
          <option value="Friend">Refer by friends</option>
          <option value="Instagram">Instagram</option>
          <option value="Other">Other</option>
        </select>
      </label>
      {value.channel === "Other" && (
        <input
          type="text"
          name="otherDetails"
          value={value.otherDetails}
          onChange={onChange}
          placeholder="Please enter details, Thank you."
          required
        />
      )}
    </div>
  );
}

export default FeedBackInput;
