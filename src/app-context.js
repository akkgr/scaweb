import React from 'react'

const AppContext = React.createContext({
  user: {},
  selectedNodes: [],
  selectNode: nodes => {},
  showMessage: (type, message, description) => {},
  showLoading: b => {}
})

export default AppContext
