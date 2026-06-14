import styles from './card.module.scss';

const Card = ({ service }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <span className={styles.tag}>{service.id}</span>
        <h3>{service.title}</h3>
      </div>
      <p>{service.description}</p>
    </div>
  );
};

export default Card;
