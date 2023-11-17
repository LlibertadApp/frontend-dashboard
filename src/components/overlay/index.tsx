import { ReactNode } from 'react';
import { useFilter } from '../../context/FilterContext';

export interface OverlayProps {
    children: ReactNode
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  const { menuOpen } = useFilter();
  return (
    <section>
      {menuOpen && (
        <div className="w-full h-full top-0 left-0 fixed backdrop-blur-[2px] bg-[#201B2B4D] z-10"></div>
      )}
      {children}
    </section>
  );
};

export default Overlay;
