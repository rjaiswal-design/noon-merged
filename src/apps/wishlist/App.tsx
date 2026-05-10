import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DevRetune } from "@/shell/DevRetune";
import "./index.css";
import CollectionDrawer from "./components/CollectionDrawer";
import WishlistPage from "./components/WishlistPage";

function postClose() {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'wishlist:close' }, '*');
  }
}

export default function App() {
  const navigate = useNavigate();
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const params = new URLSearchParams(search);
  const isDrawer = params.get('drawer') === '1';
  const isEmbedded = params.get('embedded') === '1' || isDrawer;
  const initialImage = params.get('image') || undefined;

  if (isDrawer) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col justify-end">
        <motion.button
          type="button"
          aria-label="Close"
          onClick={postClose}
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(18, 18, 18, 0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <CollectionDrawer product={initialImage ? { image: initialImage } : undefined} />
        </motion.div>
      </div>
    );
  }

  if (isEmbedded) {
    return (
      <div className="min-h-full w-full bg-surface-primary">
        <WishlistPage onBack={postClose} />
        <DevRetune />
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-surface-primary">
      <WishlistPage onBack={() => navigate(-1)} />
      <DevRetune />
    </div>
  );
}
