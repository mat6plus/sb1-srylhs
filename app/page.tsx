import Header from '@/components/Header';
import ExchangeForm from '@/components/ExchangeForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to CryptoXchange</h1>
        <ExchangeForm />
      </main>
      <Footer />
    </div>
  );
}