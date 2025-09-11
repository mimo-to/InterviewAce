import { Link } from "react-router-dom";

/**
 * LogoContainer displays the site logo in a compact, visually balanced way.
 * The logo is sized to fit naturally in the header, like a typical website logo.
 */
export const LogoContainer = () => {
    return (
        <Link to="/" className="flex items-center">
            <img
                src="/assets/svg/colored-logo.svg"
                alt="InterviewAce AI Logo"
                className="h-8 w-8 object-contain" // 32x32px, fits well in most headers
                style={{ minWidth: 32, minHeight: 32, maxWidth: 40, maxHeight: 40 }}
            />
        </Link>
    );
};