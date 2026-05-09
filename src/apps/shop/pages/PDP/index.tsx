import { useParams } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import PdpDesign from './components/PdpDesign';

export default function PDPPage() {
  // The new PDP design is currently static, but read the param so we
  // keep the contract the route promises and can pipe it through later.
  useParams<{ productId: string }>();
  return (
    <PageTransition>
      <PdpDesign />
    </PageTransition>
  );
}
