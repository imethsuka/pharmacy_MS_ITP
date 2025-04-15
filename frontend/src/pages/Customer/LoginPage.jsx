import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/Customer/LoginPage.module.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                            <label htmlFor="email" className={styles["form-label"]}>
                                Email Address
                            </label>
                            <div className={styles["input-wrapper"]}>
                                <Mail className={styles["input-icon"]} />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={styles["input-field"]}
                                />
                            </div>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="passwordField" className={styles["form-label"]}>
                                Password
                            </label>
                            <div className={styles["input-wrapper"]}>
                                <span className={styles["lock-icon-wrapper"]}>
                                    <Lock size={20} className={styles["lock-icon"]} />
                                </span>
                                <input
                                    id="passwordField"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={styles["password-field"]}
                                />
                            </div>
                        </div>

                        <div className={styles["forgot-password"]}>
                            <Link to="/forgot-password" className={styles["forgot-password-link"]}>
                                Forgot password?
                            </Link>
                        </div>
                        {error && <p className={styles["error-message"]}>{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={styles["submit-button"]}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className={styles["loading-icon"]} /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className={styles["signup-link-container"]}>
                    <p className={styles["signup-text"]}>
                        Don't have an account?{" "}
                        <Link to="/signup" className={styles["signup-link"]}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
