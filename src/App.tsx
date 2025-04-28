import './App.css'
import CaseNotes from './components/CaseNotes'
import CaseSummary from './components/CaseSummary'
import SearchForm from './components/SearchForm'

function App() {
    return (
        <main className="!m-auto w-full h-screen max-w-[1200px]">
            <div className="flex flex-row w-full h-full">
                <SearchForm />
                <div className="flex flex-col w-full h-full">
                    <CaseSummary />
                    <CaseNotes />
                </div>
            </div>
        </main>
    )
}

export default App
