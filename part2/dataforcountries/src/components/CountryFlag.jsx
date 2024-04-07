const CountryFlag = ({flags}) => {
    const png = flags.png
    const alt = flags.alt

    return (
      <img className="flag" src={png} alt={alt} />
      )
  }

  export default CountryFlag