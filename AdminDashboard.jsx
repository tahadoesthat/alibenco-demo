import React, { useState } from 'react';
import { 
  LayoutDashboard, Building, PlusSquare, Users, 
  Inbox, Settings, LogOut, UploadCloud, Search, 
  MoreVertical, Edit, Trash2, CheckCircle, XCircle 
} from 'lucide-react';

// --- MOCK DATA FOR ADMIN ---
const mockInquiries = [
  { id: 1, name: 'Tariq Al-Fayed', email: 'tariq.al@example.com', phone: '+971 50 123 4567', property: 'Signature Villa Palm Jumeirah', status: 'New', date: 'Oct 24, 2023' },
  { id: 2, name: 'Sarah Jenkins', email: 's.jenkins@invest.co', phone: '+44 7911 123456', property: 'Skyline Penthouse Marina', status: 'Contacted', date: 'Oct 23, 2023' },
  { id: 3, name: 'Omar Saeed', email: 'omar99@gmail.com', phone: '+971 56 987 6543', property: 'Modern Mansion Emirates Hills', status: 'In Progress', date: 'Oct 22, 2023' },
];

const mockProperties = [
  { id: 1, title: 'Signature Villa Palm Jumeirah', price: 'AED 25,000,000', type: 'Villa', status: 'For Sale', leads: 4 },
  { id: 2, title: 'Skyline Penthouse Marina', price: 'AED 12,500,000', type: 'Penthouse', status: 'Off-Plan', leads: 12 },
  { id: 3, title: 'Modern Mansion Emirates Hills', price: 'AED 45,000,000', type: 'Mansion', status: 'For Sale', leads: 2 },
];

