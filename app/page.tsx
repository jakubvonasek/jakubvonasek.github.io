import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Jakub.dev</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-lg">
          Full-stack developer, AI builder, and digital designer. I craft purposeful web and data-driven experiences—mixing deep tech with creative experimentation. Founder of GAIA, now evolving into PRAGUE LIVE, where tech meets climate action and ambient interactivity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-2">🌱 GAIA / PRAGUE LIVE</h3>
            <p className="mb-2">A living digital experience connecting virtual visits to real-world sustainability impact. Features an interactive map of Prague, ambient data overlays, and a real-time counter that triggers real-life planting.</p>
            <p className="text-sm text-gray-600 mb-2">Stack: React, Next.js, @react-three/fiber, TailwindCSS, WebGL, Render</p>
            <Button variant="outline">View Project</Button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">📊 Wikimedia Data Visualizer</h3>
            <p className="mb-2">A Python-based web app that visualizes trending pages and temporal patterns from Wikimedia data on a global interface. Modular architecture allows for scraping, analytics, and interactive rendering.</p>
            <p className="text-sm text-gray-600 mb-2">Stack: Python, Flask, Plotly, Wikimedia API</p>
            <Button variant="outline">View Project</Button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">🧾 LEI Status Checker</h3>
            <p className="mb-2">A tool for verifying and displaying legal entity registration statuses based on Czech ICOs and LEIs. Combines SQL queries, clean enums, and message logic.</p>
            <p className="text-sm text-gray-600 mb-2">Stack: Python, MySQL, MAMP</p>
            <Button variant="outline">View Project</Button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Frontend</h3>
            <p>React • Next.js • TypeScript • TailwindCSS • WebGL</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Backend</h3>
            <p>Python • Node.js • SQL • PostgreSQL • MongoDB (light use)</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Infra / DevOps</h3>
            <p>Render • Docker • GitHub Actions • Linux • macOS • Windows</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Creative & AI Tools</h3>
            <p>Figma • Logic Pro • V0 • Claude • Midjourney • Runway • Custom AI apps</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-4">Open to freelance, open-source collaboration, and bold ideas. Especially interested in climate tech, AI interfaces, and experiential platforms.</p>
        <p className="mb-4">Email: <a href="mailto:jakub.vonasek@styrax.cz" className="text-blue-600 hover:underline">jakub.vonasek@styrax.cz</a></p>
        <div className="flex gap-4">
          <Button variant="outline">GitHub</Button>
          <Button variant="outline">LinkedIn</Button>
          <Button variant="outline">Instagram</Button>
          <Button variant="outline">YouTube</Button>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600">
        <p>© 2025 Jakub.dev. All rights reserved.</p>
        <p>Rooted in code. Grown by intent.</p>
      </footer>
    </main>
  )
}
