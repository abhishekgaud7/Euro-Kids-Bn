import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Upload, Sparkles } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import toast from 'react-hot-toast';

export const GalleryManager: React.FC = () => {
  const { galleryItems, addGalleryImage, deleteGalleryImage } = useData();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Activities');
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // File Picker Handler (Convert image file to Base64)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5 MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result.toString());
          toast.success('Photo loaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) {
      toast.error('Please enter a photo title and select an image file!');
      return;
    }

    addGalleryImage({
      title,
      category,
      image,
      caption: caption || title
    });

    toast.success('New photo published to website gallery!');
    setTitle('');
    setImage('');
    setCaption('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="bg-blue-100 text-blue-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Campus Gallery Manager</span>
          </span>
          <h1 className="text-2xl font-black text-slate-900">Upload & Manage School Photos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aap phone ya computer se direct naye photos select karke website ke gallery me add kar sakte hain.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAddOpen ? 'Close Upload Box' : '+ Add New Photo'}</span>
        </button>
      </div>

      {/* ADD PHOTO FORM WITH FILE UPLOADER */}
      {isAddOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border-2 border-blue-200 shadow-lg space-y-4">
          <h3 className="text-sm font-black text-slate-900 border-b pb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Select Photo from Mobile or Computer</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">Photo Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Clay Modeling Activity"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-bold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-black text-slate-900 outline-none"
              >
                <option value="Activities">Activities & Events</option>
                <option value="Classrooms">Classrooms & Learning</option>
                <option value="Campus">Campus Infrastructure</option>
                <option value="Curriculum">Curriculum & Play</option>
              </select>
            </div>
          </div>

          {/* Local File Selector */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-1">Select Photo File *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs font-bold text-slate-700 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 cursor-pointer"
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
              <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-slate-300 shadow-xs" />
              <div>
                <p className="text-xs font-bold text-emerald-600">✓ Photo Selected Ready to Save</p>
                <p className="text-[11px] text-slate-500 font-medium">{title || 'Untitled Photo'}</p>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xs shadow-md"
            >
              Publish Photo to Website
            </button>
          </div>
        </form>
      )}

      {/* EXISTING GALLERY GRID WITH 1-CLICK DELETE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2.5 py-1 rounded-md backdrop-blur-xs">
                {item.category}
              </span>

              <button
                onClick={() => {
                  deleteGalleryImage(item.id);
                  toast.success('Photo removed from website gallery!');
                }}
                className="absolute top-3 right-3 p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-md transition-transform hover:scale-110"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                {item.caption || 'Live photo on EuroKids website gallery.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
