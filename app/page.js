"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Check,
  Code,
  Layers,
  MessageSquare,
  MousePointerClick,
  Sparkles,
  X,
  Zap,
  Clock,
  DollarSign,
  BarChart,
  Users,
  Palette,
  Laptop,
  Repeat,
  Trash2,
  Pencil,
  ArrowDown,
} from "lucide-react";

/**
 * UIBlocks Landing Page
 *
 * This page showcases a product that helps developers build UI components
 * more efficiently using AI and visual editing tools.
 */
export default function Home() {
  const [theme, setTheme] = useState("light");

  // Apply theme class to body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "doodle");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-white overflow-hidden transition-colors duration-300"
      )}
    >
      {/* Navigation Bar */}
      <Navigation theme={theme} setTheme={setTheme} />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <ProblemSection theme={theme} />

      {/* Solution Section */}
      <SolutionSection theme={theme} />

      {/* How It Works Section */}
      <HowItWorksSection theme={theme} />

      {/* Demo Section */}
      <DemoSection theme={theme} />

      {/* Comparison Section */}
      <ComparisonSection theme={theme} />

      {/* ROI Calculator Section */}
      <ROICalculatorSection theme={theme} />

      {/* Use Cases Section */}
      <UseCasesSection theme={theme} />

      {/* Testimonials Section */}
      {/* <TestimonialsSection theme={theme} /> */}

      {/* FAQ Section */}
      <FAQSection theme={theme} />

      {/* Waitlist Section */}
      <WaitlistSection theme={theme} />

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
}

/**
 * Navigation Component
 *
 * Responsive navigation bar with logo, menu links, and CTA button
 */
