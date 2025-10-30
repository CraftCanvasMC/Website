import { Palette } from 'lucide-react';
import { Card } from '~/components/ui/card';

export default function Loading() {
  return (
    <section className="mt-12 sm:mt-16">
      <Card className="p-6 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="heartbeat-container mb-6">
            <Palette className="size-12 text-neutral-200" />
          </div>
          <p className="text-xl font-medium text-neutral-300">
            Loading builds...
          </p>
        </div>
      </Card>
    </section>
  );
}