import React from 'react';
import styles from '../pages/auth-styles.module.css';

interface AuthInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon?: string; // base64 encoded icon string
  error?: string;
  showStrengthMeter?: boolean;
  passwordStrength?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  error,
  showStrengthMeter = false,
  passwordStrength
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        {icon && (
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            opacity: 0.5
          }}>
            <img src={icon} alt="" width="16" height="16" />
          </span>
        )}
      </div>
      
      {showStrengthMeter && passwordStrength && (
        <div className={styles.passwordStrengthContainer}>
          <div className={styles.passwordStrengthBar}>
            <div className={`${styles.passwordStrengthLevel} ${
              passwordStrength === 'weak' ? styles['strength-weak'] :
              passwordStrength === 'medium' ? styles['strength-medium'] :
              passwordStrength === 'strong' ? styles['strength-strong'] : ''
            }`}></div>
          </div>
          <div className={styles.passwordStrengthText}>
            {passwordStrength === 'weak' && 'Weak password'}
            {passwordStrength === 'medium' && 'Medium password'}
            {passwordStrength === 'strong' && 'Strong password'}
            {!passwordStrength && 'Password must be at least 8 characters'}
          </div>
        </div>
      )}
      
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default AuthInput;