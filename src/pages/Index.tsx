
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Chrome, Facebook, CheckSquare, Users, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(provider);
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(null);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            View Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Tasks.
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Collaborate.
            </span>
            <br />Get Things Done.
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate task management platform that helps teams and individuals stay organized, 
            collaborate seamlessly, and achieve their goals with real-time updates and intelligent features.
          </p>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>
                Choose your preferred sign-in method to begin managing your tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full h-12 text-base bg-red-600 hover:bg-red-700"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading !== null}
              >
                {isLoading === "google" ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <Chrome className="w-5 h-5 mr-2" />
                    Continue with Google
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-12 text-base border-gray-800 hover:bg-gray-900 hover:text-white"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading !== null}
              >
                {isLoading === "github" ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <Github className="w-5 h-5 mr-2" />
                    Continue with GitHub
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-12 text-base border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading !== null}
              >
                {isLoading === "facebook" ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <Facebook className="w-5 h-5 mr-2" />
                    Continue with Facebook
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
            <p className="text-gray-600">
              Share tasks with team members and see updates instantly across all devices.
            </p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
            <p className="text-gray-600">
              Filter by priority, due date, status, and more to stay focused on what matters.
            </p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              Your data is protected with enterprise-grade security and real-time backups.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h3>
            <p className="text-xl opacity-90 mb-6">
              Join thousands of users who have transformed their workflow with TaskFlow.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-3 h-auto"
              onClick={() => handleSocialLogin("google")}
            >
              Start Free Today
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>Built with ❤️ for the Katomaran Hackathon • © 2025 TaskFlow</p>
          <p className="mt-2 text-sm">This project is a part of a hackathon run by https://www.katomaran.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
