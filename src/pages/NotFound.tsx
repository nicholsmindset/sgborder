import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container flex flex-col items-center justify-center py-24 text-center pb-mobile-nav">
    <h1 className="font-heading text-display font-bold text-foreground">404</h1>
    <p className="mt-2 text-muted-foreground">Page not found.</p>
    <Link
      to="/"
      className="mt-6 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
