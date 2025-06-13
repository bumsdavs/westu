import { Button } from "@/components/ui/button"
import { Menu, Globe } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 text-black font-bold text-lg px-2 py-1 rounded">W</div>
            <span className="text-xl font-semibold">Western Union</span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-white hidden hover:text-yellow-400 transition-colors">
              Send money
            </a>
            <a href="#" className="text-yellow-400 font-medium">
              Track a transfer
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
            </div>
            <Button
              variant="outline"
              className="hidden text-black border-white hover:bg-white text-sm px-3 py-1"
            >
              Register
            </Button>
            <Button variant="outline" className="text-black hidden border-white hover:bg-white text-sm px-3 py-1">
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
