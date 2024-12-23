import { ThemeProvider } from "./components/theme/theme-provider"
import { Header } from "./components/layout/header"
import { HeatMapContainer } from "./components/heatmap/heat-map-container"
import './i18n/config'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="orchestre-theme">
      <div className="relative flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <div className="container py-6">
            <HeatMapContainer />
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
