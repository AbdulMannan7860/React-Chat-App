import React, { useState } from 'react';
import UserContext from './userContext';
import toast from 'react-hot-toast';
const UserState = (props) => {
    const { children, authUser, setAuthUser } = props;
    const [loading, setLoading] = useState(false)
    const host = import.meta.env.VITE_REACT_APP_HOST;
    const signup = async (formData) => {
        setLoading(true);

        const { fullName, userName, password, confirmPassword, gender } = formData;
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
        if (!success) {
            setLoading(false);
            return
        };

        try {

            const response = await fetch(`${host}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
            })

            const data = await response.json();
            if (!data.message) {
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("Signup Successful");
            }

            if (data.message) {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const login = async (formData) => {
        setLoading(true);

        const { userName, password } = formData;
        const success = handleLoginErrors({ userName, password });
        if (!success) {
            setLoading(false);
            return
        };

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userName, password })
            })

            const data = await response.json();

            if (!data.message) {
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("Login Successful");
            }

            if (data.message) {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    const logout = async () => {
        try {
            setLoading(true)
            const response = fetch(`${host}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            localStorage.removeItem("chat-user");
            toast.success("Logout Successful");
            await setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    return (
        <UserContext.Provider
            value={{
                signup,
                login,
                logout,
                authUser,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserState;

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    };
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    };

    if (password.toUpperCase() === password) {
        toast.error('Password must contain at least one lowercase letter');
        return false;
    };

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    };

    return true;
};

function handleLoginErrors({ userName, password }) {

    if (!userName || !password) {
        toast.error('Please fill in all fields');
        return false;
    };

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    };

    if (password.toUpperCase() === password) {
        toast.error('Password must contain at least one lowercase letter');
        return false;
    };
    return true;

};