'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
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

interface MapViewProps {
  mountains: Mountain[];
}

const ThemeAwareMapView: React.FC<MapViewProps> = ({ mountains }) => {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const mapRef = React.useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tileLayerRef = React.useRef<L.TileLayer | null>(null);
  const labelLayerRef = React.useRef<L.TileLayer | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mounted || mapRef.current) return;
    
    // Check if map container exists
    const container = document.getElementById('map');
    if (!container) return;
    
    // Clear any existing map instance
    if ((container as any)._leaflet_id) {
      (container as any)._leaflet_id = undefined;
    }
    
    try {
      const newMap = L.map('map').setView([-6.9, 107.6], 9);
      mapRef.current = newMap;
      setMapReady(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mounted]);

  // Handle theme changes and update tile layers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    const map = mapRef.current;
    const isDark = resolvedTheme === 'dark';

    // Remove existing tile layers
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    if (labelLayerRef.current) {
      map.removeLayer(labelLayerRef.current);
    }

    // Add appropriate tile layers based on theme
    if (isDark) {
      // Dark Mode: Use Esri World Imagery with dark labels
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      labelLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);
    } else {
      // Light Mode: Use OpenStreetMap with light tiles
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      ).addTo(map);

      labelLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);
    }
  }, [resolvedTheme, mapReady]);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    
    const map = mapRef.current;
    
    // Add pulse animation
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
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    
    // Add markers
    mountains.forEach((mountain) => {
      const color = mountain.status === 'critical' ? '#ef4444' : 
                    mountain.status === 'warning' ? '#f59e0b' : '#10b981';
      
      const icon = L.divIcon({
        className: 'custom-marker',
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
            ${mountain.recentActivity && mountain.status === 'critical' ? `
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
      
      const marker = L.marker(mountain.coordinates as [number, number], { icon });
      
      marker.bindPopup(`
        <div style="font-size: 14px;">
          <h3 style="font-weight: bold; color: #0f172a; margin: 0 0 4px 0;">${mountain.name}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0 0 8px 0;">${mountain.region}</p>
          <div style="margin-top: 8px; font-size: 12px;">
            <p style="margin: 4px 0;">
              <span style="font-weight: 600;">Status:</span>
              <span style="margin-left: 4px; color: ${color}; text-transform: capitalize;">
                ${mountain.status}
              </span>
            </p>
            <p style="margin: 4px 0;">
              <span style="font-weight: 600;">Loss:</span> ${mountain.hectaresLost} ha
            </p>
            <p style="margin: 4px 0;">
              <span style="font-weight: 600;">Alerts:</span> ${mountain.alertCount}
            </p>
          </div>
          <button 
            onclick="window.location.href='/mountain/${mountain.id}'"
            style="
              margin-top: 8px;
              font-size: 12px;
              background-color: #0f172a;
              color: white;
              padding: 4px 12px;
              border-radius: 4px;
              border: none;
              cursor: pointer;
            "
          >
            View Details
          </button>
        </div>
      `);
      
      marker.on('click', () => {
        router.push(`/mountain/${mountain.id}`);
      });
      
      marker.addTo(map);
    });
    
    return () => {
      document.head.removeChild(style);
    };
  }, [mapReady, mountains, router]);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-muted rounded-xl flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <div 
      id="map" 
      style={{ 
        height: '100%', 
        width: '100%', 
        borderRadius: '12px',
        zIndex: 0,
        transition: 'filter 0.3s ease-in-out'
      }} 
    />
  );
};

export default ThemeAwareMapView;
