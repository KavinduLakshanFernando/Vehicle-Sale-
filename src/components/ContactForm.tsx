'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  submitButtonText?: string;
  submitButtonPath?: string;
  recipientEmail?: string;
  whatsappNumber?: string;
}

export default function ContactForm({
  submitButtonText,
  submitButtonPath,
  whatsappNumber = '+94774567890',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildWhatsAppMessage = () => {
    return (
      `🚗 *New Vehicle Sale Inquiry*\n` +
      `───────────────────────\n` +
      `👤 *Name:* ${formData.name.trim()}\n` +
      (formData.phone.trim() ? `📱 *Phone:* ${formData.phone.trim()}\n` : '') +
      (formData.subject.trim() ? `🏷️ *Subject:* ${formData.subject.trim()}\n` : '') +
      `\n💬 *Message:*\n${formData.message.trim()}\n` +
      `───────────────────────`
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setStatusMessage('Please enter your full name before sending.');
      return;
    }
    if (!formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please enter your message before sending.');
      return;
    }

    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const messageText = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setStatus('success');
    setStatusMessage('✅ WhatsApp opened! Your message is ready to send.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>
            Full Name <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-modern"
            placeholder="John Doe"
            data-preview-static
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="input-modern"
            placeholder="+94 77 123 4567"
            data-preview-static
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          className="input-modern"
          placeholder="Vehicle inquiry (e.g. 2023 Mercedes-Benz C300)"
          data-preview-static
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" data-preview-static>
          Message <span className="text-[var(--brand-accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="input-modern resize-y"
          placeholder="Tell us which vehicle you are interested in or ask any question..."
          data-preview-static
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:bg-[#20ba59] hover:shadow-[#25D366]/50 hover:-translate-y-0.5 active:translate-y-0"
          data-preview-field-path="contact.submitButtonText"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" data-preview-static>
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>{submitButtonText ? `${submitButtonText} on WhatsApp` : 'Send via WhatsApp'}</span>
        </button>
      </div>

      {statusMessage && (
        <div
          data-preview-static
          className={`rounded-xl p-4 text-sm font-medium ${
            status === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}
          role="status"
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
}
