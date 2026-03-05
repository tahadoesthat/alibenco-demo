import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bed, Bath, Car, CheckCircle, Search, 
  ChevronDown, ChevronLeft, ChevronRight, Star, 
  Instagram, Facebook, Twitter, Phone, Mail, Menu, X,
  LayoutDashboard, Building, PlusSquare, Users, 
  Inbox, Settings, LogOut, UploadCloud, Edit, Trash2, XCircle
} from 'lucide-react';

// --- ADMIN MOCK DATA & COMPONENTS ---
const LoginScreen = ({ onLogin, onBack }) => (
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
    <div className="flex flex-col items-center mt-8 gap-4">
      <p className="text-gray-600 text-xs">Authorized Personnel Only. UAE Data Protection Laws Apply.</p>
      <button onClick={onBack} className="text-sm text-gray-400 hover:text-white underline">Return to Public Site</button>
    </div>
  </div>
);

const AdminDashboard = ({ navigate, properties, setProperties, inquiries }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [features, setFeatures] = useState(['Infinity Pool', 'Smart Home System']);
  const [newFeature, setNewFeature] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Form States for new listing
  const [newProp, setNewProp] = useState({
    title: '', price: '', currency: 'AED', location: '', beds: '', baths: '', sqft: '', description: '', status: 'For Sale (Ready)', type: 'Villa', isExclusive: false
  });

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!newProp.title || !newProp.price) return alert("Title and Price are required.");
    const newListing = {
      id: Date.now(),
      title: newProp.title,
      price: Number(newProp.price),
      beds: Number(newProp.beds) || 0,
      baths: Number(newProp.baths) || 0,
      sqft: Number(newProp.sqft) || 0,
      type: newProp.type.toLowerCase(),
      status: newProp.status.includes('Sale') ? 'For Sale' : newProp.status,
      image: imagePreview || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop', // Uses uploaded image or placeholder
      address: newProp.location,
      leads: 0,
      features: features,
      description: newProp.description
    };
    setProperties([newListing, ...properties]);
    setActiveTab('properties');
    setNewProp({ title: '', price: '', currency: 'AED', location: '', beds: '', baths: '', sqft: '', description: '', status: 'For Sale (Ready)', type: 'Villa', isExclusive: false });
    setFeatures(['Infinity Pool', 'Smart Home System']);
    setImagePreview(null);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} onBack={() => navigate('home')} />;
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
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <LayoutDashboard size={18} /> Dashboard Overview
          </button>
          
          <div className="pt-4 pb-2"><p className="text-xs text-gray-600 font-bold uppercase tracking-wider px-4">Listings</p></div>
          <button onClick={() => setActiveTab('properties')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'properties' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Building size={18} /> Manage Properties
          </button>
          <button onClick={() => setActiveTab('add-property')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'add-property' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <PlusSquare size={18} /> Add New Listing
          </button>
          
          <div className="pt-4 pb-2"><p className="text-xs text-gray-600 font-bold uppercase tracking-wider px-4">CRM & Agents</p></div>
          <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'inquiries' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Inbox size={18} /> Inquiries <span className="ml-auto bg-white/20 text-white text-xs py-0.5 px-2 rounded-full">{inquiries.length}</span>
          </button>
          <button onClick={() => setActiveTab('agents')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'agents' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Users size={18} /> Manage Agents
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button onClick={() => navigate('home')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 transition-colors">
            Back to Website
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0A0A0A]">
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0A0A0A]">
          <h1 className="text-xl font-semibold capitalize tracking-wide">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Quick search..." className="bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30 transition w-64" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold tracking-widest text-sm">AD</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
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
                    {properties.length === 0 && (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500">No properties uploaded yet. Click "+ Add Listing" to start.</td></tr>
                    )}
                    {properties.map(prop => (
                      <tr key={prop.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img src={prop.image} alt="Property" className="w-12 h-12 bg-gray-800 rounded object-cover" />
                          <div>
                            <p className="font-semibold">{prop.title}</p>
                            <p className="text-xs text-gray-500 capitalize">{prop.type}</p>
                          </div>
                        </td>
                        <td className="p-4 font-medium">AED {prop.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded uppercase tracking-wider ${prop.status === 'For Sale' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {prop.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-300">{prop.leads} Inquiries</td>
                        <td className="p-4 text-right">
                          <button className="text-gray-400 hover:text-white p-2 transition"><Edit size={16} /></button>
                          <button onClick={() => setProperties(properties.filter(p => p.id !== prop.id))} className="text-gray-400 hover:text-red-400 p-2 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'add-property' && (
            <form className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12" onSubmit={(e) => { e.preventDefault(); handlePublish(); }}>
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-5">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4">Basic Information</h3>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Property Title</label>
                    <input type="text" value={newProp.title} onChange={(e) => setNewProp({...newProp, title: e.target.value})} placeholder="e.g. Signature Villa Palm Jumeirah" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Price</label>
                      <div className="flex bg-[#0A0A0A] border border-white/20 rounded focus-within:border-white transition overflow-hidden">
                        <select value={newProp.currency} onChange={(e) => setNewProp({...newProp, currency: e.target.value})} className="bg-transparent text-sm p-3 border-r border-white/20 focus:outline-none text-gray-300">
                          <option value="AED" className="bg-[#111]">AED</option>
                          <option value="USD" className="bg-[#111]">USD</option>
                        </select>
                        <input type="number" value={newProp.price} onChange={(e) => setNewProp({...newProp, price: e.target.value})} placeholder="25000000" className="w-full bg-transparent p-3 text-sm focus:outline-none" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                      <input type="text" value={newProp.location} onChange={(e) => setNewProp({...newProp, location: e.target.value})} placeholder="e.g. Frond M, Palm Jumeirah" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Bedrooms</label>
                      <input type="number" value={newProp.beds} onChange={(e) => setNewProp({...newProp, beds: e.target.value})} placeholder="5" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Bathrooms</label>
                      <input type="number" value={newProp.baths} onChange={(e) => setNewProp({...newProp, baths: e.target.value})} placeholder="6" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Area (SqFt)</label>
                      <input type="number" value={newProp.sqft} onChange={(e) => setNewProp({...newProp, sqft: e.target.value})} placeholder="7500" className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
                    <textarea value={newProp.description} onChange={(e) => setNewProp({...newProp, description: e.target.value})} rows="5" placeholder="Highlight the luxury aspects of the property..." className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition resize-none"></textarea>
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
                    <button type="button" onClick={handleAddFeature} className="bg-white text-black px-6 rounded font-bold tracking-widest uppercase hover:bg-gray-200 transition text-sm">Add</button>
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
                    <select value={newProp.status} onChange={(e) => setNewProp({...newProp, status: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition">
                      <option>For Sale (Ready)</option>
                      <option>Off-Plan</option>
                      <option>For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Property Type</label>
                    <select value={newProp.type} onChange={(e) => setNewProp({...newProp, type: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded text-sm focus:outline-none focus:border-white transition">
                      <option>Villa</option>
                      <option>Penthouse</option>
                      <option>Apartment</option>
                      <option>Mansion</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" checked={newProp.isExclusive} onChange={(e) => setNewProp({...newProp, isExclusive: e.target.checked})} className="sr-only peer" />
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
                  <label className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-white/50 transition cursor-pointer bg-[#0A0A0A] relative overflow-hidden block min-h-[200px]">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <UploadCloud size={40} className="text-gray-400 mb-3" />
                        <p className="text-sm font-medium mb-1">Click to Upload Image</p>
                        <p className="text-xs text-gray-500">High-res JPG/PNG up to 10MB</p>
                      </div>
                    )}
                  </label>
                  {imagePreview && (
                    <button type="button" onClick={() => setImagePreview(null)} className="text-xs text-red-400 hover:text-red-300 w-full text-center mt-2 block">
                      Remove Image
                    </button>
                  )}
                </div>

                <button type="submit" className="w-full bg-white text-black py-4 rounded font-bold tracking-widest uppercase hover:bg-gray-200 transition shadow-lg">
                  Publish Listing
                </button>
              </div>
            </form>
          )}

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
                    {inquiries.length === 0 && (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500">No inquiries received yet.</td></tr>
                    )}
                    {inquiries.map(lead => (
                      <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="p-4">
                          <p className="font-semibold text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-400">{lead.email}</p>
                          <p className="text-xs text-gray-400">{lead.phone || 'N/A'}</p>
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
                          <button className="text-xs border border-white/30 hover:border-white px-3 py-1 rounded transition">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
};

// --- COMPONENTS ---

const Navbar = ({ navigate, currentRoute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full px-6 py-8 md:px-12 flex items-center justify-between font-sans">
      <div 
        className="text-2xl font-bold tracking-widest uppercase cursor-pointer"
        onClick={() => navigate('home')}
      >
        LOGO.
      </div>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-10 text-sm font-medium">
        <button onClick={() => navigate('home')} className={`hover:text-gray-300 transition ${currentRoute === 'home' ? 'border-b border-white pb-1' : ''}`}>Home</button>
        <button onClick={() => navigate('listings')} className={`hover:text-gray-300 transition ${currentRoute === 'listings' ? 'border-b border-white pb-1' : ''}`}>Listings</button>
        <button onClick={() => { navigate('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-gray-300 transition">About</button>
        <button onClick={() => { navigate('home'); setTimeout(() => document.getElementById('faqs')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-gray-300 transition">FAQs</button>
      </div>

      <div className="hidden md:block">
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-2 rounded-full text-sm font-medium inline-block">
          Get Quote
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden">
          <button onClick={() => { navigate('home'); setMobileMenuOpen(false); }} className="text-lg">Home</button>
          <button onClick={() => { navigate('listings'); setMobileMenuOpen(false); }} className="text-lg">Listings</button>
          <button onClick={() => { navigate('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); setMobileMenuOpen(false); }} className="text-lg">About</button>
          <button onClick={() => { document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}); setMobileMenuOpen(false); }} className="border border-white px-8 py-3 rounded-full text-sm">Get Quote</button>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ navigate, onSubmitInquiry }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Please fill out your name and email.");
    onSubmitInquiry({
      name: formData.name,
      email: formData.email,
      phone: 'N/A',
      property: formData.subject || 'General Inquiry',
      message: formData.message
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <footer id="contact" className="bg-[#0A0A0A] py-24 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="border border-white/50 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="YOUR NAME" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-white/50 p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-white transition" />
              <input type="email" placeholder="EMAIL" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border border-white/50 p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-white transition" />
            </div>
            <input type="text" placeholder="SUBJECT" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-transparent border border-white/50 p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-white transition" />
            <textarea rows="6" placeholder="YOUR MESSAGE" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border border-white/50 p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-white transition resize-none"></textarea>
            
            <div className="text-center md:text-left mt-6">
              <button type="submit" className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-12 py-3 text-sm font-semibold tracking-widest uppercase">
                SEND
              </button>
            </div>
          </form>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <h2 className="text-7xl md:text-8xl font-bold tracking-widest mb-6 uppercase">LOGO.</h2>
          <div className="text-xl space-y-2 text-gray-300">
            <p>Beverly Hills, CA</p>
            <p>contact@alibenco.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center text-xs text-gray-700">
        <span onClick={() => navigate('admin')} className="cursor-pointer hover:text-gray-400 transition">&copy; 2024 Ali Ben Co. All rights reserved.</span>
      </div>
    </footer>
  );
};

const PropertyCard = ({ property, navigate }) => {
  return (
    <div 
      className="bg-[#111] rounded-3xl overflow-hidden shadow-2xl group flex flex-col cursor-pointer hover:border-white/20 border border-transparent transition-all duration-300"
      onClick={() => navigate('property', property)}
    >
      <div className="h-64 overflow-hidden relative">
        <div className={`absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${property.status === 'For Sale' ? 'bg-white text-black' : 'bg-black border border-white text-white'}`}>
          {property.status}
        </div>
        <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
      </div>
      <div className="p-8 pb-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-2xl mb-2 truncate font-semibold">{property.title}</h3>
          <p className="text-xl font-bold mb-3">${property.price.toLocaleString()}</p>
          <p className="text-sm text-gray-400 border-t border-white/10 pt-4 truncate">
            {property.beds} Beds • {property.baths} Baths • {property.sqft.toLocaleString()} sqft
          </p>
        </div>
        <div className="flex gap-2 justify-end mt-6">
          <span className="w-3 h-3 bg-white rounded-full"></span>
          <span className="w-3 h-3 bg-white rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></span>
          <span className="w-3 h-3 bg-white rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></span>
        </div>
      </div>
    </div>
  );
};

// --- PAGES ---

const Home = ({ navigate, properties }) => {
  return (
    <>
      <header className="relative w-full h-screen min-h-[600px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1613490908236-0ed71ca2cebd?q=80&w=2070&auto=format&fit=crop" alt="Luxury Real Estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0A0A]"></div>
        </div>
        <Navbar navigate={navigate} currentRoute="home" />
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-normal leading-tight mb-12 tracking-wide">
            Where Extraordinary<br />Living Begins
          </h1>
          <button onClick={() => navigate('listings')} className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase">
            Explore Exclusive Properties
          </button>
        </div>
      </header>

      <section className="bg-[#2A2A2A] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 tracking-wide">Properties</h2>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {properties.slice(0, 3).map(prop => <PropertyCard key={prop.id} property={prop} navigate={navigate} />)}
            </div>
          ) : (
            <p className="text-center text-gray-400 mb-16">No properties uploaded yet. Check back soon!</p>
          )}
          <div className="text-center">
            <button onClick={() => navigate('listings')} className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-10 py-3 text-sm font-semibold tracking-widest uppercase">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#0A0A0A] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 tracking-wide">About Ali Ben Co.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="text-gray-300 leading-relaxed space-y-6 text-[15px]">
              <p>Hey there! I'm just a random person navigating this wild world, figuring things out one day at a time. I don't have a grand corporate mission statement or a fancy "about us" page because, well, I'm just me.</p>
              <p>I'm someone who loves connecting people with their absolute dream homes. I believe in transparency, kindness, and the power of a good laugh during stressful negotiations. My journey so far has been a mix of unexpected detours and exciting discoveries in the real estate market.</p>
              <p>So, if you're looking for someone who's down-to-earth, always up for a chat, and genuinely interested in finding you the perfect property, you've found them!</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" alt="About" className="w-full max-w-md rounded-[2rem] aspect-square object-cover shadow-2xl mb-8" />
              <div className="flex gap-6">
                <a href="#" className="text-white hover:text-gray-400 transition"><Instagram size={32} /></a>
                <a href="#" className="text-white hover:text-gray-400 transition"><Facebook size={32} /></a>
                <a href="#" className="text-white hover:text-gray-400 transition"><Twitter size={32} /></a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 text-center divide-x divide-gray-600">
            <div>
              <h4 className="text-lg md:text-xl font-medium mb-2">Clients</h4>
              <p className="font-bold text-5xl md:text-7xl">50+</p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium mb-2">Sold</h4>
              <p className="font-bold text-5xl md:text-7xl">100+</p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium mb-2">Worth</h4>
              <p className="font-bold text-5xl md:text-7xl">$2.2m</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-[#2A2A2A] py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 tracking-wide">FAQs</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <details key={item} className="group border border-white/50 bg-transparent overflow-hidden">
                <summary className="relative w-full py-5 px-6 text-center uppercase text-sm tracking-widest hover:bg-white/5 transition cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-center items-center">
                  WHAT IS THE PROCESS OF BUYING A HOME?
                  <ChevronDown className="absolute right-6 transition-transform duration-300 group-open:rotate-180" size={20} />
                </summary>
                <div className="px-8 pb-6 text-center text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4 mx-4">
                  This is the answer to your question. We pride ourselves on transparency and provide detailed information to ensure you have everything you need to make an informed decision regarding our exclusive properties.
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Listings = ({ navigate, properties }) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    let result = properties;
    
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || (p.address && p.address.toLowerCase().includes(search.toLowerCase())));
    if (type) result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
    if (price) {
      if (price === '1') result = result.filter(p => p.price < 5000000);
      if (price === '2') result = result.filter(p => p.price >= 5000000 && p.price <= 10000000);
      if (price === '3') result = result.filter(p => p.price > 10000000);
    }
    if (beds) {
      if (beds === '1') result = result.filter(p => p.beds <= 3);
      if (beds === '3') result = result.filter(p => p.beds >= 4 && p.beds <= 5);
      if (beds === '5') result = result.filter(p => p.beds >= 6);
    }
    
    setFilteredProperties(result);
  }, [search, type, price, beds, properties]);

  return (
    <>
      <header className="relative w-full h-[15vh] min-h-[120px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Listings" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70 bg-gradient-to-b from-black/90 via-black/50 to-[#111]"></div>
        </div>
        <Navbar navigate={navigate} currentRoute="listings" />
      </header>

      <section className="bg-[#111] py-8 border-b border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Location, Keywords..." 
                  className="w-full bg-transparent border border-white/50 p-3 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:border-white transition" 
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-transparent border border-white/50 p-3 text-sm focus:outline-none focus:border-white transition appearance-none">
                <option value="" className="bg-[#2A2A2A]">All Types</option>
                <option value="villa" className="bg-[#2A2A2A]">Villa</option>
                <option value="apartment" className="bg-[#2A2A2A]">Apartment</option>
                <option value="mansion" className="bg-[#2A2A2A]">Mansion</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Price Range</label>
              <select value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-transparent border border-white/50 p-3 text-sm focus:outline-none focus:border-white transition appearance-none">
                <option value="" className="bg-[#2A2A2A]">Any Price</option>
                <option value="1" className="bg-[#2A2A2A]">Under $5M</option>
                <option value="2" className="bg-[#2A2A2A]">$5M - $10M</option>
                <option value="3" className="bg-[#2A2A2A]">$10M+</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Bedrooms</label>
              <select value={beds} onChange={(e) => setBeds(e.target.value)} className="w-full bg-transparent border border-white/50 p-3 text-sm focus:outline-none focus:border-white transition appearance-none">
                <option value="" className="bg-[#2A2A2A]">Any</option>
                <option value="1" className="bg-[#2A2A2A]">1 - 3 Beds</option>
                <option value="3" className="bg-[#2A2A2A]">4 - 5 Beds</option>
                <option value="5" className="bg-[#2A2A2A]">6+ Beds</option>
              </select>
            </div>
            <div>
              <button onClick={() => { setSearch(''); setType(''); setPrice(''); setBeds(''); }} className="border border-white/50 hover:bg-white/10 transition-all w-full py-3 text-sm font-semibold tracking-widest uppercase h-[46px] mt-6 md:mt-0">
                Clear
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2A2A2A] py-24 px-6 md:px-12 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {filteredProperties.map(prop => <PropertyCard key={prop.id} property={prop} navigate={navigate} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-2xl mb-4">No properties found matching your criteria.</p>
              <button onClick={() => { setSearch(''); setType(''); setPrice(''); setBeds(''); }} className="underline">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const PropertyDetail = ({ property, navigate, properties, onSubmitInquiry }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Please fill out your name and email.");
    onSubmitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      property: property.title,
      message: formData.message
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const scrollSlider = (direction) => {
    const slider = document.getElementById('slider-container');
    const cardWidth = 350; // approximate width
    if (slider) {
      slider.scrollBy({ left: direction === 'next' ? cardWidth : -cardWidth, behavior: 'smooth' });
    }
  };

  if (!property) return null;

  return (
    <>
      <header className="relative w-full h-[60vh] min-h-[500px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#0A0A0A]"></div>
        </div>
        <Navbar navigate={navigate} currentRoute="property" />
        <div className="relative z-10 flex-grow flex flex-col items-start justify-end px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
          <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg">{property.status}</span>
        </div>
      </header>

      <section className="bg-[#0A0A0A] py-12 px-6 md:px-12 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="border-b border-white/10 pb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-4 tracking-wide">{property.title}</h1>
              <p className="text-gray-400 text-lg mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-white" /> {property.address}
              </p>
              <p className="text-4xl font-bold tracking-tight text-white">${property.price.toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
              <div className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-white/5">
                <Bed size={32} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Bedrooms</p>
                  <p className="font-bold text-lg">{property.beds}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-white/5">
                <Bath size={32} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Bathrooms</p>
                  <p className="font-bold text-lg">{property.baths}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-white/5">
                <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded text-gray-400 font-bold text-xs">SQFT</div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Area</p>
                  <p className="font-bold text-lg">{property.sqft.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-white/5">
                <Car size={32} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Garage</p>
                  <p className="font-bold text-lg">3 Cars</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">About this Property</h3>
              <div className="text-gray-300 leading-relaxed space-y-4 text-[15px]">
                <p>{property.description || "Experience the pinnacle of luxury living in this architectural masterpiece. Designed with meticulous attention to detail, this incredible home offers sweeping panoramic views and ultimate privacy."}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Features & Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-gray-300 text-sm">
                {(property.features && property.features.length > 0 ? property.features : ['Infinity Pool', 'Smart Home System', 'Home Theater', 'Wine Cellar', "Chef's Kitchen", 'Panoramic Views']).map((feat, i) => (
                  <li key={i} className="flex items-center gap-3"><CheckCircle size={18} className="text-white" /> {feat}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-[#111] border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h4 className="text-xl font-bold mb-2">Schedule a Viewing</h4>
              <p className="text-xs text-gray-400 mb-8">Contact our exclusive agents to arrange a private tour.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-white/30 p-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-white transition" />
                <input type="email" required placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border border-white/30 p-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-white transition" />
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border border-white/30 p-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-white transition" />
                <textarea rows="4" placeholder="I am interested in..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border border-white/30 p-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-white transition resize-none"></textarea>
                <button type="submit" className="w-full bg-white text-black hover:bg-gray-200 transition py-4 rounded-lg text-sm font-bold tracking-widest uppercase mt-4">
                  Request Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2A2A2A] py-24 px-6 md:px-12 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-4xl tracking-wide">Relevant Properties</h2>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scrollSlider('prev')} className="border border-white hover:bg-white hover:text-black transition-all w-12 h-12 rounded-full flex items-center justify-center"><ChevronLeft size={20} /></button>
              <button onClick={() => scrollSlider('next')} className="border border-white hover:bg-white hover:text-black transition-all w-12 h-12 rounded-full flex items-center justify-center"><ChevronRight size={20} /></button>
            </div>
          </div>
          {properties.filter(p => p.id !== property.id).length > 0 ? (
            <div id="slider-container" className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-8 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {properties.filter(p => p.id !== property.id).slice(0, 3).map(prop => (
                 <div key={prop.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center">
                    <PropertyCard property={prop} navigate={navigate} />
                 </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No other relevant properties at the moment.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const navigate = (route, property = null) => {
    setCurrentRoute(route);
    if (property) setSelectedProperty(property);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquirySubmit = (inquiryData) => {
    const newInquiry = {
      id: Date.now(),
      status: 'New',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...inquiryData
    };
    setInquiries([newInquiry, ...inquiries]);
    alert('Your inquiry has been sent successfully! Our agents will contact you soon.');
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {currentRoute === 'home' && <Home navigate={navigate} properties={properties} />}
      {currentRoute === 'listings' && <Listings navigate={navigate} properties={properties} />}
      {currentRoute === 'property' && <PropertyDetail navigate={navigate} property={selectedProperty} properties={properties} onSubmitInquiry={handleInquirySubmit} />}
      {currentRoute === 'admin' && <AdminDashboard navigate={navigate} properties={properties} setProperties={setProperties} inquiries={inquiries} />}
      {currentRoute !== 'admin' && <Footer navigate={navigate} onSubmitInquiry={handleInquirySubmit} />}
    </div>
  );
}
