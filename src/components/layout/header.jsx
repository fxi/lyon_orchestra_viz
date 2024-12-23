import { ThemeSwitcher } from "../theme/theme-switcher"
import { LanguageSwitcher } from "../language/language-switcher"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Analyse Orchestre</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground" />
            <ThemeSwitcher className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground" />
          </nav>
        </div>
      </div>
    </header>
  )
}
