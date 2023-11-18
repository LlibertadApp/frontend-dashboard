import { Link } from 'react-router-dom';
import { ButtonIrregularProps } from './types';
import { FC } from 'react';
import { Faders } from '@phosphor-icons/react';

export const ButtonViewIrregular: FC<ButtonIrregularProps> = ({ amount = 5 }) => {
  return (
    <Link
      to={''}
      className="flex flex-row justify-center gap-[10px] bg-gray-disabled text-gray px-10 py-4 w-full rounded-xl tracking-wider hover:border-red hover:red my-4"
    >
      Ver mesas irregulares{' '}

    </Link>
  );
};
