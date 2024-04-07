const MultipleCountriesNameDisplay = ({ name, showSelected }) => (
    <div>
      {name}
      <button onClick={showSelected}>show</button>
    </div>
  )

  export default MultipleCountriesNameDisplay