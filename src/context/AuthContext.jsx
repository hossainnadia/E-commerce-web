import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"; // তোমার ইমপোর্ট পাথ অনুযায়ী রাখা হলো
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

    // ১. ইমেইল ও পাসওয়ার্ড দিয়ে একাউন্ট তৈরি এবং সাথে সাথে নাম আপডেট করা
    const createUser = async (email, password, name) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // একাউন্ট তৈরি হওয়ার পর ইউজারের নাম ফায়ারবেসে সেট করা হচ্ছে
            await updateProfile(result.user, {
                displayName: name
            });
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ২. ইমেইল ও পাসওয়ার্ড দিয়ে ট্র্যাডিশনাল লগইন
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // ৩. ফায়ারবেস পপআপের মাধ্যমে গুগল লগইন
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // ৪. সাইন আউট/লগআউট লজিক
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
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
        loginWithGoogle, // নববার এবং লগইন পেজের জন্য এক্সপোর্ট করা হলো
        logoutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);