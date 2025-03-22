import { Check, X } from "lucide-react";
import "../../styles/Customer/PasswordStrengthMeter.css"; // Assuming you create a CSS file for styles

const PasswordCriteria = ({ password }) => {
	const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div className="password-criteria">
			{criteria.map((item) => (
				<div key={item.label} className="password-criteria-item">
					{item.met ? (
						<Check className="check-icon" />
					) : (
						<X className="x-icon" />
					)}
					<span className={item.met ? "text-green" : "text-gray"}>{item.label}</span>
				</div>
			))}
		</div>
	);
};

const PasswordStrengthMeter = ({ password }) => {
	const getStrength = (pass) => {
		let strength = 0;
		if (pass.length >= 6) strength++;
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass.match(/\d/)) strength++;
		if (pass.match(/[^a-zA-Z\d]/)) strength++;
		return strength;
	};
	const strength = getStrength(password);

	const getColor = (strength) => {
		if (strength === 0) return "weak";
		if (strength === 1) return "fair";
		if (strength === 2) return "good";
		return "strong";
	};

	const getStrengthText = (strength) => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

	return (
		<div className="password-strength-meter">
			<div className="strength-header">
				<span className="strength-label">Password strength</span>
				<span className="strength-text">{getStrengthText(strength)}</span>
			</div>

			<div className="strength-bar">
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className={`strength-bar-segment ${index < strength ? getColor(strength) : "gray"}`}
					/>
				))}
			</div>
			<PasswordCriteria password={password} />
		</div>
	);
};

export default PasswordStrengthMeter;
