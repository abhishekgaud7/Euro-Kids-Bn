import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const GalleryManager: React.FC = () => {
  const { galleryItems, addGalleryImage, deleteGalleryImage } = useData();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus');
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) return;

    addGalleryImage({
      title,
      category,
      image,
      caption: caption || title
    });

    setTitle('');
    setImage('');
    setCaption('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Photo Gallery Manager</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add or delete campus photos shown on the public gallery page.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo</span>
        </button>
      </div>

      {/* ADD PHOTO FORM */}
      {isAddOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2">Upload Photo Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Science Experiment Day"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                <option value="Campus">Campus</option>
                <option value="Classrooms">Classrooms</option>
                <option value="Curriculum">Curriculum</option>
                <option value="Activities">Activities</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL *</label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Caption</label>
            <input
              type="text"
              placeholder="Short description..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-xs"
            >
              Save Photo
            </button>
          </div>
        </form>
      )}

      {/* GALLERY ITEMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative group">
            <div className="h-44 overflow-hidden relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <button
                onClick={() => deleteGalleryImage(item.id)}
                className="absolute top-3 right-3 p-2 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
                title="Delete image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <span className="text-[10px] font-bold uppercase text-amber-600">{item.category}</span>
              <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
