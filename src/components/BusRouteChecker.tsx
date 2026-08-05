import React, { useState } from 'react';
import { Bus, MapPin, Clock, Phone, Search, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { BUS_ROUTES_GWALIOR } from '../data/schoolData';
import { useData } from '../contexts/DataContext';

export const BusRouteChecker: React.FC = () => {
  const { schoolInfo } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const filteredRoutes = BUS_ROUTES_GWALIOR.filter((route) => {
    const term = searchTerm.toLowerCase();
    return (
      route.areaName.toLowerCase().includes(term) ||
      route.routeNumber.toLowerCase().includes(term) ||
      route.stops.some(stop => stop.toLowerCase().includes(term))
    );
  });

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="bg-sky-100 text-sky-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-sky-200 inline-flex items-center gap-1.5 mb-2">
            <Bus className="w-3.5 h-3.5 text-sky-600" />
            <span>Gwalior Transport Network</span>
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Check School Bus Route & Timings
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            EuroKids Balwant Nagar operates CCTV-monitored, GPS-tracked buses across major Gwalior localities.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-2xl border border-emerald-200 text-xs font-semibold shrink-0">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Supervised Pickups</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by locality or stop (e.g. Thatipur, Morar, Pinto Park, City Centre)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none text-sm text-slate-800 font-medium transition-all"
        />
      </div>

      {/* Routes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <div
              key={route.routeNumber}
              onClick={() => setSelectedRoute(route.routeNumber)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                selectedRoute === route.routeNumber
                  ? 'border-sky-500 bg-sky-50/50 shadow-md'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
                  {route.routeNumber}
                </span>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" /> Pickup: {route.pickupTime}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>Drop: {route.dropTime}</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {route.areaName}
              </h4>

              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Route Stops:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {route.stops.map((stop, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {stop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Supervisor Contact:</span>
                <a
                  href={`tel:${route.supervisorPhone || schoolInfo.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{route.supervisorPhone || schoolInfo.phone}</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No matching routes found for "{searchTerm}"</p>
            <p className="text-xs text-slate-500 mt-1">
              Call our front desk at <strong className="text-slate-800">{schoolInfo.phone}</strong> to request custom stop coverage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
