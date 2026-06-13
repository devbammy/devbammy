import { useState } from 'react';

import CircularText from './components/utils/circularText/CircularText';
import Loader from './components/utils/loader/Loader';
import ThemeToggle from './components/utils/theme-toggler/ThemeToggle';
import { useTheme } from './context/ThemeContext';
import { AnimatedButton } from './components/utils/animated-button/AnimatedButton';
import { AnimatedLink } from './components/utils/animated-link/AnimatedLink';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  console.log(theme);

  const handleMenuToggle = (e) => {
    e.preventDefault(); // Prevent standard anchor tag jump behavior
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatedButton text="Bammy" variant="secondary" />
      <AnimatedLink
        href="#menu"
        onClick={handleMenuToggle}
        isOpen={isMenuOpen}
      />
      <ThemeToggle />
      <Loader />
      <CircularText
        text="Full Stack Developer |"
        spinDuration={50}
        onHover="speedUp"
        radius={120}
      />

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui optio quos
        libero culpa eum esse eligendi ducimus ea cum assumenda pariatur,
        doloremque neque aliquid error earum consequatur! Laborum neque
        necessitatibus at magni inventore quibusdam omnis corrupti id similique
        possimus? Distinctio accusantium commodi dicta magni, culpa repellat
        autem sapiente, consectetur placeat tenetur impedit, sed dolores illum
        eos odio voluptatibus rerum possimus doloribus enim maiores ullam libero
        eum! Repellendus laboriosam et eius libero iure at in magnam amet natus
        tempora adipisci aliquam incidunt delectus minima velit, eos magni
        exercitationem iusto reiciendis mollitia rerum, sunt maxime fugiat
        illum? Obcaecati, dignissimos quidem. Repellendus, nesciunt.
      </p>
    </>
  );
}

export default App;
