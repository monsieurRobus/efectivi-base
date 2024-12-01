export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className={`min-h-screen`}>
        <main className="flex-1 p-6 lg:px-8">
          {children}
        </main>
      </div>
    )
  }
  
  