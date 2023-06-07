function Name({ value, onChange }) {
  return (
    <div className="name-inputs">
      <label>
        Name *
        <input
          type="text"
          name="firstName"
          value={value.firstName}
          onChange={onChange}
          placeholder="First Name"
          required
        />
      </label>

      <label>
        <br></br>
        <input
          type="text"
          name="middleName"
          value={value.middleName}
          onChange={onChange}
          placeholder="Middle Name"
        />
      </label>

      <label>
        <br></br>
        <input
          type="text"
          name="lastName"
          value={value.lastName}
          onChange={onChange}
          placeholder="Last Name"
          required
        />
      </label>
    </div>
  );
}
export default Name;
