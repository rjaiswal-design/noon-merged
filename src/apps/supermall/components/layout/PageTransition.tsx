import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../../lib/transitions';
import { useNavDirection } from '../../lib/navDirection';
import { PageSkeletonGate } from './PageSkeletonGate';

interface PageTransitionProps {
  children: React.ReactNode;
  /** Skip the centered skeleton (for pages that already render their own
   *  page-shape skeleton or that need to be visible immediately). */
  skipSkeleton?: boolean;
  /** Override the skeleton hold duration. */
  skeletonHoldMs?: number;
}

export function PageTransition({ children, skipSkeleton, skeletonHoldMs }: PageTransitionProps) {
  const direction = useNavDirection();
  return (
    <motion.div
      custom={direction}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {skipSkeleton ? (
        children
      ) : (
        <PageSkeletonGate holdMs={skeletonHoldMs}>{children}</PageSkeletonGate>
      )}
    </motion.div>
  );
}
