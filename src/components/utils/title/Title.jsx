import styles from './title.module.scss';

const Title = ({ text }) => {
  return <section className={styles.title}>{text}</section>;
};

export default Title;
