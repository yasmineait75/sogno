import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { SOGNO, SOGNO_HOURS, SOGNO_TIME_SLOTS } from "../../lib/sogno-data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full bg-[#141211] rounded-none border border-[#c5a059]/20 text-[#fdfbf7] placeholder:text-[#fdfbf7]/30 focus-visible:ring-0 focus-visible:border-[#c5a059] h-12 px-4";

const labelCls = "block text-[10px] uppercase tracking-[0.28em] text-[#fdfbf7]/80 mb-3";

export const SognoReservation = () => {
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
      toast.error("Selezioni una data e un orario, per favore.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        restaurant: "sogno",
        date: format(date, "yyyy-MM-dd"),
        time,
        guests: parseInt(guests, 10),
      };
      const { data } = await axios.post(`${API}/reservations`, payload);
      setSuccess(data);
      toast.success("Prenotazione ricevuta — grazie mille!");
      setForm({ name: "", email: "", phone: "", notes: "" });
      setDate(null);
      setTime("");
      setGuests("2");
    } catch (err) {
      console.error(err);
      toast.error("Si è verificato un errore.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    try {
      await axios.post(`${API}/contact`, { ...contact, restaurant: "sogno" });
      toast.success("Grazie ! Le rispondiamo presto.");
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
      id="prenotare"
      data-testid="sogno-reservation"
      className="relative bg-[#141211] text-[#fdfbf7] py-32 md:py-40"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-8">— Prenotazione</p>
          <h2
            className="leading-[1.02] tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            }}
          >
            Riservi il <em className="italic text-[#c5a059]">vostro</em> tavolo.
          </h2>
          <p
            className="mt-6 text-[#fdfbf7]/55 text-base md:text-lg max-w-xl"
            style={{ fontWeight: 300 }}
          >
            Notre salle compte 36 couverts. Pour les groupes de plus de 8
            personnes ou les privatisations, contactez-nous directement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Practical info */}
          <div className="lg:col-span-5 space-y-12">
            <InfoBlock icon={<MapPin size={18} />} title="Indirizzo">
              {SOGNO.address}
              <br />
              <span className="text-[#fdfbf7]/45">{SOGNO.metro}</span>
            </InfoBlock>

            <InfoBlock icon={<Clock size={18} />} title="Orari">
              <div className="space-y-2 mt-2">
                {SOGNO_HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6 text-sm" style={{ fontWeight: 300 }}>
                    <span className="text-[#fdfbf7]/85 w-24">{h.day}</span>
                    <span className="text-[#fdfbf7]/50 text-right flex-1">{h.value}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock icon={<Phone size={18} />} title="Telefono">
              <a href={`tel:${SOGNO.phone}`} className="hover:text-[#c5a059] transition-colors">
                {SOGNO.phone}
              </a>
            </InfoBlock>

            <InfoBlock icon={<Mail size={18} />} title="Email">
              <a href={`mailto:${SOGNO.email}`} className="hover:text-[#c5a059] transition-colors break-all">
                {SOGNO.email}
              </a>
            </InfoBlock>

            <div className="aspect-[4/3] overflow-hidden border border-[#c5a059]/15">
              <iframe
                title="Plan Sogno"
                src={SOGNO.mapEmbed}
                className="w-full h-full grayscale-[0.6] contrast-110 brightness-75"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Reservation form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0908] border border-[#c5a059]/15 p-8 md:p-12">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-3">
                Modulo di prenotazione
              </p>
              <h3
                className="mb-10"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "2.25rem", fontWeight: 400 }}
              >
                Un tavolo per voi
              </h3>

              {success ? (
                <SuccessCard data={success} onReset={() => setSuccess(null)} />
              ) : (
                <form onSubmit={handleReserve} className="space-y-6" data-testid="sogno-reservation-form">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelCls}>Data</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            data-testid="sogno-date-trigger"
                            className={`${inputCls} text-left flex items-center justify-between`}
                          >
                            <span className={date ? "" : "text-[#fdfbf7]/30"} style={{ fontWeight: 300 }}>
                              {date ? format(date, "PPP", { locale: fr }) : "Selezionare"}
                            </span>
                            <CalendarIcon size={16} className="text-[#c5a059]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-[#141211] border-[#c5a059]/20 text-[#fdfbf7]"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              if (d < today) return true;
                              return d.getDay() === 0; // Sunday closed
                            }}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label className={labelCls}>Orario</label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className={`${inputCls} text-left`} data-testid="sogno-time-trigger">
                          <SelectValue placeholder="Selezionare" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141211] text-[#fdfbf7] border-[#c5a059]/20 rounded-none">
                          {SOGNO_TIME_SLOTS.map((t) => (
                            <SelectItem key={t} value={t} className="focus:bg-[#c5a059] focus:text-[#0a0908]">
                              {t.replace(":", "h")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className={labelCls}>Coperti</label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger className={`${inputCls} text-left`} data-testid="sogno-guests-trigger">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141211] text-[#fdfbf7] border-[#c5a059]/20 rounded-none">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                            <SelectItem key={g} value={String(g)} className="focus:bg-[#c5a059] focus:text-[#0a0908]">
                              {g} {g > 1 ? "persone" : "persona"}
                            </SelectItem>
                          ))}
                          <SelectItem value="9" className="focus:bg-[#c5a059] focus:text-[#0a0908]">9+ — contattateci</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Nome</label>
                      <Input
                        required
                        data-testid="sogno-name-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        placeholder="Il vostro nome"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Telefono</label>
                      <Input
                        required
                        data-testid="sogno-phone-input"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Email</label>
                    <Input
                      required
                      type="email"
                      data-testid="sogno-email-input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls}
                      placeholder="voi@email.com"
                    />
                  </div>

                  <div>
                    <label className={labelCls}>
                      Richieste speciali <span className="lowercase text-[#fdfbf7]/30">(opzionale)</span>
                    </label>
                    <Textarea
                      data-testid="sogno-notes-input"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className={`${inputCls} h-28 py-3`}
                      placeholder="Allergie, anniversario, tavolo vicino alla finestra..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="sogno-reservation-submit"
                    className="text-[11px] uppercase tracking-[0.22em] font-semibold px-10 py-4 bg-[#c5a059] text-[#0a0908] hover:bg-[#dfb768] transition-colors disabled:opacity-60 flex items-center gap-3"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
                    {submitting ? "Invio…" : "Confermare la prenotazione"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact form */}
            <div className="bg-[#0a0908] border border-[#c5a059]/15 p-8 md:p-12 mt-8" id="contact">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-3">— Scriveteci</p>
              <h3
                className="mb-8"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "2.25rem", fontWeight: 400 }}
              >
                Un messaggio ?
              </h3>
              <form onSubmit={handleContact} className="space-y-5" data-testid="sogno-contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    required
                    data-testid="sogno-contact-name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className={inputCls}
                    placeholder="Il vostro nome"
                  />
                  <Input
                    required
                    type="email"
                    data-testid="sogno-contact-email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className={inputCls}
                    placeholder="Email"
                  />
                </div>
                <Input
                  data-testid="sogno-contact-subject"
                  value={contact.subject}
                  onChange={(e) => setContact({ ...contact, subject: e.target.value })}
                  className={inputCls}
                  placeholder="Oggetto (opzionale)"
                />
                <Textarea
                  required
                  data-testid="sogno-contact-message"
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  className={`${inputCls} h-32 py-3`}
                  placeholder="Il vostro messaggio…"
                />
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  data-testid="sogno-contact-submit"
                  className="text-[11px] uppercase tracking-[0.22em] px-8 py-3 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0a0908] transition-colors disabled:opacity-60 flex items-center gap-3"
                >
                  {contactSubmitting ? <Loader2 className="animate-spin" size={16} /> : null}
                  {contactSubmitting ? "Invio…" : "Inviare il messaggio"}
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
  <div data-testid={`sogno-info-${title.toLowerCase()}`}>
    <div className="flex items-center gap-3 text-[#c5a059] mb-3">
      {icon}
      <p className="text-[11px] uppercase tracking-[0.28em]">{title}</p>
    </div>
    <div className="text-[#fdfbf7]/90 text-base leading-relaxed" style={{ fontWeight: 300 }}>
      {children}
    </div>
  </div>
);

