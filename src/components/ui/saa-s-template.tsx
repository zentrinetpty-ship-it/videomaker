import React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline Button Component (Customized for this template)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "ghost" | "gradient";
    size?: "default" | "sm" | "lg";
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-white text-black hover:bg-gray-100",
            secondary: "bg-gray-800 text-white hover:bg-gray-700",
            ghost: "hover:bg-gray-800/50 text-white",
            gradient: "bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95"
        };

        const sizes = {
            default: "h-10 px-4 py-2 text-sm",
            sm: "h-10 px-5 text-sm",
            lg: "h-12 px-8 text-base"
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

interface NavigationProps {
    onLaunch: () => void;
}

// Navigation Component
const Navigation = React.memo(({ onLaunch }: NavigationProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-xl font-semibold text-white">Story Studio</span>
                    </div>

                    <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <a href="#getting-started" className="text-sm text-white/60 hover:text-white transition-colors">
                            How it Works
                        </a>
                        <a href="#examples" className="text-sm text-white/60 hover:text-white transition-colors">
                            Examples
                        </a>
                        <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                            Pricing
                        </a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Button type="button" variant="ghost" size="sm" onClick={onLaunch}>
                            Sign in
                        </Button>
                        <Button type="button" variant="default" size="sm" onClick={onLaunch}>
                            Get Started
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 animate-[slideDown_0.3s_ease-out]">
                    <div className="px-6 py-4 flex flex-col gap-4">
                        <a
                            href="#getting-started"
                            className="text-sm text-white/60 hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How it Works
                        </a>
                        <a
                            href="#examples"
                            className="text-sm text-white/60 hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Examples
                        </a>
                        <a
                            href="#pricing"
                            className="text-sm text-white/60 hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </a>
                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-800/50">
                            <Button type="button" variant="ghost" size="sm" onClick={onLaunch}>
                                Sign in
                            </Button>
                            <Button type="button" variant="default" size="sm" onClick={onLaunch}>
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
});

Navigation.displayName = "Navigation";

interface HeroProps {
    onLaunch: () => void;
}

// Hero Component
const Hero = React.memo(({ onLaunch }: HeroProps) => {
    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-32"
            style={{
                animation: "fadeIn 0.6s ease-out"
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm max-w-full">
                <span className="text-xs text-center whitespace-nowrap" style={{ color: '#9ca3af' }}>
                    New: Character Consistency with Imagen 3
                </span>
                <a
                    href="#new-version"
                    className="flex items-center gap-1 text-xs hover:text-white transition-all active:scale-95 whitespace-nowrap"
                    style={{ color: '#9ca3af' }}
                    aria-label="Read more about the new version"
                >
                    Read more
                    <ArrowRight size={12} />
                </a>
            </aside>

            <h1
                className="text-4xl md:text-6xl lg:text-7xl font-medium text-center max-w-4xl px-6 leading-tight mb-6"
                style={{
                    background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.6))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.05em"
                }}
            >
                Transform ideas into <br />cinematic stories
            </h1>

            <p className="text-sm md:text-lg text-center max-w-2xl px-6 mb-10" style={{ color: '#9ca3af' }}>
                AI-powered workflow that creates complete videos from a single prompt. <br />Script, storyboard, characters, and scenes - all partially automated.
            </p>

            <div className="flex items-center gap-4 relative z-10 mb-20">
                <Button
                    type="button"
                    variant="gradient"
                    size="lg"
                    className="rounded-lg flex items-center justify-center min-w-[160px]"
                    aria-label="Get started with the template"
                    onClick={onLaunch}
                >
                    Start Creating
                </Button>
            </div>

            <div className="w-full max-w-6xl relative pb-20">
                <div
                    className="absolute left-1/2 w-[90%] pointer-events-none z-0"
                    style={{
                        top: "-23%",
                        transform: "translateX(-50%)"
                    }}
                    aria-hidden="true"
                >
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Glow effect"
                        className="w-full h-auto opacity-40 blur-3xl"
                        loading="eager"
                    />
                </div>

                <div className="relative z-10 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative rounded-xl bg-gray-900 border border-gray-800 overflow-hidden shadow-2xl">
                        {/* Using a placeholder for the dashboard screenshot until a real one is provided, or reusing the prompt's image if preferred. 
                 Since I have a screenshot of the actual dashboard I made, I could potentially use that if I had the URL, 
                 but for a pure code component I'll use a high quality Unsplash placeholder or the one from the prompt if it looks generic enough. 
                 The prompt used: https://i.postimg.cc/SKcdVTr1/Dashboard2.png. I'll stick with that for now as it's a specific asset requested, 
                 or better, I'll use a "Story/Cinema" themed image from Unsplash to represent the output.
                 Actually, let's use the one from the prompt as requested for structure, but typically I'd swap it. 
                 I'll keep the prompt's image for the basic structure compliance but it might look like a dashboard. */}
                        <img
                            src="https://i.postimg.cc/SKcdVTr1/Dashboard2.png"
                            alt="Dashboard preview"
                            className="w-full h-auto rounded-lg"
                            loading="eager"
                        />
                        {/* Overlay to make it look like OUR app */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button variant="default" onClick={onLaunch}>Launch Demo</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = "Hero";

interface SaasTemplateProps {
    onLaunch: () => void;
}

// Main Component
export default function SaasTemplate({ onLaunch }: SaasTemplateProps) {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navigation onLaunch={onLaunch} />
            <Hero onLaunch={onLaunch} />
        </main>
    );
}