// --- LOGIN SCREEN COMPONENT ---
const LoginScreen = ({ onLogin }) => (
  <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 font-sans">
    <div className="w-full max-w-md p-8 bg-[#111] border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
      <h1 className="text-3xl font-bold tracking-widest text-center mb-2 uppercase">LOGO.</h1>
      <p className="text-gray-400 text-center text-sm mb-8 tracking-widest uppercase">Private Agent Portal</p>
      
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Agent ID or Email</label>
          <input type="text" placeholder="agent@alibenco.com" className="w-full bg-transparent border border-white/20 p-3 rounded text-sm placeholder-gray-600 focus:outline-none focus:border-white transition" />
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-transparent border border-white/20 p-3 rounded text-sm placeholder-gray-600 focus:outline-none focus:border-white transition" />
        </div>
        
        <button type="submit" className="w-full bg-white text-black hover:bg-gray-200 transition py-3 rounded text-sm font-bold tracking-widest uppercase mt-6">
          Sign In
        </button>
      </form>
    </div>
    <p className="text-gray-600 text-xs mt-8">Authorized Personnel Only. UAE Data Protection Laws Apply.</p>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');

  // State for Features & Amenities list
  const [features, setFeatures] = useState(['Infinity Pool', 'Smart Home System']);
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold tracking-widest uppercase mb-1">LOGO.</h2>
          <p className="text-xs text-gray-400 tracking-wider">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Dashboard Overview
          </button>
          
          <div className="pt-4 pb-2">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider px-4">Listings</p>
          </div>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'properties' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Building size={18} /> Manage Properties
          </button>
          <button 
            onClick={() => setActiveTab('add-property')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'add-property' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <PlusSquare size={18} /> Add New Listing
          </button>
          
          <div className="pt-4 pb-2">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider px-4">CRM & Agents</p>
          </div>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'inquiries' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Inbox size={18} /> Inquiries <span className="ml-auto bg-white/20 text-white text-xs py-0.5 px-2 rounded-full">3</span>
          </button>
          <button 
            onClick={() => setActiveTab('agents')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'agents' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={18} /> Manage Agents
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0A0A0A]">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0A0A0A]">
          <h1 className="text-xl font-semibold capitalize tracking-wide">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Quick search..." className="bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30 transition w-64" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold tracking-widest text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* TAB: PROPERTIES (Master List) */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Manage your exclusive Dubai portfolio.</p>
                <button onClick={() => setActiveTab('add-property')} className="bg-white text-black px-4 py-2 rounded text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition">
                  + Add Listing
                </button>
              </div>
              
              <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                      <th className="p-4 font-medium">Property</th>
                      <th className="p-4 font-medium">Price</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Leads</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProperties.map(prop => (
                      <tr key={prop.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-800 rounded"></div>
                          <div>
                            <p className="font-semibold">{prop.title}</p>
                            <p className="text-xs text-gray-500">{prop.type}</p>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{prop.price}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${prop.status === 'For Sale' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {prop.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-300">{prop.leads} Inquiries</td>
                        <td className="p-4 text-right">
                          <button className="text-gray-400 hover:text-white p-2 transition"><Edit size={16} /></button>
                          <button className="text-gray-400 hover:text-red-400 p-2 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ADD PROPERTY (The Uploader) */}
          {activeTab === 'add-property' && (
            <form className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-5">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4">Basic Information</h3>
                  
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Property Title</label>
                    <input type="text" placeholder="e.g. Signature Villa Palm Jumeirah" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Price</label>
                      <div className="flex bg-[#0A0A0A] border border-white/20 rounded focus-within:border-white transition overflow-hidden">
                        <select className="bg-transparent text-sm p-3 border-r border-white/20 focus:outline-none text-gray-300">
                          <option value="AED" className="bg-[#111]">AED</option>
                          <option value="USD" className="bg-[#111]">USD</option>
                        </select>
                        <input type="number" placeholder="25,000,000" className="w-full bg-transparent p-3 text-sm focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                      <input type="text" placeholder="e.g. Frond M, Palm Jumeirah" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Bedrooms</label>
                      <input type="number" placeholder="5" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Bathrooms</label>
                      <input type="number" placeholder="6" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Area (SqFt)</label>
                      <input type="number" placeholder="7500" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
                    <textarea rows="5" placeholder="Highlight the luxury aspects of the property..." className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition resize-none"></textarea>
                  </div>
                </div>

                <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-5">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4">Features & Amenities</h3>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      placeholder="e.g. Infinity Pool, Private Beach, Maid's Room..." 
                      className="flex-1 bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" 
                    />
                    <button 
                      type="button" 
                      onClick={handleAddFeature}
                      className="bg-white text-black px-6 rounded font-bold tracking-widest uppercase hover:bg-gray-200 transition text-sm"
                    >
                      Add
                    </button>
                  </div>

                  {features.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-[#0A0A0A] border border-white/10 p-3 rounded text-sm text-gray-300">
                          <span className="flex items-center gap-2 truncate">
                            <CheckCircle size={16} className="text-white shrink-0" /> 
                            <span className="truncate">{feature}</span>
                          </span>
                          <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-gray-500 hover:text-red-400 transition shrink-0 ml-2">
                            <XCircle size={18} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-5">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4">Status & Type</h3>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Property Status</label>
                    <select className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition">
                      <option>For Sale (Ready)</option>
                      <option>Off-Plan</option>
                      <option>For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Property Type</label>
                    <select className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition">
                      <option>Villa</option>
                      <option>Penthouse</option>
                      <option>Apartment</option>
                      <option>Mansion</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#0A0A0A] border border-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-wider">Mark as Exclusive</p>
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Exclusive properties will be pinned to the top of the frontend catalog.</p>
                  </div>
                </div>

                <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-5">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4">Media Upload</h3>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-white/50 transition cursor-pointer bg-[#0A0A0A]">
                    <UploadCloud size={40} className="text-gray-400 mb-3" />
                    <p className="text-sm font-medium mb-1">Drag & Drop Images</p>
                    <p className="text-xs text-gray-500">High-res JPG/PNG up to 10MB</p>
                  </div>
                </div>

                <button type="button" className="w-full bg-white text-black py-4 rounded font-bold tracking-widest uppercase hover:bg-gray-200 transition shadow-lg">
                  Publish Listing
                </button>
              </div>
            </form>
          )}

          {/* TAB: INQUIRIES (Lead CRM) */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <p className="text-gray-400 text-sm">Track and manage client leads from the main website.</p>
              
              <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                      <th className="p-4 font-medium">Client Info</th>
                      <th className="p-4 font-medium">Inquiry Subject</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInquiries.map(lead => (
                      <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="p-4">
                          <p className="font-semibold text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-400">{lead.email}</p>
                          <p className="text-xs text-gray-400">{lead.phone}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">Interested in viewing:</p>
                          <p className="text-sm font-semibold text-gray-300">{lead.property}</p>
                        </td>
                        <td className="p-4 text-sm text-gray-300">{lead.date}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${
                            lead.status === 'New' ? 'bg-red-500/20 text-red-400' : 
                            lead.status === 'Contacted' ? 'bg-green-500/20 text-green-400' : 
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-xs border border-white/30 hover:border-white px-3 py-1 rounded transition">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DASHBOARD / AGENTS (Placeholders) */}
          {(activeTab === 'dashboard' || activeTab === 'agents') && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-50">
              <Settings size={48} className="mb-4 text-gray-500" />
              <h3 className="text-xl font-medium tracking-widest uppercase mb-2">Module Under Construction</h3>
              <p className="text-sm max-w-md">This section will be activated once the database is fully connected to your Hostinger environment.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
