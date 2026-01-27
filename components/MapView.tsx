'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useRouter } from 'next/navigation';
import L from 'leaflet';
import { Mountain } from '@/constants/data';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Custom marker icons
const createCustomIcon = (status: string, hasRecentActivity: boolean) => {
  const color = status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#10b981';
  const pulseClass = hasRecentActivity && status === 'critical' ? 'pulse-marker' : '';
  
  return L.divIcon({
    className: `custom-marker ${pulseClass}`,
    html: `
      <div style="position: relative;">
        <div style="
          width: 24px;
          height: 24px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
        ${hasRecentActivity && status === 'critical' ? `
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: ${color};
            animation: pulse 2s ease-in-out infinite;
            opacity: 0.5;
          "></div>
        ` : ''}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapViewProps {
  mountains: Mountain[];
}

const MapView: React.FC<MapViewProps> = ({ mountains }) => {
  const router = useRouter();

  useEffect(() => {
    // Add pulse animation to document
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const handleMarkerClick = (mountainId: string) => {
    router.push(`/mountain/${mountainId}`);
  };

  return (
    <MapContainer
      center={[-6.9, 107.6]}
      zoom={9}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      className="z-0"
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      {mountains.map((mountain) => (
        <Marker
          key={mountain.id}
          position={mountain.coordinates}
          icon={createCustomIcon(mountain.status, mountain.recentActivity)}
          eventHandlers={{
            click: () => handleMarkerClick(mountain.id),
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold text-slate-900">{mountain.name}</h3>
              <p className="text-xs text-slate-600">{mountain.region}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs">
                  <span className="font-semibold">Status:</span>
                  <span className={`ml-1 capitalize ${mountain.status === 'critical' ? 'text-red-600' : mountain.status === 'warning' ? 'text-amber-600' : 'text-green-600'}`}>
                    {mountain.status}
                  </span>
                </p>
                <p className="text-xs">
                  <span className="font-semibold">Loss:</span> {mountain.hectaresLost} ha
                </p>
                <p className="text-xs">
                  <span className="font-semibold">Alerts:</span> {mountain.alertCount}
                </p>
              </div>
              <button 
                onClick={() => handleMarkerClick(mountain.id)}
                className="mt-2 text-xs bg-slate-900 text-white px-3 py-1 rounded hover:bg-slate-700"
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
