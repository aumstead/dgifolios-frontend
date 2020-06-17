import DateContext from './DateContext'

function DateState({ children }) {
  const today = new Date()
  const currentYear = today.getFullYear()

  return (
    <DateContext.Provider value={{
      currentYear
    }}>
      {children}
    </DateContext.Provider>
  )
}

export default DateState;