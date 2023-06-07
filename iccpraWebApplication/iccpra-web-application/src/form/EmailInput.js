function EmailInput({ value, onChange }) {
  return (
    <label>
      Email *
      <div className="form-note">
        You will receive your CPR online session Link and CPR certificate
        through your email.
      </div>
      <input
        type="email"
        name="email"
        value={value.email}
        onChange={onChange}
        placeholder="example@example.com"
        required
      />
    </label>
  );
}
export default EmailInput;
