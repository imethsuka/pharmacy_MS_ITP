import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Eye, EyeOff, Lock, Loader, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/Customer/LoginPage.module.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { login, isLoading, error } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    // Input component inline implementation
    const Input = ({ id, icon: Icon, ...props }) => {
        return (
            <div className={styles["input-container"]}>
                {Icon && <Icon className={styles["input-icon"]} />}
                <input
                    id={id}
                    {...props}
                    className={`${styles["input-field"]} ${props.className || ""}`}
                />
            </div>
        );
    };

    return (
        <div className={styles["login-container"]}>
            <Link to="/" className={styles["back-home"]}>
                <ArrowLeft size={20} />
                Back to Home
            </Link>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles["login-box"]}
            >
                <div className={styles["login-content"]}>
                    <div className={styles["login-header"]}>
                        <h2 className={styles["login-title"]}>
                            Welcome Back
                        </h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className={styles["form-group"]}>
                            <label htmlFor='email' className={styles["form-label"]}>
                                Email Address
                            </label>
                            <Input
                                id='email'
                                icon={Mail}
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor='password' className={styles["form-label"]}>
                                Password
                            </label>
                            <div className={styles["password-container"]}>
                                <Input
                                    id='password'
                                    icon={Lock}
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                                <div
                                    className={styles["password-toggle"]}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 
                                        <EyeOff className={styles.icon} /> : 
                                        <Eye className={styles.icon} />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles["forgot-password"]}>
                            <Link to='/forgot-password' className={styles["forgot-password-link"]}>
                                Forgot password?
                            </Link>
                        </div>
                        {error && <p className={styles["error-message"]}>{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={styles["submit-button"]}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className={styles["loading-icon"]} /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className={styles["signup-link-container"]}>
                    <p className={styles["signup-text"]}>
                        Don't have an account?{" "}
                        <Link to='/signup' className={styles["signup-link"]}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
