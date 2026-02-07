import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          GitHub User Search
        </h1>
        <Search />
      </div>
    </div>
  )
}

export default App
