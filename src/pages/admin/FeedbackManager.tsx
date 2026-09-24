import React, { useState, useRef } from 'react';
import { 
  Star, 
  Trash2, 
  MessageSquare, 
  Plus, 
  Upload, 
  Sparkles, 
  Edit2, 
  Eye, 
  X, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon,
  Calendar,
  User,
  MapPin
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import toast from 'react-hot-toast';

export const FeedbackManager: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [parentName, setParentName] = useState('');
  const [childNameAndGrade, setChildNameAndGrade] = useState('');
  const [locality, setLocality] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState('');
  const [feedbackImage, setFeedbackImage] = useState('');

  // 1-Click Replace / Attach Slip file input
  const [replacingSlipId, setReplacingSlipId] = useState<string | null>(null);
  const slipFileInputRef = useRef<HTMLInputElement>(null);

  // Form file input
  const formFileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox preview for slip photo
  const [previewSlip, setPreviewSlip] = useState<{ title: string; image: string } | null>(null);

  // Open Form for Adding New
  const handleOpenAdd = () => {
    setEditingId(null);
    setParentName('');
    setChildNameAndGrade('');
    setLocality('Balwant Nagar, Gwalior');
    setQuote('');
    setRating(5);
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    setFeedbackImage('');
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEdit = (t: typeof testimonials[0]) => {
    setEditingId(t.id);
    setParentName(t.parentName);
    setChildNameAndGrade(t.childNameAndGrade);
    setLocality(t.locality);
    setQuote(t.quote);
    setRating(t.rating);
    setDate(t.date);
    setFeedbackImage(t.feedbackImage || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form File Change Handler (for Add/Edit Form)
  const handleFormFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5 MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFeedbackImage(reader.result.toString());
          toast.success('Feedback slip photo attached!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 1-Click Card Slip Replace / Attach Handler
  const handleCardSlipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replacingSlipId) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5 MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          updateTestimonial(replacingSlipId, { feedbackImage: reader.result.toString() });
          toast.success('Feedback slip photo updated!');
          setReplacingSlipId(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCardSlipReplace = (id: string) => {
    setReplacingSlipId(id);
    if (slipFileInputRef.current) {
      slipFileInputRef.current.value = '';
      slipFileInputRef.current.click();
    }
  };

  const handleRemoveSlipFromCard = (id: string) => {
    if (window.confirm('Are you sure you want to remove the slip image from this feedback?')) {
      updateTestimonial(id, { feedbackImage: undefined });
      toast.success('Slip photo removed');
    }
  };

  const handleDeleteTestimonial = (id: string, name: string) => {
    if (window.confirm(`Delete review from "${name}"? This will remove it from the public website.`)) {
      deleteTestimonial(id);
    }
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !quote.trim()) {
      toast.error('Please enter parent name and feedback message!');
      return;
    }

    if (editingId) {
      // Update existing
      updateTestimonial(editingId, {
        parentName: parentName.trim(),
        childNameAndGrade: childNameAndGrade.trim() || 'EuroKids Parent',
        locality: locality.trim() || 'Gwalior',
        quote: quote.trim(),
        rating,
        date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        feedbackImage: feedbackImage || undefined
      });
      toast.success('Feedback updated successfully!');
    } else {
      // Add new
      addTestimonial({
        parentName: parentName.trim(),
        childNameAndGrade: childNameAndGrade.trim() || 'EuroKids Parent',
        locality: locality.trim() || 'Balwant Nagar, Gwalior',
        quote: quote.trim(),
        rating,
        date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatar: '',
        feedbackImage: feedbackImage || undefined,
        isApproved: true
      });
    }

    setIsFormOpen(false);
    setEditingId(null);
  };

  const totalReviews = testimonials.length;
  const verifiedCount = testimonials.filter(t => !!t.feedbackImage).length;

  return (
    <div className="space-y-6">
      {/* Hidden File Input for 1-Click Replace on Cards */}
      <input
        type="file"
        ref={slipFileInputRef}
        onChange={handleCardSlipChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="bg-blue-100 text-blue-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Parent Reviews Moderation</span>
          </span>
          <h1 className="text-2xl font-black text-slate-900">Manage Parent Testimonials & Slips</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aap naya feedback add kar sakte hain, existing feedback edit kar sakte hain, aur unke feedback slip photos replace/upload kar sakte hain.
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs font-bold text-slate-600">
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
              Total Reviews: <strong className="text-blue-950 font-black">{totalReviews}</strong>
            </span>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
              Verified Form Slips: <strong className="font-black">{verifiedCount}</strong>
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            if (isFormOpen && !editingId) {
              setIsFormOpen(false);
            } else {
              handleOpenAdd();
            }
          }}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen && !editingId ? 'Close Form' : '+ Add New Feedback'}</span>
        </button>
      </div>

      {/* ADD / EDIT FORM DRAWER */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-200 shadow-xl space-y-6 animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {editingId ? '✏️ Edit Parent Feedback' : '✨ Add New Parent Feedback'}
              </h2>
              <p className="text-xs text-slate-500">
                {editingId ? 'Update details or replace the feedback slip photo below.' : 'Ye feedback public website ke Home aur Reviews page par turant display hoga.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setEditingId(null);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Parent Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Parent Name *
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Dr. Ritu Sharma"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Child Name & Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Child Name & Program/Grade
              </label>
              <input
                type="text"
                value={childNameAndGrade}
                onChange={(e) => setChildNameAndGrade(e.target.value)}
                placeholder="e.g. Aarav Sharma (Nursery Batch)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Locality */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Locality / Area
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Balwant Nagar, Gwalior"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rating (1 to 5 Stars)
              </label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{rating}.0 / 5</span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Date / Month
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. August 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Feedback Quote */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Feedback Message / Parent Review *
            </label>
            <textarea
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Enter parent's authentic testimonial quote here..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Feedback Slip Photo Upload */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <input
              type="file"
              ref={formFileInputRef}
              onChange={handleFormFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Physical Feedback Form Slip (Photo Upload)</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Parent dwara bhare gaye paper form slip ki photo upload karein (PNG / JPG up to 5MB).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => formFileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>{feedbackImage ? 'Change Slip Photo' : 'Select Slip Image'}</span>
                </button>

                {feedbackImage && (
                  <button
                    type="button"
                    onClick={() => setFeedbackImage('')}
                    className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {feedbackImage && (
              <div className="mt-3 flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200">
                <img
                  src={feedbackImage}
                  alt="Feedback Slip Preview"
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-xs"
                />
                <div className="text-xs">
                  <p className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Slip photo attached</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setPreviewSlip({ title: `${parentName || 'Parent'} Slip Preview`, image: feedbackImage })}
                    className="text-[11px] text-blue-600 font-bold hover:underline mt-0.5"
                  >
                    Click to view full preview
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setEditingId(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
            >
              {editingId ? 'Save Changes' : '+ Publish Feedback'}
            </button>
          </div>
        </form>
      )}

      {/* FEEDBACK CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header: Rating & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-black text-slate-800 ml-1.5">{t.rating}.0</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{t.date}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                "{t.quote}"
              </p>

              {/* Feedback Slip Photo Section */}
              <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between gap-3">
                {t.feedbackImage ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={t.feedbackImage}
                      alt={`${t.parentName} Slip`}
                      className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-xs shrink-0 cursor-pointer hover:opacity-90"
                      onClick={() => setPreviewSlip({ title: `${t.parentName} (${t.childNameAndGrade})`, image: t.feedbackImage! })}
                    />
                    <div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Form Slip Verified</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewSlip({ title: `${t.parentName} (${t.childNameAndGrade})`, image: t.feedbackImage! })}
                        className="block text-[11px] font-bold text-blue-600 hover:underline mt-0.5"
                      >
                        View Full Slip
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">
                    <span className="text-[11px] font-bold text-slate-400 italic">No slip photo attached</span>
                  </div>
                )}

                {/* 1-Click Replace / Attach Button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => triggerCardSlipReplace(t.id)}
                    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                    title="Replace or upload a new photo for this slip"
                  >
                    <Upload className="w-3 h-3 text-blue-600" />
                    <span>{t.feedbackImage ? 'Replace Slip' : '+ Attach Slip'}</span>
                  </button>

                  {t.feedbackImage && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSlipFromCard(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove slip photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with Parent Info & Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.parentName}</span>
                </h4>
                <p className="text-[11px] text-slate-500 font-medium ml-5">
                  {t.childNameAndGrade}
                </p>
                <p className="text-[10px] text-amber-700 font-bold ml-5 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  <span>{t.locality}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(t)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  title="Edit Feedback Details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(t.id, t.parentName)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL FOR PREVIEWING SLIP */}
      {previewSlip && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewSlip(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl relative space-y-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">{previewSlip.title}</h3>
                <p className="text-[11px] text-emerald-600 font-bold">Verified Physical Feedback Slip</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewSlip(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
              <img
                src={previewSlip.image}
                alt={previewSlip.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-inner"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
