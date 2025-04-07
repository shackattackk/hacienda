"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, SignedOut, SignUpButton } from "@clerk/nextjs";
import {
  ArrowRight,
  BarChart3,
  Check,
  Leaf,
  LineChart,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="font-bold text-xl">Hacienda</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 "
              >
                Sign up
              </Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-emerald-50 to-green-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Smart Farm Management for Modern Agriculture
              </h1>
              <p className="text-lg text-gray-600">
                Monitor crop health, track farm metrics, and get AI-powered
                insights to optimize your farm's productivity and
                sustainability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 "
                  >
                    Start for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignUpButton>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-video bg-emerald-900/10 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-400/20" />
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Farm dashboard preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg max-w-md">
                    <h3 className="text-xl font-bold mb-2">
                      Real-time NDVI Visualization
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Monitor your crops' health with advanced satellite imagery
                      and AI analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Features for Modern Farmers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hacienda combines satellite imagery, weather data, and artificial
              intelligence to provide you with actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>NDVI Mapping</CardTitle>
                <CardDescription>
                  Visualize crop health with color-coded NDVI maps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor vegetation health across your entire farm with
                  satellite-based NDVI analysis. Identify problem areas early
                  and take targeted action.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Get smart recommendations based on your farm data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI analyzes your farm's data to provide personalized
                  recommendations for irrigation, fertilization, and pest
                  management.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Comprehensive Analytics</CardTitle>
                <CardDescription>
                  Track performance metrics and historical data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access detailed analytics on crop performance, weather
                  patterns, and farm operations to make data-driven decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square md:aspect-auto md:h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-400/10" />
                <img
                  src="/placeholder.svg?height=800&width=800"
                  alt="Farmer using tablet in field"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Why Choose Hacienda?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our platform helps farmers increase yields, reduce costs, and
                  practice sustainable agriculture.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Increase Crop Yields
                    </h3>
                    <p className="text-gray-600">
                      Identify and address issues before they impact your
                      harvest.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Reduce Resource Usage
                    </h3>
                    <p className="text-gray-600">
                      Optimize irrigation and fertilizer application based on
                      actual needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Save Time and Money</h3>
                    <p className="text-gray-600">
                      Streamline farm management with our intuitive dashboard
                      and tools.
                    </p>
                  </div>
                </div>
              </div>

              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 "
                >
                  Get Started Today
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to transform your farm management?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are using Hacienda to optimize their
            operations and increase profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </SignUpButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-emerald-700"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="font-bold text-xl text-white">Hacienda</span>
              </div>
              <p className="text-gray-400">
                Modern farm management platform powered by satellite imagery and
                AI.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="hover:text-emerald-400">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Hacienda. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
