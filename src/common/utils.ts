class Utils {
    static copyToClipboard(text: string): void {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log('Text copied to clipboard')
            })
            .catch((error) => {
                console.error('Failed to copy text:', error)
            })
    }
}

export default Utils
