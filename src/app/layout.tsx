import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Navbar from '@/components/ui/Navbar';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

export const metadata: Metadata = {
  title: 'Mahil Kotadiya | Arduino & ESP32 Developer',
  description: 'Portfolio of Mahil Kotadiya — Arduino & ESP32 Developer, Creative Frontend Developer, IoT Innovator & Smart System Builder.',
  keywords: ['Arduino', 'ESP32', 'IoT', 'Frontend Developer', 'Mahil Kotadiya'],
  openGraph: {
    title: 'Mahil Kotadiya | Ultra Cinematic Portfolio',
    description: 'Futuristic portfolio of Mahil Kotadiya — IoT Innovator & Creative Developer',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AnimatedBackground />
          <div className="noise-overlay" />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
