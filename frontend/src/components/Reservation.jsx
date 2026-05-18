import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Users, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { RESTAURANT, HOURS, TIME_SLOTS } from "../lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full bg-transparent rounded-none border border-[#EAE4D9]/25 text-[#F9F6F0] placeholder:text-[#EAE4D9]/40 focus-visible:ring-0 focus-visible:border-[#C27A3E] h-12 px-4 font-sans-body";

export const Reservation = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const [contact, setContact] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error("Merci de choisir une date et un horaire.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        date: format(date, "yyyy-MM-dd"),
        time,
        guests: parseInt(guests, 10),
      };
      const { data } = await axios.post(`${API}/reservations`, payload);
      setSuccess(data);
      toast.success("Réservation envoyée ! Nous vous confirmons sous peu.");
      setForm({ name: "", email: "", phone: "", notes: "" });
      setDate(null);
      setTime("");
      setGuests("2");
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    try {
      await axios.post(`${API}/contact`, contact);
      toast.success("Message envoyé. Merci !");
      setContact({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Impossible d'envoyer le message.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section
      id="reserve"
      data-testid="reservation-section"
      className="relative bg-granite text-[#F9F6F0] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <p className="text-overline text-[#C27A3E] mb-6">— À table</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            Réservez votre <em className="italic text-[#E5C28A]">moment</em>.
          </h2>
          <p className="mt-6 font-sans-body text-[#EAE4D9]/70 text-base md:text-lg max-w-xl">
            Notre salle compte 32 couverts. Pour plus de 6 convives, contactez-nous directement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Practical info */}
          <div className="lg:col-span-5 space-y-12">
            <InfoBlock icon={<MapPin size={18} />} title="Adresse">
              {RESTAURANT.address}
              <br />
              <span className="text-[#EAE4D9]/60">{RESTAURANT.metro}</span>
            </InfoBlock>

            <InfoBlock icon={<Clock size={18} />} title="Horaires">
              <div className="space-y-2 mt-2">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6 text-sm">
                    <span className="text-[#EAE4D9]/90 w-24">{h.day}</span>
                    <span className="text-[#EAE4D9]/60 text-right flex-1">{h.value}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock icon={<Phone size={18} />} title="Téléphone">
              <a href={`tel:${RESTAURANT.phone}`} className="hover:text-[#C27A3E] transition-colors">
                {RESTAURANT.phone}
              </a>
            </InfoBlock>

            <InfoBlock icon={<Mail size={18} />} title="Email">
              <a href={`mailto:${RESTAURANT.email}`} className="hover:text-[#C27A3E] transition-colors break-all">
                {RESTAURANT.email}
              </a>
            </InfoBlock>

            <div className="aspect-[4/3] overflow-hidden border border-[#EAE4D9]/15">
              <iframe
                title="Plan Le Jean Michel Breizh"
                src={RESTAURANT.mapEmbed}
                className="w-full h-full grayscale contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Reservation form */}
          <div className="lg:col-span-7">
            <div className="bg-[#14171A] border border-[#EAE4D9]/10 p-8 md:p-12">
              <p className="text-overline text-[#C27A3E] mb-3">Formulaire de réservation</p>
              <h3 className="font-serif-display text-3xl md:text-4xl mb-10">Une table pour vous</h3>

              {success ? (
                <SuccessCard data={success} onReset={() => setSuccess(null)} />
              ) : (
                <form onSubmit={handleReserve} className="space-y-6" data-testid="reservation-form">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date */}
                    <div className="md:col-span-1">
                      <label className="text-overline text-[#EAE4D9]/80 block mb-3">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            data-testid="reservation-date-trigger"
                            className={`${inputCls} text-left flex items-center justify-between`}
                          >
                            <span className={date ? "" : "text-[#EAE4D9]/40"}>
                              {date ? format(date, "PPP", { locale: fr }) : "Choisir une date"}
                            </span>
                            <CalendarIcon size={16} className="text-[#C27A3E]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#1D2125] border-[#EAE4D9]/15 text-[#F9F6F0]" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              if (d < today) return true;
                              const dow = d.getDay(); // 0 sun, 1 mon
                              return dow === 0 || dow === 1;
                            }}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time */}
                    <div className="md:col-span-1">
                      <label className="text-overline text-[#EAE4D9]/80 block mb-3">Horaire</label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className={`${inputCls} text-left`} data-testid="reservation-time-trigger">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1D2125] text-[#F9F6F0] border-[#EAE4D9]/15 rounded-none">
                          {TIME_SLOTS.map((t) => (
                            <SelectItem key={t} value={t} className="focus:bg-[#1B2A47] focus:text-[#F9F6F0]">
                              {t.replace(":", "h")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Guests */}
                    <div className="md:col-span-1">
                      <label className="text-overline text-[#EAE4D9]/80 block mb-3">Convives</label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger className={`${inputCls} text-left`} data-testid="reservation-guests-trigger">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1D2125] text-[#F9F6F0] border-[#EAE4D9]/15 rounded-none">
                          {[1, 2, 3, 4, 5, 6].map((g) => (
                            <SelectItem key={g} value={String(g)} className="focus:bg-[#1B2A47] focus:text-[#F9F6F0]">
                              {g} {g > 1 ? "personnes" : "personne"}
                            </SelectItem>
                          ))}
                          <SelectItem value="7" className="focus:bg-[#1B2A47]">7+ — nous contacter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-overline text-[#EAE4D9]/80 block mb-3">Nom</label>
                      <Input
                        required
                        data-testid="reservation-name-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="text-overline text-[#EAE4D9]/80 block mb-3">Téléphone</label>
                      <Input
                        required
                        data-testid="reservation-phone-input"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-overline text-[#EAE4D9]/80 block mb-3">Email</label>
                    <Input
                      required
                      type="email"
                      data-testid="reservation-email-input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls}
                      placeholder="vous@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-overline text-[#EAE4D9]/80 block mb-3">
                      Demande spéciale <span className="lowercase text-[#EAE4D9]/40">(facultatif)</span>
                    </label>
                    <Textarea
                      data-testid="reservation-notes-input"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className={`${inputCls} h-28 py-3`}
                      placeholder="Allergie, anniversaire, table à proximité de la fenêtre..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="reservation-submit-button"
                    className="text-overline px-10 py-4 bg-[#F9F6F0] text-[#1B2A47] hover:bg-[#C27A3E] hover:text-[#F9F6F0] transition-colors duration-300 disabled:opacity-60 flex items-center gap-3"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
                    {submitting ? "Envoi…" : "Confirmer la réservation"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact form */}
            <div className="bg-[#14171A] border border-[#EAE4D9]/10 p-8 md:p-12 mt-8" id="contact">
              <p className="text-overline text-[#C27A3E] mb-3">Un mot ?</p>
              <h3 className="font-serif-display text-3xl md:text-4xl mb-8">Écrivez-nous</h3>
              <form onSubmit={handleContact} className="space-y-5" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    required
                    data-testid="contact-name-input"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className={inputCls}
                    placeholder="Votre nom"
                  />
                  <Input
                    required
                    type="email"
                    data-testid="contact-email-input"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className={inputCls}
                    placeholder="Votre email"
                  />
                </div>
                <Input
                  data-testid="contact-subject-input"
                  value={contact.subject}
                  onChange={(e) => setContact({ ...contact, subject: e.target.value })}
                  className={inputCls}
                  placeholder="Sujet (optionnel)"
                />
                <Textarea
                  required
                  data-testid="contact-message-input"
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  className={`${inputCls} h-32 py-3`}
                  placeholder="Votre message…"
                />
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  data-testid="contact-submit-button"
                  className="text-overline px-8 py-3 border border-[#F9F6F0] text-[#F9F6F0] hover:bg-[#F9F6F0] hover:text-[#1B2A47] transition-colors duration-300 disabled:opacity-60 flex items-center gap-3"
                >
                  {contactSubmitting ? <Loader2 className="animate-spin" size={16} /> : null}
                  {contactSubmitting ? "Envoi…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoBlock = ({ icon, title, children }) => (
  <div data-testid={`info-${title.toLowerCase()}`}>
    <div className="flex items-center gap-3 text-[#C27A3E] mb-3">
      {icon}
      <p className="text-overline">{title}</p>
    </div>
    <div className="font-sans-body text-[#F9F6F0]/90 text-base leading-relaxed">{children}</div>
  </div>
);

const SuccessCard = ({ data, onReset }) => (
  <div data-testid="reservation-success" className="border border-[#C27A3E]/40 bg-[#1B2A47]/30 p-8">
    <p className="text-overline text-[#C27A3E] mb-4">Réservation reçue</p>
    <h4 className="font-serif-display text-2xl md:text-3xl mb-4">
      Merci {data?.name?.split(" ")[0] || "à vous"} — on vous attend !
    </h4>
    <p className="text-[#EAE4D9]/80 text-sm leading-relaxed">
      Votre demande pour <strong className="text-[#F9F6F0]">{data?.guests} personne(s)</strong> le{" "}
      <strong className="text-[#F9F6F0]">{data?.date}</strong> à{" "}
      <strong className="text-[#F9F6F0]">{data?.time?.replace(":", "h")}</strong> a bien été enregistrée.
      Nous vous confirmons par téléphone ou email dans la journée.
    </p>
    <button
      onClick={onReset}
      data-testid="reservation-reset"
      className="mt-6 text-overline border-b border-[#F9F6F0] pb-1 hover:text-[#C27A3E] hover:border-[#C27A3E] transition-colors"
    >
      Faire une autre réservation →
    </button>
  </div>
);

export default Reservation;
