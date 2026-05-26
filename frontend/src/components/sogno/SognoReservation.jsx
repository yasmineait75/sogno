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


const API = "/api";


const inputCls =
  "w-full bg-white rounded-none border border-[#E5DFD3] text-[#2C3E38] placeholder:text-[#5C6B66]/55 focus-visible:ring-0 focus-visible:border-[#1F4E5F] h-12 px-4";


const labelCls = "block text-[10px] uppercase tracking-[0.28em] text-[#5C6B66] mb-3";


export const SognoReservation = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");


  const [contact, setContact] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSubmitting, setContactSubmitting] = useState(false);


  const handleReserve = async (e) => {
    e.preventDefault();
    setErrorMsg("");
