
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-brand-red/10 to-brand-black/5 py-16 md:py-24">
        <div className="container px-6 mx-auto">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-2xl font-playfair font-bold text-brand-red">
              Mystery Publishers
            </div>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="bg-brand-red hover:bg-brand-red/90" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
                The Complete Platform for Manuscript Editing & Publishing
              </h1>
              <p className="text-lg text-muted-foreground">
                A streamlined workflow for writers, editors, and publishers to collaborate
                on manuscripts from first draft to final publication.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-brand-red hover:bg-brand-red/90" size="lg" asChild>
                  <Link to="/login">
                    Get Started <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Manuscript workflow"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-playfair font-semibold text-center mb-12">
            Streamlined Publishing Workflow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Writer Feature */}
            <div className="p-6 border rounded-lg bg-gradient-card">
              <h3 className="text-xl font-semibold mb-4 font-playfair">For Writers</h3>
              <p className="mb-4 text-muted-foreground">
                Upload manuscripts, track editing progress, and communicate with editors in real-time.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Simple manuscript uploads</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Chapter-by-chapter feedback</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Track revision progress</span>
                </li>
              </ul>
            </div>

            {/* Editor Feature */}
            <div className="p-6 border rounded-lg bg-gradient-card">
              <h3 className="text-xl font-semibold mb-4 font-playfair">For Editors</h3>
              <p className="mb-4 text-muted-foreground">
                Manage assignments, provide feedback, and collaborate with writers and publishers.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Chapter-by-chapter workflow</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Collaborative editing tools</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Progress tracking</span>
                </li>
              </ul>
            </div>

            {/* Publisher Feature */}
            <div className="p-6 border rounded-lg bg-gradient-card">
              <h3 className="text-xl font-semibold mb-4 font-playfair">For Publishers</h3>
              <p className="mb-4 text-muted-foreground">
                Oversee all manuscripts, assign editors, and manage the publication pipeline.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Complete manuscript dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Editor assignment tools</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-brand-red">✓</span>
                  <span>Publication pipeline management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-3xl font-playfair font-semibold mb-6">
            Ready to streamline your publishing workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Mystery Publishers today and experience a seamless collaboration between writers, editors, and publishers.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-brand-red hover:bg-brand-red/90" size="lg" asChild>
              <Link to="/signup">Create an Account</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-playfair font-bold text-brand-red">
                Mystery Publishers
              </div>
              <p className="text-sm text-muted-foreground">
                The complete platform for manuscript editing and publishing
              </p>
            </div>
            <div className="flex gap-8">
              <div className="text-sm">
                <h4 className="font-semibold mb-2">Platform</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                </ul>
              </div>
              <div className="text-sm">
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Mystery Publishers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
