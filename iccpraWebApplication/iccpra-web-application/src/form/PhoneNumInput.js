import InputMask from "react-input-mask";
function PhoneNumberInput({ value, onChange }) {
  return (
    <label>
      Phone Number *
      <br />
      <InputMask
        mask="(999) 999-9999"
        value={value.phoneNumber}
        onChange={onChange}
        name="phoneNumber"
        className="input-field"
        required
      />
    </label>
  );
}
export default PhoneNumberInput;
