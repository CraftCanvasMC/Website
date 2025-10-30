import { Button } from '~/components/ui/button';
import { GradientBackground } from '~/components/ui/gradient-background';
import { siteConfig } from '~/config/site';

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative isolate min-h-screen'>
      <GradientBackground frozen />

      <div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12'>
        <header className='mx-auto max-w-3xl text-center'>
          <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl'>Downloads</h1>
          <p className='mt-4 text-neutral-300 sm:text-lg'>
            Get the latest builds of CanvasMC for your Minecraft server.
          </p>

          <div className='flex justify-center gap-4'>
            <Button size='lg' asChild className='mt-6 sm:mt-8 transform transition-transform duration-200 hover:scale-105'>
              <a
                href={siteConfig.links.github.repo}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2'
                aria-label='View source code on GitHub (opens in new tab)'
              >
                <svg viewBox='0 0 24 24' className='h-4 w-4' fill='currentColor' aria-hidden='true'>
                  <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
                </svg>
                <span className='text-sm sm:text-base'>Source Code</span>
              </a>
            </Button>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
