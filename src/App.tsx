import './App.css'
import CaseNotes from './components/CaseNotes'
import CaseSummary from './components/CaseSummary'

function App() {
    return (
        <main className="!m-auto w-full h-full max-w-[1200px] flex flex-col p-2">
            <CaseSummary />
            <CaseNotes />
        </main>
    )
}

export default App
