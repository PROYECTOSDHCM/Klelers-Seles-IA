import React, { useState } from 'react';
import { ContactForm } from '../types';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export const ContactFormSection = () => {
    const [formData, setFormData] = useState<ContactForm>({
        companyName: '',
        email: '',
        whatsapp: '',
        avgTicket: '',
        goal: 'sales',
        teamDescription: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Call our serverless API endpoint
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyName: formData.companyName,
                    averageTicket: formData.avgTicket,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    mainGoal: formData.goal,
                    teamDescription: formData.teamDescription,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el formulario');
            }

            // Success! Email and WhatsApp were sent instantly
            setStatus('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="w-full min-h-[600px] flex items-center justify-center bg-zinc-900/80 backdrop-blur-xl border border-klelers-cyan/30 rounded-3xl p-8 text-center animate-fade-in">
                <div className="space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-klelers-cyan/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-klelers-cyan" />
                    </div>
                    <h3 className="font-montserrat text-4xl text-white font-black">¡SOLICITUD RECIBIDA!</h3>
                    <p className="text-gray-300 font-inter text-lg">
                        Hemos enviado confirmaciones instantáneas a:
                    </p>
                    <div className="space-y-3 text-left bg-black/40 p-6 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📧</span>
                            <div>
                                <p className="text-white font-semibold">Email</p>
                                <p className="text-gray-400 text-sm">{formData.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">💬</span>
                            <div>
                                <p className="text-white font-semibold">WhatsApp</p>
                                <p className="text-gray-400 text-sm">{formData.whatsapp}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-white font-inter">
                        Analizaremos los datos de <span className="text-klelers-orange font-bold">{formData.companyName}</span> y te contactaremos en menos de 12 horas.
                    </p>
                    <div className="p-4 bg-klelers-orange/10 rounded-lg border border-klelers-orange/30 mt-6">
                        <p className="font-mono text-xs text-klelers-orange font-bold">ESTADO: PRIORIDAD ALTA ⚡</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">

            {/* Form Left Side */}
            <div className="lg:col-span-7 p-8 md:p-12">
                <div className="mb-8">
                    <h2 className="font-montserrat text-4xl md:text-5xl text-white mb-2 font-black">CIERRE EXPRESS</h2>
                    <p className="text-gray-400 font-inter">Solicita tu diagnóstico de ventas gratuito ($0 USD).</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-klelers-cyan uppercase">Empresa</label>
                            <input
                                required
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-klelers-orange transition-colors"
                                placeholder="Ej. Klelers Corp"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-klelers-cyan uppercase">Ticket Promedio</label>
                            <input
                                required
                                name="avgTicket"
                                value={formData.avgTicket}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-klelers-orange transition-colors"
                                placeholder="Ej. $5,000"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-klelers-cyan uppercase">Email Corporativo</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-klelers-orange transition-colors"
                                placeholder="ceo@empresa.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-klelers-cyan uppercase">WhatsApp</label>
                            <input
                                required
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-klelers-orange transition-colors"
                                placeholder="+52 ..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-klelers-cyan uppercase">Objetivo Principal</label>
                        <div className="relative">
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-klelers-orange transition-colors"
                            >
                                <option value="sales">Quiero más ventas (Growth)</option>
                                <option value="stress">Menos estrés en equipo (Biocoaching)</option>
                                <option value="both">Ambos ya (Full Suite)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-klelers-cyan uppercase">Describe tu equipo en 1 frase</label>
                        <textarea
                            required
                            name="teamDescription"
                            value={formData.teamDescription}
                            onChange={handleChange}
                            rows={2}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-klelers-orange transition-colors resize-none"
                            placeholder="Ej. Talentosos pero desorganizados..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full group bg-klelers-orange hover:bg-klelers-cyan text-white font-montserrat uppercase text-xl py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                    >
                        {status === 'submitting' ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                RESERVAR DIAGNÓSTICO $0
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-gray-600">
                        Pocas plazas disponibles para Febrero 2026.
                    </p>
                </form>
            </div>

            {/* Info Right Side */}
            <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-gray-900 to-black p-12 flex-col justify-between border-l border-gray-800">
                <div>
                    <h4 className="text-white font-bold mb-6">DASHBOARD PREVIEW</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                            <span className="text-gray-400">ROI Esperado (6m)</span>
                            <span className="text-klelers-cyan font-mono">+30%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                            <span className="text-gray-400">Reducción Rotación</span>
                            <span className="text-klelers-orange font-mono">-25%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                            <span className="text-gray-400">Setup Time</span>
                            <span className="text-white font-mono">14 Días</span>
                        </div>
                    </div>
                </div>

                <div className="bg-klelers-cyan/10 p-6 rounded-xl border border-klelers-cyan/20">
                    <p className="text-klelers-cyan text-sm italic">
                        "Desde que implementamos Klelers, el equipo no solo vende más, sino que vive mejor. La integración con Salesforce fue invisible."
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full" />
                        <div>
                            <div className="text-white text-xs font-bold">Director Comercial</div>
                            <div className="text-gray-500 text-[10px]">Tecno Marketing</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};