function Navigation({ theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300",
        scrolled
          ? "bg-background/95 border-border"
          : "bg-transparent border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: 0, ease: "easeInOut" }}
            className={cn(
              theme === "doodle" &&
                "border-2 border-dashed border-primary rounded-full p-1"
            )}
          >
            <Layers className="h-6 w-6 text-primary" />
          </motion.div>
          <span
            className={cn(
              "text-lg font-bold",
              theme === "doodle" && "font-comic"
            )}
          >
            UIBlocks
          </span>
          <span
            className={
              "text-xs font-sans font-medium text-black bg-white rounded-lg px-2 p-1"
            }
          >
            Coming Soon...
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <NavLinks theme={theme} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={cn(
              "md:hidden bg-background border-b border-border py-4",
              theme === "doodle" && "border-dashed"
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <NavLinks
                mobile
                onClick={() => setIsMenuOpen(false)}
                theme={theme}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/**
 * Navigation Links Component
 *
 * Reusable component for navigation links in both desktop and mobile views
 */
function NavLinks({ mobile = false, onClick = () => {}, theme = "light" }) {
  const links = [
    { href: "#problem", label: "Problem" },
    { href: "#solution", label: "Solution" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#demo", label: "Demo" },
    { href: "#comparison", label: "Comparison" },
  ];

  return links.map((link) => (
    <motion.a
      key={link.href}
      href={link.href}
      onClick={onClick}
      className={cn(
        mobile
          ? "text-sm text-white py-2 border-b border-border font-medium"
          : "text-sm",
        " transition-colors"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {link.label}
    </motion.a>
  ));
}

/**
 * Hero Section Component
 *
 * Main landing section with headline, description, and product preview
 */
function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Build beautiful webapps{" "}
          <span className="text-violet-500">without the struggle</span>
        </motion.h1>

        <motion.p
          className="text-sm font-medium text-balance md:text-lg text-[#92929A] mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Describe what you want, get context-aware components, and customize
          with <span className="underline text-violet-500">drag & drop</span>{" "}
          based UI then copy production-ready code or deploy it from here.
        </motion.p>

        <motion.div
          className="flex flex-col justify-center items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.input
            type="email"
            placeholder="Enter your email"
            className="px-5 p-3 bg-[#141415] rounded-xl focus:outline-none text-sm text-gray-300 w-80 font-sans font-semibold"
          />
          <button className="bg-white text-black text-sm font-sans font-semibold px-3 py-2 rounded-xl">
            Join the Waitlist
          </button>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 max-w-5xl mx-auto bg-[#141415] rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {/* Browser Chrome */}
        <div className="px-4 py-2 flex items-center gap-2 border-b border-[#201F22] bg-[#141415]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-[#92929A]">UIBlocks</div>
        </div>

        {/* Editor Interface */}
        <div className="grid grid-cols-1 md:grid-cols-12 h-auto md:h-[400px]">
          {/* Sidebar */}
          <div className="md:col-span-3 border-r border-[#201F22] p-3 bg-[#141415]">
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <MessageSquare className="h-3.5 w-3.5 text-violet-500" />
              <span className="text-xs font-medium">Chat</span>
            </div>
            <div className="bg-[#201F22] rounded p-2 mb-2 text-xs text-gray-300">
              I need a pricing section with 3 tiers (Basic, Pro, Enterprise).
            </div>
            <div className="bg-violet-900 rounded p-2 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-3 h-3 rounded-full bg-violet-500 flex items-center justify-center">
                  <Check className="h-2 w-2 text-white" />
                </div>
                <span className="font-medium text-violet-400">Generated</span>
              </div>
              Here are 2 pricing section variants that match your description.
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 p-3 bg-[#141415]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-medium text-white">
                Pricing Section Variants
              </h3>
              <div className="flex items-center gap-2">
                <button className="font-sans font-semibold text-black text-sm bg-white rounded-lg px-3 p-1">
                  Edit
                </button>
                <button className="font-sans font-semibold text-white text-sm">
                  Add to Project
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Selected Variant */}
              <div className="bg-[#141415] rounded p-2 border-2 border-violet-500">
                <div className="bg-[#201F22] p-3 rounded mb-2">
                  <div className="h-3 w-16 bg-gray-600 rounded mb-2 mx-auto"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-[#141415] p-2 rounded shadow-sm"
                      >
                        <div className="h-3 w-10 bg-gray-600 rounded mb-1.5 mx-auto"></div>
                        <div className="h-4 w-12 bg-violet-500/20 rounded mb-2 mx-auto"></div>
                        <div className="space-y-1 mb-2">
                          <div className="h-1.5 w-full bg-[#201F22] rounded"></div>
                          <div className="h-1.5 w-full bg-[#201F22] rounded"></div>
                        </div>
                        <div className="h-5 w-full bg-violet-500 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alternative Variant */}
              <div className="bg-[#141415] rounded p-2 border border-gray-700">
                <div className="bg-[#201F22] p-3 rounded mb-2">
                  <div className="h-3 w-16 bg-gray-600 rounded mb-2 mx-auto"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-[#141415] p-2 rounded shadow-sm flex justify-between items-center"
                      >
                        <div className="h-3 w-10 bg-gray-600 rounded"></div>
                        <div className="h-5 w-14 bg-violet-500 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Problem Section Component
 *
 * Highlights the challenges in UI development that UIBlocks aims to solve
 */
function ProblemSection({ theme }) {
  return (
    <section id="problem" className="py-20">
      <div className="container mx-auto px-4">
        <div>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed"
              )}
            >
              The Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              UI Development Is <span className="text-violet-500">Broken</span>
            </h2>
            <p className="text-[#92929A]">
              Let's be honest about what building interfaces is really like
              today.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Common Problems */}
            <div className="space-y-6">
              {problemItems.map((item, index) => (
                <FadeInSection key={index} delay={index * 0.1}>
                  <Card className="bg-[#141415] border border-[#201F22] rounded-xl">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="mt-0.5 bg-red-500/20 p-1 rounded-full">
                          <X className="h-3.5 w-3.5 text-red-500" />
                        </div>
                        <h3 className="text-base font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#92929A]">
                        {item.description}
                      </p>
                      <div className="mt-4 text-xs text-gray-300 italic border-t border-[#201F22] pt-3">
                        "{item.quote}"
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>

            {/* Right Column - Cost & Testimonials */}
            <div>
              {/* Real Cost Card */}
              <FadeInSection delay={0.3}>
                <Card className="bg-[#141415] border border-[#201F22] rounded-xl mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold mb-4 text-violet-500">
                      The Real Cost
                    </h3>
                    <div className="space-y-5">
                      {costItems.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 0.5,
                          }}
                          viewport={{ once: true }}
                        >
                          <div className="mt-0.5 bg-[#201F22] p-1.5 rounded-full">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {item.title}
                            </p>
                            <p className="text-xs text-[#92929A]">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>

              {/* Emotional Toll Card */}
              <FadeInSection delay={0.5}>
                <Card className="bg-[#141415] border border-[#201F22] rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold mb-4 text-white">
                      The Emotional Toll
                    </h3>
                    <div className="space-y-4">
                      {testimonials.map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-[#201F22] p-3 rounded"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.5,
                            duration: 0.5,
                          }}
                          viewport={{ once: true }}
                        >
                          <p className="text-sm text-gray-300 italic">
                            {item.quote}
                          </p>
                          <p className="text-xs text-gray-300 font-sans mt-2">
                            — {item.author}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>

          {/* Development Cycle Visualization */}
          <FadeInSection delay={0.7}>
            <Card className="bg-[#141415] border border-[#201F22] rounded-xl mt-12">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold mb-4 text-center text-white">
                  The Vicious Cycle of UI Development
                </h3>
                <div className="max-w-3xl mx-auto">
                  <DevelopmentCycle theme={theme} />
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/**
 * Solution Section Component
 *
 * Presents UIBlocks as the solution to the problems outlined
 */
function SolutionSection({ theme }) {
  return (
    <section id="solution" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed"
              )}
            >
              The Solution
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white text-balance",
                theme === "doodle" && "font-comic"
              )}
            >
              Introducing a <span className="text-violet-500">Better Way</span>
            </h2>
            <p className="text-[#92929A] text-sm md:text-lg">
              UIBlocks combines the power of context-aware AI with the precision
              of visual editing to create the fastest UI development workflow
              ever.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Key Differentiators */}
            <FadeInSection>
              <Card
                className={
                  theme === "doodle"
                    ? "border-2 border-dashed border-violet-500 h-fit"
                    : "h-fit bg-[#1a1b1e] border border-[#201F22] rounded-xl"
                }
              >
                <CardContent className="p-6">
                  <h3 className="text-base font-semibold mb-5 text-violet-400">
                    What makes UIBlocks different?
                  </h3>

                  <div className="space-y-5">
                    {differentiators.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={cn(
                            "mt-0.5 bg-violet-500/10 p-1 rounded-full",
                            theme === "doodle" &&
                              "border border-dashed border-violet-500"
                          )}
                        >
                          <Check className="h-3.5 w-3.5 text-violet-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold  text-white">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[#92929A] mt-1">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <FadeInSection key={index} delay={index * 0.1 + 0.2}>
                  <Card
                    className={
                      theme === "doodle"
                        ? "border-2 border-dashed border-violet-500"
                        : "bg-[#1a1b1e] border border-[#201F22] rounded-xl"
                    }
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={cn(
                            "bg-violet-500/10 p-1 rounded-full",
                            theme === "doodle" &&
                              "border border-dashed border-violet-500"
                          )}
                        >
                          {benefit.icon}
                        </div>
                        <h3 className="text-sm font-semibold text-white">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#92929A]">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * How It Works Section Component
 *
 * Explains the UIBlocks workflow in three simple steps
 */
function HowItWorksSection({ theme }) {
  return (
    <section id="how-it-works" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed"
              )}
            >
              The Process
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white text-balance",
                theme === "doodle" && "font-comic"
              )}
            >
              How UIBlocks <span className="text-violet-500">Works</span>
            </h2>
            <p className="text-[#92929A] text-sm md:text-lg">
              Three simple steps to transform your UI development workflow.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <Card
                  className={cn(
                    "bg-[#1A1B1E] border border-[#201F22] rounded-xl overflow-hidden",
                    theme === "doodle" &&
                      "border-2 border-dashed border-violet-500"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "bg-violet-500/10 p-2 rounded-full",
                          theme === "doodle" &&
                            "border border-dashed border-violet-500"
                        )}
                      >
                        {step.icon}
                      </div>
                      <span className="text-sm font-semibold text-violet-400">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#92929A]">{step.description}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>

          {/* Complete Workflow Demo */}
          <FadeInSection delay={0.6}>
            <Card
              className={cn(
                "mt-12 bg-[#1A1B1E] border border-[#201F22] rounded-xl",
                theme === "doodle" && "border-2 border-dashed border-violet-500"
              )}
            >
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-center text-violet-400 mb-6">
                  The Complete Workflow
                </h3>
                <WorkflowDemo theme={theme} />
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/**
 * Demo Section Component
 *
 * Interactive demo showing the UIBlocks product in action
 */
function DemoSection({ theme }) {
  return (
    <section id="demo" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed"
              )}
            >
              See It In Action
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white",
                theme === "doodle" && "font-comic"
              )}
            >
              From <span className="text-violet-500">Idea</span> to{" "}
              <span className="text-violet-500">Implementation</span> in Minutes
            </h2>
            <p className="text-[#92929A] text-sm md:text-lg">
              Watch how UIBlocks transforms a simple text description into a
              fully functional, customizable UI component.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className={cn("overflow-hidden rounded-xl bg-[#1A1B1E]")}>
              <div className="p-0">
                <AnimatedDemo theme={theme} />
              </div>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Lightning Fast",
                description:
                  "What used to take days now takes minutes. UIBlocks generates production-ready components in seconds.",
              },
              {
                icon: <Palette className="h-5 w-5" />,
                title: "Pixel Perfect",
                description:
                  "Every component is designed with precision. Consistent spacing, typography, and colors ensure a professional look across your entire application.",
              },
              {
                icon: <Code className="h-5 w-5" />,
                title: "Clean Code",
                description:
                  "UIBlocks generates clean, maintainable code that follows best practices. No more spaghetti code or technical debt.",
              },
            ].map((feature, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <Card
                  className={cn(
                    "bg-[#1A1B1E] border border-[#201F22] rounded-xl p-6",
                    theme === "doodle" &&
                      "border-2 border-dashed border-violet-500"
                  )}
                >
                  <div className="flex items-center gap-2 mb-3 text-violet-400">
                    {feature.icon}
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-[#92929A]">
                    {feature.description}
                  </p>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Comparison Section Component
 *
 * Compares traditional UI development methods with UIBlocks
 */
function ComparisonSection({ theme }) {
  return (
    <section id="comparison" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed"
              )}
            >
              The Difference
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white",
                theme === "doodle" && "font-comic"
              )}
            >
              Traditional Methods vs{" "}
              <span className="text-violet-500">UIBlocks</span>
            </h2>
            <p className="text-[#92929A]">
              See how UIBlocks transforms the UI development process compared to
              traditional methods.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          {/* Comparison Table */}
          <FadeInSection>
            <div
              className={cn(
                "overflow-hidden rounded-xl",
                theme === "doodle"
                  ? "border-2 border-dashed border-violet-500"
                  : "border border-[#201F22] bg-[#1a1b1e]"
              )}
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 divide-x divide-[#201F22]">
                <div className="p-4 bg-[#0A0A0A]">
                  <h3 className="text-xs sm:text-sm font-medium text-white">
                    Development Process
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-500/10 p-1 rounded-full">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-medium text-white">
                      Traditional
                    </h4>
                  </div>
                </div>
                <div className="p-4 bg-violet-500/10">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "bg-violet-500/10 p-1 rounded-full",
                        theme === "doodle" &&
                          "border border-dashed border-violet-500"
                      )}
                    >
                      <Check className="h-3 w-3 text-violet-500" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-medium text-violet-500">
                      UIBlocks
                    </h4>
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-[#201F22]">
                {comparisonItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="grid grid-cols-3 divide-x divide-[#201F22] text-xs sm:text-smfont-medium"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-4 bg-[#0A0A0A] text-white">
                      {item.metric}
                    </div>
                    <div className="p-4 text-[#92929A]">{item.traditional}</div>
                    <div className="p-4 bg-violet-500/10 text-violet-400">
                      {item.uiblocks}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Additional Information */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* What You'll Build */}
            <FadeInSection delay={0.3}>
              <Card
                className={"bg-[#1a1b1e] border border-[#201F22] rounded-xl"}
              >
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-white mb-4">
                    What You'll Build With UIBlocks
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {buildItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-violet-500/10 p-1 rounded-full">
                          <Check className="h-3 w-3 text-violet-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[#92929A]">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Testimonials */}
            <FadeInSection delay={0.5}>
              <Card
                className={
                  theme === "doodle"
                    ? "border-2 border-dashed border-violet-500"
                    : "bg-[#1a1b1e] border border-[#201F22] rounded-xl"
                }
              >
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-white mb-4">
                    What Developers Are Saying
                  </h3>
                  <div className="space-y-4">
                    {developerTestimonials.map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-[#0A0A0A] p-3 rounded border border-[#201F22]"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-sm text-white italic mb-2">
                          {item.quote}
                        </p>
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xs font-medium text-white">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#92929A]">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ROI Calculator Section Component
 *
 * Interactive calculator to show potential savings with UIBlocks
 */
function ROICalculatorSection({ theme }) {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed border-violet-500"
              )}
            >
              The Value
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white text-balance",
                theme === "doodle" && "font-comic"
              )}
            >
              Calculate Your <span className="text-violet-500">ROI</span>
            </h2>
            <p className="text-[#92929A] text-sm md:text-lg">
              See how much time and money UIBlocks can save you.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <Card
              className={
                theme === "doodle"
                  ? "border-2 border-dashed border-violet-500"
                  : "bg-[#1a1b1e] border border-[#201F22] rounded-xl"
              }
            >
              <CardContent className="p-6">
                <ROICalculator theme={theme} />
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/**
 * Use Cases Section Component
 *
 * Shows different use cases for UIBlocks
 */
function UseCasesSection({ theme }) {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed border-violet-500"
              )}
            >
              Versatile Applications
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white text-balance",
                theme === "doodle" && "font-comic"
              )}
            >
              UIBlocks for <span className="text-violet-500">Every Need</span>
            </h2>
            <p className="text-[#92929A] text-sm md:text-lg">
              From startups to enterprises, UIBlocks helps teams of all sizes
              build better interfaces faster.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <Card
                  className={
                    theme === "doodle"
                      ? "border-2 border-dashed border-violet-500 h-full"
                      : "bg-[#1a1b1e] border border-[#201F22] rounded-xl h-full"
                  }
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4 text-violet-400">
                      {useCase.icon}
                      <h3 className="font-semibold text-white">
                        {useCase.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#92929A] mb-4">
                      {useCase.description}
                    </p>
                    <div className="space-y-2">
                      {useCase.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div
                            className={cn(
                              "bg-violet-500/10 p-1 rounded-full",
                              theme === "doodle" &&
                                "border border-dashed border-violet-500"
                            )}
                          >
                            <Check className="h-3.5 w-3.5 text-violet-500" />
                          </div>
                          <p className="text-xs text-white">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Testimonials Section Component
 *
 * Shows testimonials from users
 */
function TestimonialsSection({ theme }) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-primary/10 text-primary border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed"
              )}
            >
              Success Stories
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4",
                theme === "doodle" && "font-comic"
              )}
            >
              Loved by <span className="text-primary">Developers</span>
            </h2>
            <p className="text-muted-foreground">
              Hear from the developers who have transformed their workflow with
              UIBlocks
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {extendedTestimonials.map((testimonial, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div
                  className={cn(
                    "h-full",
                    theme === "doodle" && "border-2 border-dashed"
                  )}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-muted-foreground/20 rounded-full"></div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground italic mb-4">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * FAQ Section Component
 *
 * Frequently asked questions about UIBlocks
 */
function FAQSection({ theme }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-3",
                theme === "doodle" && "border-2 border-dashed border-violet-500"
              )}
            >
              Common Questions
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 text-white text-balance",
                theme === "doodle" && "font-comic"
              )}
            >
              Frequently Asked{" "}
              <span className="text-violet-500">Questions</span>
            </h2>
            <p className="text-[#92929A] text-sm md:text-lg">
              Everything you need to know about UIBlocks.
            </p>
          </div>
        </FadeInSection>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <div
              className={cn(
                "p-6 space-y-4 rounded-xl",
                theme === "doodle"
                  ? "border-2 border-dashed border-violet-500"
                  : "bg-[#1a1b1e] border border-[#201F22]"
              )}
            >
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* FAQ Item */}
                  <div className="border-b border-[#201F22] last:border-0 pb-4 last:pb-0">
                    {/* Question Button */}
                    <button
                      className="w-full flex justify-between items-center text-white text-sm text-balance font-medium focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      {faq.question}
                      <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowDown className="h-3 w-3 text-white" />
                      </motion.span>
                    </button>

                    {/* Animated Answer Section */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-sm text-[#A1A1AA] overflow-hidden"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
/**
 * Waitlist Section Component
 *
 * Form for users to join the waitlist for early access
 */
function WaitlistSection({ theme }) {
  return (
    <section
      id="waitlist"
      className="py-24 relative overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-80 h-80 bg-violet-500/20 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 bg-violet-500/20 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <FadeInSection>
          <div
            className={cn(
              "shadow-xl rounded-2xl p-10 backdrop-blur-lg border border-[#201F22] bg-[#1A1B1E]",
              theme === "doodle" &&
                "border-2 border-dashed border-violet-500/40"
            )}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors bg-violet-500/10 text-violet-400 border-transparent mb-4"
                )}
              >
                Limited Spots Available
              </div>
              <h2 className="text-3xl font-bold text-white">
                Join the <span className="text-violet-500">Waitlist</span>
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-2">
                Be among the first to experience UIBlocks and revolutionize UI
                building. Early access members receive exclusive benefits.
              </p>
            </div>

            {/* Waitlist Form */}
            <div className="mb-6">
              <WaitlistForm theme={theme} />
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Early Bird Pricing",
                  description: "50% discount for first 500 users",
                },
                {
                  title: "Priority Support",
                  description: "Direct access to our founding team",
                },
                {
                  title: "Shape the Product",
                  description: "Influence our roadmap & features",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg text-center border transition-all bg-[#1A1B1E] border-[#201F22]",
                    theme === "doodle" &&
                      "border-2 border-dashed border-violet-500/40"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-sm font-medium text-violet-400">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Spots Left */}
            <div className="mt-8 pt-6 border-t border-[#201F22] text-center">
              <p className="text-sm text-[#A1A1AA]">
                <span className="font-semibold text-violet-500">
                  Only 127 spots left
                </span>{" "}
                for early access. Join now before we reach capacity.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/**
 * Footer Component
 *
 * Site footer with navigation links and copyright information
 */
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#A1A1AA] py-10 border-t border-[#201F22]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4 md:mb-0"
          >
            <Layers className="h-5 w-5 text-violet-500" />
            <span className="text-sm font-semibold text-white">UIBlocks</span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left"
          >
            {[
              { name: "Problem", link: "#problem" },
              { name: "Solution", link: "#solution" },
              { name: "How It Works", link: "#how-it-works" },
              { name: "Comparison", link: "#comparison" },
              { name: "Join Waitlist", link: "#waitlist" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-xs text-[#A1A1AA] hover:text-violet-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-[#201F22] text-center">
          <p className="text-xs text-[#A1A1AA]">
            © {new Date().getFullYear()} UIBlocks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Development Cycle Component
 *
 * Visual representation of the traditional UI development cycle
 */
function DevelopmentCycle({ theme }) {
  return (
    <div className="relative py-4">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {[
          {
            icon: <Pencil className="h-4 w-4 text-muted-foreground" />,
            title: "Design Mockup",
            subtitle: "Designer creates UI",
          },
          {
            icon: <Code className="h-4 w-4 text-muted-foreground" />,
            title: "Manual Coding",
            subtitle: "Developer implements",
          },
          {
            icon: <X className="h-4 w-4 text-destructive" />,
            title: "Feedback & Revisions",
            subtitle: '"Doesn\'t match design"',
          },
          {
            icon: <Repeat className="h-4 w-4 text-muted-foreground" />,
            title: "Repeat Process",
            subtitle: "3-5 more times",
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2 relative z-10 border border-border",
                theme === "doodle" && "border-dashed"
              )}
            >
              {step.icon}
            </div>
            <p className="text-sm font-medium text-center">{step.title}</p>
            <p className="text-xs text-muted-foreground text-center">
              {step.subtitle}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={cn("mt-8 p-3 bg-[#201F22] rounded-lg")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className=" text-balance text-center">
          <span className="font-medium text-sm text-white">Result:</span> Wasted
          time, frustrated developers, delayed projects, and inconsistent UIs
        </p>
      </motion.div>
    </div>
  );
}

/**
 * Workflow Demo Component
 *
 * Interactive demo of the UIBlocks workflow
 */
function WorkflowDemo({ theme }) {
  const [activeTab, setActiveTab] = useState("describe");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="my-3 sm:my-1 grid grid-cols-3 sm:grid-cols-3 xs:grid-cols-1 gap-2 sm:mb-6 xs:mb-4 h-auto bg-[#1A1B1E] rounded-lg p-1 border border-[#201F22]">
        <button
          onClick={() => setActiveTab("describe")}
          className={cn(
            "text-xs flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all duration-200",
            activeTab === "describe"
              ? "bg-violet-500 text-white shadow-md"
              : "text-[#92929A] hover:text-white",
            theme === "doodle" &&
              activeTab === "describe" &&
              "border-2 border-dashed border-violet-500"
          )}
        >
          <MessageSquare className="h-4 w-4 sm:visible hidden" />
          <span>1. Describe</span>
        </button>

        <button
          onClick={() => setActiveTab("variants")}
          className={cn(
            "text-xs flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all duration-200",
            activeTab === "variants"
              ? "bg-violet-500 text-white shadow-md"
              : "text-[#92929A] hover:text-white",
            theme === "doodle" &&
              activeTab === "variants" &&
              "border-2 border-dashed border-violet-500"
          )}
        >
          <Layers className="h-4 w-4 sm:visible hidden" />
          <span>2. Choose Variants</span>
        </button>

        <button
          onClick={() => setActiveTab("customize")}
          className={cn(
            "text-xs flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all duration-200",
            activeTab === "customize"
              ? "bg-violet-500 text-white shadow-md"
              : "text-[#92929A] hover:text-white",
            theme === "doodle" &&
              activeTab === "customize" &&
              "border-2 border-dashed border-violet-500"
          )}
        >
          <MousePointerClick className="h-4 w-4 sm:visible hidden" />
          <span>3. Customize</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-0">
        <AnimatePresence mode="wait">
          {/* Describe Tab */}
          {activeTab === "describe" && (
            <motion.div
              key="describe"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "p-5 bg-[#1A1B1E] rounded-xl border border-[#201F22]",
                  theme === "doodle" && "border-2 border-dashed"
                )}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* User Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Your Description
                    </h4>
                    <div
                      className={cn(
                        "bg-[#222327] p-3 rounded-lg border border-[#2C2D30]"
                      )}
                    >
                      <p className="text-sm text-[#CCCCCC]">
                        "I need a pricing section for my SaaS product with 3
                        tiers (Basic, Pro, Enterprise). It should have a clean,
                        modern design with our brand colors (purple primary,
                        slate secondary). Each plan should show features and
                        have a prominent CTA button."
                      </p>
                    </div>
                    <p className="text-sm text-[#92929A] mt-3">
                      Simply describe what you need in natural language. Include
                      details about:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-[#92929A]">
                      {[
                        "Component type (hero, pricing, features, etc.)",
                        "Design style (minimal, bold, playful, etc.)",
                        "Brand colors and theme preferences",
                        "Content structure and specific elements",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* UIBlocks Response */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">
                      UIBlocks Response
                    </h4>
                    <div
                      className={cn(
                        "bg-[#222327] p-3 rounded-lg border border-[#2C2D30]",
                        theme === "doodle" && "border-dashed"
                      )}
                    >
                      {/* Understanding Your Request */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-white">
                          Understanding Your Request
                        </span>
                      </div>
                      <p className="text-xs text-[#CCCCCC] mb-4">
                        I'll create a pricing section with 3 tiers (Basic, Pro,
                        Enterprise) using a clean, modern design with purple as
                        the primary color and slate as secondary. Each plan will
                        include features and a CTA button.
                      </p>

                      {/* Generating Variants */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-white">
                          Generating Variants
                        </span>
                      </div>
                      <p className="text-xs text-[#CCCCCC]">
                        I've generated 3 different pricing section designs that
                        match your requirements. You can view and select your
                        preferred variant in the next step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Variants Tab */}
          {activeTab === "variants" && (
            <motion.div
              key="variants"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "p-5 bg-[#1A1B1E] rounded-xl border border-[#201F22]",
                  theme === "doodle" && "border-2 border-dashed"
                )}
              >
                <h4 className="text-sm font-semibold text-white mb-4">
                  Choose Your Preferred Variant
                </h4>
                <div className="grid md:grid-cols-3 gap-4 mb-5">
                  {[
                    {
                      title: "Horizontal Cards",
                      selected: true,
                    },
                    {
                      title: "Inline Pricing",
                      selected: false,
                    },
                    {
                      title: "Stacked Cards",
                      selected: false,
                    },
                  ].map((variant, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-xl border",
                        variant.selected
                          ? "border-violet-500 bg-[#222327]"
                          : "border-[#2C2D30] bg-[#1E1F22]",
                        theme === "doodle" && "border-dashed"
                      )}
                    >
                      <div
                        className={cn(
                          "p-3 rounded-lg mb-3",
                          theme === "doodle" && "border border-dashed"
                        )}
                      >
                        {/* Mock Design Block */}
                        <div className="h-3 w-14 bg-[#34353A] rounded mx-auto mb-3"></div>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={cn(
                                "p-2 rounded-lg",
                                theme === "doodle" && "border border-dashed"
                              )}
                            >
                              <div className="h-2.5 w-10 bg-[#44454A] rounded mx-auto mb-1.5"></div>
                              <div className="h-3 w-12 bg-violet-500/20 rounded mx-auto mb-2"></div>
                              <div className="space-y-1 mb-2">
                                <div className="h-1.5 w-full bg-[#44454A] rounded"></div>
                                <div className="h-1.5 w-full bg-[#44454A] rounded"></div>
                              </div>
                              <div className="h-4 w-full bg-violet-500 rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-[#92929A]">
                          {variant.title}
                        </span>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center",
                            variant.selected
                              ? "bg-violet-500"
                              : "bg-[#292A2D] border border-[#34353A]"
                          )}
                        >
                          <Check
                            className={cn(
                              "h-3 w-3",
                              variant.selected ? "text-white" : "text-[#55565B]"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Variant Info */}
                <div
                  className={cn(
                    "p-4 rounded-lg border bg-violet-500/10",
                    theme === "doodle" &&
                      "border border-dashed border-violet-400/50"
                  )}
                >
                  <p className="text-xs text-violet-400">
                    <span className="font-medium">Selected:</span> Horizontal
                    Cards variant. This design places all three pricing tiers
                    side-by-side for easy comparison, with a clean, modern
                    aesthetic that matches your brand colors.
                  </p>
                  <p className="text-xs text-[#92929A] mt-2">
                    You can proceed to the customization step or ask for more
                    variants if none of these match your vision.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Customize Tab */}
          {activeTab === "customize" && (
            <motion.div
              key="customize"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "sm:p-5 py-5 bg-[#1A1B1E] rounded-xl sm:border sm:border-[#201F22]"
                )}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customization Panel */}
                  <div className={"space-y-2"}>
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Customize Your Component
                    </h4>
                    <div
                      className={cn(
                        "bg-[#222327] p-3 rounded-lg border border-[#2C2D30]"
                      )}
                    >
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div
                          className={cn(
                            "bg-[#1A1B1E] p-2 rounded border border-[#2C2D30]"
                          )}
                        >
                          <div className="h-2.5 w-8 bg-[#CCCCCC] rounded mb-1 mx-auto"></div>
                          <div className="h-3 w-10 bg-violet-500/20 rounded mb-1.5 mx-auto"></div>
                          <div className="space-y-1 mb-1.5">
                            <div className="h-1.5 w-full bg-[#CCCCCC]/20 rounded"></div>
                            <div className="h-1.5 w-full bg-[#CCCCCC]/20 rounded"></div>
                          </div>
                          <div className="h-4 w-full bg-violet-500 rounded"></div>
                        </div>
                        <div
                          className={cn(
                            "bg-[#1A1B1E] p-2 rounded border border-[#2C2D30]"
                          )}
                        >
                          <div className="h-2.5 w-8 bg-[#CCCCCC] rounded mb-1 mx-auto"></div>
                          <div className="h-1.5 w-full bg-[#CCCCCC]/20 rounded"></div>
                          <div className="h-3 w-10 bg-violet-500/20 rounded mb-1.5 mx-auto"></div>
                          <div className="space-y-1 mb-1.5">
                            <div className="h-1.5 w-full bg-[#CCCCCC]/20 rounded"></div>
                          </div>
                          <div className="h-4 w-full bg-violet-500 rounded"></div>
                        </div>
                        <div
                          className={cn(
                            "bg-[#1A1B1E] p-2 rounded border border-[#2C2D30]"
                          )}
                        >
                          <div className="space-y-1 mb-1.5">
                            <div className="h-1.5 w-full bg-[#CCCCCC]/20 rounded"></div>
                            <div className="h-1.5 w-full bg-[#CCCCCC]/20 rounded"></div>
                          </div>
                          <div className="h-2.5 w-8 bg-[#CCCCCC] rounded mb-1 mx-auto"></div>
                          <div className="h-4 w-full bg-violet-500 rounded"></div>
                          <div className="h-3 w-10 bg-violet-500/20 rounded mb-1.5 mx-auto"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <MousePointerClick className="h-3 w-3 text-violet-500" />
                          <span className="text-sm font-medium text-[#CCCCCC]">
                            Drag & Drop Editing
                          </span>
                        </div>
                        <button
                          className={
                            "text-xs text-white bg-black font-sans font-medium rounded-lg px-3 py-1"
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Component Properties */}
                    <div className="space-y-3">
                      <div
                        className={cn(
                          "bg-[#222327] p-3 rounded-lg border border-[#2C2D30]",
                          theme === "doodle" && "border-dashed"
                        )}
                      >
                        <h5 className="text-xs font-semibold text-white mb-2">
                          Component Properties
                        </h5>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#CCCCCC]">
                              Background
                            </span>
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 bg-[#1A1B1E] rounded border border-[#2C2D30]"></div>
                              <span className="text-sm text-[#CCCCCC]">
                                #1A1B1E
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#CCCCCC]">
                              Accent Color
                            </span>
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 bg-violet-500 rounded"></div>
                              <span className="text-sm text-[#CCCCCC]">
                                #8b5cf6
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#CCCCCC]">
                              Border Radius
                            </span>
                            <span className="text-sm text-[#CCCCCC]">6px</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Settings */}
                      <div
                        className={cn(
                          "bg-[#222327] p-3 rounded-lg border border-[#2C2D30]",
                          theme === "doodle" && "border-dashed"
                        )}
                      >
                        <h5 className="text-xs font-semibold text-white mb-2">
                          Content
                        </h5>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-sans font-medium text-[#CCCCCC]">
                              Plan Names
                            </span>
                            <span className="text-sm font-sans font-medium text-[#CCCCCC]">
                              Basic, Pro, Enterprise
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-sans font-medium text-[#CCCCCC]">
                              CTA Text
                            </span>
                            <span className="text-sm font-sans font-medium text-[#CCCCCC]">
                              Get Started
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Production-Ready Code Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Production-Ready Code
                    </h4>
                    <div
                      className={cn(
                        "bg-[#222327] p-3 rounded-lg border border-[#2C2D30]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <Code className="h-3 w-3 text-violet-500" />
                          <span className="text-sm font-semibold text-white">
                            pricing-section code
                          </span>
                        </div>
                        <button
                          className={
                            "text-xs text-white bg-black font-sans font-medium rounded-lg px-3 py-1"
                          }
                        >
                          Copy Code
                        </button>
                      </div>
                      <div className="bg-[#1A1B1E] p-2 rounded text-xs font-mono text-[#CCCCCC] overflow-auto max-h-[200px] border border-[#2C2D30]">
                        <pre>{`Code generated by UIblocks...`}</pre>
                      </div>
                    </div>

                    {/* Features Section */}
                    <div
                      className={cn(
                        "mt-3 bg-[#222327] p-3 rounded-lg border border-[#2C2D30]"
                      )}
                    >
                      <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-violet-500" />
                        Production-Ready Features
                      </h5>
                      <ul className="space-y-1.5 text-sm text-[#CCCCCC]">
                        <li className="flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-violet-500 mt-0.5 flex-shrink-0" />
                          Fully Responsive
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-violet-500 mt-0.5 flex-shrink-0" />
                          Accessibility Built-in
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-violet-500 mt-0.5 flex-shrink-0" />
                          SEO Optimized
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Animated Demo Component
 *
 * Shows an animated demonstration of the UIBlocks workflow
 */
function AnimatedDemo() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <section className="bg-[#0A0A0A]">
      <div className=" mx-auto px-4">
        {/* Step Indicator */}
        <motion.div
          className="flex justify-between items-center mb-6 text-[#92929A] text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-white font-sans font-medium"
            >
              {step === 1 && "1. Write Description"}
              {step === 2 && "2. Generate Variants"}
              {step === 3 && "3. Customize"}
              {step === 4 && "4. Export Code"}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Animated Steps Container */}
        <div
          className="relative bg-[#1A1B1E]  rounded-xl overflow-hidden"
          style={{ height: "400px" }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Describe */}
            {step === 1 && (
              <motion.div
                key="describe"
                className="absolute inset-0 p-6 flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#2A2B2E] p-4 border border-[#201F22] rounded-xl text-white w-full max-w-lg">
                  <MessageSquare className="h-4 w-4 text-violet-400 mb-2" />
                  <TypewriterEffect
                    text="I need a hero section for a SaaS landing page with a headline, subheading, and a sign-up form. It should have a modern design with a purple accent color and an illustration on the right side."
                    className="text-sm text-[#92929A]"
                    delay={0.5}
                  />
                </div>
                <motion.div
                  className="mt-6 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                >
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  <span className="text-sm text-[#92929A]">
                    Processing your request...
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Variants */}
            {step === 2 && (
              <motion.div
                key="variants"
                className="absolute inset-0 p-6 grid sm:grid-cols-2 grid-cols-1 gap-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#2A2B2E] w-full p-4 border border-[#201F22] rounded-xl text-white">
                  <Layers className="h-4 w-4 text-violet-400 mb-2" />
                  <h3 className="text-base font-semibold mb-3 text-violet-400">
                    Choose a Variant
                  </h3>
                  <div className="h-32 w-full bg-[#1A1B1E] rounded-xl p-4 flex flex-col gap-3">
                    <div className="h-4 w-full sm:w-32 bg-[#92929A] rounded"></div>
                    <div className="h-6 w-full sm:w-48 bg-[#92929A] rounded"></div>
                    <div className="h-4 w-full bg-[#92929A] rounded"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Customize */}
            {step === 3 && (
              <motion.div
                key="customize"
                className="absolute inset-0 p-6 flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MousePointerClick className="h-6 w-6 text-violet-400 mb-2" />
                <h3 className="text-base font-semibold mb-3 text-violet-400">
                  Customize Your Components with drag and drop
                </h3>
                <p className="text-sm text-[#92929A]">
                  Easily tweak styles and structure to fit your needs.
                </p>
              </motion.div>
            )}

            {/* Step 4: Export */}
            {step === 4 && (
              <motion.div
                key="export"
                className="absolute inset-0 p-6 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Code className="h-6 w-6 text-violet-400 mb-2" />
                <h3 className="text-base font-semibold mb-3 text-violet-400">
                  Export Production-Ready Code or deploy
                </h3>
                <div className="bg-[#2A2B2E] p-4 rounded-xl text-white text-xs font-mono overflow-auto h-48">
                  <TypewriterEffect
                    text={`export default function HeroSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4">
        <h1 className="text-3xl font-bold text-white">Build with UIBlocks</h1>
        <p className="text-[#92929A]">Accelerate your workflow with AI-powered components.</p>
      </div>
    </section>
  );
}`}
                    className="text-[#92929A]"
                    delay={0.1}
                  />
                </div>
                <Button className="mt-4 bg-violet-500 w-auto rounded-lg text-sm font-sans font-medium py-3 text-white">
                  Copy Code
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * ROI Calculator Component
 *
 * Interactive calculator to show potential savings with UIBlocks
 */
function ROICalculator({ theme }) {
  const [developers, setDevelopers] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [uiHoursPerWeek, setUiHoursPerWeek] = useState(15);

  const weeklyHours = developers * uiHoursPerWeek;
  const weeklyCost = weeklyHours * hourlyRate;
  const monthlyCost = weeklyCost * 4;
  const yearlyCost = monthlyCost * 12;

  const uiBlocksSavings = yearlyCost * 0.7; // 70% savings
  const uiBlocksTime = weeklyHours * 0.3; // 70% time reduction

  return (
    <div>
      <h3 className="text-base font-semibold mb-4 text-center">
        Calculate Your Potential Savings
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">
            Number of Developers
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={developers}
            onChange={(e) => setDevelopers(Number(e.target.value))}
            className={cn(
              "w-full h-1.5 bg-black rounded-full appearance-none cursor-pointer"
            )}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">1</span>
            <span className="text-xs font-medium">{developers}</span>
            <span className="text-xs text-muted-foreground">10</span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">
            Hourly Rate (USD)
          </label>
          <input
            type="range"
            min="25"
            max="150"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className={cn(
              "w-full h-1.5 bg-black rounded-full appearance-none cursor-pointer",
              theme === "doodle" && "border border-dashed"
            )}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">$25</span>
            <span className="text-xs font-medium">${hourlyRate}</span>
            <span className="text-xs text-muted-foreground">$150</span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">
            UI Hours Per Week (per dev)
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={uiHoursPerWeek}
            onChange={(e) => setUiHoursPerWeek(Number(e.target.value))}
            className={cn(
              "w-full h-1.5 bg-black rounded-full appearance-none cursor-pointer",
              theme === "doodle" && "border border-dashed"
            )}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">5h</span>
            <span className="text-xs font-medium">{uiHoursPerWeek}h</span>
            <span className="text-xs text-muted-foreground">30h</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">
            Current UI Development Costs
          </h4>
          <div className="space-y-3">
            <div
              className={cn(
                "bg-muted p-3 rounded",
                theme === "doodle" && "border border-dashed"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Weekly UI Dev Hours
                </span>
                <span className="text-xs font-medium">{weeklyHours} hours</span>
              </div>
            </div>
            <div
              className={cn(
                "bg-muted p-3 rounded",
                theme === "doodle" && "border border-dashed"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Weekly Cost
                </span>
                <span className="text-xs font-medium">
                  ${weeklyCost.toLocaleString()}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "bg-muted p-3 rounded",
                theme === "doodle" && "border border-dashed"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Monthly Cost
                </span>
                <span className="text-xs font-medium">
                  ${monthlyCost.toLocaleString()}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "bg-destructive/10 p-3 rounded",
                theme === "doodle" &&
                  "border border-dashed border-destructive/30"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-destructive">
                  Yearly UI Dev Cost
                </span>
                <span className="text-xs font-medium text-destructive">
                  ${yearlyCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">With UIBlocks</h4>
          <div className="space-y-3">
            <div
              className={cn(
                "bg-primary/5 p-3 rounded",
                theme === "doodle" && "border border-dashed border-primary/30"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Weekly UI Dev Hours
                </span>
                <span className="text-xs font-medium">
                  {uiBlocksTime.toFixed(1)} hours
                </span>
              </div>
              <div
                className={cn(
                  "mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden",
                  theme === "doodle" && "border border-dashed"
                )}
              >
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
              <div className="mt-1 text-xs text-primary text-right">
                70% time savings
              </div>
            </div>
            <div
              className={cn(
                "bg-violet-50 p-3 rounded",
                theme === "doodle" && "border border-dashed border-violet-300",
                theme === "dark" && "bg-violet-900/20 border-violet-900/30"
              )}
            >
              <div className="flex justify-between items-center">
                <span
                  className={cn(
                    "text-xs font-medium text-violet-700",
                    theme === "dark" && "text-violet-400"
                  )}
                >
                  Yearly Savings
                </span>
                <span
                  className={cn(
                    "text-xs font-medium text-violet-700",
                    theme === "dark" && "text-violet-400"
                  )}
                >
                  ${uiBlocksSavings.toLocaleString()}
                </span>
              </div>
              <div
                className={cn(
                  "mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden",
                  theme === "doodle" && "border border-dashed"
                )}
              >
                <motion.div
                  className={cn(
                    "h-full bg-violet-600 rounded-full",
                    theme === "dark" && "bg-violet-500"
                  )}
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
              <div
                className={cn(
                  "mt-1 text-xs text-violet-700 text-right",
                  theme === "dark" && "text-violet-400"
                )}
              >
                70% cost savings
              </div>
            </div>
            <div
              className={cn(
                "bg-primary/5 p-3 rounded",
                theme === "doodle" && "border border-dashed border-primary/30"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  5-Year Savings
                </span>
                <span className="text-xs font-medium">
                  ${(uiBlocksSavings * 5).toLocaleString()}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "bg-primary/5 p-3 rounded",
                theme === "doodle" && "border border-dashed border-primary/30"
              )}
            >
              <p className="text-xs text-primary">
                UIBlocks pays for itself in less than a month and delivers 70%
                time and cost savings on UI development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Waitlist Form Component
 *
 * Form for users to join the waitlist for early access
 */
function WaitlistForm({ theme }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <motion.div
        className={cn(
          "bg-violet-500/10 p-4 rounded-lg  text-center",
          theme === "doodle" && "border-2 border-dashed"
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-sm font-medium text-violet-400 mb-1">
          You're on the list!
        </h3>
        <p className="text-xs text-violet-500">
          We'll notify you when UIBlocks is ready for early access.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className={cn(
          "flex-grow text-xs h-9 rounded-md bg-background px-3 py-2 focus:outline-none"
        )}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={
          "bg-white text-black font-sans font-medium text-sm rounded-lg px-2 p-1 justify-center items-center flex"
        }
      >
        {isSubmitting ? (
          <span className="flex items-center gap-1.5">
            <svg
              className="animate-spin h-3 w-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            Join Waitlist
            <ArrowRight className="h-3 w-3" />
          </span>
        )}
      </button>
    </form>
  );
}

/**
 * FadeInSection Component
 *
 * Wrapper component that fades in its children when they come into view
 */
function FadeInSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 },
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TypewriterEffect Component
 *
 * Creates a typewriter effect for text
 */
function TypewriterEffect({ text, className, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // Adjust speed here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </motion.p>
  );
}

// Helper function for TailwindCSS classes
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Reusable Button Component
function Button({ children, variant = "default", size = "default", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    doodle:
      "bg-primary text-primary-foreground border-2 border-dashed border-primary hover:bg-primary/90",
    doodleOutline:
      "border-2 border-dashed border-primary bg-background hover:bg-primary/10 hover:text-primary",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Reusable Card Component
function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Reusable CardContent Component
function CardContent({ children, className, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Data for the various sections
 */
const problemItems = [
  {
    title: "The Design-to-Code Nightmare",
    description:
      "You've been there. A designer hands you a beautiful mockup, and now you're spending days trying to recreate it pixel-perfectly in code. Every spacing, color, and interaction needs to be manually implemented. And when the design changes? Start over.",
    quote:
      "I spent 3 days implementing a design that took the designer 3 hours to create.",
  },
  {
    title: "The Component Library Maze",
    description:
      'You\'re using a component library, but it never quite matches what you need. You end up with a tangled mess of overrides and custom CSS. What started as a "time-saver" has become a maintenance nightmare that slows down every change.',
    quote:
      "I spend more time fighting with the component library than building actual features.",
  },
  {
    title: "The AI Hallucination Problem",
    description:
      "You've tried AI tools, but they hallucinate features, forget your requirements mid-generation, and produce code that breaks in production. You spend more time fixing their output than you would writing it yourself.",
    quote:
      "The AI gave me code that looked right but was full of bugs and inconsistencies.",
  },
];

const costItems = [
  {
    icon: <Clock className="h-3.5 w-3.5 text-muted-foreground" />,
    title: "40% of development time",
    description: "spent on UI implementation rather than core functionality",
  },
  {
    icon: <Repeat className="h-3.5 w-3.5 text-muted-foreground" />,
    title: "3-5 revision cycles",
    description: "for each component before it matches the design",
  },
  {
    icon: <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />,
    title: "Inconsistent experiences",
    description: "across your application due to manual implementation",
  },
  {
    icon: <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />,
    title: "$15,000+ per project",
    description: "in wasted development costs on UI implementation",
  },
];

const testimonials = [
  {
    quote:
      "I'm a backend developer who needs to build UIs. I waste days fighting with CSS when I should be focusing on business logic.",
    author: "Alex, Senior Developer",
  },
  {
    quote:
      "Every time marketing wants a new landing page, I have to drop everything. What should take hours takes days.",
    author: "Jamie, Full-Stack Developer",
  },
  {
    quote:
      "I've tried every AI tool and component library out there. They all promise to make UI development easier, but end up creating more work.",
    author: "Taylor, Frontend Developer",
  },
];

const differentiators = [
  {
    title: "Context-Aware Generation",
    description:
      "Unlike other AI tools, UIBlocks maintains context throughout your entire project. Specify a theme once, and it's applied consistently to everything you create.",
  },
  {
    title: "Visual Customization",
    description:
      "Don't like what you see? No need to regenerate. Just drag and drop components, swap variants, and make visual edits in real-time without touching code.",
  },
  {
    title: "Production-Ready Code",
    description:
      "Export clean, optimized, SEO-friendly code that works in your existing projects without refactoring. No more fixing AI-generated bugs.",
  },
  {
    title: "Consistent Design Language",
    description:
      "UIBlocks ensures your entire application follows the same design principles. No more inconsistent spacing, colors, or interactions.",
  },
];

const benefits = [
  {
    icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
    title: "Build in Hours, Not Weeks",
    description:
      "Turn ideas into reality faster than ever. No more endless back-and-forth between design and development—just describe what you need, explore options, and refine instantly.",
  },
  {
    icon: <Palette className="h-3.5 w-3.5 text-primary" />,
    title: "Pixel-Perfect Consistency",
    description:
      "Say goodbye to design inconsistencies. Every component follows the same design system, ensuring a polished, on-brand experience across your entire application.",
  },
  {
    icon: <BarChart className="h-3.5 w-3.5 text-primary" />,
    title: "Optimized from Day One",
    description:
      "SEO-friendly, accessible, and built with best practices baked in—so you never have to worry about fixing issues later. Just launch with confidence.",
  },
];

const workflowSteps = [
  {
    title: "Describe",
    icon: <MessageSquare className="h-3.5 w-3.5 text-primary" />,
    description:
      "Simply describe what you need in plain language. Specify your theme, style preferences, and requirements. UIBlocks maintains this context throughout your entire project.",
  },
  {
    title: "Choose Variants",
    icon: <Layers className="h-3.5 w-3.5 text-primary" />,
    description:
      "UIBlocks generates multiple component variants that match your description. Compare options side-by-side and select the ones that best fit your vision.",
  },
  {
    title: "Customize",
    icon: <MousePointerClick className="h-3.5 w-3.5 text-primary" />,
    description:
      "Fine-tune your UI with our intuitive drag-and-drop editor. Swap components, adjust properties, and see changes in real-time—all without writing code.",
  },
];

const comparisonItems = [
  {
    metric: "Time to implement a complex UI",
    traditional: "3-5 days",
    uiblocks: "2-4 hours",
  },
  {
    metric: "Design consistency",
    traditional: "Manual implementation leads to inconsistencies",
    uiblocks: "Context-aware generation ensures consistency",
  },
  {
    metric: "Design changes",
    traditional: "Hours of manual updates across components",
    uiblocks: "Minutes to regenerate or visually edit",
  },
  {
    metric: "Code quality",
    traditional: "Varies based on developer experience",
    uiblocks: "Consistently clean, optimized, and accessible",
  },
  {
    metric: "Learning curve",
    traditional: "Months to master CSS, component libraries, and frameworks",
    uiblocks: "Minutes to learn the intuitive interface",
  },
  {
    metric: "Iteration speed",
    traditional: "Slow, requires manual coding for each change",
    uiblocks: "Instant visual editing and regeneration",
  },
  {
    metric: "Developer experience",
    traditional: "Frustrating, tedious, and time-consuming",
    uiblocks: "Enjoyable, creative, and efficient",
  },
];

const buildItems = [
  {
    title: "Landing Pages",
    description: "Create high-converting landing pages in minutes",
  },
  {
    title: "Admin Dashboards",
    description: "Build complex data-driven interfaces easily",
  },
  {
    title: "E-commerce Stores",
    description: "Design product pages and checkout flows",
  },
  {
    title: "Web Applications",
    description: "Create complex, interactive applications",
  },
  {
    title: "Marketing Pages",
    description: "Build feature pages and product showcases",
  },
  {
    title: "Design Systems",
    description: "Create consistent component libraries",
  },
];

const developerTestimonials = [
  {
    quote:
      "UIBlocks has completely transformed how I build interfaces. What used to take me a week now takes a day. The context-aware generation means I don't have to keep explaining my brand guidelines over and over.",
    name: "Sarah Johnson",
    title: "Frontend Developer",
  },
  {
    quote:
      "As someone who's more backend-focused, UI work used to be my nightmare. With UIBlocks, I can create beautiful interfaces without getting lost in CSS details. The drag and drop customization is a game-changer.",
    name: "Michael Chen",
    title: "Full-Stack Developer",
  },
];

const useCases = [
  {
    title: "For Startups",
    icon: <Zap className="h-5 w-5" />,
    description:
      "Move fast and build beautiful interfaces without hiring a dedicated design team.",
    features: [
      "Launch MVPs in days instead of weeks",
      "Iterate quickly based on user feedback",
      "Maintain consistent branding across all pages",
      "Save on design and development costs",
    ],
  },
  {
    title: "For Agencies",
    icon: <Users className="h-5 w-5" />,
    description:
      "Deliver client projects faster with pixel-perfect designs and clean code.",
    features: [
      "Increase profit margins on fixed-price projects",
      "Present multiple design options to clients",
      "Reduce revision cycles and feedback loops",
      "Scale your team's output without adding headcount",
    ],
  },
  {
    title: "For Enterprises",
    icon: <Laptop className="h-5 w-5" />,
    description:
      "Ensure consistency across large applications and multiple teams.",
    features: [
      "Enforce design system compliance automatically",
      "Reduce onboarding time for new developers",
      "Accelerate digital transformation initiatives",
      "Integrate with existing design systems and code bases",
    ],
  },
];

const extendedTestimonials = [
  {
    name: "Sarah Johnson",
    title: "Frontend Developer",
    quote:
      "UIBlocks has completely transformed how I build interfaces. What used to take me a week now takes a day. The context-aware generation means I don't have to keep explaining my brand guidelines over and over.",
  },
  {
    name: "Michael Chen",
    title: "Full-Stack Developer",
    quote:
      "As someone who's more backend-focused, UI work used to be my nightmare. With UIBlocks, I can create beautiful interfaces without getting lost in CSS details. The drag and drop customization is a game-changer.",
  },
  {
    name: "Emily Rodriguez",
    title: "UI/UX Designer",
    quote:
      "I can now implement my designs directly without waiting for developer resources. UIBlocks bridges the gap between design and development in a way I've never seen before.",
  },
];

const faqItems = [
  {
    question: "How is UIBlocks different from other AI code generators?",
    answer:
      "UIBlocks maintains context throughout your entire project, ensuring consistency across all components. It also provides visual editing tools so you can customize without writing code, and it generates production-ready code that works in real-world applications.",
  },
  {
    question: "Do I need to know how to code to use UIBlocks?",
    answer:
      "No, UIBlocks is designed for both developers and non-developers. You can describe what you want in plain language, choose from generated variants, and customize visually without writing a single line of code. However, developers can still access and modify the generated code if needed.",
  },
  {
    question: "What frameworks and libraries does UIBlocks support?",
    answer:
      "UIBlocks generates code for React, Next.js, Vue, and Angular. It supports popular UI libraries like Tailwind CSS, Material UI, and Bootstrap. You can specify your preferred framework and libraries when setting up your project.",
  },
  {
    question: "Can I integrate UIBlocks with my existing projects?",
    answer:
      "UIBlocks can generate components that match your existing codebase and design system. You can export components directly into your project, and they'll work seamlessly with your current setup.",
  },
  {
    question: "How much does UIBlocks cost as compared to others?",
    answer:
      "We'll announce pricing when we launch, but early access members will receive significant discounts. Join our waitlist to be among the first to know and to secure early bird pricing.",
  },
];
