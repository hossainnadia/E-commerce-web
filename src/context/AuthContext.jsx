import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";

const AuthContext = createContext();

// গুগল প্রোভাইডার ইনিশিয়াল করা হলো
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ১. ইমেইল ও পাসওয়ার্ড দিয়ে একাউนต์ তৈরি এবং সাথে সাথে নাম আপডেট করা
    const createUser = async (email, password, name) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // একাউন্ট তৈরি হওয়ার পর ইউজারের নাম ফায়ারবেসে সেট করা হচ্ছে
            await updateProfile(result.user, {
                displayName: name
            });
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ২. ইমেইল ও পাসওয়ার্ড দিয়ে ট্র্যাডিশনাল লগইন (নিরাপদ করা হলো)
    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error; // এররটি থ্রো করা হলো যাতে Login.jsx এর catch ব্লক এটি পায়
        }
    };

    // ৩. ফায়ারবেস পপআপের মাধ্যমে গুগল লগইন (নিরাপদ করা হলো)
    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ৪. সাইন আউট/লগআউট লজিক
    const logoutUser = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ইউজারের লগইন স্টেট রিয়েল-টাইম ট্র্যাক করা
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        loginWithGoogle,
        logoutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);