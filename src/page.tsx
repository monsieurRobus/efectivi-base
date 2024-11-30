import Switch from './switch'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Switch Component Demo</h1>
        <Switch label="Toggle me" onChange={(checked) => console.log('Switch toggled:', checked)} />
      </div>
    </div>
  )
}

