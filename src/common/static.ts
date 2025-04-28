export const noOfRowsPerPages = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' }
]

export const numericFieldProps = {
    sx: {
        '& input::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: 0
        },
        '& input::-webkit-inner-spin-button': {
            appearance: 'none',
            margin: 0
        }
    },
    slotProps: {
        input: {
            inputMode: 'numeric' as const,
            autoComplete: 'off'
        }
    }
}
