import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the charts
const heartRateData = [
  { time: '6:00 AM', value: 72 },
  { time: '8:00 AM', value: 75 },
  { time: '10:00 AM', value: 78 },
  { time: '12:00 PM', value: 82 },
  { time: '2:00 PM', value: 80 },
  { time: '4:00 PM', value: 76 },
  { time: '6:00 PM', value: 74 },
  { time: '8:00 PM', value: 70 },
];

const oxygenData = [
  { time: '6:00 AM', value: 98 },
  { time: '8:00 AM', value: 97 },
  { time: '10:00 AM', value: 99 },
  { time: '12:00 PM', value: 98 },
  { time: '2:00 PM', value: 97 },
  { time: '4:00 PM', value: 98 },
  { time: '6:00 PM', value: 99 },
  { time: '8:00 PM', value: 98 },
];

const temperatureData = [
  { time: '6:00 AM', value: 98.2 },
  { time: '8:00 AM', value: 98.4 },
  { time: '10:00 AM', value: 98.6 },
  { time: '12:00 PM', value: 98.3 },
  { time: '2:00 PM', value: 98.5 },
  { time: '4:00 PM', value: 98.4 },
  { time: '6:00 PM', value: 98.2 },
  { time: '8:00 PM', value: 98.1 },
];

function App() {
  return (
    <div className="min-h-screen bg-transparent">
    


      {/* Hero Section */}
      <section className="px-6 py-8">
      <div className="bg-gradient-to-r from-[#7BA05B] to-[#99B184] rounded-2xl p-8 text-white relative overflow-hidden">

          <div className="absolute top-4 left-6">

          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Meet Nomi — The sensor network that truly understands wellness</h2>
            <p className="text-xl mb-6 opacity-90">Monitor Edna's health with comprehensive wellness tracking and insights.</p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-white text-[#3B6E0E] rounded-lg font-medium hover:bg-gray-100">
                View Reports
              </button>
              <button className="px-6 py-3 bg-[#3B6E0E] text-white rounded-lg font-medium hover:bg-[#2f590b]">
                Take a Tour
              </button>
            </div>
          </div>
          <div className="absolute right-8 top-8 w-32 h-32 opacity-20">
            <div className="w-full h-full border-4 border-white rounded-full"></div>
            <div className="absolute top-4 left-4 w-24 h-24 border-4 border-white rounded-full"></div>
            <div className="absolute top-8 left-8 w-16 h-16 border-4 border-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-6 pb-8">
        
        {/* Recent Health Metrics Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-black">Health Metrics</h3>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Heart Rate Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black">Heart Rate</h4>
                    <p className="text-gray-600 text-sm">Real-time monitoring</p>
                  </div>
                </div>
                <div className="w-6 h-6 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      fontSize={10}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={10}
                      domain={[65, 85]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-red-600">76</span>
                <span className="text-gray-600 ml-2">BPM</span>
              </div>
            </div>

            {/* Oxygen Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black">Oxygen Level</h4>
                    <p className="text-gray-600 text-sm">Blood oxygen saturation</p>
                  </div>
                </div>
                <div className="w-6 h-6 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={oxygenData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      fontSize={10}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={10}
                      domain={[95, 100]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-blue-600">98</span>
                <span className="text-gray-600 ml-2">%</span>
              </div>
            </div>

            {/* Temperature Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black">Temperature</h4>
                    <p className="text-gray-600 text-sm">Body temperature</p>
                  </div>
                </div>
                <div className="w-6 h-6 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      fontSize={10}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={10}
                      domain={[98.0, 98.8]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value}°F`, 'Temperature']}
                    />
                    <Bar dataKey="value" fill="#374151" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-800">98.4</span>
                <span className="text-gray-600 ml-2">°F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Insights Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-black mb-6">Health Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-red-600">Edna</span> is feeling well and active today. Her heart rate increased by 10% from yesterday, indicating a more energetic morning. 
                This is a good sign of her overall health and well-being. This could be a sign of a good night's sleep and a healthy lifestyle, be sure to encourage her to continue her healthy habits!
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-blue-600">Edna</span> has a good oxygen level of 98%. This is an excellent oxygen level for her age and health. To increase her oxygen level, you can encourage her to take deep breaths, go for a walk, or practice yoga.
              </p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-600">The temperature in Edna's room is 98.4°F. This is a normal temperature for her age and health. To maintain her comfort, you can adjust the temperature of the room to a comfortable level.</span>
              </p>
            </div>
          </div>
        </div>
        {/* Wellness Summary Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-black mb-6">Wellness Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-red-600">Edna</span> took her joint medication yesterday but hasn't taken it yet today.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-blue-600">Edna</span> last ate lunch at 1:02 PM.
              </p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-600">Edna</span> slept 6 hours last night.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-red-600">Edna</span> completed her morning walk at 8:30 AM.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-blue-600">Edna</span> had a video call with her daughter this morning.
              </p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-600">Edna</span> is feeling well and active today.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
