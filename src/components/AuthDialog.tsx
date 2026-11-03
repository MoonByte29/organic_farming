import React, { useState, useEffect } from 'react';
import { X, User, Phone, CheckCircle2, PackageCheck, Sparkles, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { apiService, UserProfile } from '../services/api';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoCode, setDemoCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load existing profile on open if available
  useEffect(() => {
    if (isOpen) {
      apiService.getMe('9876543210').then((res) => {
        if (res && res.user) {
          setUserProfile(res.user);
        }
      }).catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setOtp('');
    setDemoCode('');
    try {
      const res = await apiService.sendOtp(cleanPhone);
      if (res.success) {
        setOtpSent(true);
        if (res.demoCode) {
          setDemoCode(res.demoCode);
        }
      } else {
        setErrorMsg(res.message || 'Failed to send OTP');
      }
    } catch {
      setErrorMsg('Could not reach the OTP service. Make sure the app server is running, then try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.replace(/\D/g, '');
    if (cleanOtp.length !== 4) {
      setErrorMsg('Enter the 4-digit code shown above.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await apiService.verifyOtp(phoneNumber.replace(/\D/g, ''), cleanOtp);
      if (res.success && res.user) {
        setUserProfile(res.user);
      } else {
        setErrorMsg(res.message || 'Invalid OTP');
      }
    } catch {
      setErrorMsg('Could not reach the authentication server. Check that the app server is running, then try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setUserProfile(null);
    setOtpSent(false);
    setOtp('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="relative bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-[#F2ECE0] text-[#383A35] flex items-center justify-center border border-[#DDD5C6] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {userProfile ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5DFD1]">
              <div className="w-12 h-12 rounded-full bg-[#38432B] text-white flex items-center justify-center font-serif text-xl">
                {userProfile.name ? userProfile.name.charAt(0) : 'C'}
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#222421]">
                  {userProfile.name}
                </h4>
                <div className="text-xs text-[#71746B]">
                  Level: <strong className="text-[#38432B]">{userProfile.level || 'Soil Guardian'}</strong>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D6] p-4 rounded-xl space-y-2 text-xs text-[#52554E]">
              <div className="flex justify-between font-medium">
                <span>Harvest Loyalty Seeds:</span>
                <span className="font-mono text-[#38432B] font-bold">
                  {userProfile.loyaltySeeds} Seeds (₹{Math.round(userProfile.loyaltySeeds / 2)} credit)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phone (Registered):</span>
                <span className="font-mono">+91 {userProfile.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Default Address:</span>
                <span className="text-right">{userProfile.address || 'Indiranagar, Bengaluru'}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#73776C] mb-2 font-sans">
                <span>Recent Harvest Orders</span>
                <span className="font-mono text-[11px] text-[#38432B]">
                  MongoDB Database Verified
                </span>
              </div>

              {userProfile.orders && userProfile.orders.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {userProfile.orders.map((ord: any) => (
                    <div key={ord.orderId || ord._id} className="bg-white border border-[#E8E2D6] p-3 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between font-medium text-[#222421]">
                        <span>Order #{ord.orderId}</span>
                        <span className="text-[#38432B] font-bold">₹{ord.totalAmount}</span>
                      </div>
                      <div className="text-[#6D7068] text-[11px] line-clamp-1">
                        {ord.items?.map((it: any) => `${it.name} (x${it.quantity})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-[#8C9086] pt-1 border-t border-[#F2ECE0] flex justify-between">
                        <span className="capitalize">{ord.fulfillmentStatus?.replace(/_/g, ' ')}</span>
                        <span>{new Date(ord.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#E8E2D6] p-3.5 rounded-xl text-xs space-y-1 text-center text-[#73776C]">
                  <div>No past orders found for this number yet.</div>
                  <div className="text-[11px] text-[#38432B]">Place your first order to earn 50 reward seeds!</div>
                </div>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="w-full text-center text-xs text-[#8A5738] underline pt-2 cursor-pointer"
            >
              Sign out of account
            </button>
          </div>
        ) : !otpSent ? (
          <div>
            <div className="w-12 h-12 rounded-full bg-[#EFE9DC] text-[#38432B] flex items-center justify-center mb-4">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#222421] mb-1">
              Welcome to the Circle
            </h3>
            <p className="text-xs text-[#6B6E65] mb-6">
              Enter your mobile number to view past harvest dispatches, track orders, or redeem farm rewards from our MongoDB database.
            </p>

            {errorMsg && (
              <div className="p-2.5 mb-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#3E413B] mb-1">
                  Mobile Number (India)
                </label>
                <div className="flex rounded-xl border border-[#DDD5C6] bg-white overflow-hidden focus-within:border-[#38432B]">
                  <span className="px-3 py-3 bg-[#F2EDE1] text-[#555850] font-medium border-r border-[#DDD5C6]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-3 focus:outline-none text-sm text-[#222421]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] py-3.5 rounded-full font-medium text-xs sm:text-sm cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send 4-Digit OTP via Express API</span>}
              </button>

              <div className="text-[11px] text-[#71746B] text-center">
                Demo Hint: Test with default <strong>9876543210</strong> (OTP: <strong>1234</strong>)
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h3 className="font-serif text-2xl font-medium text-[#222421] mb-1">
              Verify OTP
            </h3>
            <p className="text-xs text-[#6B6E65] mb-4">
              We generated an OTP code for <strong>+91 {phoneNumber}</strong>.
            </p>

            <div className="bg-[#EFE9DC] border border-[#DDD5C6] p-2.5 rounded-xl mb-4 text-center text-xs text-[#38432B]">
              🔑 Demo Code: <strong className="font-mono text-sm tracking-wider">{demoCode}</strong>
            </div>

            {errorMsg && (
              <div className="p-2.5 mb-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#3E413B] mb-1">
                  Enter 4-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={4}
                  autoFocus
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="1234"
                  className="w-full text-center tracking-[1em] text-xl font-mono py-3 bg-white border border-[#DDD5C6] rounded-xl focus:border-[#38432B] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] py-3.5 rounded-full font-medium text-xs sm:text-sm cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Verify & Load MongoDB Profile</span>}
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-[11px] text-[#71756C] underline cursor-pointer"
              >
                Change mobile number
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
