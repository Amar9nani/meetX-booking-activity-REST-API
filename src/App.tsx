import React from 'react';
import { CircleUser, Server, BookOpen, Calendar } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <Server className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Activity Booking API</h1>
              <p className="text-blue-100">RESTful API for managing activity bookings</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* API Overview */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">API Overview</h2>
          </div>
          <p className="text-gray-600 mb-4">
            This API provides endpoints for user authentication, activity management, and booking operations.
            To get started, connect your Supabase instance using the button in the top right corner.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Authentication</h3>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• User registration</li>
                <li>• Secure login with JWT</li>
                <li>• Password hashing</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Activities</h3>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• List all activities</li>
                <li>• Filter by type/location</li>
                <li>• Detailed activity info</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-2">Bookings</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Book activities</li>
                <li>• View booking history</li>
                <li>• Manage reservations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="space-y-6">
          {/* Authentication Endpoints */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Authentication Endpoints</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">POST</span>
                  <code className="text-sm">/api/users/register</code>
                </div>
                <p className="text-sm text-gray-600 mt-1">Register a new user account</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">POST</span>
                  <code className="text-sm">/api/users/login</code>
                </div>
                <p className="text-sm text-gray-600 mt-1">Authenticate and receive JWT token</p>
              </div>
            </div>
          </div>

          {/* Activity Endpoints */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Activity Endpoints</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded">GET</span>
                  <code className="text-sm">/api/activities</code>
                </div>
                <p className="text-sm text-gray-600 mt-1">List all available activities</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded">GET</span>
                  <code className="text-sm">/api/activities/:id</code>
                </div>
                <p className="text-sm text-gray-600 mt-1">Get details of a specific activity</p>
              </div>
            </div>
          </div>

          {/* Booking Endpoints */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Booking Endpoints</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-500 text-white text-sm px-2 py-1 rounded">POST</span>
                  <code className="text-sm">/api/activities/:id/book</code>
                </div>
                <p className="text-sm text-gray-600 mt-1">Book an activity (requires authentication)</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-500 text-white text-sm px-2 py-1 rounded">GET</span>
                  <code className="text-sm">/api/activities/user/bookings</code>
                </div>
                <p className="text-sm text-gray-600 mt-1">Get user's booking history</p>
              </div>
            </div>
          </div>
        </section>

        {/* Postman Collection */}
        <section className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold">API Documentation</h2>
            </div>
            <a
              href="https://www.postman.com/your-collection-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span>View Postman Collection</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Activity Booking API. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;