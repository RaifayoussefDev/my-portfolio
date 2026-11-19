import { useState } from 'react'
import CircuitBackground from './components/CircuitBackground'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedProject from './components/FeaturedProject'
import Experience from './components/Experience'
import Skills from './components/Skills'
import GitHubContributions from './components/GitHubContributions'
import Education from './components/Education'
import Contact from './components/Contact'
import Preloader from './components/Preloader'
import RevealWipe from './components/RevealWipe'
import AiChat from './components/AiChat'
import Stats from './components/Stats'
import Terminal from './components/Terminal'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import CommandPalette from './components/CommandPalette'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="relative min-h-screen font-body text-offwhite">
      <CircuitBackground />
      <CursorGlow />
      {!booted && <Preloader onDone={() => setBooted(true)} />}
      <Navbar />
      <AiChat />
      <CommandPalette />
      <main>
        <Hero ready={booted} />
        <TechMarquee />
        <RevealWipe>
          <About />
        </RevealWipe>
        <Stats />
        <RevealWipe>
          <Terminal />
        </RevealWipe>
        <RevealWipe>
          <FeaturedProject />
        </RevealWipe>
        <RevealWipe>
          <Experience />
        </RevealWipe>
        <RevealWipe>
          <Skills />
        </RevealWipe>
        <RevealWipe>
          <Services />
        </RevealWipe>
        <RevealWipe>
          <GitHubContributions />
        </RevealWipe>
        <RevealWipe>
          <Education />
        </RevealWipe>
        <RevealWipe>
          <Contact />
        </RevealWipe>
      </main>
    </div>
  )
}
