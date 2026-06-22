const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">Avatar style</p>
      <div className="grid grid-cols-2 gap-3">
        <label className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-3 text-sm transition ${selectedGender === "male" ? "app-button-primary" : "app-panel-strong"}`}>
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-info radio-sm"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
        <label className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-3 text-sm transition ${selectedGender === "female" ? "app-button-primary" : "app-panel-strong"}`}>
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-info radio-sm"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox
