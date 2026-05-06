import { StatusBar } from '@ui';
import { PageTransition } from '../../components/layout/PageTransition';

export default function CheckoutPage() {
  return (
    <PageTransition>
      <div className="page page--checkout">
        <StatusBar tone="dark" />
        <h1>Checkout</h1>
      </div>
    </PageTransition>
  );
}
