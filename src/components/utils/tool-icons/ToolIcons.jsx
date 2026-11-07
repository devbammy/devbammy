import {
  SiClaude,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiStripe,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import styles from './toolIcons.module.scss';

// Real logos in their brand colours. `null` colour = black mark that follows the theme ink.
const registry = {
  React: [SiReact, '#61DAFB'],
  'Next.js': [SiNextdotjs, null],
  Expo: [SiExpo, null],
  TypeScript: [SiTypescript, '#3178C6'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  Express: [SiExpress, null],
  MongoDB: [SiMongodb, '#47A248'],
  PostgreSQL: [SiPostgresql, '#4169E1'],
  Firebase: [SiFirebase, '#FFCA28'],
  Stripe: [SiStripe, '#635BFF'],
  'Claude Code': [SiClaude, '#D97757'],
  OpenAI: [SiOpenai, null],
  Figma: [SiFigma, '#F24E1E'],
  Vercel: [SiVercel, null],
};

const ToolIcons = ({ names }) => (
  <ul className={styles.list}>
    {names
      .filter((n) => registry[n])
      .map((name) => {
        const [Icon, color] = registry[name];
        return (
          <li key={name} className={styles.item}>
            <Icon aria-hidden="true" style={color ? { color } : undefined} />
            <span>{name}</span>
          </li>
        );
      })}
  </ul>
);

export default ToolIcons;
