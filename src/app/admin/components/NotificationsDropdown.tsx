'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/leads?status=NEW');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Error fetching notifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Optional: Poll every 30 seconds for new notifications
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchNotifications();
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary focus:outline-none"
            >
                <span className="material-symbols-outlined text-2xl">notifications</span>
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full animate-pulse border-2 border-surface"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 z-50 overflow-hidden fade-in origin-top-right">
                    <div className="p-4 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Notificaciones</h3>
                        {notifications.length > 0 && (
                            <span className="text-xs font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full">{notifications.length} Nuevas</span>
                        )}
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                        {loading && notifications.length === 0 ? (
                            <div className="p-4 text-center text-on-surface-variant font-body-sm">Cargando...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-3xl text-outline">done_all</span>
                                <p className="text-on-surface-variant font-body-md">Estás al día</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-outline-variant/20">
                                {notifications.map(notif => (
                                    <li key={notif.id} className="hover:bg-surface-container-low transition-colors">
                                        <Link 
                                            href={notif.type === 'VISIT' ? '/admin/agenda' : '/admin/leads'} 
                                            onClick={() => setIsOpen(false)}
                                            className="p-4 flex items-start gap-3 w-full"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'VISIT' ? 'bg-[#e5c09b]/20 text-[#7a5d3f]' : 'bg-[#5c1212]/10 text-[#5c1212]'}`}>
                                                <span className="material-symbols-outlined">
                                                    {notif.type === 'VISIT' ? 'calendar_month' : 'person'}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-label-md text-on-surface truncate">
                                                    {notif.type === 'VISIT' ? 'Nueva visita programada' : 'Nuevo cliente interesado'}
                                                </p>
                                                <p className="text-body-sm text-on-surface-variant truncate">{notif.name}</p>
                                                <p className="text-xs text-outline mt-1">
                                                    {new Date(notif.createdAt).toLocaleDateString()} - {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {notifications.length > 0 && (
                        <div className="p-2 border-t border-outline-variant/30 bg-surface-container-low text-center">
                            <Link href="/admin/leads" onClick={() => setIsOpen(false)} className="text-primary text-label-sm font-label-sm hover:underline">
                                Ver todos los leads
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
