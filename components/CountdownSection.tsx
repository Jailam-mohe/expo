import { type FC } from 'react';
import CountdownTimer from './CountdownTimer';

const CountdownSection: FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <CountdownTimer />
      </div>
    </section>
  );
};

export default CountdownSection;
