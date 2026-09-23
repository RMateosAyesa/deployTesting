import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'SF Pro', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #4D4D4D;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #BCBCBC;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #4D4D4D transparent;
  }
`
