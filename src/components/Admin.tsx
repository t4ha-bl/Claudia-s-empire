import React, { useState } from 'react';
import { Trash2, Plus, X, AlertTriangle, Star, Edit2 } from 'lucide-react';

export interface Service {
  title: string;
  desc: string;
  image: string;
}

export interface Submission {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}

interface AdminProps {
  services: Service[];
  submissions: Submission[];
  reviews: Review[];
  onUpdateServices: (services: Service[]) => void;
  onUpdateReviews: (reviews: Review[]) => void;
  onDeleteSubmission: (id: string) => void;
  onLogout: () => void;
}

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'claudia009' && password === 'claudia09') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminDashboard({ services, submissions, reviews, onUpdateServices, onUpdateReviews, onDeleteSubmission, onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'submissions' | 'reviews'>('services');
  
  // Services State
  const [newService, setNewService] = useState<Service>({ title: '', desc: '', image: '' });
  const [isAddingService, setIsAddingService] = useState(false);

  // Reviews State
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState<Omit<Review, 'id'>>({ name: '', rating: 5, date: '', text: '' });

  // Submissions State
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);

  // --- Service Handlers ---
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateServices([...services, newService]);
    setNewService({ title: '', desc: '', image: '' });
    setIsAddingService(false);
  };

  const handleRemoveService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    onUpdateServices(updated);
  };

  // --- Review Handlers ---
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      const updated = reviews.map(r => r.id === editingReview.id ? { ...reviewForm, id: r.id } : r);
      onUpdateReviews(updated);
      setEditingReview(null);
    } else {
      const newReview = { ...reviewForm, id: crypto.randomUUID() };
      onUpdateReviews([...reviews, newReview]);
      setIsAddingReview(false);
    }
    setReviewForm({ name: '', rating: 5, date: '', text: '' });
  };

  const startEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewForm({ name: review.name, rating: review.rating, date: review.date, text: review.text });
    setIsAddingReview(true);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    onUpdateReviews(updated);
  };

  const cancelReviewEdit = () => {
    setIsAddingReview(false);
    setEditingReview(null);
    setReviewForm({ name: '', rating: 5, date: '', text: '' });
  };

  // --- Submission Handlers ---
  const confirmDeleteSubmission = () => {
    if (submissionToDelete) {
      onDeleteSubmission(submissionToDelete);
      setSubmissionToDelete(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Confirmation Modal */}
      {submissionToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Delete Submission?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this submission? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSubmissionToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSubmission}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={onLogout} className="text-gray-600 hover:text-red-500 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'services' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Manage Services
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'reviews' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Manage Reviews
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'submissions' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            View Submissions
          </button>
        </div>

        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Services List</h2>
              <button
                onClick={() => setIsAddingService(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} /> Add Service
              </button>
            </div>

            {isAddingService && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">New Service</h3>
                  <button onClick={() => setIsAddingService(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleAddService} className="space-y-4">
                  <input
                    placeholder="Service Title"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newService.desc}
                    onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    required
                  />
                  <input
                    placeholder="Image URL"
                    value={newService.image}
                    onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
                    Save Service
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group relative">
                  <button
                    onClick={() => handleRemoveService(idx)}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                    title="Remove Service"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="h-48 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Reviews List</h2>
              <button
                onClick={() => { setEditingReview(null); setIsAddingReview(true); }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} /> Add Review
              </button>
            </div>

            {isAddingReview && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{editingReview ? 'Edit Review' : 'New Review'}</h3>
                  <button onClick={cancelReviewEdit} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSaveReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Reviewer Name"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      placeholder="Date (e.g., '4 months ago')"
                      value={reviewForm.date}
                      onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Rating:</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      className="px-4 py-2 border rounded-lg"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Stars</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    placeholder="Review Text"
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    required
                  />
                  <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
                    {editingReview ? 'Update Review' : 'Save Review'}
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEditReview(review)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">• {review.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{review.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Submissions</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Phone</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Service</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Message</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          No submissions yet.
                        </td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                            {new Date(sub.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{sub.name}</td>
                          <td 
                            className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-primary transition-colors"
                            onClick={() => copyToClipboard(sub.phone)}
                            title="Click to copy phone"
                          >
                            {sub.phone}
                          </td>
                          <td 
                            className="px-6 py-4 text-sm text-primary cursor-pointer hover:underline"
                            onClick={() => copyToClipboard(sub.email)}
                            title="Click to copy email"
                          >
                            {sub.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                              {sub.service}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={sub.message}>
                            {sub.message}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setSubmissionToDelete(sub.id)}
                              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete Submission"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
