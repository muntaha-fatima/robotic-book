import React from 'react';
import styles from '../../pages/auth-styles.module.css';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  showSocialLogin?: boolean;
  socialLoginHandler?: () => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  showSocialLogin = true,
  socialLoginHandler
}) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className={styles.authForm}>
          {children}
        </div>
        
        {showSocialLogin && (
          <>
            <div className={styles.divider}>OR</div>
            <div className={styles.socialLogin}>
              <button type="button" className={styles.socialButton} onClick={socialLoginHandler}>
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODAgNTEyIj48cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMzQ1LjMgMi44QzM3OS45LTEuMSA0MTYuNS0uOSA0NDcuNyA0LjRjLTQuOS0yLjktMTEuNi00LjctMTguNC00LjctMzMuOCAwLTY1LjUgMTkuNS04NC4yIDQ5LjRjLTcuNC0xLjQtMTQuOS0yLjEtMjIuNS0yLjEtMzAuOSAwLTU3LjkgMTIuNS03Ny4xIDMxLjdjLTE5LjItMTkuMi00Ni4yLTMxLjctNzcuMS0zMS43Yy0xOC4zIDAtMzUuNyAzLjUtNTEuOSA5LjZjLTE3LjYtNi4xLTM3LjMtOS42LTU3LjktOS42QzEwLjMgMCAwIDEwLjMgMCAyMi43VjI4OWMwIDIwLjEgMTIuNiAzNy45IDMwLjUgNDYuNmMxLjgtLjQgMy42LS43IDUuNC0xLjFjMjMuMi01LjcgNDguNC04LjggNzQuMy04LjhjMjUuOSAwIDUxLjEgMy4xIDc0LjMgOC44YzEuOCAuNCAzLjYuNyA1LjQgMS4xYzE3LjktOC43IDMwLjUtMjYuNSAzMC41LTQ2LjZWMjIuN2MwLTQuNyAxLjctOS4yIDQuOC0xMi43YzMuMS0zLjUgNy40LTUuOCAxMi4xLTYuN2MzLjYtLjcgNy4zLS45IDEwLjktLjlzNy4zLjIgMTAuOS45YzQuNS45IDguOCAzLjIgMTIuMSA2LjdjMy4xIDMuNSA0LjggOC4xIDQuOCAxMi43VjI4OWMwIDEwLjIgMy43IDE5LjYgMTAuNSAyNi45YzM2LjUtMy45IDcyLjYtMy45IDEwOS4xIDBjNi44LTcuMyAxMC41LTE2LjcgMTAuNS0yNi45VjIyLjdjMC00LjcgMS43LTkuMiA0LjgtMTIuN2MzLjEtMy41IDcuNC01LjggMTIuMS02LjdjMy42LS43IDcuMy0uOSAxMC45LS45czcuMy4yIDEwLjkuOWMyLjIuNSA0LjMgMS4zIDYuMiAyLjNjLTIuMi0uMy00LjUtLjUtNi44LS41SDM0NS4zem0tMjQuNyA0MDQuNGMtMzkuNyAyLjEtODEuNy0xMC41LTExNC0zNC40Yy0xLjctLjctMy41LTEuNC01LjItMi4yYy0xOS4zIDguNS0zOS45IDEzLjEtNjAuOCAxMy4xcy00MS41LTQuNi02MC44LTEzLjFjLTEuNy44LTMuNSAxLjUtNS4yIDIuMmMtMzIuMyAyMy45LTc0LjMgMzYuNS0xMTQtMzQuNGM0LjUgMS4yIDguOSAxLjkgMTMuMyAyLjJjMzUuNSAxLjkgNzEuOS0yLjcgMTA0LjYtMTIuOGMxLjcuMyAzLjQuNyA1IDEuMWMyMC41IDQuOSA0MS44IDcuNCA2My4xIDcuNHM0Mi42LTIuNSA2My4xLTcuNGMxLjctLjQgMy40LS44IDUuMS0xLjFjMzIuNyAxMC4xIDY5LjEgMTQuNyAxMDQuNiAxMi44YzQuNC0uMyA4LjgtMSAxMy4zLTIuMnoiLz48L3N2Zz4=" alt="Google" />
                Sign in with Google
              </button>
              <button type="button" className={styles.socialButton} onClick={socialLoginHandler}>
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSIjMTg3N0YyIiBkPSJNOTQuOCAzMjUuMkwzNy42IDIyLjZDNDEuNyA4LjIgNTQuNyAwIDcwIDBMNDM2LjggMEM0NTIuMSAwIDQ2NS4xIDguMiA0NjkuMiAyMi42TDQxMi4xIDMyNS4yQzQwNy45IDMzOS42IDM5NC45IDM0Ny44IDM3OS42IDM0Ny44TDEwNS40IDM0Ny44QzkwLjEgMzQ3LjggNzcuMSAzMzkuNiA3Mi45IDMyNS4yeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMjQgMjQwYzQ4LjYgMCA4OC0zOS40IDg4LTg4cy0zOS40LTg4LTg4LTg4cy04OCAzOS40LTg4IDg4QzEzNiAyMDEuNCAxNzUuNCAyNDAgMjI0IDI0MHptMTA0IDg4SDExMmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2MTI4YzAgOC44IDQuNiAxNi43IDEyIDE4YzEuMi4yIDIuNS4zIDMuOC4zYzE0LjIgMCAyNS43LTExLjYgMjUuNy0yNS43YzAtLjgtLjEtMS42LS4zLTIuNGMxMy4xLTIuNiAyMi4zLTE0LjIgMjIuMy0yNy40VjM2MGMwLTI2LjUgMjEuNS00OCA0OC00OGgxMjhjMjYuNSAwIDQ4IDIxLjUgNDggNDh2NjRjMCAyNi41LTIxLjUgNDgtNDggNDhoLTE2djMyaDE2YzQ0LjEgMCA4MC0zNS45IDgwLTgwVjMyOGMwLTI2LjUtMjEuNS00OC00OC00OHoiLz48L3N2Zz4=" alt="Facebook" />
                Sign in with Facebook
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;