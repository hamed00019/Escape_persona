import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { sendOtp } from '../utils/kavenegar';
import { saveUserData } from '../utils/supabase';
import { PersonaResult, Stats } from '../types';

interface Props {
    onLoginSuccess: () => void;
    personaResult: PersonaResult;
    stats: Stats;
}

export const LoginScreen: React.FC<Props> = ({ onLoginSuccess, personaResult, stats }) => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userIp, setUserIp] = useState<string>('');

    useEffect(() => {
        // Fetch user IP for testing/logging
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setUserIp(data.ip))
            .catch(err => console.error('Failed to fetch IP', err));
    }, []);

    const handleSendCode = async () => {
        // Validation: Must start with 09 and be exactly 11 digits
        const phoneRegex = /^09\d{9}$/;

        if (!phoneRegex.test(phoneNumber)) {
            setError('لطفا شماره موبایل معتبر وارد کنید (مثلا 09123456789)');
            return;
        }

        setLoading(true);
        setError('');

        // Generate a random 4-digit code
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code);

        try {
            await sendOtp(phoneNumber, code);
            setStep('otp');
        } catch (err) {
            console.error(err);
            setError('خطا در ارسال پیامک. لطفا مجدد تلاش کنید.');
            // For testing purposes if API fails (CORS), we might want to log the code
            console.log('TEST MODE CODE:', code);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (otp !== generatedCode && otp !== '12345') { // Backdoor for testing
            setError('کد وارد شده اشتباه است');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Save data to Supabase
            // Note: We catch error here so user can still see results even if DB save fails
            try {
                await saveUserData(phoneNumber, personaResult, stats);
            } catch (dbError) {
                console.warn('Failed to save to DB, proceeding anyway', dbError);
            }

            onLoginSuccess();
        } catch (err) {
            setError('خطایی رخ داد');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-8 backdrop-blur-md"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-white mb-2">تایید شماره موبایل</h2>
                    <p className="text-slate-400 text-sm">برای مشاهده نتیجه تحلیل شخصیت، لطفا شماره خود را تایید کنید.</p>
                </div>

                {step === 'phone' ? (
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Phone className="absolute right-3 top-3.5 text-slate-500" size={20} />
                            <input
                                type="tel"
                                placeholder="شماره موبایل (مثلا 0912...)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors dir-rtl"
                                maxLength={11}
                            />
                        </div>
                        <button
                            onClick={handleSendCode}
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>ارسال کد تایید <ArrowRight size={18} /></>}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Lock className="absolute right-3 top-3.5 text-slate-500" size={20} />
                            <input
                                type="text"
                                placeholder="کد تایید ۴ رقمی"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors text-center tracking-widest text-lg"
                                maxLength={4}
                            />
                        </div>
                        <button
                            onClick={handleVerify}
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>تایید و مشاهده نتیجه <CheckCircle2 size={18} /></>}
                        </button>
                        <button
                            onClick={() => setStep('phone')}
                            className="text-slate-500 text-xs hover:text-white transition-colors"
                        >
                            تغییر شماره موبایل
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-4 text-rose-500 text-sm text-center font-bold bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
                        {error}
                    </div>
                )}

                {/* IP Address for Testing */}
                {userIp && (
                    <div className="mt-6 text-center">
                        <p className="text-[10px] text-slate-600 font-mono">
                            IP: {userIp}
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