const SuccessCard = ({ data, onReset }) => (
  <div
    data-testid="sogno-reservation-success"
    className="border border-[#c5a059]/40 bg-[#c5a059]/5 p-8"
  >
    <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-4">Prenotazione ricevuta</p>
    <h4
      className="mb-4"
      style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.8rem", fontWeight: 400 }}
    >
      Grazie {data?.name?.split(" ")[0]} — vi aspettiamo!
    </h4>
    <p className="text-[#fdfbf7]/75 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
      Votre demande pour <strong className="text-[#fdfbf7]">{data?.guests} personne(s)</strong> le{" "}
      <strong className="text-[#fdfbf7]">{data?.date}</strong> à{" "}
      <strong className="text-[#fdfbf7]">{data?.time?.replace(":", "h")}</strong> a bien été enregistrée.
      Notre maître d'hôtel vous confirme la réservation dans la journée.
    </p>
    <button
      onClick={onReset}
      data-testid="sogno-reservation-reset"
      className="mt-6 text-[11px] uppercase tracking-[0.28em] border-b border-[#c5a059] pb-1 text-[#c5a059] hover:text-[#fdfbf7] hover:border-[#fdfbf7] transition-colors"
    >
      Nuova prenotazione →
    </button>
  </div>
);

export default SognoReservation;
