import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#4965cd'
        },
        secondary: {
            main: '#e2eaff'
        }
    },
    typography: {
        fontFamily: "'Roboto', sans-serif"
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: '12px',
                    background: 'white'
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: '#fafafa'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1rem'
                }
            }
        }
    }
})

export default theme
