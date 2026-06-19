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

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="relative min-h-screen font-body text-offwhite">
      <CircuitBackground />
      <CursorGlow />
      {!booted && <Preloader onDone={() => setBooted(true)} />}
      <Navbar />
      <main>
        <Hero />
        <RevealWipe>
          <About />
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
