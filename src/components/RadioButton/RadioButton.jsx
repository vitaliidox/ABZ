import "./radioButton.scss";

export const RadioButton = ({
  position,
  id,
}) => {
  return (
    <label className="radio-button">
      <div className="radio-button__wrapper">
        <input
          required
          type="radio"
          name="position"
          value={id}
        />

        <span className="radio-button__component" />
      </div>

      <p className="radio-button__text">
        {position}
      </p>
    </label>
  )
}
