const LanguageList = ({languages}) => {
    const languageList = Object.values(languages).map((language, index) => {
      return (
        <li key={index}>{language}</li>
      )
    })
    return (
      <div>
        <strong>languages:</strong>
        <ul>{languageList}</ul>
      </div>
    )
  }

  export default LanguageList